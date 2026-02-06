/**
 * Example: Protected Contact API Route
 * 
 * This demonstrates how to use the security features for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  withSecurity, 
  validateContactForm,
  createSecurityErrorResponse 
} from '@/lib/security/api-protection';
import { 
  sanitizeHtml, 
  sanitizeText,
  checkHoneypot 
} from '@/lib/security/validation';

/**
 * Contact form submission handler with comprehensive security
 */
async function handleContactSubmission(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // 1. Check honeypot field (bot detection)
    if (!checkHoneypot(body.website)) {
      console.warn('Bot detected via honeypot field');
      return createSecurityErrorResponse('Invalid submission', 400);
    }

    // 2. Validate contact form data
    const validation = validateContactForm(body);
    if (!validation.passed) {
      return createSecurityErrorResponse(
        validation.error!,
        validation.statusCode!
      );
    }

    // 3. Sanitize all inputs
    const sanitizedData = {
      name: sanitizeText(body.name),
      email: body.email, // Already validated
      phone: body.phone ? sanitizeText(body.phone) : undefined,
      company: body.company ? sanitizeText(body.company) : undefined,
      message: sanitizeHtml(body.message),
    };

    // 4. Process the contact form (your business logic here)
    // Example: Send email, save to database, etc.
    console.log('Processing contact form:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      // Don't log full message for privacy
    });

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 100));

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us. We will get back to you soon.',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );

  } catch (error) {
    // Don't expose internal errors
    console.error('Contact form error:', error);
    return createSecurityErrorResponse('Submission failed', 500);
  }
}

/**
 * Export with security wrapper
 * - Rate limit: 3 requests per 5 minutes per IP
 * - Automatic validation of headers, origin, etc.
 * - Injection attack prevention
 * - Bot detection
 */
export const POST = withSecurity(handleContactSubmission, {
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 3,          // Max 3 submissions per 5 minutes
});

/**
 * Disable GET requests
 */
export async function GET() {
  return createSecurityErrorResponse('Method not allowed', 405);
}
