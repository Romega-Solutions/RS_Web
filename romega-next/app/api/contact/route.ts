/**
 * Secure Contact API Route
 * Handles contact form submissions with comprehensive security
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  company: string;
  phone: string;
  message: string;
  privacyConsent: boolean;
  privacyPolicyVersion: string;
  futureOpportunitiesConsent: boolean;
  clientMatchingConsent: boolean;
  publicShowcaseConsent: boolean;
}

/**
 * Send email via Resend
 */
async function sendEmail(formData: ContactFormData): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'info@romega-solutions.com';

  if (!resendApiKey) {
    console.error('[Resend] API key missing');
    return false;
  }

  try {
    console.log('[Resend] Initializing...');

    const resend = new Resend(resendApiKey);

    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    console.log('[Resend] Sending email...');

    await resend.emails.send({
      from: 'Romega Contact Form <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: formData.email,
      subject: `New Contact: ${formData.subject}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission - Romega Solutions</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F1F5F9;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(18, 91, 161, 0.08);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #125BA1 0%, #5381AC 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: rgba(255, 255, 255, 0.12); padding: 20px 30px; border-radius: 16px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.2);">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; font-family: 'Source Sans 3', sans-serif;">ROMEGA SOLUTIONS</h1>
                <div style="height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); margin: 12px 0;"></div>
                <p style="color: #E8F3FC; margin: 0; font-size: 15px; font-weight: 500; font-family: 'Source Sans 3', sans-serif;">New Contact Form Submission</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background: linear-gradient(90deg, #FEF3C7 0%, #FDE68A 100%); padding: 15px 30px; text-align: center; border-bottom: 2px solid #F59E0B;">
              <p style="margin: 0; color: #92400E; font-size: 14px; font-weight: 600; font-family: 'Source Sans 3', sans-serif;"><strong>Priority:</strong> New customer inquiry - Please respond within 24 hours</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px 20px;">
              <h2 style="color: #125BA1; font-size: 20px; font-weight: 700; margin: 0 0 12px 0; font-family: 'Source Sans 3', sans-serif;">Hello Romega Team,</h2>
              <p style="color: #64748B; font-size: 16px; line-height: 1.7; margin: 0; font-family: 'Source Sans 3', sans-serif;">You've received a new message from your website contact form:</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%); border: 2px solid #DBEAFE; border-radius: 16px; overflow: hidden;">
                
                <!-- Contact Information Header -->
                <tr>
                  <td style="padding: 30px; border-bottom: 2px solid #DBEAFE;">
                    <h3 style="color: #125BA1; font-size: 18px; font-weight: 700; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Source Sans 3', sans-serif;">Contact Details</h3>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0;">
                          <div style="background-color: #ffffff; padding: 15px 20px; border-radius: 10px; border-left: 4px solid #125BA1; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <div style="color: #64748B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: 'Source Sans 3', sans-serif;">Full Name</div>
                            <div style="color: #125BA1; font-size: 18px; font-weight: 700; font-family: 'Source Sans 3', sans-serif;">${formData.firstName} ${formData.lastName}</div>
                          </div>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <div style="background-color: #ffffff; padding: 15px 20px; border-radius: 10px; border-left: 4px solid #3B82F6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <div style="color: #64748B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: 'Source Sans 3', sans-serif;">Email Address</div>
                            <div style="color: #1E293B; font-size: 16px; font-weight: 600; font-family: 'Source Sans 3', sans-serif;">
                              <a href="mailto:${formData.email}" style="color: #3B82F6; text-decoration: none; font-family: 'Source Sans 3', sans-serif;">${formData.email}</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <div style="background-color: #ffffff; padding: 15px 20px; border-radius: 10px; border-left: 4px solid #10B981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <div style="color: #64748B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: 'Source Sans 3', sans-serif;">Phone Number</div>
                            <div style="color: #1E293B; font-size: 16px; font-weight: 600; font-family: 'Source Sans 3', sans-serif;">
                              <a href="tel:${formData.phone}" style="color: #10B981; text-decoration: none; font-family: 'Source Sans 3', sans-serif;">${formData.phone}</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <div style="background-color: #ffffff; padding: 15px 20px; border-radius: 10px; border-left: 4px solid #8B5CF6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <div style="color: #64748B; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-family: 'Source Sans 3', sans-serif;">Company</div>
                            <div style="color: #1E293B; font-size: 16px; font-weight: 600; font-family: 'Source Sans 3', sans-serif;">${formData.company || 'Not specified'}</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Section -->
                <tr>
                  <td style="padding: 30px;">
                    <div style="background-color: #ffffff; border-left: 4px solid #125BA1; padding: 18px 24px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                      <div style="color: #125BA1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: 'Source Sans 3', sans-serif;">Subject</div>
                      <div style="color: #1E293B; font-size: 18px; font-weight: 700; line-height: 1.4; font-family: 'Source Sans 3', sans-serif;">${formData.subject}</div>
                    </div>

                    <div style="background-color: #ffffff; border-left: 4px solid #5381AC; padding: 18px 24px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                      <div style="color: #5381AC; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: 'Source Sans 3', sans-serif;">Received On</div>
                      <div style="color: #475569; font-size: 14px; font-weight: 600; font-family: 'Source Sans 3', sans-serif;">${timestamp}</div>
                    </div>

                    <div style="background-color: #ffffff; border-left: 4px solid #0EA5E9; padding: 18px 24px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                      <div style="color: #0C4A6E; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: 'Source Sans 3', sans-serif;">Privacy Consent Metadata</div>
                      <div style="color: #1E293B; font-size: 14px; line-height: 1.6; font-family: 'Source Sans 3', sans-serif;">
                        <div><strong>Required Processing Consent:</strong> ${formData.privacyConsent ? 'Yes' : 'No'}</div>
                        <div><strong>Policy Version:</strong> ${formData.privacyPolicyVersion}</div>
                        <div><strong>Future Opportunities:</strong> ${formData.futureOpportunitiesConsent ? 'Yes' : 'No'}</div>
                        <div><strong>Client Matching:</strong> ${formData.clientMatchingConsent ? 'Yes' : 'No'}</div>
                        <div><strong>Public Showcase Interest:</strong> ${formData.publicShowcaseConsent ? 'Yes' : 'No'}</div>
                      </div>
                    </div>

                    <div style="background-color: #ffffff; border: 3px solid #DBEAFE; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                      <div style="color: #125BA1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 2px solid #DBEAFE; font-family: 'Source Sans 3', sans-serif;">Message Content</div>
                      <div style="color: #1E293B; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 400; font-family: 'Source Sans 3', sans-serif;">${formData.message}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 10px 30px 40px; text-align: center;">
              <a href="mailto:${formData.email}?subject=Re: ${formData.subject}" style="display: inline-block; background: linear-gradient(135deg, #125BA1 0%, #5381AC 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 10px; font-family: 'Source Sans 3', sans-serif;">Reply via Email</a>
              <a href="https://meetings.hubspot.com/robbie-galoso" style="display: inline-block; background-color: #ffffff; color: #125BA1; text-decoration: none; padding: 16px 32px; border: 3px solid #125BA1; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 10px; font-family: 'Source Sans 3', sans-serif;">Schedule Meeting</a>
            </td>
          </tr>

          <tr>
            <td style="background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%); padding: 35px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
              <div style="color: #125BA1; font-weight: 800; font-size: 18px; margin-bottom: 8px; font-family: 'Source Sans 3', sans-serif;">ROMEGA SOLUTIONS</div>
              <div style="color: #64748B; font-size: 14px; line-height: 1.6; margin-bottom: 15px; font-family: 'Source Sans 3', sans-serif;">222 Pacific Coast Hwy, #10, El Segundo, CA 90245</div>
              <div style="color: #94A3B8; font-size: 12px; font-family: 'Source Sans 3', sans-serif;">© 2026 Romega Solutions. All rights reserved.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    console.log('[Resend] Email sent successfully');
    return true;
  } catch (error) {
    console.error('[Resend] Send error:', error);
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

    // 6. Validate required privacy consent
    if (body.privacyConsent !== true) {
      return NextResponse.json(
        { success: false, message: 'Privacy consent is required.' },
        { status: 400 }
      );
    }

    // 7. Validate policy version marker
    if (typeof body.privacyPolicyVersion !== 'string' || body.privacyPolicyVersion.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Privacy policy version is required.' },
        { status: 400 }
      );
    }

    // 8. Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // 9. Validate phone format
    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number.' },
        { status: 400 }
      );
    }

    // 10. Check for SQL injection
    const textFields = [body.firstName, body.lastName, body.company, body.message];
    if (textFields.some(field => field && hasSQLInjection(field))) {
      return NextResponse.json(
        { success: false, message: 'Invalid input detected.' },
        { status: 400 }
      );
    }

    // 11. Check for XSS
    if (textFields.some(field => field && hasXSS(field))) {
      return NextResponse.json(
        { success: false, message: 'Invalid input detected.' },
        { status: 400 }
      );
    }

    // 12. Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeText(body.firstName),
      lastName: sanitizeText(body.lastName),
      email: body.email.toLowerCase().trim(),
      subject: body.subject || 'general',
      company: body.company ? sanitizeText(body.company) : '',
      phone: sanitizeText(body.phone),
      message: sanitizeText(body.message),
      privacyConsent: true,
      privacyPolicyVersion: sanitizeText(body.privacyPolicyVersion),
      futureOpportunitiesConsent: Boolean(body.futureOpportunitiesConsent),
      clientMatchingConsent: Boolean(body.clientMatchingConsent),
      publicShowcaseConsent: Boolean(body.publicShowcaseConsent),
    };

    // 13. Send email
    const emailSent = await sendEmail(sanitizedData);

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // 14. Success response
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
