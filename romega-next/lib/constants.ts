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
} as const

// Team Member Data
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string; // Display role for sidebar
  location: string;
  image: string;
  bio: string | string[];
  expertise: string[]; // Renamed to qualifications in sidebar
  achievements: string[]; // Renamed to interests in sidebar
  linkedin?: string;
}

// Testimonial Data
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  school: string;
  image: string;
  rating: number;
  quote: string;
  linkedin?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mich-dayday',
    name: 'Mich Dayday',
    title: 'Graphic Designer',
    role: 'Graphic Designer',
    location: 'San Luis',
    image: '/images/about/IC/IC_Graphics_Designer_Mich.png',
    bio: [
      'Registered & Licensed Architect',
      'Graphic Designer, Branding & Systems Specialist',
      "A mom and creative, deeply rooted in God's grace",
    ],
    expertise: [
      'Registered and Licensed Architect - PRC Philippines',
      'Licensed Financial Consultant by Insurance Commission',
      'Certified Investment Advisor',
    ],
    achievements: [
      "Exploring God's creation through hiking and travel (54 mountains, including Mt. Apo)",
      'Running Chosen Crafts, a small printing business',
      "Serving in church's multimedia ministry",
      'K-pop concerts and K-dramas',
    ],
    linkedin: 'https://www.linkedin.com/in/ar-michelledayday/',
  },
  {
    id: 'eliza-mae-perez',
    name: 'Eliza Mae Perez',
    title: 'Bookkeeper',
    role: 'Bookkeeper',
    location: 'San Luis',
    image: '/images/about/IC/IC_Bookkeeper_Eliza.png',
    bio: 'Detail-oriented bookkeeper focused on maintaining accurate financial records and ensuring compliance with accounting standards.',
    expertise: [
      'Financial Record Keeping',
      'Accounts Reconciliation',
      'Compliance Management',
    ],
    achievements: [
      'Financial Analysis',
      'Process Improvement',
      'Accounting Software',
    ],
    linkedin: 'https://www.linkedin.com/in/edmayelle-villavicencio-alforja-8a1580199/',
  },
  {
    id: 'audrey-maureen-molina',
    name: 'Audrey Maureen Molina',
    title: 'Marketing Lead & Recruiter',
    role: 'Marketing Lead/HR Business Partner',
    location: 'San Luis',
    image: '/images/about/IC/IC_Marketing_Audrey.png',
    bio: [
      'Blending strategy with heart as Marketing Lead and HRBP',
      'Passionate about growing teams and telling stories that stick',
      'Matcha-fueled, wellness-driven, and always chasing the next adrenaline rush',
    ],
    expertise: [
      'Magna Cum Laude, BS in Legal Management at DLSU Manila',
      'Certified Human Resource Associate',
      'Certified Six Sigma Yellow Belt',
    ],
    achievements: [
      'Wellness and fitness',
      'Matcha runs',
      'Travel and adventure sports',
      'Hosting and reading',
    ],
    linkedin: 'https://www.linkedin.com/in/audreympm/',
  },
  {
    id: 'robbie-galoso',
    name: 'Robbie Galoso',
    title: 'Founder and CEO',
    role: 'Founder and CEO',
    location: 'San Luis',
    image: '/images/about/IC/IC_CEO_Robbie.png',
    bio: 'Visionary leader driving company growth and innovation. Focused on building sustainable business practices and fostering a culture of excellence.',
    expertise: [
      'Strategic Leadership',
      'Business Development',
      'Organizational Growth',
    ],
    achievements: ['Innovation', 'Entrepreneurship', 'Team Building'],
    linkedin: 'https://www.linkedin.com/in/robbie-galoso-9913389/',
  },
  {
    id: 'cherry-ann-reyes',
    name: 'Cherry Ann Reyes',
    title: 'Chief of Staff',
    role: 'Chief of Staff',
    location: 'San Luis',
    image: '/images/about/IC/IC_HR_Cherry.png',
    bio: 'Experienced HR consultant specializing in strategic human resource management. Focused on building effective HR systems and developing talent acquisition strategies.',
    expertise: [
      'Certified HR Professional (CHRP)',
      'Strategic HR Management',
      'Talent Development',
    ],
    achievements: [
      'HR Best Practices',
      'Leadership Development',
      'Organizational Culture',
    ],
    linkedin: 'https://www.linkedin.com/in/cherry-ann-reyes-chrp-9b978061/',
  },
  {
    id: 'christine-valencia',
    name: 'Christine Valencia',
    title: 'HR Business Partner & Recruiter',
    role: 'HR Business Partner & Recruiter',
    location: 'San Luis',
    image: '/images/about/IC/IC_Recruitment_Christine.jpg',
    bio: 'Skilled HR business partner and recruiter focused on strategic talent acquisition and building strong partnerships with business leaders.',
    expertise: [
      'HR Business Partnering',
      'Strategic Recruitment',
      'Stakeholder Management',
    ],
    achievements: [
      'Talent Strategy',
      'Employer Branding',
      'Workforce Planning',
    ],
    linkedin: 'https://www.linkedin.com/',
  },
  {
    id: 'ken-patrick-garcia',
    name: 'Ken Patrick Garcia',
    title: 'Full Stack AI Engineer',
    role: 'Full Stack AI Engineer',
    location: 'San Luis',
    image: '/images/about/IC/IC_Web_Developer_Ken.jpg',
    bio: 'Full-Stack Developer specializing in modern web and mobile applications with AI/ML integration. Award-winning developer focused on building scalable, intelligent solutions.',
    expertise: [
      'Full-Stack Development (React, Next.js, Node.js)',
      'Mobile Development (React Native, Flutter)',
      'AI/ML Integration & Cloud Computing',
      'DataCamp Data Engineering Scholar',
    ],
    achievements: [
      'AI-Powered Solutions',
      'IoT Systems',
      'Scalable Architecture',
    ],
    linkedin: 'https://www.linkedin.com/',
  },
  {
    id: 'duane-vargas',
    name: 'Duane Vargas',
    title: 'HR Business Partner & Recruiter',
    role: 'HR Business Partner & Recruiter',
    location: 'San Luis',
    image: '/images/about/IC/IC_Recruiter_Duane.jpg',
    bio: 'Experienced HR business partner and recruiter specializing in identifying top talent and aligning HR strategies with business objectives.',
    expertise: [
      'Talent Acquisition',
      'HR Business Partnering',
      'Recruitment Strategy',
    ],
    achievements: [
      'Strategic HR',
      'Talent Development',
      'Organizational Development',
    ],
    linkedin: 'https://www.linkedin.com/',
  },
  {
    id: 'mark-siazon',
    name: 'Mark Siazon',
    title: 'Product Designer',
    role: 'Product Designer',
    location: 'San Luis',
    image: '/images/about/IC/IC_UI_UX_Designer_Mark.png',
    bio: [
      'Shaping ideas into experiences at Romega Solutions',
      'Blending thinking and craft in every design',
      'Creating results that make an impact',
    ],
    expertise: [
      'Google UX Design Professional Certificate',
      'Skilled in Figma, Prototyping & Design Systems',
      'BS in Computer Science Major in App Development',
    ],
    achievements: [
      'Reading books and learning new things',
      'Coding and tinkering stuff',
      'Movies and gaming',
    ],
    linkedin: 'https://www.linkedin.com/in/mark-siazon/',
  },
  {
    id: 'rich-salvador',
    name: 'Rich Salvador',
    title: 'Account Executive & Associate',
    role: 'Account Executive/Associate',
    location: 'San Luis',
    image: '/images/about/IC/IC_Account_Executive_Associate_Rich.png',
    bio: [
      'Outstanding account executive driving company sales and growth',
      'Handles sales training and development programs',
      'A journal and book enthusiast on the sidelines',
    ],
    expertise: [
      'Certified Six Sigma Yellow Belt Professional (CSSYB)',
      'Account Management & Sales Excellence',
      'Sales Training & Development',
    ],
    achievements: [
      'Personal journaling',
      'Reading stories and novels',
      'Watching documentaries',
    ],
    linkedin: 'https://www.linkedin.com/in/ricardo-salvador-cssyb-5463a9321/',
  },
];

// Testimonials Data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rob-belarmino',
    name: 'Rob Belarmino',
    title: 'Former Intern',
    school: 'University of the Philippines',
    image: '/images/about/Rob.webp',
    rating: 4,
    quote: 'As a freshman, my first internship at Romega turned daunting expectations into a supportive, skill-building experience that grew my confidence and gratitude.',
    linkedin: 'https://www.linkedin.com/in/rob-belarmino/',
  },
  {
    id: 'gerard-palma',
    name: 'Gerard Palma',
    title: 'Account Executive Intern',
    school: 'University of the Philippines',
    image: '/images/about/PALMA.webp',
    rating: 5,
    quote: 'As an Account Executive Intern, I learned how to build client relationships and strengthen my communication skills.',
    linkedin: 'https://www.linkedin.com/in/gerard-francis-palma-32639a212/',
  },
  {
    id: 'eiran-penaflor',
    name: 'Eiran John Peñaflor',
    title: 'Account Executive Intern',
    school: 'University of the Philippines',
    image: '/images/about/Peñaflor.webp',
    rating: 5,
    quote: 'My internship as an Account Executive helped me grow in client engagement, adaptability, and teamwork.',
    linkedin: 'https://www.linkedin.com/in/eiran-john-pe%C3%B1aflor-aa48332bb/',
  },
  {
    id: 'katrina-ignacio',
    name: 'Katrina Ignacio',
    title: 'Account Executive Intern',
    school: 'Bulacan State University',
    image: '/images/about/Katrina.webp',
    rating: 5,
    quote: 'Romega was the first company that gave me a chance to experience the corporate world. I walked in with nothing but curiosity and determination.',
    linkedin: 'https://www.linkedin.com/in/katrina-ignacio/',
  },
  {
    id: 'edmayelle-alforja',
    name: 'Edmayelle Alforja',
    title: 'Market Intelligence Intern',
    school: 'University of Sto. Thomas',
    image: '/images/about/Edmayelle.jpg',
    rating: 5,
    quote: 'My internship at Romega Solutions deepened my understanding of semiconductors through real-world analytics, while the collaborative culture strengthened my skills in research and strategic thinking.',
    linkedin: 'https://www.linkedin.com/in/edmayelle-alforja/',
  },
];

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
