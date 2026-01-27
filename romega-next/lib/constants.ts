/**
 * Application-wide constants
 */

// Site Metadata
export const SITE_NAME = 'Romega Solutions'
export const SITE_DESCRIPTION = 
  'Romega Solutions provides enterprise software development, cloud solutions, and IT consulting services.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://romega.solutions'

// Contact Information
export const CONTACT_EMAIL = 'info@romega.solutions'
export const CONTACT_PHONE = '+1 (555) 123-4567'

// Social Media Links
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/romega-solutions',
  twitter: 'https://twitter.com/romegasolutions',
  github: 'https://github.com/romega-solutions',
}

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CAREERS: '/careers',
  RESOURCES: '/resources',
  CONTACT: '/contact',
  BLOG: '/blog',
} as const

// API Routes
export const API_ROUTES = {
  CONTACT: '/api/contact',
  CAREERS: '/api/careers',
  NEWSLETTER: '/api/newsletter',
} as const

// Pagination
export const ITEMS_PER_PAGE = 12
export const BLOG_POSTS_PER_PAGE = 9
export const JOBS_PER_PAGE = 10

// Form Validation
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
  PHONE_PATTERN: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
}

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
}

// Cache Durations (in seconds)
export const CACHE_DURATIONS = {
  STATIC_PAGE: 60 * 60, // 1 hour
  API_RESPONSE: 60 * 5, // 5 minutes
  BLOG_POST: 60 * 60 * 24, // 24 hours
}

// Service Categories
export const SERVICE_CATEGORIES = [
  'Custom Software Development',
  'Cloud Solutions',
  'DevOps & Infrastructure',
  'AI & Machine Learning',
  'Mobile Development',
  'UI/UX Design',
] as const

// Job Types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
] as const

// Job Locations
export const JOB_LOCATIONS = [
  'Remote',
  'Hybrid',
  'On-site',
] as const

// Testimonial Rating
export const MAX_RATING = 5

// Animation Durations (in milliseconds)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
}

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const
