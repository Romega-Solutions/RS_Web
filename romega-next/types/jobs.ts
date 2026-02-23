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

export interface Talent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  tagline?: string;
  bio?: string;
  skills: string[];
  experience_years: number;
  experience_level?: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Principal';
  availability: 'Available' | 'Busy' | 'Part-time';
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  rate_currency?: string;
  location: string;
  timezone?: string;
  remote_only?: boolean;
  category: string;
  subcategories?: string[];
  avatar_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  gender?: 'male' | 'female' | 'neutral';
  featured?: boolean;
  verified?: boolean;
  views_count?: number;
  contact_count?: number;
  success_rate?: number;
  created_at?: string;
  updated_at?: string;
  last_active_at?: string;
  // Helper properties for display
  experience?: string; // Computed: "8 years"
  rate?: string; // Computed: "$80-120/hr"
}
