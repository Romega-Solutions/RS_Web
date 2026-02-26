/**
 * Security validation utilities for input sanitization and validation
 */

import { NextRequest } from 'next/server';

// Email validation with strict regex
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  if (email.length > 254) return false;
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  return true;
}

// Phone number validation (international format)
export function isValidPhone(phone: string): boolean {
  // Remove common separators
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');

  // Check if it's a valid phone number (7-15 digits with optional + prefix)
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(cleaned);
}

// Sanitize HTML to prevent XSS
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Sanitize text input (remove special characters that could be used for injection)
export function sanitizeText(input: string): string {
  // Remove potential SQL injection or script injection characters
  return input
    .replace(/[<>\"\'%;()&+]/g, '')
    .trim()
    .slice(0, 1000); // Limit length
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Check for SQL injection patterns
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b|\bEXEC\b)/gi,
    /('|(--)|;|\/\*|\*\/|xp_|sp_)/gi,
    /(0x[0-9a-f]+|CHAR\(|CHR\()/gi,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

// Check for XSS patterns
export function containsXss(input: string): boolean {
  const xssPatterns = [
    /<script|<iframe|javascript:|onerror=|onload=/gi,
    /vbscript:|data:text\/html/gi,
    /<embed|<object|<applet/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

// Validate request origin
export function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // In development, allow localhost
  const isDev = process.env.NODE_ENV === 'development';

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://www.romegasolutions.com',
    'https://romegasolutions.com',
    ...(isDev ? ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'] : []),
  ].filter(Boolean);

  if (!origin && !referer) {
    // Allow requests without origin/referer (direct access, server-side, etc.)
    return true;
  }

  if (origin) {
    // Allow if origin matches any allowed origin
    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed!));
    if (!isAllowed && isDev) {
      console.warn('[SECURITY] Origin not in allowed list (dev mode, allowing):', origin);
      return true; // In dev, be more permissive
    }
    return isAllowed;
  }

  if (referer) {
    // Allow if referer matches any allowed origin
    const isAllowed = allowedOrigins.some(allowed => referer.startsWith(allowed!));
    if (!isAllowed && isDev) {
      console.warn('[SECURITY] Referer not in allowed list (dev mode, allowing):', referer);
      return true; // In dev, be more permissive
    }
    return isAllowed;
  }

  return false;
}

// Validate file upload (if needed)
export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? allowedTypes.includes(ext) : false;
}

// Rate limit token generator (for honeypot)
export function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}

// Validate token (for honeypot)
export function isValidToken(token: string, maxAge: number = 300000): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp] = decoded.split('-');
    const age = Date.now() - parseInt(timestamp, 10);
    return age >= 0 && age <= maxAge;
  } catch {
    return false;
  }
}

// Honeypot field checker
export function checkHoneypot(honeypotValue: unknown): boolean {
  // Honeypot field should be empty
  return !honeypotValue || honeypotValue === '';
}

// Timing attack safe string comparison
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

// IP address obfuscation (for logging)
export function obfuscateIp(ip: string): string {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.xxx.xxx`;
  }
  // For IPv6, obfuscate last 4 segments
  const v6parts = ip.split(':');
  if (v6parts.length >= 4) {
    return `${v6parts.slice(0, 4).join(':')}:xxxx:xxxx:xxxx:xxxx`;
  }
  return 'xxx.xxx.xxx.xxx';
}

// Generate CSRF token
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto.getRandomValues
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Buffer.from(array).toString('base64');
}

// Validate request body size
export function isValidBodySize(body: unknown, maxSizeKb: number = 100): boolean {
  try {
    const size = JSON.stringify(body).length;
    return size <= maxSizeKb * 1024;
  } catch {
    return false;
  }
}
