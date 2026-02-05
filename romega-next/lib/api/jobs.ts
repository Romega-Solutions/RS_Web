import type { Job } from '@/types/jobs';

const JOBS_API_URL =
  'https://script.google.com/macros/s/AKfycbwuPSsnmiz2B2lBIbmhWcJwQ35nrPCtdR0DXjrK7dhWvGaXuoin4rs5LhkEUpWBud0f6A/exec';

/**
 * Fetches job listings from the Google Apps Script API
 * @returns Promise<Job[]> Array of job objects
 * @throws Error if the API request fails
 */
export async function fetchJobs(): Promise<Job[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(JOBS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const jobs: Job[] = await response.json();
    return jobs;
  } catch (error) {
    // More detailed error logging
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out after 10 seconds');
        throw new Error('Request timed out. Please try again later.');
      }
      console.error('Failed to fetch jobs:', error.message);
    } else {
      console.error('Failed to fetch jobs:', error);
    }
    
    // Re-throw for handling in the hook
    throw error;
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
  } catch (error) {
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
