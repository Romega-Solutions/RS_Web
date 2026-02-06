/**
 * API route protection utilities
 * Use these in your API routes to add security layers
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  isValidEmail,
  containsSqlInjection,
  containsXss,
  isValidOrigin,
  isValidBodySize,
  obfuscateIp,
} from './validation';

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface SecurityCheckResult {
  passed: boolean;
  error?: string;
  statusCode?: number;
}

// In-memory store (use Redis in production)
const requestLog = new Map<string, { count: number; resetTime: number; blocked: boolean }>();

/**
 * Apply rate limiting to API routes
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 5 }
): SecurityCheckResult {
  const identifier = getRequestIdentifier(request);
  const now = Date.now();
  const clientData = requestLog.get(identifier);

  // Check if client is blocked
  if (clientData?.blocked) {
    return {
      passed: false,
      error: 'Access temporarily restricted',
      statusCode: 403,
    };
  }

  if (!clientData || now > clientData.resetTime) {
    requestLog.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
      blocked: false,
    });
    return { passed: true };
  }

  if (clientData.count >= config.maxRequests) {
    // Block after excessive requests
    if (clientData.count >= config.maxRequests * 2) {
      clientData.blocked = true;
      setTimeout(() => {
        requestLog.delete(identifier);
      }, config.windowMs * 10); // Block for 10x the window
    }

    return {
      passed: false,
      error: 'Rate limit exceeded',
      statusCode: 429,
    };
  }

  clientData.count++;
  return { passed: true };
}

/**
 * Validate request body against common attack vectors
 */
export function validateRequestBody(body: any): SecurityCheckResult {
  // Check body size
  if (!isValidBodySize(body, 100)) {
    return {
      passed: false,
      error: 'Request body too large',
      statusCode: 413,
    };
  }

  // Recursively check all string values for injection attempts
  const checkValues = (obj: any): boolean => {
    if (typeof obj === 'string') {
      if (containsSqlInjection(obj) || containsXss(obj)) {
        return false;
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const value of Object.values(obj)) {
        if (!checkValues(value)) {
          return false;
        }
      }
    }
    return true;
  };

  if (!checkValues(body)) {
    return {
      passed: false,
      error: 'Invalid input detected',
      statusCode: 400,
    };
  }

  return { passed: true };
}

/**
 * Validate contact form submission
 */
export function validateContactForm(data: any): SecurityCheckResult {
  const { name, email, phone, message, company } = data;

  // Required fields
  if (!name || !email || !message) {
    return {
      passed: false,
      error: 'Missing required fields',
      statusCode: 400,
    };
  }

  // Validate email
  if (!isValidEmail(email)) {
    return {
      passed: false,
      error: 'Invalid email format',
      statusCode: 400,
    };
  }

  // Length validations
  if (name.length < 2 || name.length > 100) {
    return {
      passed: false,
      error: 'Invalid name length',
      statusCode: 400,
    };
  }

  if (message.length < 10 || message.length > 2000) {
    return {
      passed: false,
      error: 'Invalid message length',
      statusCode: 400,
    };
  }

  if (company && company.length > 100) {
    return {
      passed: false,
      error: 'Invalid company name length',
      statusCode: 400,
    };
  }

  return { passed: true };
}

/**
 * Check request origin and headers
 */
export function validateRequestHeaders(request: NextRequest): SecurityCheckResult {
  // Validate origin
  if (!isValidOrigin(request)) {
    return {
      passed: false,
      error: 'Invalid origin',
      statusCode: 403,
    };
  }

  // Check for required headers in POST requests
  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        passed: false,
        error: 'Invalid content type',
        statusCode: 415,
      };
    }
  }

  // Check user-agent
  const userAgent = request.headers.get('user-agent');
  if (!userAgent || userAgent.length < 10) {
    return {
      passed: false,
      error: 'Invalid request',
      statusCode: 403,
    };
  }

  return { passed: true };
}

/**
 * Complete security check for API routes
 */
export async function securityCheck(
  request: NextRequest,
  config?: RateLimitConfig
): Promise<SecurityCheckResult> {
  // 1. Check rate limit
  const rateLimit = checkRateLimit(request, config);
  if (!rateLimit.passed) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', request);
    return rateLimit;
  }

  // 2. Validate headers
  const headers = validateRequestHeaders(request);
  if (!headers.passed) {
    logSecurityEvent('INVALID_HEADERS', request);
    return headers;
  }

  // 3. Validate body if POST/PUT
  if (request.method === 'POST' || request.method === 'PUT') {
    try {
      const body = await request.clone().json();
      const bodyValidation = validateRequestBody(body);
      if (!bodyValidation.passed) {
        logSecurityEvent('INVALID_BODY', request);
        return bodyValidation;
      }
    } catch (error) {
      return {
        passed: false,
        error: 'Invalid request body',
        statusCode: 400,
      };
    }
  }

  return { passed: true };
}

/**
 * Create standardized error response
 */
export function createSecurityErrorResponse(
  error: string,
  statusCode: number = 403
): NextResponse {
  // Obfuscate error messages
  const obfuscatedError = obfuscateErrorMessage(error);
  
  return NextResponse.json(
    {
      error: obfuscatedError,
      code: generateErrorCode(),
    },
    { 
      status: statusCode,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Cache-Control': 'no-store',
      },
    }
  );
}

/**
 * Helper functions
 */

function getRequestIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Create obfuscated identifier
  return Buffer.from(`${ip}:${userAgent}`).toString('base64').slice(0, 32);
}

function obfuscateErrorMessage(error: string): string {
  const errorMap: Record<string, string> = {
    'Rate limit exceeded': 'Too many requests',
    'Invalid origin': 'Access denied',
    'Invalid request': 'Bad request',
    'Missing required fields': 'Invalid input',
    'Invalid email format': 'Invalid input',
    'Invalid input detected': 'Bad request',
  };

  return errorMap[error] || 'Request failed';
}

function generateErrorCode(): string {
  return 'E' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

function logSecurityEvent(eventType: string, request: NextRequest): void {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') || 
              'unknown';
  
  console.warn(`[SECURITY] ${eventType} - IP: ${obfuscateIp(ip)} - Path: ${request.nextUrl.pathname}`);
}

/**
 * Wrapper for API routes with security checks
 */
export function withSecurity(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config?: RateLimitConfig
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Run security checks
    const securityResult = await securityCheck(request, config);
    
    if (!securityResult.passed) {
      return createSecurityErrorResponse(
        securityResult.error || 'Security check failed',
        securityResult.statusCode
      );
    }

    try {
      // Call the actual handler
      return await handler(request);
    } catch (error) {
      // Log error but don't expose details
      console.error('[API ERROR]', error);
      return createSecurityErrorResponse('Internal error', 500);
    }
  };
}
