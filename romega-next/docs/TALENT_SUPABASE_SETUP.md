# Talent Pool Supabase Setup Guide

## Current Status
✅ Talent page is **working with mock data**  
⏸️ Supabase connection **not yet configured**

## Quick Legal-Safe Insert (Alymar Profile)

If your Supabase tables already exist and you only want to add the legally filtered Alymar profile plus required publication-consent fields, run:

- `docs/SUPABASE_APPLY_CONSENT_AND_INSERT_ALYMAR.sql`

This script is non-destructive:
- adds consent columns if missing
- updates RLS to require `verified` and `public_showcase_consent`
- inserts/updates Alymar profile and related experience/projects

The talent page will automatically switch to real database data once you configure Supabase.

---

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `uopzobbrnepnqwutrcpg`

### API Keys (for Supabase client)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**: `https://uopzobbrnepnqwutrcpg.supabase.co` ✅ (already set)
   - **anon/public key**: ✅ (already set)

### Database Connection (for Prisma)
5. Go to **Settings** → **Database**
6. Scroll to **Connection String** section
7. Select **URI** tab
8. Copy the connection string (looks like):
   ```
   postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```
9. Replace `[YOUR-PASSWORD]` with your database password

## Step 2: Update Environment Variables

Edit `romega-next/.env`:

```env
# Supabase Configuration - API (Already Set ✅)
NEXT_PUBLIC_SUPABASE_URL=https://uopzobbrnepnqwutrcpg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcHpvYmJybmVwbnF3dXRyY3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzQwNzAsImV4cCI6MjA4NjMxMDA3MH0.Odiep0CYPdaHDai3KUZ5PYTMmT32yYzr69CwrtrWBl8

# Database (for Prisma) - Update these:
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

**Note:** 
- `DATABASE_URL` uses connection pooling (pgbouncer) - for queries
- `DIRECT_URL` is direct connection - for migrations

## Step 3: Create the Talents Table

Go to **Supabase Dashboard** → **SQL Editor** and run:

```sql
-- Create talents table
CREATE TABLE talents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  skills TEXT[] NOT NULL,
  experience VARCHAR(100) NOT NULL,
  availability VARCHAR(50) NOT NULL CHECK (availability IN ('Available', 'Busy', 'Part-time')),
  location VARCHAR(255) NOT NULL,
  rate VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'neutral')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON talents
  FOR SELECT TO anon, authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX idx_talents_category ON talents(category);
CREATE INDEX idx_talents_availability ON talents(availability);

-- Insert sample data
INSERT INTO talents (name, role, skills, experience, availability, location, rate, category, gender) VALUES
  ('Sarah Johnson', 'Senior Full Stack Developer', ARRAY['React', 'Node.js', 'TypeScript', 'AWS'], '8+ years', 'Available', 'United States', '$80-120/hr', 'development', 'female'),
  ('Michael Chen', 'UI/UX Designer', ARRAY['Figma', 'Adobe XD', 'Prototyping', 'User Research'], '6+ years', 'Part-time', 'Canada', '$70-100/hr', 'design', 'male'),
  ('Emily Rodriguez', 'Data Scientist', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'SQL'], '5+ years', 'Available', 'Spain', '$75-110/hr', 'data', 'female'),
  ('David Kim', 'DevOps Engineer', ARRAY['Docker', 'Kubernetes', 'CI/CD', 'Terraform'], '7+ years', 'Busy', 'South Korea', '$85-125/hr', 'development', 'male'),
  ('Anna Kowalski', 'Mobile Developer', ARRAY['React Native', 'iOS', 'Android', 'Flutter'], '4+ years', 'Available', 'Poland', '$65-95/hr', 'development', 'female'),
  ('James Wilson', 'Product Manager', ARRAY['Agile', 'Scrum', 'Roadmapping', 'Stakeholder Management'], '10+ years', 'Part-time', 'United Kingdom', '$90-130/hr', 'management', 'male');
```

## Step 4: Verify Setup

1. Restart your dev server: `npm run dev`
2. Visit: `http://localhost:3000/talent`
3. Check console - should see "Loading talents from Supabase" instead of "using mock data"

---

## Managing Talents

### Add New Talent via Supabase Dashboard

1. Go to **Table Editor** → `talents`
2. Click **Insert row**
3. Fill in the fields:
   - **name**: Full name
   - **role**: Job title
   - **skills**: `{"Skill 1", "Skill 2", "Skill 3"}` (PostgreSQL array format)
   - **experience**: e.g., "5+ years"
   - **availability**: `Available`, `Busy`, or `Part-time`
   - **location**: Country/City
   - **rate**: e.g., "$75-110/hr"
   - **category**: `development`, `design`, `data`, or `management`
   - **gender**: `male`, `female`, or `neutral` (for avatar colors)

### Add New Talent via SQL

```sql
INSERT INTO talents (name, role, skills, experience, availability, location, rate, category, gender)
VALUES (
  'John Doe',
  'Backend Developer',
  ARRAY['Python', 'Django', 'PostgreSQL'],
  '6+ years',
  'Available',
  'Germany',
  '$70-100/hr',
  'development',
  'male'
);
```

---

## Categories

The talent page filters by these categories:
- `development` - Developers, Engineers
- `design` - Designers, UI/UX
- `data` - Data Scientists, Analysts
- `management` - Product Managers, Project Managers

---

## Troubleshooting

### Still seeing mock data after setup?
- Clear Next.js cache: `rm -rf .next && npm run dev`
- Verify `.env` file has real credentials
- Check Supabase table exists: Go to **Table Editor** → look for `talents`

### "relation 'talents' does not exist" error?
- Run the SQL in Step 3 to create the table

### No data showing?
- Insert sample data (Step 3)
- Check Row Level Security policies are set

---

## Future Enhancements

Once working, you can add:
- Individual talent profile pages
- Admin panel to manage talents
- Search and advanced filtering
- Real-time updates with Supabase subscriptions
- Image uploads for avatars
