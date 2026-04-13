-- This is a BASELINE migration.
-- Tables already exist in Supabase — this file records the initial state
-- so Prisma can track future changes via migrations.
-- DO NOT run this manually; it is marked as applied via: prisma migrate resolve --applied

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- CreateTable
CREATE TABLE "talents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "role" VARCHAR(255) NOT NULL,
    "tagline" VARCHAR(500),
    "bio" TEXT,
    "skills" TEXT[],
    "experience_years" INTEGER NOT NULL,
    "experience_level" VARCHAR(50),
    "availability" VARCHAR(50) NOT NULL,
    "hourly_rate_min" INTEGER,
    "hourly_rate_max" INTEGER,
    "rate_currency" VARCHAR(3) DEFAULT 'USD',
    "location" VARCHAR(255) NOT NULL,
    "timezone" VARCHAR(100),
    "remote_only" BOOLEAN DEFAULT true,
    "category" VARCHAR(100) NOT NULL,
    "subcategories" TEXT[],
    "avatar_url" TEXT,
    "portfolio_url" TEXT,
    "linkedin_url" TEXT,
    "github_url" TEXT,
    "gender" VARCHAR(20),
    "featured" BOOLEAN DEFAULT false,
    "verified" BOOLEAN DEFAULT false,
    "views_count" INTEGER DEFAULT 0,
    "contact_count" INTEGER DEFAULT 0,
    "success_rate" DECIMAL(3,2),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "last_active_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talent_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "project_url" TEXT,
    "image_url" TEXT,
    "technologies" TEXT[],
    "completion_date" DATE,
    "featured" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_testimonials" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talent_id" UUID NOT NULL,
    "client_name" VARCHAR(255) NOT NULL,
    "client_company" VARCHAR(255),
    "client_role" VARCHAR(255),
    "testimonial" TEXT NOT NULL,
    "rating" INTEGER,
    "project_name" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_availability_slots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talent_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "hours_per_week" INTEGER,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_availability_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_certifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talent_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issuing_organization" VARCHAR(255),
    "issue_date" DATE,
    "expiry_date" DATE,
    "credential_id" VARCHAR(255),
    "credential_url" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_experience" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "talent_id" UUID NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "description" TEXT,
    "achievements" TEXT[],
    "technologies" TEXT[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "talents_email_key" ON "talents"("email");

-- CreateIndex
CREATE INDEX "idx_talents_availability" ON "talents"("availability");

-- CreateIndex
CREATE INDEX "idx_talents_category" ON "talents"("category");

-- CreateIndex
CREATE INDEX "idx_talents_category_availability" ON "talents"("category", "availability");

-- CreateIndex
CREATE INDEX "idx_talents_hourly_rate" ON "talents"("hourly_rate_min", "hourly_rate_max");

-- CreateIndex
CREATE INDEX "idx_talents_skills" ON "talents" USING GIN ("skills");

-- CreateIndex
CREATE INDEX "idx_talent_projects_talent_id" ON "talent_projects"("talent_id");

-- CreateIndex
CREATE INDEX "idx_talent_testimonials_talent_id" ON "talent_testimonials"("talent_id");

-- CreateIndex
CREATE INDEX "idx_talent_certifications_talent_id" ON "talent_certifications"("talent_id");

-- CreateIndex
CREATE INDEX "idx_talent_experience_talent_id" ON "talent_experience"("talent_id");

-- AddForeignKey
ALTER TABLE "talent_projects" ADD CONSTRAINT "talent_projects_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "talent_testimonials" ADD CONSTRAINT "talent_testimonials_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "talent_availability_slots" ADD CONSTRAINT "talent_availability_slots_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "talent_certifications" ADD CONSTRAINT "talent_certifications_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "talent_experience" ADD CONSTRAINT "talent_experience_talent_id_fkey" FOREIGN KEY ("talent_id") REFERENCES "talents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
