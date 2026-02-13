/**
 * Secure Contact API Route
 * Handles contact form submissions with comprehensive security
 */

import { NextRequest, NextResponse } from 'next/server';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 3; // Max 3 submissions per window

/**
 * Get client IP address
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

/**
 * Check rate limit
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitMap.delete(ip);
  }

  const current = rateLimitMap.get(ip);

  if (!current) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count++;
  return { allowed: true, remaining: MAX_REQUESTS - current.count };
}

/**
 * Sanitize text input
 */
function sanitizeText(text: string): string {
  return text
    .replace(/[<>'"]/g, '') // Remove HTML/script tags
    .trim()
    .slice(0, 500); // Limit length
}

/**
 * Validate email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Check for SQL injection patterns
 */
function hasSQLInjection(text: string): boolean {
  const sqlPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(--|#|\/\*|\*\/)/,
    /(\bEXEC\b|\bEXECUTE\b)/i,
  ];
  return sqlPatterns.some(pattern => pattern.test(text));
}

/**
 * Check for XSS patterns
 */
function hasXSS(text: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];
  return xssPatterns.some(pattern => pattern.test(text));
}

/**
 * Verify reCAPTCHA token
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('reCAPTCHA secret key not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Send email via EmailJS
 */
async function sendEmail(formData: any): Promise<boolean> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error('[EmailJS] Configuration missing:');
    console.error('[EmailJS] SERVICE_ID:', serviceId ? 'SET' : 'MISSING');
    console.error('[EmailJS] TEMPLATE_ID:', templateId ? 'SET' : 'MISSING');
    console.error('[EmailJS] PUBLIC_KEY:', publicKey ? 'SET' : 'MISSING');
    console.error('[EmailJS] PRIVATE_KEY:', privateKey ? 'SET' : 'MISSING');
    return false;
  }

  try {
    console.log('[EmailJS] Attempting to send email...');
    
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        company: formData.company || 'Not specified',
        phone: formData.phone,
        to_name: 'Romega Solutions Team',
        reply_to: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      }
    };
    
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[EmailJS] API Error:', response.status, errorText);
      return false;
    }
    
    console.log('[EmailJS] Email sent successfully');
    return true;
  } catch (error) {
    console.error('[EmailJS] Send error:', error);
    return false;
  }
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Date.now() + RATE_LIMIT_WINDOW)
          }
        }
      );
    }

    // 2. Parse request body
    const body = await request.json();

    // 3. Validate reCAPTCHA
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification required.' },
        { status: 400 }
      );
    }

    const recaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification failed.' },
        { status: 400 }
      );
    }

    // 4. Check honeypot (bot detection)
    if (body.botfield && body.botfield.trim() !== '') {
      // Silently reject bots with a fake success
      return NextResponse.json(
        { success: true, message: 'Thank you! Your message has been sent.' },
        { status: 200 }
      );
    }

    // 5. Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    for (const field of requiredFields) {
      if (!body[field] || !body[field].trim()) {
        return NextResponse.json(
          { success: false, message: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    // 6. Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // 7. Validate phone format
    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // 8. Check for SQL injection
    const textFields = [body.firstName, body.lastName, body.company, body.message];
    if (textFields.some(field => field && hasSQLInjection(field))) {
      return NextResponse.json(
        { success: false, message: 'Invalid input detected.' },
        { status: 400 }
      );
    }

    // 9. Check for XSS
    if (textFields.some(field => field && hasXSS(field))) {
      return NextResponse.json(
        { success: false, message: 'Invalid input detected.' },
        { status: 400 }
      );
    }

    // 10. Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeText(body.firstName),
      lastName: sanitizeText(body.lastName),
      email: body.email.toLowerCase().trim(),
      subject: body.subject || 'general',
      company: body.company ? sanitizeText(body.company) : '',
      phone: sanitizeText(body.phone),
      message: sanitizeText(body.message)
    };

    // 11. Send email
    const emailSent = await sendEmail(sanitizedData);

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // 12. Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining)
        }
      }
    );

  } catch (error) {
    // Log the actual error for debugging
    console.error('[Contact API] Unexpected error:', error);
    if (error instanceof Error) {
      console.error('[Contact API] Error message:', error.message);
      console.error('[Contact API] Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Disable other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
