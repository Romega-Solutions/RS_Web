# Phase 2: Core API & Database Setup

**Status:** Ready to Start  
**Duration:** 3-4 days  
**Prerequisites:** Phase 1 Complete ✅

---

## Overview

Phase 2 focuses on implementing the database schema, core API routes, and migrating assets from the static site to the Next.js project. This phase establishes the data layer that all future features will depend on.

---

## 📋 Tasks Checklist

### 2.1 Database Schema Implementation
- [ ] Define Contact model (contact form submissions)
- [ ] Define Job model (career listings)
- [ ] Define JobApplication model (job applications with resume uploads)
- [ ] Define Newsletter model (email subscriptions)
- [ ] Run Prisma migration
- [ ] Seed test data

### 2.2 API Routes
- [ ] Create `/api/contact` POST endpoint
- [ ] Create `/api/careers` GET endpoint (list jobs)
- [ ] Create `/api/careers/apply` POST endpoint
- [ ] Create `/api/newsletter` POST endpoint
- [ ] Add validation schemas with Zod
- [ ] Add error handling middleware

### 2.3 Asset Migration
- [ ] Migrate images to Next.js public folder
- [ ] Optimize images (WebP conversion)
- [ ] Update CSS files
- [ ] Migrate JavaScript utilities
- [ ] Set up asset serving

---

## 🗄️ Database Schema

### Step 2.1: Update Prisma Schema

Replace the placeholder model in `prisma/schema.prisma` with these production models:

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
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  company     String?
  subject     String
  message     String   @db.Text
  source      String?  // Track which page the contact came from
  isRead      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([email])
  @@index([createdAt])
  @@index([isRead])
  @@map("contacts")
}

// Job Listings
model Job {
  id              String           @id @default(cuid())
  title           String
  slug            String           @unique
  department      String
  location        String           // "Remote", "Hybrid", "On-site"
  type            String           // "Full-time", "Part-time", "Contract", "Internship"
  experienceLevel String           // "Entry", "Mid", "Senior", "Lead"
  description     String           @db.Text
  requirements    String[]         // Array of requirement strings
  responsibilities String[]        // Array of responsibility strings
  skills          String[]         // Required skills
  benefits        String[]         // Benefits offered
  salaryRange     String?          // Optional salary range
  isActive        Boolean          @default(true)
  applications    JobApplication[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@index([slug])
  @@index([isActive])
  @@index([department])
  @@map("jobs")
}

// Job Applications
model JobApplication {
  id          String   @id @default(cuid())
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  firstName   String
  lastName    String
  email       String
  phone       String
  linkedinUrl String?
  portfolioUrl String?
  resumeUrl   String   // S3/Supabase Storage URL
  coverLetter String?  @db.Text
  status      String   @default("pending") // "pending", "reviewed", "interview", "rejected", "hired"
  notes       String?  @db.Text // Internal notes
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([jobId])
  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@map("job_applications")
}

// Newsletter Subscriptions
model Newsletter {
  id          String   @id @default(cuid())
  email       String   @unique
  status      String   @default("active") // "active", "unsubscribed"
  source      String?  // Track where they subscribed from
  subscribedAt DateTime @default(now())
  unsubscribedAt DateTime?

  @@index([email])
  @@index([status])
  @@map("newsletter_subscribers")
}
```

### Step 2.2: Generate Migration

```bash
cd romega-next
npx prisma migrate dev --name init_schema
npx prisma generate
```

This will:
- Create database tables in your Supabase PostgreSQL database
- Generate TypeScript types
- Update the Prisma Client

---

## 🔌 API Routes Implementation

### Step 2.3: Create Validation Schemas

Create `lib/validations/contact.ts`:

```typescript
import { z } from 'zod'
import { VALIDATION } from '@/lib/constants'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION.NAME_MAX_LENGTH, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(VALIDATION.PHONE_PATTERN, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  company: z.string().optional(),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(VALIDATION.MESSAGE_MIN_LENGTH, 'Message must be at least 10 characters')
    .max(VALIDATION.MESSAGE_MAX_LENGTH, 'Message must be less than 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

Create `lib/validations/careers.ts`:

```typescript
import { z } from 'zod'
import { FILE_UPLOAD } from '@/lib/constants'

export const jobApplicationSchema = z.object({
  jobId: z.string().cuid(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  coverLetter: z.string().max(2000).optional(),
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>
```

Create `lib/validations/newsletter.ts`:

```typescript
import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>
```

### Step 2.4: Create Contact API Route

Create `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { contactFormSchema } from '@/lib/validations/contact'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = contactFormSchema.parse(body)

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        ...validatedData,
        source: request.headers.get('referer') || 'direct',
      },
    })

    // Send email notification to admin
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'Romega Solutions <noreply@romega.solutions>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${validatedData.company || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      })
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contact.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Step 2.5: Create Careers API Routes

Create `app/api/careers/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const type = searchParams.get('type')
    const location = searchParams.get('location')

    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        ...(department && { department }),
        ...(type && { type }),
        ...(location && { location }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        location: true,
        type: true,
        experienceLevel: true,
        description: true,
        skills: true,
        salaryRange: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Careers API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

Create `app/api/careers/[slug]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        slug: params.slug,
        isActive: true,
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ job })
  } catch (error) {
    console.error('Job details API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 📦 Asset Migration Guide

### Understanding Next.js Asset Handling

Next.js has specific conventions for handling static assets that differ from traditional static sites:

#### 1. **Public Folder Structure**

**Old Structure (Static Site):**
```
assets/
├── css/
├── images/
│   ├── about/
│   ├── careers/
│   ├── contacts/
│   ├── footer/
│   ├── homepage/
│   └── services/
└── js/
```

**New Structure (Next.js):**
```
romega-next/public/
├── images/
│   ├── about/
│   ├── careers/
│   ├── contact/
│   ├── footer/
│   ├── home/
│   └── services/
├── fonts/ (if using local fonts)
└── favicon.ico
```

#### 2. **Asset Migration Steps**

**Step 1: Copy Images to Public Folder**

```bash
# From the root project directory
cd romega-next

# Create public/images directory
mkdir -p public/images

# Copy all images from old assets folder
cp -r ../assets/images/* public/images/

# Organize and rename folders
mv public/images/homepage public/images/home
mv public/images/contacts public/images/contact
```

**Step 2: Image Optimization**

Next.js provides automatic image optimization through the `<Image>` component. This is MUCH better than raw `<img>` tags.

**Benefits:**
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive sizing
- Prevention of layout shift (CLS)
- On-demand optimization (not at build time)

**Old way (Static Site):**
```html
<img src="/assets/images/homepage/hero-bg.jpg" alt="Hero">
```

**New way (Next.js):**
```tsx
import Image from 'next/image'

<Image
  src="/images/home/hero-bg.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  className="object-cover"
/>
```

**Step 3: Configure Image Domains (if using external images)**

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // For Supabase Storage
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // If using Unsplash
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

#### 3. **CSS Migration Strategy**

**Option A: Keep Separate CSS Files (Easier Migration)**

1. Copy CSS files to `app/styles/` folder:
```bash
mkdir -p romega-next/app/styles
cp ../assets/css/*.css romega-next/app/styles/
```

2. Import in layout or page components:
```tsx
import '@/app/styles/homepage.css'
import '@/app/styles/about.css'
```

**Option B: Convert to Tailwind/CSS Modules (Better Long-term)**

Gradually convert utility classes and component styles to Tailwind or CSS Modules.

**CSS Module Example:**
```css
/* components/Hero/Hero.module.css */
.hero {
  @apply relative h-screen flex items-center justify-center;
}

.heroTitle {
  @apply text-5xl font-bold text-white;
}
```

```tsx
/* components/Hero/Hero.tsx */
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Welcome</h1>
    </section>
  )
}
```

#### 4. **JavaScript/TypeScript Migration**

**Old JavaScript files to migrate:**
- `contact-form.js` → Convert to React Hook Form + Server Action
- `career-jobs.js` → Convert to Server Component with Prisma
- `main.js` → Split into React components

**Example: Contact Form Migration**

**Old (`contact-form.js`):**
```javascript
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  // ... EmailJS logic
})
```

**New (React Hook Form + Server Action):**
```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validations/contact'

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    // Handle response
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

#### 5. **Font Handling**

You're already using Google Fonts (Source Sans 3, Merriweather) in `app/layout.tsx`, which is the recommended approach. 

**If you have custom fonts:**
```
romega-next/public/fonts/
├── CustomFont-Regular.woff2
├── CustomFont-Bold.woff2
└── CustomFont-Italic.woff2
```

Then declare in `globals.css`:
```css
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/CustomFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## ⚠️ Important Migration Considerations

### 1. **Path References**

**Old (Static Site):**
- Absolute: `/assets/images/logo.png`
- Relative: `../../assets/images/logo.png`

**New (Next.js):**
- Always use absolute from `/public`: `/images/logo.png`
- Or use `@/public/images/logo.png` with alias

### 2. **Image Dimensions**

Next.js `<Image>` component requires width and height props (or `fill` for responsive containers). 

**To find image dimensions quickly:**
```bash
cd romega-next/public/images
identify -format "%f: %wx%h\n" **/*.{jpg,png,webp}
# Or use: file *.jpg
```

Create a reference file `docs/IMAGE_DIMENSIONS.md`:
```markdown
# Image Dimensions Reference

## Homepage
- hero-bg.jpg: 1920x1080
- feature-1.png: 600x400
- feature-2.png: 600x400

## About
- team-member-1.jpg: 400x400
- office-photo.jpg: 1200x800
```

### 3. **Legacy Browser Support**

Next.js automatically handles:
- Modern JavaScript transpilation
- Polyfills for older browsers
- CSS autoprefixing

Remove any manual polyfills or babel configs from the old site.

### 4. **Environment Variables**

**Old (Static Site with .env):**
```
EMAILJS_SERVICE_ID=xxx
GOOGLE_SHEETS_API=xxx
```

**New (Next.js with .env.local):**
```
# Client-side (exposed to browser) - must use NEXT_PUBLIC_ prefix
NEXT_PUBLIC_SUPABASE_URL=xxx

# Server-side only (not exposed)
RESEND_API_KEY=xxx
DATABASE_URL=xxx
```

---

## 🎯 Quick Command Reference

```bash
# Navigate to Next.js project
cd romega-next

# Database commands
npx prisma migrate dev        # Create and apply migration
npx prisma generate          # Generate Prisma Client
npx prisma studio            # Open database GUI
npx prisma db seed           # Run seed file

# Development
npm run dev                  # Start dev server
npm run build                # Build for production
npm run start                # Start production server

# Testing
npm run test                 # Run tests
npm run test:watch           # Run tests in watch mode

# Asset optimization (optional)
npx @next/image-transform    # Optimize images
```

---

## 📝 Next Steps After Phase 2

Once Phase 2 is complete, you'll have:
- ✅ Database schema defined and migrated
- ✅ Core API routes functional
- ✅ All assets migrated to Next.js
- ✅ Validation schemas set up
- ✅ Type-safe data access

**Phase 3** will focus on:
- Building the UI components
- Creating page layouts
- Implementing forms with React Hook Form
- Adding animations with Framer Motion

---

## 🐛 Troubleshooting

### Issue: Prisma Migration Fails

**Error:** "Database connection failed"

**Solution:**
1. Check your Supabase dashboard is accessible
2. Verify `DATABASE_URL` and `DIRECT_URL` in `.env.local`
3. Ensure Supabase project is not paused (free tier auto-pauses after 7 days)

### Issue: Images Not Loading

**Error:** "Failed to load resource: 404"

**Solution:**
1. Verify images are in `public/` folder (not `public/public/`)
2. Use absolute paths: `/images/logo.png` (not `images/logo.png`)
3. Check file extensions match (case-sensitive on Linux servers)

### Issue: API Route 404

**Error:** "API route not found"

**Solution:**
1. Ensure file is named `route.ts` (not `index.ts` or `api.ts`)
2. Must be inside `app/api/` directory
3. Must export named functions: `GET`, `POST`, etc.

---

## 📚 Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Zod Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

---

**Ready to start Phase 2?** Begin with Step 2.1: Update the Prisma schema!
