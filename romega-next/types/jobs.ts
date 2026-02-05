export interface Job {
  job_title: string;
  location: string;
  work_type: 'Remote' | 'On-Site' | 'Hybrid';
  employment_type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  status: 'Active' | 'Inactive';
  application_url: string;
  posted_date: string;
}

export type JobsState = 'loading' | 'error' | 'empty' | 'success';
