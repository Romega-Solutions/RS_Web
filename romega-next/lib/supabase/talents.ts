import { createClient } from './server';
import type { Talent } from '@/types/jobs';
import { PRIVACY_POLICY_VERSION } from '@/lib/legal/privacy-policy';

// Mock data for development/fallback (matches database schema)
const BASE_MOCK_TALENTS: Talent[] = [
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
  {
    id: '9',
    name: 'Alymar T.',
    email: 'tantiadoalymar18@gmail.com',
    role: 'Web Developer',
    tagline: 'Junior web developer focused on practical public-service systems',
    bio: 'Computer Science graduate with hands-on experience in responsive web development, backend workflows, and municipal system support.',
    skills: [
      'PHP',
      'JavaScript',
      'HTML',
      'CSS',
      'MySQL',
      'AJAX',
      'Bootstrap',
      'REST API Integration',
      'Git',
      'GitHub',
      'XAMPP',
      'VS Code',
    ],
    experience_years: 1,
    experience_level: 'Junior',
    experience: '1+ year',
    availability: 'Available',
    hourly_rate_min: 10,
    hourly_rate_max: 18,
    location: 'Bohol, Philippines',
    timezone: 'Asia/Manila',
    remote_only: true,
    rate: '$10-18/hr',
    category: 'development',
    subcategories: ['web development', 'database systems', 'municipal systems'],
    portfolio_url: 'https://hr.calapebohol.com/',
    featured: false,
    verified: true,
  },
];

const MOCK_TALENTS: Talent[] = BASE_MOCK_TALENTS.map((talent) => ({
  ...talent,
  public_showcase_consent: true,
  public_showcase_consent_at: talent.public_showcase_consent_at ?? '2026-03-20T00:00:00.000Z',
  consent_policy_version: PRIVACY_POLICY_VERSION,
  consent_source: talent.consent_source ?? 'seed-data',
}));

const MOCK_TALENT_EXPERIENCE: Record<string, Array<Record<string, unknown>>> = {
  '9': [
    {
      id: '9-exp-1',
      talent_id: '9',
      company_name: 'Municipality of Calape, Bohol',
      role: 'Intern - Web Systems Developer',
      start_date: '2025-06-01',
      end_date: '2025-09-30',
      description: 'Supported the development of internal municipal systems for water billing and daily time record workflows.',
      achievements: [
        'Helped streamline data entry workflows to reduce manual errors',
        'Assisted with reporting and operational data analysis summaries',
        'Collaborated with cross-functional teams on process improvements',
      ],
      technologies: ['PHP', 'JavaScript', 'MySQL', 'AJAX', 'Bootstrap'],
      created_at: '2025-10-01T00:00:00.000Z',
    },
  ],
};

const MOCK_TALENT_PROJECTS: Record<string, Array<Record<string, unknown>>> = {
  '9': [
    {
      id: '9-proj-1',
      talent_id: '9',
      title: 'Municipal HR Web System',
      description: 'Web-based HR operations portal supporting attendance and workforce process tracking.',
      project_url: 'https://hr.calapebohol.com/',
      technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
      completion_date: '2025-09-15',
      featured: true,
      created_at: '2025-09-16T00:00:00.000Z',
    },
    {
      id: '9-proj-2',
      talent_id: '9',
      title: 'Municipal Waterworks Billing System',
      description: 'Water billing and records web platform for municipal operations.',
      project_url: 'https://waterworks.calapebohol.com/',
      technologies: ['PHP', 'MySQL', 'AJAX', 'Bootstrap'],
      completion_date: '2025-09-20',
      featured: true,
      created_at: '2025-09-21T00:00:00.000Z',
    },
  ],
};

const MOCK_TALENT_TESTIMONIALS: Record<string, Array<Record<string, unknown>>> = {
  '9': [],
};

function shouldUseMockFallback(): boolean {
  return process.env.NODE_ENV !== 'production';
}

function getMockPublicTalents(): Talent[] {
  return MOCK_TALENTS.filter(talent => talent.public_showcase_consent === true);
}

function getMockTalentById(id: string): Talent | null {
  return (
    MOCK_TALENTS.find(
      talent => talent.id === id && talent.public_showcase_consent === true,
    ) ?? null
  );
}

function readRecordBoolean(
  record: Record<string, unknown>,
  keys: string[],
): boolean | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true' || normalized === 'yes' || normalized === '1') {
        return true;
      }
      if (normalized === 'false' || normalized === 'no' || normalized === '0') {
        return false;
      }
    }
  }
  return undefined;
}

function readRecordString(
  record: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

function hasPublicationConsent(record: Record<string, unknown>): boolean {
  const explicitConsent = readRecordBoolean(record, [
    'public_showcase_consent',
    'showcase_consent',
    'consent_to_showcase',
    'is_public_profile',
  ]);

  return explicitConsent === true;
}

function getConsentPolicyVersion(record: Record<string, unknown>): string | undefined {
  return readRecordString(record, ['consent_policy_version', 'privacy_policy_version']);
}

function getConsentTimestamp(record: Record<string, unknown>): string | undefined {
  return readRecordString(record, ['public_showcase_consent_at', 'consent_timestamp']);
}

function getConsentSource(record: Record<string, unknown>): string | undefined {
  return readRecordString(record, ['consent_source', 'consent_channel']);
}

/**
 * Transform database talent to include computed display properties
 */
function transformTalent(dbTalent: Record<string, unknown>): Talent {
  const publicationConsent = hasPublicationConsent(dbTalent);

  return {
    ...(dbTalent as unknown as Talent),
    public_showcase_consent: publicationConsent,
    public_showcase_consent_at: getConsentTimestamp(dbTalent),
    consent_policy_version: getConsentPolicyVersion(dbTalent),
    consent_source: getConsentSource(dbTalent),
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
    if (shouldUseMockFallback()) {
      console.warn('Supabase not configured, using mock talents for non-production');
      return getMockPublicTalents();
    }

    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  try {
    const supabase = await createClient();
    let data: Record<string, unknown>[] | null = null;

    const { data: rpcData, error: rpcError } = await supabase.rpc('get_public_talents');

    if (!rpcError && Array.isArray(rpcData)) {
      data = rpcData as Record<string, unknown>[];
    } else {
      if (rpcError) {
        console.warn('RPC get_public_talents unavailable, falling back to table query:', rpcError.message);
      }

      const { data: tableData, error: tableError } = await supabase
        .from('talents')
        .select('*')
        .eq('verified', true) // Only fetch verified talents
        .order('featured', { ascending: false }) // Featured first
        .order('created_at', { ascending: false });

      if (tableError) {
        console.error('Error fetching talents from Supabase:', tableError.message);
        if (shouldUseMockFallback()) {
          return getMockPublicTalents();
        }
        return [];
      }

      data = (tableData as Record<string, unknown>[] | null) ?? [];
    }

    // If no data from database, return empty array
    if (!data || data.length === 0) {
      console.info('No talents found in database');
      if (shouldUseMockFallback()) {
        return getMockPublicTalents();
      }
      return [];
    }

    // Transform database talents and enforce explicit publication consent
    return data.map(transformTalent).filter(talent => talent.public_showcase_consent === true);
  } catch (_error) {
    console.error('Error in getTalents:', _error);
    if (shouldUseMockFallback()) {
      return getMockPublicTalents();
    }
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
    if (shouldUseMockFallback()) {
      return getMockTalentById(id);
    }

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
      const mockTalent = shouldUseMockFallback() ? getMockTalentById(id) : null;
      return mockTalent || null;
    }

    const transformedTalent = transformTalent(data);

    if (!transformedTalent.public_showcase_consent) {
      console.warn('Talent found but missing publication consent:', id);
      return null;
    }

    return transformedTalent;
  } catch (_error) {
    console.warn('Error fetching talent by ID:', _error);
    const mockTalent = shouldUseMockFallback() ? getMockTalentById(id) : null;
    return mockTalent || null;
  }
}

/**
 * Fetch talent experience by talent ID
 */
export async function getTalentExperience(talentId: string) {
  if (shouldUseMockFallback() && MOCK_TALENT_EXPERIENCE[talentId]) {
    return MOCK_TALENT_EXPERIENCE[talentId];
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talent_experience')
      .select('*')
      .eq('talent_id', talentId)
      .order('start_date', { ascending: false });

    if (error) {
      console.warn('Error fetching talent experience:', error.message);
      if (shouldUseMockFallback()) {
        return MOCK_TALENT_EXPERIENCE[talentId] ?? [];
      }
      return [];
    }

    return data && data.length > 0
      ? data
      : (shouldUseMockFallback() ? (MOCK_TALENT_EXPERIENCE[talentId] ?? []) : []);
  } catch (_error) {
    console.warn('Error in getTalentExperience:', _error);
    if (shouldUseMockFallback()) {
      return MOCK_TALENT_EXPERIENCE[talentId] ?? [];
    }
    return [];
  }
}

/**
 * Fetch talent projects by talent ID
 */
export async function getTalentProjects(talentId: string) {
  if (shouldUseMockFallback() && MOCK_TALENT_PROJECTS[talentId]) {
    return MOCK_TALENT_PROJECTS[talentId];
  }

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
      if (shouldUseMockFallback()) {
        return MOCK_TALENT_PROJECTS[talentId] ?? [];
      }
      return [];
    }

    return data && data.length > 0
      ? data
      : (shouldUseMockFallback() ? (MOCK_TALENT_PROJECTS[talentId] ?? []) : []);
  } catch (_error) {
    console.warn('Error in getTalentProjects:', _error);
    if (shouldUseMockFallback()) {
      return MOCK_TALENT_PROJECTS[talentId] ?? [];
    }
    return [];
  }
}

/**
 * Fetch talent testimonials by talent ID
 */
export async function getTalentTestimonials(talentId: string) {
  if (shouldUseMockFallback() && MOCK_TALENT_TESTIMONIALS[talentId]) {
    return MOCK_TALENT_TESTIMONIALS[talentId];
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('talent_testimonials')
      .select('*')
      .eq('talent_id', talentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching talent testimonials:', error.message);
      if (shouldUseMockFallback()) {
        return MOCK_TALENT_TESTIMONIALS[talentId] ?? [];
      }
      return [];
    }

    return data && data.length > 0
      ? data
      : (shouldUseMockFallback() ? (MOCK_TALENT_TESTIMONIALS[talentId] ?? []) : []);
  } catch (_error) {
    console.warn('Error in getTalentTestimonials:', _error);
    if (shouldUseMockFallback()) {
      return MOCK_TALENT_TESTIMONIALS[talentId] ?? [];
    }
    return [];
  }
}
