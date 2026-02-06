import Image from 'next/image';
import Link from 'next/link';
import type { Job } from '@/types/jobs';
import {
  formatJobDate,
  getWorkTypeIcon,
  getEmploymentTypeIcon,
} from '@/lib/api/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const isActive = job.status === 'Active';

  return (
    <div
      className={`rounded-lg bg-[var(--rs-neutral-100)] hover:shadow-sm transition-shadow ${
        isActive ? '' : 'opacity-70'
      }`}
    >
      {/* Job Header */}
      <div className="flex items-start justify-between mb-3">
        {isActive ? (
          <Link
            href={job.application_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${job.job_title} position`}
          >
            <h3 className="text-base font-semibold text-[18px] font-merriweather text-[var(--rs-primary-700)] hover:underline cursor-pointer flex items-center gap-2">
              {job.job_title}
              <Image
                src="/images/careers/link.svg"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
                aria-hidden="true"
              />
            </h3>
          </Link>
        ) : (
          <h3 className="text-base font-semibold text-[18px] font-merriweather text-[var(--rs-primary-700)] flex items-center gap-2">
            {job.job_title}
            <Image
              src="/images/careers/link.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            />
          </h3>
        )}
        <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded whitespace-nowrap">
          <Image
            src="/images/careers/envelope.svg"
            alt=""
            width={12}
            height={12}
            className="h-[12px] w-[12px] inline-block mr-1"
            aria-hidden="true"
          />
          {formatJobDate(job.posted_date)}
        </span>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-x-2 gap-y-2 mb-4 text-[14px] text-[var(--rs-neutral-600)]">
        <div className="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
          <Image
            src="/images/careers/location.svg"
            alt=""
            width={12}
            height={12}
            className="w-[12px] h-[12px]"
            aria-hidden="true"
          />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
          <Image
            src={getWorkTypeIcon(job.work_type)}
            alt=""
            width={12}
            height={12}
            className="w-[12px] h-[12px]"
            aria-hidden="true"
          />
          <span>{job.work_type}</span>
        </div>
        <div className="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
          <Image
            src={getEmploymentTypeIcon(job.employment_type)}
            alt=""
            width={12}
            height={12}
            className="w-[12px] h-[12px]"
            aria-hidden="true"
          />
          <span>{job.employment_type}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isActive ? (
          <Link
            href={job.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="bg-[var(--rs-primary-500)] justify-center w-full h-[40px] text-[var(--rs-primary-100)] px-2 py-2 rounded-[6px] text-[15px] font-medium hover:bg-[#005885] transition flex items-center gap-2 border border-[var(--rs-primary-600)]">
              <Image
                src="/images/careers/linkedin.svg"
                alt=""
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
              />
              See Details in LinkedIn
            </button>
          </Link>
        ) : (
          <button
            className="border border-[var(--rs-primary-400)] bg-white text-[var(--rs-primary-600)] px-3 py-2 rounded text-[15px] font-medium flex items-center gap-2 w-full justify-center opacity-80 cursor-not-allowed"
            disabled
          >
            <Image
              src="/images/careers/lock.svg"
              alt="Lock Icon"
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
            No longer accepting applications
          </button>
        )}
      </div>

      <hr className="border-1 border-b border-[var(--rs-neutral-400)] my-4" />
    </div>
  );
}
