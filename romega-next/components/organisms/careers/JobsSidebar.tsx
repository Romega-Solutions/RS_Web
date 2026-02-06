'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useJobs } from '@/hooks/useJobs';
import JobCard from './JobCard';

interface JobsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JobsSidebar({ isOpen, onClose }: JobsSidebarProps) {
  const { jobs, state, error, refetch } = useJobs();

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
      // Refetch jobs when sidebar opens
      refetch();
    } else {
      // Re-enable body scroll when sidebar is closed
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, refetch]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sidebar-title"
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[var(--rs-neutral-100)] shadow-xl transition-transform duration-300 ease-in-out z-[10000] translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#e1f0f5]">
          <div>
            <h2
              id="sidebar-title"
              className="text-lg md:text-[28px] font-bold text-[var(--rs-primary-600)] font-merriweather"
            >
              Current Roles Opened
            </h2>
            <p className="text-sm md:text-[18px] text-[var(--rs-neutral-700)] mt-1">
              Company review time is typically 1 week
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close job listings sidebar"
          >
            <Image
              src="/images/careers/close.svg"
              alt=""
              width={15}
              height={15}
              className="h-[15px] w-[15px]"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Job Listings Content */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4">
          {state === 'loading' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--rs-primary-600)] mx-auto mb-4" />
              <p className="text-[var(--rs-neutral-600)]">
                Loading current opportunities...
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 opacity-60 flex items-center justify-center">
                <Image
                  src="/images/careers/notification.svg"
                  alt="Error icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <p className="text-[var(--rs-primary-600)] text-lg font-medium mb-1">
                Unable to load current opportunities
              </p>
              <p className="text-[var(--rs-primary-400)] text-base mb-4">
                {error?.message || 'Please try again later'}
              </p>
              <button
                onClick={() => refetch()}
                className="bg-[var(--rs-primary-500)] text-[var(--rs-primary-100)] px-4 py-2 rounded-lg hover:bg-[var(--rs-primary-600)] transition"
              >
                Try Again
              </button>
            </div>
          )}

          {state === 'empty' && (
            <div className="text-center py-12 mt-6">
              <div className="w-16 h-16 mx-auto mb-4 opacity-60 flex items-center justify-center">
                <Image
                  src="/images/careers/notification.svg"
                  alt="Bell icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <p className="text-[var(--rs-primary-600)] text-lg font-medium mb-1">
                We&apos;re always growing :)
              </p>
              <p className="text-[var(--rs-primary-400)] text-base">
                new opportunities coming soon
              </p>
            </div>
          )}

          {state === 'success' && (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <JobCard key={`${job.job_title}-${index}`} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center w-full p-0 pb-6 pt-2 bg-transparent">
          <button
            className="w-[95%] max-w-[370px] h-[56px] bg-[var(--rs-primary-500)] text-[var(--rs-primary-100)] text-lg font-semibold rounded-xl shadow hover:bg-[var(--rs-primary-600)] transition-all duration-200 border-2 border-[var(--rs-primary-600)]"
            onClick={() =>
              window.open(
                'https://www.linkedin.com/company/romega-solutions/jobs/',
                '_blank'
              )
            }
            aria-label="View job listings on our LinkedIn company page"
          >
            View Jobs in our LinkedIn Page
          </button>
        </div>
      </div>
    </div>
  );
}
