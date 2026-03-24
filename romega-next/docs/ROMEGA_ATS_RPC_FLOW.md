# Romega ATS RPC Flow

## Purpose

This document double-checks the current RPC implementation in the Romega Solutions website repo and defines the correct ATS-side RPC flow for creating, editing, verifying, publishing, and updating talent profiles.

It is intended to be the source-of-truth handoff for the Romega ATS codebase.

## Current Repo Reality

### What is implemented now

The live website code only uses one Supabase RPC:

- `public.get_public_talents()`

The website calls it from:

- `romega-next/lib/supabase/talents.ts`

The public talent pages depend on this behavior:

1. Website server code creates a Supabase server client with the public anon key.
2. `getTalents()` calls `supabase.rpc('get_public_talents')`.
3. The returned rows are transformed into the `Talent` UI shape.
4. Talent list and talent detail pages render only what comes back from that RPC.

### What is not implemented now

This repo does not implement ATS write operations for talents. There is currently no website-side code for:

- create talent RPC
- update talent RPC
- publish talent RPC
- unpublish talent RPC
- ATS admin authorization checks in runtime code

Those behaviors are only partially described in docs, especially:

- `romega-next/docs/ROMEGA_ATS_AI_SETUP_PROMPT.md`

## Verified Current Read Flow

## Website Entry Points

- Talent listing page: `romega-next/app/talent/page.tsx`
- Talent detail page: `romega-next/app/talent/[id]/page.tsx`
- Data access module: `romega-next/lib/supabase/talents.ts`
- Public type contract: `romega-next/types/jobs.ts`

## Current Public RPC Contract

The current website assumes:

- RPC name is `get_public_talents`
- RPC is the only public source of truth
- RPC already filters out non-public records
- RPC returns public-safe fields only
- RPC may include `experience_items`
- Projects and testimonials are not yet part of the active public RPC contract

The current code explicitly says:

- no direct public table reads should be used
- RPC failure should mean no public data, except local mock fallback in non-production

## Current Transform Assumptions in Website Code

The website transform layer expects these fields or equivalents:

- `id`
- `name`
- `email` only if intentionally exposed, though it should not be public by default
- `role`
- `tagline`
- `bio`
- `skills`
- `experience_years`
- `experience_level`
- `availability`
- `hourly_rate_min`
- `hourly_rate_max`
- `rate_currency`
- `location`
- `timezone`
- `remote_only`
- `category`
- `subcategories`
- `avatar_url`
- `portfolio_url`
- `linkedin_url`
- `github_url`
- `gender`
- `featured`
- `verified`
- `public_showcase_consent`
- `public_showcase_consent_at`
- `consent_policy_version`
- `consent_source`
- `updated_at`
- `experience_items`

Important implementation detail:

- `parseExperienceItems()` currently validates items with `company_name`, `role_title`, and `start_date`.
- Older SQL docs use `talent_experience.role`, not `role_title`.
- If the RPC returns nested experience JSON, it should alias `role` to `role_title` to match the current site code.

## Current Gaps and Mismatches

### Gap 1: Older docs still describe public table reads

Some older SQL setup docs rely on RLS policies that allow public `SELECT` on `talents` and related tables.

That no longer matches the live website implementation, which expects:

- public website reads through RPC
- not direct table access

### Gap 2: ATS write path is undefined in production terms

The repo has no implemented write contract for:

- draft creation
- draft updates
- verification
- publish approval
- unpublish

### Gap 3: Public detail flow is inefficient

`getTalentById(id)` currently loads all public talents and filters in application code.

The ATS/database side should later add:

- `public.get_public_talent_by_id(p_id uuid)`

### Gap 4: Public experience shape may drift

The current website code expects nested experience JSON shaped for UI use, not raw `talent_experience` rows.

## Recommended Target Architecture

The correct architecture should be:

1. ATS is the only system allowed to create and update talent records.
2. ATS writes to base tables or secure write RPCs using authenticated users.
3. ATS publish rights are controlled by `public.ats_admins`.
4. Public website reads only through public-safe read RPCs.
5. Public website never receives private ATS-only fields.

## Separation of Responsibilities

### ATS responsibilities

- create draft talent records
- update talent records
- manage related experience, projects, and testimonials
- verify talent
- record explicit public showcase consent
- publish or unpublish profiles
- set audit fields such as `created_by` and `updated_by`

### Website responsibilities

- call public read RPCs only
- render public-safe talent data
- never infer publishability on its own
- trust database-side filtering

## Required Database Objects

The ATS should standardize on these core objects:

- `public.talents`
- `public.talent_experience`
- `public.talent_projects`
- `public.talent_testimonials`
- `public.ats_admins`

Recommended governance columns on `public.talents`:

- `public_showcase_consent boolean not null default false`
- `public_showcase_consent_at timestamptz`
- `consent_policy_version varchar(50)`
- `consent_source varchar(100)`
- `created_by uuid`
- `updated_by uuid`
- `published_at timestamptz`
- `unpublished_at timestamptz`
- `publication_status varchar(20)` with values like `draft`, `verified`, `published`, `archived`

Note:

- The website currently relies on `verified = true` and `public_showcase_consent = true`.
- Adding `publication_status` is recommended for ATS workflow clarity, but the public RPC should still enforce the existing public gates so the website does not break.

## Required RPC Inventory

## Public Read RPCs

These are safe for the Romega Solutions website:

### `public.get_public_talents()`

Purpose:

- returns all public-safe talent profiles

Must:

- be `security definer`
- expose public fields only
- filter to public-ready records only
- order predictably, for example `featured desc, updated_at desc`

Minimum filter:

```sql
verified = true
and public_showcase_consent = true
and coalesce(publication_status, 'published') = 'published'
```

### `public.get_public_talent_by_id(p_id uuid)`

Purpose:

- returns one public-safe talent profile by id

Must:

- apply the exact same publication filters as `get_public_talents()`
- return zero rows if the record is not public

Recommended later additions:

- `public.get_public_talent_projects(p_talent_id uuid)`
- `public.get_public_talent_testimonials(p_talent_id uuid)`

## ATS Write RPCs

These should only be executable by authenticated ATS admins.

### `public.create_talent_draft(...)`

Purpose:

- create a draft talent profile

Should:

- insert base talent row
- set `verified = false`
- set `public_showcase_consent = false` unless provided with valid consent metadata
- set `publication_status = 'draft'`
- set `created_by = auth.uid()`
- set `updated_by = auth.uid()`

### `public.update_talent_profile(...)`

Purpose:

- update core talent fields

Should:

- only allow ATS admins
- update `updated_by`
- update `updated_at`
- not automatically publish anything

### `public.replace_talent_experience(p_talent_id uuid, p_items jsonb)`

Purpose:

- replace experience items in one transaction

Why:

- easier for ATS UI save operations
- avoids partial row drift

Important:

- when the public read RPC builds `experience_items`, alias the nested role field to `role_title`

### `public.replace_talent_projects(p_talent_id uuid, p_items jsonb)`

Purpose:

- replace project records for one talent safely

### `public.replace_talent_testimonials(p_talent_id uuid, p_items jsonb)`

Purpose:

- replace testimonial records for one talent safely

### `public.verify_talent_profile(p_talent_id uuid, p_verified boolean)`

Purpose:

- toggle talent verification

Should:

- require ATS admin
- optionally require stronger permission than normal editor

### `public.set_talent_publication_consent(...)`

Purpose:

- record explicit showcase consent metadata

Inputs should include:

- `p_public_showcase_consent boolean`
- `p_public_showcase_consent_at timestamptz`
- `p_consent_policy_version text`
- `p_consent_source text`

Should:

- reject incomplete consent metadata when setting consent to true

### `public.publish_talent_profile(p_talent_id uuid)`

Purpose:

- make a talent visible to the public website

Must enforce:

- caller is ATS admin with publish permission
- `verified = true`
- `public_showcase_consent = true`
- required public fields are populated

Should set:

- `publication_status = 'published'`
- `published_at = now()`
- `unpublished_at = null`
- `updated_by = auth.uid()`

### `public.unpublish_talent_profile(p_talent_id uuid, p_reason text default null)`

Purpose:

- remove a talent from public website results without deleting data

Should set:

- `publication_status = 'draft'` or `archived`
- `unpublished_at = now()`
- `updated_by = auth.uid()`

## Recommended ATS Permission Model

Use:

- `public.ats_admins(user_id uuid primary key, can_publish boolean not null default false, created_at timestamptz not null default now())`

Permission tiers:

- editor: can create and edit drafts
- publisher: can create, edit, verify, publish, and unpublish

Recommended helper functions:

- `public.is_ats_admin(uid uuid)`
- `public.can_publish_talent(uid uuid)`

## Recommended Publication Flow

## Add Flow

1. ATS user creates a talent draft.
2. ATS saves base profile through `create_talent_draft`.
3. ATS saves experience, projects, and testimonials through replace RPCs.
4. ATS keeps profile in `draft` until verification and consent are complete.

## Edit Flow

1. ATS user loads talent draft or existing record.
2. ATS updates base fields with `update_talent_profile`.
3. ATS updates nested collections with replace RPCs.
4. Record remains unpublished unless explicitly published again.

## Verify Flow

1. ATS reviewer checks profile quality and factual accuracy.
2. ATS calls `verify_talent_profile(p_talent_id, true)`.
3. Verification alone does not publish the talent.

## Consent Flow

1. ATS records explicit consent through `set_talent_publication_consent`.
2. Consent metadata must include timestamp, policy version, and source.
3. Consent alone does not publish the talent.

## Publish Flow

1. ATS publisher calls `publish_talent_profile`.
2. RPC validates verification and consent.
3. Record becomes visible through `get_public_talents()` and `get_public_talent_by_id()`.

## Unpublish Flow

1. ATS publisher calls `unpublish_talent_profile`.
2. Record is immediately excluded from public RPC output.
3. Underlying talent data remains in ATS for future edits or re-publication.

## Public Read Contract Recommendation

The public RPC output should be explicitly curated. Recommended output:

```ts
type PublicTalentRpcRow = {
  id: string;
  name: string;
  role: string;
  tagline: string | null;
  bio: string | null;
  skills: string[];
  experience_years: number;
  experience_level: string | null;
  availability: string;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  rate_currency: string | null;
  location: string;
  timezone: string | null;
  remote_only: boolean | null;
  category: string;
  subcategories: string[] | null;
  avatar_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  featured: boolean | null;
  verified: boolean | null;
  public_showcase_consent: boolean;
  public_showcase_consent_at: string | null;
  consent_policy_version: string | null;
  consent_source: string | null;
  updated_at: string | null;
  experience_items: Array<{
    company_name: string;
    role_title: string;
    start_date: string;
    end_date?: string | null;
    is_current?: boolean | null;
    highlights?: string | null;
    tools?: string[] | null;
  }>;
};
```

## Fields That Should Not Be Exposed Publicly

Do not expose these in public RPCs unless there is an explicit business and legal reason:

- private ATS notes
- internal recruiter comments
- rejection reasons
- audit trail internals
- `created_by`
- `updated_by`
- direct admin metadata
- non-public contact details if the profile is intended to stay semi-anonymous

Special caution:

- `email` and `phone` exist in the current app `Talent` type, but they should not be exposed publicly by default.
- If the public website does not actively display them, keep them out of the public RPC and out of future public typings.

## SQL Design Notes for `get_public_talents()`

Recommended pattern:

1. Read from `public.talents`.
2. Left join or aggregate nested public child rows.
3. Build `experience_items` as JSONB with UI-safe field names.
4. Return only already-filtered public records.

Important compatibility rule:

- map `talent_experience.role` to JSON key `role_title`

Example nested projection idea:

```sql
jsonb_agg(
  jsonb_build_object(
    'company_name', te.company_name,
    'role_title', te.role,
    'start_date', te.start_date,
    'end_date', te.end_date,
    'is_current', te.end_date is null,
    'highlights', te.description,
    'tools', te.technologies
  )
  order by te.start_date desc
) filter (where te.id is not null) as experience_items
```

## Minimum ATS Implementation Checklist

- Add `ats_admins` table if missing.
- Add helper permission functions.
- Add secure write RPCs for draft create and update.
- Add secure write RPCs for nested experience, projects, and testimonials.
- Add explicit consent recording RPC.
- Add publish and unpublish RPCs.
- Keep `get_public_talents()` as the only website read source.
- Add `get_public_talent_by_id(p_id uuid)` for efficient detail pages.
- Ensure public RPC field names match current website parsing logic.

## Recommended Rollout Order

1. Standardize schema and governance columns.
2. Add ATS admin table and RLS helpers.
3. Implement ATS write RPCs.
4. Implement `get_public_talents()` and `get_public_talent_by_id()`.
5. Validate public output against `romega-next/lib/supabase/talents.ts`.
6. Update ATS UI to use draft, verify, consent, and publish states explicitly.
7. Remove any remaining public table-read assumptions from older operational docs.

## Final Conclusion

The current Romega Solutions website already treats `get_public_talents()` as the authoritative public RPC. That part is correct.

What is missing is the secure ATS write side. The ATS should not write directly in an ad hoc way. It should use authenticated, permission-checked RPCs that manage:

- draft creation
- profile edits
- nested collection updates
- verification
- consent recording
- publish and unpublish transitions

If the ATS implements the RPC inventory above, the add, edit, and update flow will align cleanly with the current website and the public talent showcase will behave predictably.
