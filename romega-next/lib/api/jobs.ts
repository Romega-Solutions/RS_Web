import type { Job } from '@/types/jobs';

/**
 * Fetches job listings from our secure API proxy
 * This proxies through our API route to hide the external endpoint
 * @returns Promise<Job[]> Array of job objects
 * @throws Error if the API request fails
 */
export async function fetchJobs(): Promise<Job[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 second timeout (slightly longer than server)

    // Use our internal API route instead of external URL
    // Support both absolute and relative URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const apiUrl = baseUrl ? `${baseUrl}/api/careers/jobs` : '/api/careers/jobs';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache', // Prevent browser caching issues
      },
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Handle both successful response and fallback empty array
    if (data.error) {
      console.warn('Jobs API returned error:', data.error);
      if (data.message) {
        console.warn('Additional info:', data.message);
      }
      return data.jobs || [];
    }

    const jobs: Job[] = Array.isArray(data) ? data : [];
    console.log(`[CLIENT] Successfully received ${jobs.length} jobs`);
    return jobs;
  } catch (error) {
    // More detailed error logging
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Client request timed out after 35 seconds');
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      console.error('Failed to fetch jobs:', error.message);
    } else {
      console.error('Failed to fetch jobs:', error);
    }

    // Return empty array instead of throwing to prevent UI breakage
    return [];
  }
}

/**
 * Formats a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "January 15, 2026")
 */
export function formatJobDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (_error) {
    console.error('Invalid date string:', dateString);
    return 'Date unavailable';
  }
}

/**
 * Gets the appropriate icon path based on work type
 * @param workType Job work type
 * @returns Icon path
 */
export function getWorkTypeIcon(workType: Job['work_type']): string {
  const icons: Record<Job['work_type'], string> = {
    Remote: '/images/careers/world.svg',
    'On-Site': '/images/careers/office.svg',
    Hybrid: '/images/careers/hybrid.svg',
  };
  return icons[workType] || icons.Remote;
}

/**
 * Gets the appropriate icon path based on employment type
 * @param employmentType Job employment type
 * @returns Icon path
 */
export function getEmploymentTypeIcon(
  employmentType: Job['employment_type']
): string {
  const icons: Record<Job['employment_type'], string> = {
    'Full-Time': '/images/careers/part.svg',
    'Part-Time': '/images/careers/part.svg',
    Contract: '/images/careers/contract.svg',
    Internship: '/images/careers/part.svg',
  };
  return icons[employmentType] || icons['Full-Time'];
}
