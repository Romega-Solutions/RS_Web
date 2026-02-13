import { NextResponse } from 'next/server';

/**
 * Debug endpoint to check environment variable configuration
 * DELETE THIS FILE AFTER DEBUGGING IS COMPLETE
 */
export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env_check: {
      EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID ? '✓ SET' : '✗ MISSING',
      EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID ? '✓ SET' : '✗ MISSING',
      EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? '✓ SET' : '✗ MISSING',
      EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY ? '✓ SET' : '✗ MISSING',
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY ? '✓ SET' : '✗ MISSING',
    },
    // Show first/last 3 characters to verify correct key (without exposing full key)
    partial_values: {
      EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID 
        ? `${process.env.EMAILJS_SERVICE_ID.substring(0, 3)}...${process.env.EMAILJS_SERVICE_ID.slice(-3)}`
        : 'N/A',
      EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY
        ? `${process.env.EMAILJS_PUBLIC_KEY.substring(0, 3)}...${process.env.EMAILJS_PUBLIC_KEY.slice(-3)}`
        : 'N/A',
    }
  });
}
