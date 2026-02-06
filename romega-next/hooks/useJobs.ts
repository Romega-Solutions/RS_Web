import { useState, useEffect, useCallback } from 'react';
import type { Job, JobsState } from '@/types/jobs';
import { fetchJobs } from '@/lib/api/jobs';

interface UseJobsReturn {
  jobs: Job[];
  state: JobsState;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing job listings
 * Automatically refetches data every 5 minutes
 * @returns Object containing jobs, loading state, error, and refetch function
 */
export function useJobs(): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [state, setState] = useState<JobsState>('loading');
  const [error, setError] = useState<Error | null>(null);

  const loadJobs = useCallback(async () => {
    try {
      setState('loading');
      setError(null);

      const data = await fetchJobs();

      if (data.length === 0) {
        setState('empty');
        setJobs([]);
      } else {
        setState('success');
        setJobs(data);
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      
      // More user-friendly error messages
      let errorMessage = 'Unable to load job listings. Please try again later.';
      
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please check your connection and try again.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (err.message.includes('CORS')) {
          errorMessage = 'Unable to connect to job service. Please try again later.';
        }
      }
      
      setState('error');
      setError(new Error(errorMessage));
      setJobs([]);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadJobs();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loadJobs]);

  return {
    jobs,
    state,
    error,
    refetch: loadJobs,
  };
}
