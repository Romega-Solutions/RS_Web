"use client";

import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';
import styles from './JobListings.module.css';
import { fetchJobs } from '@/lib/api/jobs';
import type { Job } from '@/types/jobs';

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadJobs();

    // Refresh jobs every 5 minutes
    const interval = setInterval(() => {
      loadJobs();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError(true);
      setJobs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const categories = [
    { id: 'all', label: 'All Positions' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'sales', label: 'Sales & Marketing' },
    { id: 'operations', label: 'Operations' },
    { id: 'hr', label: 'HR & Talent' },
  ];

  const filteredJobs = selectedCategory === 'all'
    ? jobs
    : jobs.filter(job => {
      const title = job.job_title.toLowerCase();
      switch (selectedCategory) {
        case 'engineering':
          return title.includes('engineer') || title.includes('developer') || title.includes('technical');
        case 'sales':
          return title.includes('sales') || title.includes('marketing') || title.includes('business');
        case 'operations':
          return title.includes('operations') || title.includes('manager') || title.includes('coordinator');
        case 'hr':
          return title.includes('hr') || title.includes('talent') || title.includes('recruiter');
        default:
          return true;
      }
    });

  return (
    <section className={styles['job-listings']} aria-labelledby="jobs-heading">
      <div className={styles['job-listings__container']}>
        {/* Header */}
        <div className={styles['job-listings__header']}>
          <p className={styles['job-listings__subtitle']}>
            Explore our current opportunities and find your perfect role
          </p>
        </div>

        {/* Category Filters */}
        <div className={styles['job-listings__filters']} role="tablist" aria-label="Job categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${styles['job-listings__filter']} ${selectedCategory === category.id ? styles['job-listings__filter--active'] : ''
                }`}
              role="tab"
              aria-selected={selectedCategory === category.id}
              aria-controls="jobs-list"
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div id="jobs-list" className={styles['job-listings__list']} role="tabpanel">
          {loading && (
            <div className={styles['job-listings__loading']}>
              <div className={styles['job-listings__spinner']} aria-hidden="true"></div>
              <p>Loading current opportunities...</p>
            </div>
          )}

          {error && (
            <div className={styles['job-listings__error']}>
              <p className={styles['job-listings__error-title']}>Unable to load current opportunities</p>
              <p className={styles['job-listings__error-text']}>Please try again later or visit our LinkedIn page</p>
              <a
                href="https://www.linkedin.com/company/romega-solutions/jobs/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles['job-listings__error-link']}
              >
                View Jobs on LinkedIn
              </a>
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
            <div className={styles['job-listings__empty']}>
              <p className={styles['job-listings__empty-title']}>No positions available in this category</p>
              <p className={styles['job-listings__empty-text']}>Check back soon for new opportunities!</p>
            </div>
          )}

          {!loading && !error && filteredJobs.length > 0 && (
            <div className={styles['job-listings__grid']}>
              {filteredJobs.map((job, index) => {
                const isActive = job.status === 'Active';

                return (
                  <div
                    key={index}
                    className={`${styles['job-listings__card']} ${!isActive ? styles['job-listings__card--inactive'] : ''
                      }`}
                  >
                    {/* Card Header */}
                    <div className={styles['job-listings__card-header']}>
                      <h3 className={styles['job-listings__card-title']}>
                        {isActive ? (
                          <a
                            href={job.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles['job-listings__card-link']}
                          >
                            {job.job_title}
                            <ExternalLink className={styles['job-listings__card-icon']} aria-hidden="true" />
                          </a>
                        ) : (
                          job.job_title
                        )}
                      </h3>
                      <span className={styles['job-listings__card-date']}>
                        <Clock size={12} aria-hidden="true" />
                        {formatDate(job.posted_date)}
                      </span>
                    </div>

                    {/* Card Details */}
                    <div className={styles['job-listings__card-details']}>
                      <div className={styles['job-listings__card-badge']}>
                        <MapPin size={12} aria-hidden="true" />
                        <span>{job.location}</span>
                      </div>
                      <div className={styles['job-listings__card-badge']}>
                        <Briefcase size={12} aria-hidden="true" />
                        <span>{job.work_type}</span>
                      </div>
                      <div className={styles['job-listings__card-badge']}>
                        <Clock size={12} aria-hidden="true" />
                        <span>{job.employment_type}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className={styles['job-listings__card-actions']}>
                      {isActive ? (
                        <a
                          href={job.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles['job-listings__card-button']}
                        >
                          See Details in LinkedIn
                          <ExternalLink size={16} aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          className={styles['job-listings__card-button--disabled']}
                          disabled
                        >
                          No longer accepting applications
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className={styles['job-listings__footer']}>
            <p className={styles['job-listings__footer-text']}>
              Don&apos;t see the right role? We&apos;re always looking for talented individuals.
            </p>
            <a
              href="https://www.linkedin.com/company/romega-solutions/jobs/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['job-listings__footer-button']}
            >
              View All Jobs on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
