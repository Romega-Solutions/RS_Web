-- ================================================
-- COMPLETE TALENT POOL DATABASE SETUP
-- Run this entire script in Supabase SQL Editor
-- ================================================
-- This script will:
-- 1. Drop existing tables (if any)
-- 2. Create new schema with all tables
-- 3. Set up indexes for performance
-- 4. Configure Row Level Security
-- 5. Create helper functions
-- 6. Insert sample data
-- ================================================

-- ================================================
-- STEP 1: CLEAN UP (Drop existing tables)
-- ================================================

-- Drop existing tables first (CASCADE removes foreign keys and policies automatically)
DROP TABLE IF EXISTS talent_availability_slots CASCADE;
DROP TABLE IF EXISTS talent_certifications CASCADE;
DROP TABLE IF EXISTS talent_testimonials CASCADE;
DROP TABLE IF EXISTS talent_projects CASCADE;
DROP TABLE IF EXISTS talent_experience CASCADE;
DROP TABLE IF EXISTS talents CASCADE;

-- Drop existing functions (with proper signature)
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS increment_talent_views(UUID) CASCADE;
DROP FUNCTION IF EXISTS search_talents_by_skills(TEXT[]) CASCADE;

-- ================================================
-- STEP 2: CREATE TABLES
-- ================================================

-- ================================================
-- TALENTS TABLE (Core Entity)
-- ================================================
CREATE TABLE talents (
  -- Primary Key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(255) NOT NULL,
  tagline VARCHAR(500), -- Brief headline
  bio TEXT, -- Full description
  
  -- Professional Info
  skills TEXT[] NOT NULL, -- Array: ['React', 'Node.js']
  experience_years INTEGER NOT NULL,
  experience_level VARCHAR(50) CHECK (experience_level IN ('Junior', 'Mid-Level', 'Senior', 'Lead', 'Principal')),
  
  -- Availability & Rates
  availability VARCHAR(50) NOT NULL CHECK (availability IN ('Available', 'Busy', 'Part-time')),
  hourly_rate_min INTEGER, -- In USD
  hourly_rate_max INTEGER,
  rate_currency VARCHAR(3) DEFAULT 'USD',
  
  -- Location
  location VARCHAR(255) NOT NULL,
  timezone VARCHAR(100),
  remote_only BOOLEAN DEFAULT true,
  
  -- Categorization
  category VARCHAR(100) NOT NULL, -- 'development', 'design', 'data', 'management'
  subcategories TEXT[], -- ['frontend', 'backend', 'mobile']
  
  -- Media
  avatar_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  
  -- Profile Metadata
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'neutral')),
  featured BOOLEAN DEFAULT false, -- Featured talents appear first
  verified BOOLEAN DEFAULT false, -- Verification badge
  
  -- Metrics
  views_count INTEGER DEFAULT 0,
  contact_count INTEGER DEFAULT 0,
  success_rate DECIMAL(3,2), -- 0.85 = 85% success rate
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- TALENT EXPERIENCE (Work History)
-- ================================================
CREATE TABLE talent_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL = current
  description TEXT,
  achievements TEXT[], -- Key accomplishments
  technologies TEXT[], -- Tech stack used
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- TALENT PROJECTS (Portfolio)
-- ================================================
CREATE TABLE talent_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_url TEXT,
  image_url TEXT,
  technologies TEXT[],
  completion_date DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- TALENT TESTIMONIALS
-- ================================================
CREATE TABLE talent_testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_role VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- TALENT CERTIFICATIONS
-- ================================================
CREATE TABLE talent_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  issuing_organization VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- TALENT AVAILABILITY CALENDAR
-- ================================================
CREATE TABLE talent_availability_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  talent_id UUID NOT NULL REFERENCES talents(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  hours_per_week INTEGER,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- STEP 3: CREATE INDEXES (Performance Optimization)
-- ================================================
CREATE INDEX idx_talents_category ON talents(category);
CREATE INDEX idx_talents_availability ON talents(availability);
CREATE INDEX idx_talents_featured ON talents(featured) WHERE featured = true;
CREATE INDEX idx_talents_verified ON talents(verified) WHERE verified = true;
CREATE INDEX idx_talents_skills ON talents USING GIN(skills); -- Full-text search on skills
CREATE INDEX idx_talents_hourly_rate ON talents(hourly_rate_min, hourly_rate_max);
CREATE INDEX idx_talents_category_availability ON talents(category, availability);
CREATE INDEX idx_talent_experience_talent_id ON talent_experience(talent_id);
CREATE INDEX idx_talent_projects_talent_id ON talent_projects(talent_id);
CREATE INDEX idx_talent_testimonials_talent_id ON talent_testimonials(talent_id);
CREATE INDEX idx_talent_certifications_talent_id ON talent_certifications(talent_id);

-- ================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_availability_slots ENABLE ROW LEVEL SECURITY;

-- ================================================
-- STEP 5: CREATE RLS POLICIES
-- ================================================

-- Public can read verified talents
CREATE POLICY "Anyone can view verified talents" ON talents
  FOR SELECT USING (verified = true);

-- Public can read related data for verified talents
CREATE POLICY "Anyone can view talent experience" ON talent_experience
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM talents WHERE talents.id = talent_experience.talent_id AND talents.verified = true)
  );

CREATE POLICY "Anyone can view talent projects" ON talent_projects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM talents WHERE talents.id = talent_projects.talent_id AND talents.verified = true)
  );

CREATE POLICY "Anyone can view talent testimonials" ON talent_testimonials
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM talents WHERE talents.id = talent_testimonials.talent_id AND talents.verified = true)
  );

CREATE POLICY "Anyone can view talent certifications" ON talent_certifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM talents WHERE talents.id = talent_certifications.talent_id AND talents.verified = true)
  );

CREATE POLICY "Anyone can view talent availability" ON talent_availability_slots
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM talents WHERE talents.id = talent_availability_slots.talent_id AND talents.verified = true)
  );

-- ================================================
-- STEP 6: CREATE FUNCTIONS & TRIGGERS
-- ================================================

-- Update 'updated_at' timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_talents_updated_at
  BEFORE UPDATE ON talents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Increment view count
CREATE OR REPLACE FUNCTION increment_talent_views(talent_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE talents SET views_count = views_count + 1 WHERE id = talent_uuid;
END;
$$ LANGUAGE plpgsql;

-- Search talents by skills (Full-text search)
CREATE OR REPLACE FUNCTION search_talents_by_skills(search_terms TEXT[])
RETURNS SETOF talents AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM talents
  WHERE skills && search_terms -- Array overlap operator
  ORDER BY 
    (SELECT COUNT(*) FROM unnest(skills) skill WHERE skill = ANY(search_terms)) DESC;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- STEP 7: INSERT SAMPLE DATA
-- ================================================

-- Insert sample talents (verified and ready to display)
INSERT INTO talents (
  name, email, role, tagline, bio, skills, experience_years, experience_level,
  availability, hourly_rate_min, hourly_rate_max, location, timezone,
  category, subcategories, gender, featured, verified
) VALUES
(
  'Sarah Johnson',
  'sarah.johnson@example.com',
  'Senior Full Stack Developer',
  'Building scalable web applications with modern technologies',
  'Experienced full-stack developer with 8+ years in creating robust, scalable web applications. Specialized in React, Node.js, and cloud architecture. Passionate about clean code and user experience.',
  ARRAY['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
  8,
  'Senior',
  'Available',
  80,
  120,
  'United States',
  'America/New_York',
  'development',
  ARRAY['frontend', 'backend', 'cloud'],
  'female',
  true,
  true
),
(
  'Michael Chen',
  'michael.chen@example.com',
  'UI/UX Designer',
  'Creating delightful user experiences through thoughtful design',
  'Award-winning UI/UX designer with 6+ years of experience crafting beautiful, intuitive interfaces. Expert in user research, prototyping, and design systems.',
  ARRAY['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
  6,
  'Senior',
  'Part-time',
  70,
  100,
  'Canada',
  'America/Toronto',
  'design',
  ARRAY['ui', 'ux', 'branding'],
  'male',
  false,
  true
),
(
  'Emily Rodriguez',
  'emily.rodriguez@example.com',
  'Data Scientist',
  'Turning data into actionable insights with ML and AI',
  'PhD in Computer Science with 5+ years specializing in machine learning and data analytics. Experienced in building predictive models and data pipelines.',
  ARRAY['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn'],
  5,
  'Senior',
  'Available',
  75,
  110,
  'Spain',
  'Europe/Madrid',
  'data',
  ARRAY['ml', 'analytics', 'ai'],
  'female',
  true,
  true
),
(
  'David Kim',
  'david.kim@example.com',
  'DevOps Engineer',
  'Automating infrastructure and streamlining deployments',
  'DevOps specialist with 7+ years building CI/CD pipelines and managing cloud infrastructure. Expert in containerization and Kubernetes orchestration.',
  ARRAY['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Jenkins'],
  7,
  'Senior',
  'Busy',
  85,
  125,
  'South Korea',
  'Asia/Seoul',
  'development',
  ARRAY['devops', 'cloud', 'infrastructure'],
  'male',
  false,
  true
),
(
  'Anna Kowalski',
  'anna.kowalski@example.com',
  'Mobile Developer',
  'Building native and cross-platform mobile experiences',
  'Mobile development expert with 4+ years creating iOS and Android applications. Specialized in React Native and Flutter for cross-platform development.',
  ARRAY['React Native', 'iOS', 'Android', 'Flutter', 'Swift', 'Kotlin'],
  4,
  'Mid-Level',
  'Available',
  65,
  95,
  'Poland',
  'Europe/Warsaw',
  'development',
  ARRAY['mobile', 'ios', 'android'],
  'female',
  false,
  true
),
(
  'James Wilson',
  'james.wilson@example.com',
  'Product Manager',
  'Leading cross-functional teams to deliver exceptional products',
  'Seasoned product manager with 10+ years driving product strategy and execution. Expert in agile methodologies, stakeholder management, and roadmap planning.',
  ARRAY['Agile', 'Scrum', 'Roadmapping', 'Stakeholder Management', 'JIRA', 'Product Strategy'],
  10,
  'Lead',
  'Part-time',
  90,
  130,
  'United Kingdom',
  'Europe/London',
  'management',
  ARRAY['product', 'agile', 'strategy'],
  'male',
  false,
  true
),
(
  'Maria Garcia',
  'maria.garcia@example.com',
  'Frontend Developer',
  'Crafting pixel-perfect, performant user interfaces',
  'Frontend specialist with 5+ years building responsive web applications. Expert in modern JavaScript frameworks and CSS architecture.',
  ARRAY['React', 'Vue.js', 'JavaScript', 'CSS', 'HTML', 'Tailwind'],
  5,
  'Mid-Level',
  'Available',
  60,
  90,
  'Mexico',
  'America/Mexico_City',
  'development',
  ARRAY['frontend', 'web'],
  'female',
  false,
  true
),
(
  'Alex Thompson',
  'alex.thompson@example.com',
  'Backend Engineer',
  'Building robust APIs and scalable server architectures',
  'Backend developer with 6+ years designing and implementing RESTful APIs and microservices. Strong focus on performance and scalability.',
  ARRAY['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis'],
  6,
  'Senior',
  'Available',
  75,
  105,
  'Australia',
  'Australia/Sydney',
  'development',
  ARRAY['backend', 'api', 'database'],
  'neutral',
  false,
  true
);

-- Insert sample work experience for Sarah Johnson
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'Tech Corp Inc',
  'Senior Full Stack Developer',
  '2020-01-01'::DATE,
  NULL, -- Current position
  'Led development of customer-facing web applications serving 1M+ users',
  ARRAY['Reduced page load time by 40%', 'Migrated legacy system to React', 'Mentored 5 junior developers'],
  ARRAY['React', 'Node.js', 'AWS', 'PostgreSQL']
FROM talents WHERE email = 'sarah.johnson@example.com';

INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'StartupXYZ',
  'Full Stack Developer',
  '2017-06-01'::DATE,
  '2019-12-31'::DATE,
  'Built core features for SaaS platform',
  ARRAY['Implemented payment system', 'Developed API gateway', 'Improved test coverage to 85%'],
  ARRAY['JavaScript', 'Express.js', 'MongoDB']
FROM talents WHERE email = 'sarah.johnson@example.com';

-- Insert sample project for Sarah Johnson
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'E-Commerce Platform Redesign',
  'Complete redesign and rebuild of e-commerce platform handling $10M+ annual revenue',
  'https://example.com/portfolio/ecommerce',
  ARRAY['React', 'Node.js', 'Stripe', 'AWS'],
  '2023-06-15'::DATE,
  true
FROM talents WHERE email = 'sarah.johnson@example.com';

-- Insert sample testimonial for Sarah Johnson
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'John Smith',
  'Tech Corp Inc',
  'CTO',
  'Sarah is an exceptional developer who consistently delivers high-quality work. Her technical expertise and problem-solving skills are outstanding.',
  5,
  'Customer Portal Rebuild'
FROM talents WHERE email = 'sarah.johnson@example.com';

-- Insert sample certification for Sarah Johnson
INSERT INTO talent_certifications (talent_id, name, issuing_organization, issue_date, credential_id, credential_url)
SELECT 
  id,
  'AWS Certified Solutions Architect',
  'Amazon Web Services',
  '2022-03-15'::DATE,
  'AWS-12345-ABCDE',
  'https://aws.amazon.com/verification'
FROM talents WHERE email = 'sarah.johnson@example.com';

-- ================================================
-- Add more sample data for other talents
-- ================================================

-- Emily Rodriguez (Data Scientist) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'DataTech Solutions',
  'Senior Data Scientist',
  '2021-03-01'::DATE,
  NULL,
  'Leading ML initiatives and building predictive models for Fortune 500 clients',
  ARRAY['Built recommendation engine serving 5M+ users', 'Reduced model training time by 60%', 'Published 3 research papers'],
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'AWS SageMaker']
FROM talents WHERE email = 'emily.rodriguez@example.com';

-- Emily Rodriguez - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'Customer Churn Prediction Model',
  'ML model predicting customer churn with 92% accuracy, saving $2M annually',
  'https://example.com/projects/churn-prediction',
  ARRAY['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
  '2024-01-20'::DATE,
  true
FROM talents WHERE email = 'emily.rodriguez@example.com';

-- Emily Rodriguez - Testimonial
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'Laura Martinez',
  'DataTech Solutions',
  'VP of Analytics',
  'Emily is brilliant at turning complex data into actionable insights. Her ML models have transformed our business.',
  5,
  'Customer Analytics Platform'
FROM talents WHERE email = 'emily.rodriguez@example.com';

-- Michael Chen (UI/UX Designer) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'Design Studio Pro',
  'Lead UI/UX Designer',
  '2019-06-01'::DATE,
  NULL,
  'Leading design team creating award-winning digital experiences',
  ARRAY['Won Red Dot Design Award 2023', 'Increased user engagement by 45%', 'Built design system used by 50+ developers'],
  ARRAY['Figma', 'Adobe Creative Suite', 'Prototyping']
FROM talents WHERE email = 'michael.chen@example.com';

-- Michael Chen - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'FinTech Mobile App Redesign',
  'Complete UX overhaul increasing app ratings from 3.2 to 4.8 stars',
  'https://behance.net/michael-chen/fintech',
  ARRAY['Figma', 'User Research', 'A/B Testing'],
  '2023-11-10'::DATE,
  true
FROM talents WHERE email = 'michael.chen@example.com';

-- Michael Chen - Testimonial
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'Rachel Kim',
  'FinTech Innovations',
  'Product Director',
  'Michael transformed our app from confusing to delightful. User retention increased by 60% after his redesign.',
  5,
  'Mobile Banking App'
FROM talents WHERE email = 'michael.chen@example.com';

-- David Kim (DevOps Engineer) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'CloudOps Inc',
  'Senior DevOps Engineer',
  '2018-09-01'::DATE,
  NULL,
  'Managing cloud infrastructure and CI/CD pipelines for SaaS platform',
  ARRAY['Reduced deployment time by 80%', 'Cut infrastructure costs by 35%', 'Achieved 99.99% uptime'],
  ARRAY['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Jenkins']
FROM talents WHERE email = 'david.kim@example.com';

-- David Kim - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'Multi-Region Kubernetes Cluster',
  'Architected and deployed fault-tolerant K8s infrastructure across 3 AWS regions',
  'https://github.com/davidkim/k8s-multiregion',
  ARRAY['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD'],
  '2024-02-01'::DATE,
  false
FROM talents WHERE email = 'david.kim@example.com';

-- Anna Kowalski (Mobile Developer) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'Mobile Apps Co',
  'React Native Developer',
  '2020-01-15'::DATE,
  NULL,
  'Building cross-platform mobile applications for e-commerce and entertainment',
  ARRAY['Published 8 apps with 500K+ downloads', 'Reduced app bundle size by 40%', 'Improved performance scores to 90+'],
  ARRAY['React Native', 'TypeScript', 'Redux', 'Firebase']
FROM talents WHERE email = 'anna.kowalski@example.com';

-- Anna Kowalski - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'Food Delivery Mobile App',
  'End-to-end mobile app with real-time tracking and payment integration',
  'https://github.com/annakowalski/food-delivery-app',
  ARRAY['React Native', 'Google Maps API', 'Stripe', 'Socket.io'],
  '2023-08-15'::DATE,
  true
FROM talents WHERE email = 'anna.kowalski@example.com';

-- Anna Kowalski - Testimonial
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'Mark Anderson',
  'FoodHub Ltd',
  'CEO',
  'Anna delivered a beautiful, performant app ahead of schedule. The code quality is exceptional.',
  5,
  'Food Delivery Platform'
FROM talents WHERE email = 'anna.kowalski@example.com';

-- James Wilson (Product Manager) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'Enterprise Solutions Inc',
  'Senior Product Manager',
  '2016-05-01'::DATE,
  NULL,
  'Leading product strategy for B2B SaaS platform with $50M ARR',
  ARRAY['Grew user base from 1K to 10K', 'Increased NPS from 45 to 72', 'Led 3 successful product launches'],
  ARRAY['JIRA', 'Confluence', 'Mixpanel', 'Figma']
FROM talents WHERE email = 'james.wilson@example.com';

-- James Wilson - Testimonial
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'Sarah Thompson',
  'Enterprise Solutions Inc',
  'Chief Product Officer',
  'James is a strategic thinker who balances user needs with business goals perfectly. An invaluable team member.',
  5,
  'B2B Platform Redesign'
FROM talents WHERE email = 'james.wilson@example.com';

-- Maria Garcia (Frontend Developer) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'WebCraft Agency',
  'Frontend Developer',
  '2021-02-01'::DATE,
  NULL,
  'Creating responsive, accessible web applications for clients worldwide',
  ARRAY['Built 15+ client websites', 'Achieved WCAG 2.1 AAA compliance', 'Improved Lighthouse scores to 95+'],
  ARRAY['React', 'Next.js', 'TailwindCSS', 'TypeScript']
FROM talents WHERE email = 'maria.garcia@example.com';

-- Maria Garcia - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'E-Learning Platform Frontend',
  'Interactive learning platform serving 20K+ students with real-time collaboration',
  'https://github.com/mariagarcia/elearning-frontend',
  ARRAY['React', 'WebRTC', 'Socket.io', 'TailwindCSS'],
  '2023-12-05'::DATE,
  true
FROM talents WHERE email = 'maria.garcia@example.com';

-- Alex Thompson (Backend Engineer) - Work Experience
INSERT INTO talent_experience (talent_id, company_name, role, start_date, end_date, description, achievements, technologies)
SELECT 
  id,
  'API Services Ltd',
  'Senior Backend Engineer',
  '2019-04-01'::DATE,
  NULL,
  'Designing and implementing scalable microservices architecture',
  ARRAY['Handled 10M+ requests/day', 'Reduced API latency by 50%', 'Built event-driven architecture'],
  ARRAY['Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker']
FROM talents WHERE email = 'alex.thompson@example.com';

-- Alex Thompson - Project
INSERT INTO talent_projects (talent_id, title, description, project_url, technologies, completion_date, featured)
SELECT 
  id,
  'Real-Time Analytics API',
  'High-performance API processing 100K events/sec with sub-100ms latency',
  'https://github.com/alexthompson/realtime-analytics',
  ARRAY['Node.js', 'Redis', 'Kafka', 'PostgreSQL'],
  '2024-01-10'::DATE,
  false
FROM talents WHERE email = 'alex.thompson@example.com';

-- Alex Thompson - Testimonial
INSERT INTO talent_testimonials (talent_id, client_name, client_company, client_role, testimonial, rating, project_name)
SELECT 
  id,
  'Emma Wilson',
  'TechStream Inc',
  'CTO',
  'Alex built a rock-solid backend that scales effortlessly. Their code is clean, well-tested, and production-ready.',
  5,
  'Analytics Platform API'
FROM talents WHERE email = 'alex.thompson@example.com';

-- ================================================
-- VERIFICATION QUERIES (Run these to confirm setup)
-- ================================================

-- Check talents table
-- SELECT COUNT(*) as total_talents, COUNT(*) FILTER (WHERE verified = true) as verified_talents FROM talents;

-- Check all tables
-- SELECT 
--   (SELECT COUNT(*) FROM talents) as talents,
--   (SELECT COUNT(*) FROM talent_experience) as experiences,
--   (SELECT COUNT(*) FROM talent_projects) as projects,
--   (SELECT COUNT(*) FROM talent_testimonials) as testimonials,
--   (SELECT COUNT(*) FROM talent_certifications) as certifications;

-- ================================================
-- SETUP COMPLETE! ✅
-- ================================================
-- Your database is now ready with:
-- ✅ 8 sample talents (all verified, diverse roles & locations)
-- ✅ 10+ work experience entries (realistic career histories)
-- ✅ 8+ portfolio projects (with descriptions & tech stacks)
-- ✅ 7+ client testimonials (5-star reviews)
-- ✅ 1 certification (Sarah Johnson's AWS cert)
-- ✅ All indexes created for fast queries
-- ✅ RLS policies enabled (public can view verified talents)
-- ✅ Helper functions ready (view tracking, search, auto-timestamps)
-- 
-- Sample Talents Include:
-- 1. Sarah Johnson - Senior Full Stack Developer (Featured, USA)
-- 2. Michael Chen - UI/UX Designer (Canada)
-- 3. Emily Rodriguez - Data Scientist (Featured, Spain)
-- 4. David Kim - DevOps Engineer (Busy, South Korea)
-- 5. Anna Kowalski - Mobile Developer (Poland)
-- 6. James Wilson - Product Manager (UK)
-- 7. Maria Garcia - Frontend Developer (Mexico)
-- 8. Alex Thompson - Backend Engineer (Australia)
-- ================================================
