# 🚀 Phase-by-Phase Implementation Guide
## Next.js + Supabase + Prisma Migration

> **Current Branch:** `feat/next`  
> **Last Updated:** January 27, 2026  
> **Estimated Timeline:** 15 weeks

---

## 📋 Pre-Migration Checklist

Before starting, ensure you have:

- [ ] Node.js 20+ installed (`node --version`)
- [ ] Git configured and repository backed up
- [ ] Supabase account created (https://supabase.com)
- [ ] Vercel account created (https://vercel.com)
- [ ] Code editor with TypeScript support (VS Code recommended)
- [ ] Current website fully documented (screenshots, features list)
- [ ] Stakeholder approval for migration

---

## 🏗️ Phase 1: Foundation & Setup (Week 1-2)

### Objectives
- Initialize Next.js 15 project
- Setup Supabase database
- Configure Prisma ORM
- Setup development environment

### Step 1.1: Initialize Next.js Project

```bash
# Navigate to project root
cd C:/Users/kpg78/Downloads/`WORK/PROJECTS/romega-solutions-website

# Create Next.js app (in a new directory for now)
npx create-next-app@latest romega-next --typescript --tailwind --app --import-alias "@/*"

# Answer prompts:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? Yes (@/*)

cd romega-next
```

### Step 1.2: Install Core Dependencies

```bash
# Install Prisma and Supabase
npm install @prisma/client@latest @supabase/supabase-js@latest @supabase/ssr@latest
npm install -D prisma@latest

# Install form and validation libraries
npm install react-hook-form@latest zod@latest @hookform/resolvers@latest

# Install UI component libraries
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast
npm install @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-label
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge

# Install date utilities
npm install date-fns

# Install email library
npm install @react-email/components resend

# Install development tools
npm install -D @types/node prettier prettier-plugin-tailwindcss
npm install -D @testing-library/react @testing-library/jest-dom vitest
npm install -D @playwright/test
```

### Step 1.3: Setup Supabase Project

**Via Supabase Dashboard:**

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - **Name:** romega-solutions
   - **Database Password:** (generate strong password - save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (for now)
4. Wait for project to be created (~2 minutes)
5. Go to **Project Settings** → **API**
6. Copy these values:
   - Project URL
   - Project API Key (anon/public)
   - Database URL (for Prisma)

### Step 1.4: Configure Environment Variables

```bash
# Create .env.local file
touch .env.local
```

```env
# .env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database (for Prisma)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# Email (we'll add Resend later)
RESEND_API_KEY=your-resend-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```bash
# Create .env.example for team reference
touch .env.example
```

```env
# .env.example
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
DIRECT_URL=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Update .gitignore:**

```bash
# Add to .gitignore if not already there
echo ".env*.local" >> .gitignore
echo ".env" >> .gitignore
```

### Step 1.5: Initialize Prisma

```bash
# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env (you can delete this, we're using .env.local)
```

**Update `prisma/schema.prisma`:**

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [pgcrypto, uuid_ossp]
}

// We'll add models in Phase 2
```

### Step 1.6: Create Prisma Client Singleton

```bash
# Create lib directory
mkdir -p lib
touch lib/prisma.ts
```

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Step 1.7: Create Supabase Client Utilities

```bash
mkdir -p lib/supabase
touch lib/supabase/client.ts
touch lib/supabase/server.ts
touch lib/supabase/middleware.ts
```

**Browser Client (`lib/supabase/client.ts`):**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Client (`lib/supabase/server.ts`):**

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

**Middleware (`middleware.ts` in root):**

```typescript
// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Middleware Helper (`lib/supabase/middleware.ts`):**

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

### Step 1.8: Setup Utility Functions

```bash
touch lib/utils.ts
```

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
```

### Step 1.9: Update Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Romega Solutions brand colors
        'rs-primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'rs-neutral': {
          100: '#f5f5f5',
          200: '#e5e5e5',
          400: '#a3a3a3',
          600: '#525252',
          'grey-400': '#d4d4d4',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

export default config
```

Install Tailwind plugins:

```bash
npm install -D @tailwindcss/forms @tailwindcss/typography
```

### Step 1.10: Setup Fonts

```typescript
// app/layout.tsx
import { Source_Sans_3, Merriweather } from 'next/font/google'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata = {
  title: 'Romega Solutions | Smart HR Solutions for Business Growth',
  description: 'Transform your HR operations with Romega Solutions cutting-edge tools and expert insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

### Step 1.11: Update Global CSS

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Romega Solutions CSS Variables */
    --rs-primary-50: #f0f9ff;
    --rs-primary-100: #e0f2fe;
    --rs-primary-400: #38bdf8;
    --rs-primary-500: #0ea5e9;
    --rs-primary-600: #0284c7;
    --rs-primary-700: #0369a1;
    --rs-neutral-100: #f5f5f5;
    --rs-neutral-600: #525252;
    --rs-neutral-grey-400: #d4d4d4;
  }

  body {
    @apply bg-white text-gray-900;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }
}

@layer utilities {
  .text-merriweather {
    font-family: var(--font-merriweather);
  }
}
```

### Step 1.12: Create Basic Project Structure

```bash
# Create directories
mkdir -p app/\(public\)
mkdir -p app/\(admin\)
mkdir -p app/api
mkdir -p components/ui
mkdir -p components/forms
mkdir -p components/layout
mkdir -p components/sections
mkdir -p lib/actions
mkdir -p lib/services
mkdir -p lib/validations
mkdir -p hooks
mkdir -p types
mkdir -p prisma/migrations

# Create placeholder files
touch types/index.ts
touch lib/constants.ts
```

### Step 1.13: Test Installation

```bash
# Generate Prisma Client (even with empty schema)
npx prisma generate

# Run development server
npm run dev

# Open browser to http://localhost:3000
# You should see the default Next.js page
```

### Step 1.14: Setup Git Workflow

```bash
# Make sure you're on feat/next branch
git status

# Stage all changes
git add .

# Commit Phase 1
git commit -m "feat: Phase 1 - Next.js + Supabase + Prisma foundation setup

- Initialize Next.js 15 with App Router
- Setup Supabase client utilities
- Configure Prisma ORM
- Install core dependencies
- Setup environment variables
- Configure Tailwind with brand colors
- Create project structure"

# Push to remote
git push -u origin feat/next
```

### ✅ Phase 1 Checklist

- [ ] Next.js 15 app running on `localhost:3000`
- [ ] Environment variables configured (`.env.local`)
- [ ] Prisma initialized and client generated
- [ ] Supabase clients (browser/server) created
- [ ] Tailwind CSS working with brand colors
- [ ] Google Fonts loaded (Source Sans 3, Merriweather)
- [ ] Project structure created
- [ ] Git committed and pushed

---

## 📊 Phase 2: Core API & Database (Week 3-4)

### Objectives
- Define complete Prisma schema
- Create database migrations
- Build API routes for contacts and jobs
- Implement Zod validation schemas
- Create service layer functions

### Step 2.1: Define Complete Prisma Schema

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [pgcrypto, uuid_ossp]
}

// Contact Form Submissions
model Contact {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  firstName String   @map("first_name") @db.VarChar(50)
  lastName  String   @map("last_name") @db.VarChar(50)
  email     String   @db.VarChar(255)
  phone     String?  @db.VarChar(20)
  company   String?  @db.VarChar(100)
  subject   String   @db.VarChar(200)
  message   String   @db.Text
  status    ContactStatus @default(NEW)
  source    String   @default("website") @db.VarChar(50)
  ipAddress String?  @map("ip_address") @db.Inet
  userAgent String?  @map("user_agent") @db.Text
  metadata  Json?    @db.JsonB
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@index([email])
  @@index([status, createdAt(sort: Desc)])
  @@index([createdAt(sort: Desc)])
  @@map("contacts")
}

enum ContactStatus {
  NEW
  READ
  REPLIED
  ARCHIVED
}

// Job Listings
model Job {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title             String   @db.VarChar(200)
  slug              String   @unique @db.VarChar(250)
  description       String   @db.Text
  responsibilities  String[]
  requirements      String[]
  location          String   @db.VarChar(100)
  workType          WorkType @map("work_type")
  employmentType    EmploymentType @map("employment_type")
  salaryMin         Int?     @map("salary_min")
  salaryMax         Int?     @map("salary_max")
  salaryCurrency    String   @default("USD") @map("salary_currency") @db.VarChar(3)
  status            JobStatus @default(DRAFT)
  applicationUrl    String?  @map("application_url") @db.VarChar(500)
  applicationDeadline DateTime? @map("application_deadline") @db.Timestamptz(6)
  postedDate        DateTime @default(now()) @map("posted_date") @db.Timestamptz(6)
  department        String?  @db.VarChar(100)
  experienceLevel   ExperienceLevel? @map("experience_level")
  applicationsCount Int      @default(0) @map("applications_count")
  createdAt         DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt         DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  applications      JobApplication[]

  @@index([status, postedDate(sort: Desc)])
  @@index([slug])
  @@index([workType, employmentType])
  @@map("jobs")
}

enum WorkType {
  REMOTE
  ON_SITE
  HYBRID
}

enum EmploymentType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
}

enum JobStatus {
  DRAFT
  ACTIVE
  CLOSED
  ON_HOLD
}

enum ExperienceLevel {
  ENTRY
  MID
  SENIOR
  LEAD
  EXECUTIVE
}

// Job Applications
model JobApplication {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  jobId        String   @map("job_id") @db.Uuid
  firstName    String   @map("first_name") @db.VarChar(50)
  lastName     String   @map("last_name") @db.VarChar(50)
  email        String   @db.VarChar(255)
  phone        String?  @db.VarChar(20)
  resumeUrl    String   @map("resume_url") @db.VarChar(500)
  coverLetter  String?  @map("cover_letter") @db.Text
  linkedinUrl  String?  @map("linkedin_url") @db.VarChar(500)
  portfolioUrl String?  @map("portfolio_url") @db.VarChar(500)
  status       ApplicationStatus @default(PENDING)
  createdAt    DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt    DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  job          Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)

  @@index([jobId])
  @@index([email])
  @@index([status, createdAt(sort: Desc)])
  @@map("job_applications")
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  SHORTLISTED
  REJECTED
  ACCEPTED
}

// Team Members
model TeamMember {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name          String   @db.VarChar(100)
  role          String   @db.VarChar(100)
  bio           String?  @db.Text
  imageUrl      String?  @map("image_url") @db.VarChar(500)
  imagePublicId String?  @map("image_public_id") @db.VarChar(200)
  category      TeamCategory
  linkedinUrl   String?  @map("linkedin_url") @db.VarChar(500)
  twitterUrl    String?  @map("twitter_url") @db.VarChar(500)
  githubUrl     String?  @map("github_url") @db.VarChar(500)
  email         String?  @db.VarChar(255)
  displayOrder  Int      @default(0) @map("display_order")
  isActive      Boolean  @default(true) @map("is_active")
  createdAt     DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt     DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@index([category, displayOrder])
  @@index([isActive])
  @@map("team_members")
}

enum TeamCategory {
  IC
  INTERN
  MANAGEMENT
  ADVISORY
}

// Users (Supabase Auth integration)
model User {
  id        String   @id @db.Uuid
  email     String   @unique @db.VarChar(255)
  role      UserRole @default(USER)
  fullName  String?  @map("full_name") @db.VarChar(100)
  avatarUrl String?  @map("avatar_url") @db.VarChar(500)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@map("users")
}

enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}
```

### Step 2.2: Create and Run Migrations

```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# 1. Create migration files in prisma/migrations/
# 2. Apply migration to your database
# 3. Regenerate Prisma Client

# Verify in Supabase Dashboard:
# Go to Table Editor and you should see all tables
```

### Step 2.3: Create Validation Schemas

```bash
touch lib/validations/contact.schema.ts
touch lib/validations/job.schema.ts
```

**Contact Schema (`lib/validations/contact.schema.ts`):**

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  company: z.string().max(100).optional().or(z.literal('')),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  // Honeypot field
  botfield: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

**Job Schema (`lib/validations/job.schema.ts`):**

```typescript
import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement required'),
  location: z.string().min(1, 'Location is required').max(100),
  workType: z.enum(['REMOTE', 'ON_SITE', 'HYBRID']),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  salaryCurrency: z.string().length(3).default('USD'),
  status: z.enum(['DRAFT', 'ACTIVE', 'CLOSED', 'ON_HOLD']).default('DRAFT'),
  applicationUrl: z.string().url().optional().or(z.literal('')),
  applicationDeadline: z.string().datetime().optional().or(z.literal('')),
  department: z.string().max(100).optional(),
  experienceLevel: z.enum(['ENTRY', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE']).optional(),
})

export type JobFormData = z.infer<typeof jobSchema>
```

### Step 2.4: Create Service Layer

```bash
touch lib/services/contact.service.ts
touch lib/services/email.service.ts
touch lib/services/job.service.ts
```

**Contact Service (`lib/services/contact.service.ts`):**

```typescript
import { prisma } from '@/lib/prisma'
import { ContactFormData } from '@/lib/validations/contact.schema'
import { ContactStatus } from '@prisma/client'

export class ContactService {
  // Create new contact submission
  static async create(data: ContactFormData, metadata?: { ipAddress?: string; userAgent?: string }) {
    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject,
        message: data.message,
        ipAddress: metadata?.ipAddress || null,
        userAgent: metadata?.userAgent || null,
      },
    })

    return contact
  }

  // Check for duplicate submissions (spam prevention)
  static async checkDuplicate(email: string, hours: number = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)
    
    const existing = await prisma.contact.findFirst({
      where: {
        email,
        createdAt: {
          gte: since,
        },
      },
    })

    return existing !== null
  }

  // Get all contacts (for admin)
  static async getAll(status?: ContactStatus, limit = 50, offset = 0) {
    const where = status ? { status } : {}

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.contact.count({ where }),
    ])

    return { contacts, total }
  }

  // Update contact status
  static async updateStatus(id: string, status: ContactStatus) {
    return await prisma.contact.update({
      where: { id },
      data: { status },
    })
  }
}
```

**Email Service (`lib/services/email.service.ts`):**

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
  // Send contact form notification to admin
  static async sendContactNotification(data: {
    firstName: string
    lastName: string
    email: string
    subject: string
    message: string
  }) {
    try {
      await resend.emails.send({
        from: 'Romega Solutions <noreply@romegasolutions.com>',
        to: process.env.ADMIN_EMAIL || 'admin@romegasolutions.com',
        subject: `New Contact Form: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      })
      return { success: true }
    } catch (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }
  }

  // Send confirmation to user
  static async sendContactConfirmation(email: string, firstName: string) {
    try {
      await resend.emails.send({
        from: 'Romega Solutions <noreply@romegasolutions.com>',
        to: email,
        subject: 'Thank you for contacting Romega Solutions',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${firstName},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Best regards,<br>Romega Solutions Team</p>
        `,
      })
      return { success: true }
    } catch (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }
  }
}
```

**Job Service (`lib/services/job.service.ts`):**

```typescript
import { prisma } from '@/lib/prisma'
import { JobFormData } from '@/lib/validations/job.schema'
import { slugify } from '@/lib/utils'
import { JobStatus } from '@prisma/client'

export class JobService {
  // Get all active jobs
  static async getActive() {
    return await prisma.job.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { postedDate: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        workType: true,
        employmentType: true,
        postedDate: true,
        applicationUrl: true,
      },
    })
  }

  // Get job by slug
  static async getBySlug(slug: string) {
    return await prisma.job.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })
  }

  // Create new job
  static async create(data: JobFormData) {
    const slug = slugify(data.title)

    return await prisma.job.create({
      data: {
        ...data,
        slug,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        applicationDeadline: data.applicationDeadline 
          ? new Date(data.applicationDeadline) 
          : null,
      },
    })
  }

  // Update job
  static async update(id: string, data: Partial<JobFormData>) {
    const updateData: any = { ...data }
    
    if (data.title) {
      updateData.slug = slugify(data.title)
    }

    if (data.applicationDeadline) {
      updateData.applicationDeadline = new Date(data.applicationDeadline)
    }

    return await prisma.job.update({
      where: { id },
      data: updateData,
    })
  }

  // Delete job
  static async delete(id: string) {
    return await prisma.job.delete({
      where: { id },
    })
  }

  // Get all jobs (for admin)
  static async getAll(status?: JobStatus) {
    const where = status ? { status } : {}

    return await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })
  }
}
```

### Step 2.5: Create API Routes

**Contact API (`app/api/contact/route.ts`):**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact.schema'
import { ContactService } from '@/lib/services/contact.service'
import { EmailService } from '@/lib/services/email.service'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate data
    const validatedData = contactSchema.parse(body)

    // Honeypot check
    if (validatedData.botfield) {
      // Silent rejection for bots
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission' },
        { status: 200 }
      )
    }

    // Check for duplicates
    const isDuplicate = await ContactService.checkDuplicate(validatedData.email, 24)
    if (isDuplicate) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'You have already submitted a contact form recently. Please wait 24 hours before submitting again.' 
        },
        { status: 429 }
      )
    }

    // Get metadata
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || undefined
    const userAgent = headersList.get('user-agent') || undefined

    // Create contact
    const contact = await ContactService.create(validatedData, {
      ipAddress,
      userAgent,
    })

    // Send emails (don't wait for completion)
    EmailService.sendContactNotification(validatedData).catch(console.error)
    EmailService.sendContactConfirmation(validatedData.email, validatedData.firstName).catch(console.error)

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: { id: contact.id },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Contact API Error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process your request. Please try again later.',
      },
      { status: 500 }
    )
  }
}
```

**Jobs API (`app/api/jobs/route.ts`):**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { JobService } from '@/lib/services/job.service'

// GET /api/jobs - Get all active jobs
export async function GET(request: NextRequest) {
  try {
    const jobs = await JobService.getActive()

    return NextResponse.json({
      success: true,
      data: jobs,
    })
  } catch (error) {
    console.error('Jobs API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch jobs',
      },
      { status: 500 }
    )
  }
}
```

**Job by ID API (`app/api/jobs/[id]/route.ts`):**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { JobService } from '@/lib/services/job.service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const job = await JobService.getBySlug(id)

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: job,
    })
  } catch (error) {
    console.error('Job API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch job',
      },
      { status: 500 }
    )
  }
}
```

### Step 2.6: Setup Resend for Emails

```bash
# Install Resend
npm install resend

# Sign up at https://resend.com
# Get API key from dashboard
# Add to .env.local:
```

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=your-email@romegasolutions.com
```

### Step 2.7: Test API Routes

```bash
# Start dev server
npm run dev

# Test contact API with curl or Postman
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'

# Test jobs API
curl http://localhost:3000/api/jobs
```

### Step 2.8: Create Database Seed Script

```bash
touch prisma/seed.ts
```

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Full Stack Developer',
        slug: 'senior-full-stack-developer',
        description: 'We are looking for an experienced Full Stack Developer...',
        responsibilities: [
          'Develop and maintain web applications',
          'Work with React and Node.js',
          'Collaborate with design team',
        ],
        requirements: [
          '5+ years of experience',
          'Strong knowledge of JavaScript/TypeScript',
          'Experience with React and Next.js',
        ],
        location: 'Remote',
        workType: 'REMOTE',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE',
        experienceLevel: 'SENIOR',
        salaryMin: 80000,
        salaryMax: 120000,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Designer',
        slug: 'product-designer',
        description: 'Join our design team to create beautiful user experiences...',
        responsibilities: [
          'Design user interfaces',
          'Create prototypes',
          'Conduct user research',
        ],
        requirements: [
          '3+ years of design experience',
          'Proficiency in Figma',
          'Strong portfolio',
        ],
        location: 'New York, NY',
        workType: 'HYBRID',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE',
        experienceLevel: 'MID',
        salaryMin: 70000,
        salaryMax: 100000,
      },
    }),
  ])

  console.log(`✅ Created ${jobs.length} sample jobs`)

  // Create sample team members
  const teamMembers = await Promise.all([
    prisma.teamMember.create({
      data: {
        name: 'Jane Smith',
        role: 'CEO & Founder',
        bio: 'Passionate about transforming HR through technology',
        category: 'MANAGEMENT',
        displayOrder: 1,
        linkedinUrl: 'https://linkedin.com/in/janesmith',
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'John Doe',
        role: 'CTO',
        bio: 'Leading our technical innovation',
        category: 'MANAGEMENT',
        displayOrder: 2,
        linkedinUrl: 'https://linkedin.com/in/johndoe',
      },
    }),
  ])

  console.log(`✅ Created ${teamMembers.length} team members`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Update `package.json`:**

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

**Install tsx:**

```bash
npm install -D tsx

# Run seed
npx prisma db seed
```

### Step 2.9: Git Commit

```bash
git add .
git commit -m "feat: Phase 2 - Complete database schema and API routes

- Define Prisma schema for all models
- Create migrations and seed data
- Implement service layer (Contact, Job, Email)
- Build API routes for contact and jobs
- Add Zod validation schemas
- Setup Resend for email notifications"

git push
```

### ✅ Phase 2 Checklist

- [ ] Prisma schema complete with all models
- [ ] Database migrations applied successfully
- [ ] Contact API working (`POST /api/contact`)
- [ ] Jobs API working (`GET /api/jobs`)
- [ ] Email notifications configured (Resend)
- [ ] Service layer functions created
- [ ] Validation schemas defined (Zod)
- [ ] Database seeded with sample data
- [ ] All tests passing
- [ ] Git committed and pushed

---

## 🎨 Phase 3: Frontend Components (Week 5-6)

### Objectives
- Build reusable UI components
- Create form components with validation
- Build layout components (Navbar, Footer)
- Migrate page content to React components

### Step 3.1: Install shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Answer prompts:
# ✔ Would you like to use TypeScript? yes
# ✔ Which style would you like to use? Default
# ✔ Which color would you like to use as base color? Slate
# ✔ Where is your global CSS file? app/globals.css
# ✔ Would you like to use CSS variables for colors? yes
# ✔ Are you using a custom tailwind prefix eg. tw-? no
# ✔ Where is your tailwind.config.js located? tailwind.config.ts
# ✔ Configure the import alias for components: @/components
# ✔ Configure the import alias for utils: @/lib/utils
# ✔ Write configuration to components.json? yes

# Add components we need
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
```

### Step 3.2: Create Contact Form Component

```bash
touch components/forms/contact-form.tsx
```

```typescript
// components/forms/contact-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact.schema'
import { useToast } from '@/hooks/use-toast'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        })
        reset()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field */}
      <input
        type="text"
        {...register('botfield')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            className="mt-1"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            className="mt-1"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          {...register('company')}
          className="mt-1"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          {...register('subject')}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          rows={5}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rs-primary-600 hover:bg-rs-primary-700"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### Step 3.3: Create Navbar Component

```bash
touch components/layout/navbar.tsx
touch components/layout/mobile-menu.tsx
```

```typescript
// components/layout/navbar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { MobileMenu } from './mobile-menu'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-rs-primary-50 shadow-sm">
      <div className="mx-auto px-4 md:px-8 lg:px-[89.5px]">
        <div className="flex h-[104px] items-center justify-between border-b-2 border-rs-neutral-grey-400">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/navbar-company-logo.svg"
              alt="Romega Solutions Logo"
              width={200}
              height={56}
              className="h-14 w-auto sm:h-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-rs-primary-700 hover:text-rs-primary-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6 text-rs-primary-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </nav>
  )
}
```

```typescript
// components/layout/mobile-menu.tsx
'use client'

import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  navigation: { name: string; href: string }[]
}

export function MobileMenu({ open, onClose, navigation }: MobileMenuProps) {
  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
            <span className="text-xl font-bold text-rs-primary-700">
              Romega Solutions
            </span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}
```

Install @headlessui/react for mobile menu:

```bash
npm install @headlessui/react
```

---

## 📄 Next Steps

Continue to **Phase 4, 5, 6...** in upcoming work sessions. The guide will be expanded with:

- Phase 4: Page Components (Home, About, Services, Careers, Contact)
- Phase 5: Admin Dashboard
- Phase 6: Testing & QA
- Phase 7: SEO & Optimization
- Phase 8: Deployment
- Phase 9: Migration & Launch

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

---

**Document Version:** 1.0 (Phases 1-3 Complete)  
**Next Update:** Add Phases 4-9  
**Questions?** Create an issue in the repository
