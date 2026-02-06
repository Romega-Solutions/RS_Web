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

    // Retry configuration
    const MAX_RETRIES = 2;
    const TIMEOUT_MS = 30000; // 30 second timeout (Google Apps Script can be slow)
    let lastError: Error | null = null;

    // Retry logic for flaky external APIs
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        console.log(`[JOBS API] Attempt ${attempt + 1}/${MAX_RETRIES + 1} to fetch jobs`);

        // Fetch from Google Apps Script
        const response = await fetch(JOBS_API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Romega-Next-App/1.0',
          },
          // Use Next.js cache with revalidation instead of no-store
          next: { revalidate: 300 }, // Cache for 5 minutes
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

        console.log(`[JOBS API] Successfully fetched ${jobs.length} jobs`);

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
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // If it's an abort error (timeout), log it
        if (lastError.name === 'AbortError') {
          console.warn(`[JOBS API] Attempt ${attempt + 1} timed out after ${TIMEOUT_MS}ms`);
        } else {
          console.warn(`[JOBS API] Attempt ${attempt + 1} failed:`, lastError.message);
        }

        // If this was the last retry, throw the error
        if (attempt === MAX_RETRIES) {
          throw lastError;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError || new Error('All retry attempts failed');

  } catch (error) {
    // Log error securely (don't expose to client)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[JOBS API ERROR] All retries failed:', errorMessage);

    // Determine if it's a timeout error
    const isTimeout = error instanceof Error && error.name === 'AbortError';

    // Return graceful fallback with empty array
    return NextResponse.json(
      {
        error: isTimeout ? 'Request timed out. Our job listings are temporarily unavailable.' : 'Unable to fetch jobs at this time.',
        jobs: [], // Return empty array as fallback
        message: 'Please try again in a few moments.',
      },
      {
        status: 200, // Return 200 with empty array for graceful degradation
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
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
