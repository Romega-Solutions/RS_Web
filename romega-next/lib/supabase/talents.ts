import { createClient } from './server';
import type { Talent } from '@/types/jobs';

// Mock data for development/fallback (matches database schema)
const MOCK_TALENTS: Talent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Senior Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
    experience_years: 8,
    experience_level: 'Senior',
    experience: '8+ years',
    availability: 'Available',
    hourly_rate_min: 80,
    hourly_rate_max: 120,
    location: 'United States',
    rate: '$80-120/hr',
    category: 'development',
    gender: 'female',
    featured: true,
    verified: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
    experience_years: 6,
    experience_level: 'Senior',
    experience: '6+ years',
    availability: 'Part-time',
    hourly_rate_min: 70,
    hourly_rate_max: 100,
    location: 'Canada',
    rate: '$70-100/hr',
    category: 'design',
    gender: 'male',
    verified: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn'],
    experience_years: 5,
    experience_level: 'Senior',
    experience: '5+ years',
    availability: 'Available',
    hourly_rate_min: 75,
    hourly_rate_max: 110,
    location: 'Spain',
    rate: '$75-110/hr',
    category: 'data',
    gender: 'female',
    featured: true,
    verified: true,
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Jenkins'],
    experience_years: 7,
    experience_level: 'Senior',
    experience: '7+ years',
    availability: 'Busy',
    hourly_rate_min: 85,
    hourly_rate_max: 125,
    location: 'South Korea',
    rate: '$85-125/hr',
    category: 'development',
    gender: 'male',
    verified: true,
  },
  {
    id: '5',
    name: 'Anna Kowalski',
    email: 'anna.kowalski@example.com',
    role: 'Mobile Developer',
    skills: ['React Native', 'iOS', 'Android', 'Flutter', 'Swift', 'Kotlin'],
    experience_years: 4,
    experience_level: 'Mid-Level',
    experience: '4+ years',
    availability: 'Available',
    hourly_rate_min: 65,
    hourly_rate_max: 95,
    location: 'Poland',
    rate: '$65-95/hr',
    category: 'development',
    gender: 'female',
    verified: true,
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'Product Manager',
    skills: ['Agile', 'Scrum', 'Roadmapping', 'Stakeholder Management', 'JIRA', 'Product Strategy'],
    experience_years: 10,
    experience_level: 'Lead',
    experience: '10+ years',
    availability: 'Part-time',
    hourly_rate_min: 90,
    hourly_rate_max: 130,
    location: 'United Kingdom',
    rate: '$90-130/hr',
    category: 'management',
    gender: 'male',
    verified: true,
  },
  {
    id: '7',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'Frontend Developer',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'HTML', 'Tailwind'],
    experience_years: 5,
    experience_level: 'Mid-Level',
    experience: '5+ years',
    availability: 'Available',
    hourly_rate_min: 60,
    hourly_rate_max: 90,
    location: 'Mexico',
    rate: '$60-90/hr',
    category: 'development',
    gender: 'female',
    verified: true,
  },
  {
    id: '8',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    role: 'Backend Engineer',
    skills: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis'],
    experience_years: 6,
    experience_level: 'Senior',
    experience: '6+ years',
    availability: 'Available',
    hourly_rate_min: 75,
    hourly_rate_max: 105,
    location: 'Australia',
    rate: '$75-105/hr',
    category: 'development',
    gender: 'neutral',
    verified: true,
  },
];

/**
 * Transform database talent to include computed display properties
 */
function transformTalent(dbTalent: Record<string, unknown>): Talent {
  return {
    ...(dbTalent as unknown as Talent),
    // Add computed display properties
    experience: `${dbTalent.experience_years}+ years`,
    rate: dbTalent.hourly_rate_min && dbTalent.hourly_rate_max
      ? `$${dbTalent.hourly_rate_min}-${dbTalent.hourly_rate_max}/hr`
      : undefined,
  };
}

/**
 * Fetch all talents from Supabase
 * This runs on the server side for better performance and security
 * Falls back to mock data if Supabase is not configured
 */
export async function getTalents(): Promise<Talent[]> {
  // Check if Supabase is properly configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey.includes('placeholder')) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talents')
      .select('*')
      .eq('verified', true) // Only fetch verified talents
      .order('featured', { ascending: false }) // Featured first
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching talents from Supabase:', error.message);
      return [];
    }

    // If no data from database, return empty array
    if (!data || data.length === 0) {
      console.info('No talents found in database');
      return [];
    }

    // Transform database talents to match interface
    return data.map(transformTalent);
  } catch (_error) {
    console.error('Error in getTalents:', _error);
    return [];
  }
}

/**
 * Fetch talents by category
 */
export async function getTalentsByCategory(category: string): Promise<Talent[]> {
  const talents = await getTalents();
  return talents.filter(talent => talent.category === category);
}

/**
 * Fetch talents by availability
 */
export async function getTalentsByAvailability(availability: string): Promise<Talent[]> {
  const talents = await getTalents();
  return talents.filter(talent => talent.availability === availability);
}

/**
 * Fetch a single talent by ID
 */
export async function getTalentById(id: string): Promise<Talent | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey.includes('placeholder')) {
    return null;
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talents')
      .select('*')
      .eq('id', id)
      .eq('verified', true)
      .single();

    if (error || !data) {
      console.warn('Talent not found in database, checking mock data');
      const mockTalent = MOCK_TALENTS.find(t => t.id === id);
      return mockTalent || null;
    }

    return transformTalent(data);
  } catch (_error) {
    console.warn('Error fetching talent by ID:', _error);
    const mockTalent = MOCK_TALENTS.find(t => t.id === id);
    return mockTalent || null;
  }
}

/**
 * Fetch talent experience by talent ID
 */
export async function getTalentExperience(talentId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talent_experience')
      .select('*')
      .eq('talent_id', talentId)
      .order('start_date', { ascending: false });

    if (error) {
      console.warn('Error fetching talent experience:', error.message);
      return [];
    }

    return data || [];
  } catch (_error) {
    console.warn('Error in getTalentExperience:', _error);
    return [];
  }
}

/**
 * Fetch talent projects by talent ID
 */
export async function getTalentProjects(talentId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talent_projects')
      .select('*')
      .eq('talent_id', talentId)
      .order('featured', { ascending: false })
      .order('completion_date', { ascending: false });

    if (error) {
      console.warn('Error fetching talent projects:', error.message);
      return [];
    }

    return data || [];
  } catch (_error) {
    console.warn('Error in getTalentProjects:', _error);
    return [];
  }
}

/**
 * Fetch talent testimonials by talent ID
 */
export async function getTalentTestimonials(talentId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talent_testimonials')
      .select('*')
      .eq('talent_id', talentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching talent testimonials:', error.message);
      return [];
    }

    return data || [];
  } catch (_error) {
    console.warn('Error in getTalentTestimonials:', _error);
    return [];
  }
}
