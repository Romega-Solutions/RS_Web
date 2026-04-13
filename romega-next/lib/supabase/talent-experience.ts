import { createClient } from './server';

export interface TalentExperience {
  id: string;
  talent_id: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  achievements: string[];
  technologies: string[];
  created_at: string;
}

/**
 * Fetch work experience for a specific talent
 */
export async function getTalentExperience(talentId: string): Promise<TalentExperience[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey.includes('placeholder')) {
    console.warn('Supabase not configured, no experience data available');
    return [];
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
      return [];
    }

    return data || [];
  } catch (_error) {
    console.warn('Error in getTalentExperience:', _error);
    return [];
  }
}
