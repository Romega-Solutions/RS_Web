import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { metricsStore } from '@/lib/metrics/store';

// Rate limiting storage (in-memory for simplicity, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Security configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute
const API_RATE_LIMIT_MAX_REQUESTS = 60; // API routes have their own rate limiting via withSecurity()

// Suspicious patterns to detect
const SUSPICIOUS_PATTERNS = [
  /(\.\.|\/\/)/g, // Path traversal
  /(union|select|insert|update|delete|drop|create|alter|exec|script)/gi, // SQL injection
  /<script|<iframe|javascript:/gi, // XSS attempts
  /(%27|%22|%3C|%3E|%00)/gi, // Encoded injection attempts
];

// Bot/scanner user agents
const BOT_PATTERNS = [
  /sqlmap|acunetix|nessus|nikto|metasploit|nmap|masscan|核攻击/i,
  /havij|hydra|w3af|dirbuster|burp|zap|nucleus/i,
];

function getClientIdentifier(request: NextRequest): string {
  // Use multiple factors for client identification
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Create a hash-like identifier (obfuscated)
  return Buffer.from(`${ip}:${userAgent}`).toString('base64').slice(0, 32);
}

function isRateLimited(identifier: string, maxRequests: number): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(identifier);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  if (clientData.count >= maxRequests) {
    return true;
  }

  clientData.count++;
  return false;
}

function isSuspiciousRequest(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check for suspicious patterns in URL path (not full URL to avoid false positives from protocol //)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname)) {
      return true;
    }
  }

  // Check for bot/scanner user agents
  for (const pattern of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }

  // Check for missing or suspicious headers
  if (!userAgent || userAgent.length < 10) {
    return true;
  }

  return false;
}

function addSecurityHeaders(response: NextResponse, pathname: string): NextResponse {
  // Comprehensive security headers
  const headers: Record<string, string> = {
    // Prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // XSS Protection (legacy but still useful)
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy (formerly Feature Policy)
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    
    // Content Security Policy (CSP)
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self' blob:",
      "connect-src 'self' https://www.google-analytics.com https://*.supabase.co https://www.google.com https://api.emailjs.com",
      "frame-src 'self' https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
    
    // Remove server information
    'X-Powered-By': '',
    'Server': '',
  };

  // Only disable caching for API routes and sensitive pages
  // Allow back/forward cache for public pages
  const isApiRoute = pathname.startsWith('/api/');
  const isSensitiveRoute = pathname.includes('/admin') || pathname.includes('/dashboard');
  
  if (isApiRoute || isSensitiveRoute) {
    // Strict no-cache for API and sensitive routes
    headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';
  } else {
    // Allow back/forward cache for public pages
    // This significantly improves performance for browser navigation
    headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
  }

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

function createErrorResponse(message: string, status: number = 403, pathname: string = ''): NextResponse {
  // Obfuscated error messages to not reveal system information
  const obfuscatedMessages: Record<number, string> = {
    403: 'Access Denied',
    429: 'Too Many Requests',
    400: 'Bad Request',
  };

  const response = NextResponse.json(
    { 
      error: obfuscatedMessages[status] || 'Error',
      code: 'E' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    },
    { status }
  );

  return addSecurityHeaders(response, pathname);
}

export default async function proxy(request: NextRequest) {
  // Start metrics tracking
  const startTime = Date.now();
  
  const { pathname } = request.nextUrl;
  
  // Skip metrics tracking for the metrics endpoint itself
  const shouldTrackMetrics = pathname !== '/api/metrics';
  
  // Log to verify proxy is running
  console.log(`[Proxy] Processing: ${pathname}, shouldTrack: ${shouldTrackMetrics}`);
  
  // Get client identifier
  const clientId = getClientIdentifier(request);

  // Check for suspicious requests
  if (isSuspiciousRequest(request)) {
    console.warn(`Suspicious request detected from ${clientId}: ${pathname}`);
    return createErrorResponse('Invalid request', 403, pathname);
  }

  // Rate limiting based on route type
  const isApiRoute = pathname.startsWith('/api/');
  const maxRequests = isApiRoute ? API_RATE_LIMIT_MAX_REQUESTS : RATE_LIMIT_MAX_REQUESTS;

  // Skip rate limiting in development for localhost
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isLocalhost = clientId.includes('localhost') || clientId.includes('127.0.0.1');
  
  if (!isDevelopment || !isLocalhost) {
    if (isRateLimited(clientId, maxRequests)) {
      console.warn(`Rate limit exceeded for ${clientId}: ${pathname}`);
      return createErrorResponse('Rate limit exceeded', 429, pathname);
    }
  }

  // Additional API route protection
  if (isApiRoute) {
    // Check for required headers on POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        return createErrorResponse('Invalid content type', 400, pathname);
      }
    }

    // Update Supabase session for API routes
    const supabaseResponse = await updateSession(request);
    
    // Add security headers and CORS
    addSecurityHeaders(supabaseResponse, pathname);
    
    // Strict CORS for API routes
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'https://www.romegasolutions.com',
      'https://romegasolutions.com',
      'http://localhost:3000', // Development
      'http://127.0.0.1:3000', // Development
    ].filter(Boolean);

    if (origin && allowedOrigins.includes(origin)) {
      supabaseResponse.headers.set('Access-Control-Allow-Origin', origin);
      supabaseResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      supabaseResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      supabaseResponse.headers.set('Access-Control-Max-Age', '86400');
    } else if (!origin) {
      // Same-origin requests (no origin header) are allowed
      supabaseResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }

    // Track metrics for API routes too
    if (shouldTrackMetrics) {
      const duration = (Date.now() - startTime) / 1000;
      metricsStore.trackRequest(duration);
    }

    return supabaseResponse;
  }

  // For non-API routes, update Supabase session and add security headers
  const response = await updateSession(request);
  const finalResponse = addSecurityHeaders(response, pathname);
  
  // Track metrics at the end of the request
  if (shouldTrackMetrics) {
    const duration = (Date.now() - startTime) / 1000;
    console.log(`[Proxy] Tracking request: path=${finalResponse.url}, duration=${duration}s`);
    metricsStore.trackRequest(duration);
  }
  
  return finalResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (e.g., .jpg, .png, .svg, .mp4, .webm)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|eot|mp4|webm|avi|mov|ogg)$).*)',
  ],
};
