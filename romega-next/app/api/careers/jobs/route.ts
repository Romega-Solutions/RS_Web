import { NextRequest, NextResponse } from 'next/server';
import { withSecurity } from '@/lib/security';

/**
 * Secure proxy for fetching jobs from Google Apps Script
 * This hides the actual API URL from the client and adds security measures
 */
async function handleJobsRequest(request: NextRequest) {
  try {
    // Get the API URL from environment (falls back to hardcoded if not set)
    const JOBS_API_URL = process.env.JOBS_API_URL || 
      'https://script.google.com/macros/s/AKfycbwuPSsnmiz2B2lBIbmhWcJwQ35nrPCtdR0DXjrK7dhWvGaXuoin4rs5LhkEUpWBud0f6A/exec';

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Fetch from Google Apps Script
    const response = await fetch(JOBS_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Don't cache to get fresh jobs
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const jobs = await response.json();

    // Validate the response structure
    if (!Array.isArray(jobs)) {
      throw new Error('Invalid response format from jobs API');
    }

    // Return the jobs with security headers and caching
    return NextResponse.json(jobs, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    });

  } catch (error) {
    // Log error securely (don't expose to client)
    console.error('[JOBS API ERROR]', error instanceof Error ? error.message : 'Unknown error');

    // Return generic error
    return NextResponse.json(
      {
        error: 'Unable to fetch jobs',
        jobs: [], // Return empty array as fallback
      },
      {
        status: 200, // Return 200 with empty array instead of error status
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

/**
 * GET /api/careers/jobs
 * Fetch job listings with security and rate limiting
 * Rate limit: 30 requests per minute (generous for public endpoint)
 */
export const GET = withSecurity(handleJobsRequest, {
  windowMs: 60 * 1000,  // 1 minute
  maxRequests: 30,      // 30 requests per minute per IP
});

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
