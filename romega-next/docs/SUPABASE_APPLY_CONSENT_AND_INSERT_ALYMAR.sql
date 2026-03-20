-- ================================================
-- NON-DESTRUCTIVE LEGAL CONSENT + ALYMAR INSERT
-- Run this on an existing Supabase database.
-- This script does NOT drop tables.
-- ================================================

BEGIN;

-- 1) Ensure consent columns exist
ALTER TABLE talents
  ADD COLUMN IF NOT EXISTS public_showcase_consent BOOLEAN DEFAULT false;

ALTER TABLE talents
  ADD COLUMN IF NOT EXISTS public_showcase_consent_at TIMESTAMPTZ;

ALTER TABLE talents
  ADD COLUMN IF NOT EXISTS consent_policy_version VARCHAR(50);

ALTER TABLE talents
  ADD COLUMN IF NOT EXISTS consent_source VARCHAR(100);

-- 2) Add supporting index
CREATE INDEX IF NOT EXISTS idx_talents_public_showcase_consent
  ON talents(public_showcase_consent)
  WHERE public_showcase_consent = true;

-- 3) Tighten RLS to allow only verified + consented public profiles
DROP POLICY IF EXISTS "Anyone can view verified talents" ON talents;
DROP POLICY IF EXISTS "Anyone can view verified talents with publication consent" ON talents;

CREATE POLICY "Anyone can view verified talents with publication consent"
  ON talents
  FOR SELECT
  USING (verified = true AND public_showcase_consent = true);

DROP POLICY IF EXISTS "Anyone can view talent experience" ON talent_experience;
CREATE POLICY "Anyone can view talent experience"
  ON talent_experience
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM talents
      WHERE talents.id = talent_experience.talent_id
      AND talents.verified = true
      AND talents.public_showcase_consent = true
    )
  );

DROP POLICY IF EXISTS "Anyone can view talent projects" ON talent_projects;
CREATE POLICY "Anyone can view talent projects"
  ON talent_projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM talents
      WHERE talents.id = talent_projects.talent_id
      AND talents.verified = true
      AND talents.public_showcase_consent = true
    )
  );

DROP POLICY IF EXISTS "Anyone can view talent testimonials" ON talent_testimonials;
CREATE POLICY "Anyone can view talent testimonials"
  ON talent_testimonials
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM talents
      WHERE talents.id = talent_testimonials.talent_id
      AND talents.verified = true
      AND talents.public_showcase_consent = true
    )
  );

DROP POLICY IF EXISTS "Anyone can view talent certifications" ON talent_certifications;
CREATE POLICY "Anyone can view talent certifications"
  ON talent_certifications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM talents
      WHERE talents.id = talent_certifications.talent_id
      AND talents.verified = true
      AND talents.public_showcase_consent = true
    )
  );

DROP POLICY IF EXISTS "Anyone can view talent availability" ON talent_availability_slots;
CREATE POLICY "Anyone can view talent availability"
  ON talent_availability_slots
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM talents
      WHERE talents.id = talent_availability_slots.talent_id
      AND talents.verified = true
      AND talents.public_showcase_consent = true
    )
  );

-- 4) Upsert Alymar profile (public-safe + explicit consent)
INSERT INTO talents (
  name,
  email,
  phone,
  role,
  tagline,
  bio,
  skills,
  experience_years,
  experience_level,
  availability,
  hourly_rate_min,
  hourly_rate_max,
  location,
  timezone,
  category,
  subcategories,
  portfolio_url,
  gender,
  featured,
  verified,
  public_showcase_consent,
  public_showcase_consent_at,
  consent_policy_version,
  consent_source
)
VALUES (
  'Alymar T.',
  'tantiadoalymar18@gmail.com',
  '+639389495814',
  'Web Developer',
  'Junior web developer focused on practical public-service systems',
  'Computer Science graduate with hands-on experience in responsive web development, backend workflows, and municipal system support.',
  ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'AJAX', 'Bootstrap', 'REST API Integration', 'Git', 'GitHub', 'XAMPP', 'VS Code'],
  1,
  'Junior',
  'Available',
  10,
  18,
  'Bohol, Philippines',
  'Asia/Manila',
  'development',
  ARRAY['web development', 'database systems', 'municipal systems'],
  'https://hr.calapebohol.com/',
  'male',
  false,
  true,
  true,
  NOW(),
  'PP-2026-03-20-v1',
  'signed-applicant-consent-form'
)
ON CONFLICT (email)
DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role,
  tagline = EXCLUDED.tagline,
  bio = EXCLUDED.bio,
  skills = EXCLUDED.skills,
  experience_years = EXCLUDED.experience_years,
  experience_level = EXCLUDED.experience_level,
  availability = EXCLUDED.availability,
  hourly_rate_min = EXCLUDED.hourly_rate_min,
  hourly_rate_max = EXCLUDED.hourly_rate_max,
  location = EXCLUDED.location,
  timezone = EXCLUDED.timezone,
  category = EXCLUDED.category,
  subcategories = EXCLUDED.subcategories,
  portfolio_url = EXCLUDED.portfolio_url,
  verified = EXCLUDED.verified,
  public_showcase_consent = EXCLUDED.public_showcase_consent,
  public_showcase_consent_at = EXCLUDED.public_showcase_consent_at,
  consent_policy_version = EXCLUDED.consent_policy_version,
  consent_source = EXCLUDED.consent_source,
  updated_at = NOW();

-- 5) Insert/update Alymar related experience and projects
WITH alymar AS (
  SELECT id FROM talents WHERE email = 'tantiadoalymar18@gmail.com'
)
INSERT INTO talent_experience (
  talent_id,
  company_name,
  role,
  start_date,
  end_date,
  description,
  achievements,
  technologies
)
SELECT
  a.id,
  'Municipality of Calape, Bohol',
  'Intern - Web Systems Developer',
  '2025-06-01'::DATE,
  '2025-09-30'::DATE,
  'Supported the development of municipal systems for water billing and daily time record workflows.',
  ARRAY[
    'Helped streamline data entry workflows to reduce manual errors',
    'Contributed to reporting and operational data analysis summaries',
    'Collaborated with team members on practical system improvements'
  ],
  ARRAY['PHP', 'JavaScript', 'MySQL', 'AJAX', 'Bootstrap']
FROM alymar a
WHERE NOT EXISTS (
  SELECT 1
  FROM talent_experience te
  WHERE te.talent_id = a.id
    AND te.company_name = 'Municipality of Calape, Bohol'
    AND te.role = 'Intern - Web Systems Developer'
);

WITH alymar AS (
  SELECT id FROM talents WHERE email = 'tantiadoalymar18@gmail.com'
)
INSERT INTO talent_projects (
  talent_id,
  title,
  description,
  project_url,
  technologies,
  completion_date,
  featured
)
SELECT
  a.id,
  'Municipal HR Web System',
  'Web-based HR operations portal supporting attendance and workforce process tracking.',
  'https://hr.calapebohol.com/',
  ARRAY['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
  '2025-09-15'::DATE,
  true
FROM alymar a
WHERE NOT EXISTS (
  SELECT 1
  FROM talent_projects tp
  WHERE tp.talent_id = a.id
    AND tp.title = 'Municipal HR Web System'
);

WITH alymar AS (
  SELECT id FROM talents WHERE email = 'tantiadoalymar18@gmail.com'
)
INSERT INTO talent_projects (
  talent_id,
  title,
  description,
  project_url,
  technologies,
  completion_date,
  featured
)
SELECT
  a.id,
  'Municipal Waterworks Billing System',
  'Water billing and records platform for municipal operations.',
  'https://waterworks.calapebohol.com/',
  ARRAY['PHP', 'MySQL', 'AJAX', 'Bootstrap'],
  '2025-09-20'::DATE,
  true
FROM alymar a
WHERE NOT EXISTS (
  SELECT 1
  FROM talent_projects tp
  WHERE tp.talent_id = a.id
    AND tp.title = 'Municipal Waterworks Billing System'
);

COMMIT;

-- Verification query
-- SELECT name, role, location, public_showcase_consent, consent_policy_version
-- FROM talents
-- WHERE email = 'tantiadoalymar18@gmail.com';
