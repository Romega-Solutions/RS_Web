/**
 * Example: Protected Careers API Route
 * 
 * This demonstrates job listings API with security
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  withSecurity,
  createSecurityErrorResponse 
} from '@/lib/security/api-protection';
import { sanitizeText } from '@/lib/security/validation';

/**
 * Get job listings with security filters
 */
async function handleJobListings(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    
    // 1. Sanitize query parameters
    const department = searchParams.get('department');
    const location = searchParams.get('location');
    const type = searchParams.get('type');

    const filters = {
      department: department ? sanitizeText(department) : undefined,
      location: location ? sanitizeText(location) : undefined,
      type: type ? sanitizeText(type) : undefined,
    };

    // 2. Fetch jobs (example data)
    const jobs = [
      {
        id: 'job-1',
        title: 'Senior HR Manager',
        department: 'Human Resources',
        location: 'Remote',
        type: 'Full-time',
        description: 'Lead our HR team...',
      },
      // ... more jobs
    ];

    // 3. Apply filters
    let filteredJobs = jobs;
    if (filters.department) {
      filteredJobs = filteredJobs.filter(
        j => j.department.toLowerCase() === filters.department!.toLowerCase()
      );
    }
    if (filters.location) {
      filteredJobs = filteredJobs.filter(
        j => j.location.toLowerCase() === filters.location!.toLowerCase()
      );
    }
    if (filters.type) {
      filteredJobs = filteredJobs.filter(
        j => j.type.toLowerCase() === filters.type!.toLowerCase()
      );
    }

    // 4. Return sanitized response
    return NextResponse.json(
      {
        success: true,
        count: filteredJobs.length,
        jobs: filteredJobs,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );

  } catch (error) {
    console.error('Job listings error:', error);
    return createSecurityErrorResponse('Failed to fetch jobs', 500);
  }
}

/**
 * Export with security wrapper
 * - Rate limit: 30 requests per minute (more lenient for GET)
 * - Header validation
 * - Query parameter sanitization
 */
export const GET = withSecurity(handleJobListings, {
  windowMs: 60 * 1000,  // 1 minute
  maxRequests: 30,      // Max 30 requests per minute
});

/**
 * Handle job applications
 */
async function handleJobApplication(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate required fields
    const { jobId, applicantName, applicantEmail, resume } = body;
    
    if (!jobId || !applicantName || !applicantEmail) {
      return createSecurityErrorResponse('Missing required fields', 400);
    }

    // 2. Sanitize inputs
    const sanitizedData = {
      jobId: sanitizeText(jobId),
      applicantName: sanitizeText(applicantName),
      applicantEmail: applicantEmail, // Already validated by middleware
      resume: resume, // Handle file separately
    };

    // 3. Process application
    console.log('Processing job application:', {
      jobId: sanitizedData.jobId,
      name: sanitizedData.applicantName,
    });

    // 4. Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicationId: 'app-' + Date.now(),
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );

  } catch (error) {
    console.error('Job application error:', error);
    return createSecurityErrorResponse('Application failed', 500);
  }
}

/**
 * Export POST with stricter rate limiting
 */
export const POST = withSecurity(handleJobApplication, {
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 2,           // Max 2 applications per 10 minutes
});
