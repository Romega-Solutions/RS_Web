# Romega ATS AI Setup Prompt

Use this entire prompt as instructions for the AI coding assistant in the Romega ATS codebase.

---

## Prompt Start

You are working inside the Romega ATS repository.

Goal:
Set up secure talent management in ATS so only authorized users can create, edit, verify, and publish talent profiles, while Romega Solutions website can read only approved public profiles.

Context assumptions:
1. Database is Supabase Postgres.
2. Primary table is public.talents.
3. Existing talents schema may already include many fields (for example: name, role, skills, verified, featured, rates, links, timestamps).
4. Changes must be idempotent and safe to re-run.

Business rules:
1. ATS users must be authenticated.
2. Only authorized ATS admins can manage talents.
3. Public website visibility requires both:
   - verified = true
   - public_showcase_consent = true
4. Public website must read via a safe RPC function, not broad table access.
5. Keep private ATS data protected.

Deliverables:
1. SQL migration(s) for tables, RLS, policies, grants, RPC.
2. ATS server-side logic for create/update/publish talent.
3. ATS UI guardrails for publish workflow.
4. Documentation for operations and rollout.

Required SQL Editor workflow (Supabase):

1) Use Supabase Dashboard -> SQL Editor for all schema/policy/function changes.
2) Put all SQL in one migration file that is safe to re-run.
3) Use Table Editor only for manual verification and admin row seeding.
4) Do not apply policy changes by clicking around the UI only; keep SQL as source of truth.

Required database setup (exact objects):

1) Ensure columns in public.talents:
- public_showcase_consent boolean default false
- public_showcase_consent_at timestamptz
- consent_policy_version varchar(50)
- consent_source varchar(100)
- created_by uuid
- updated_by uuid

2) Create authorization table:
- public.ats_admins(user_id uuid primary key references auth.users(id) on delete cascade, can_publish boolean default false, created_at timestamptz default now())

3) Enable RLS:
- public.talents
- public.ats_admins

4) Policies:
- authenticated users can read own ats_admins row
- only users present in ats_admins can manage talents
- optional stricter policy: only can_publish=true can set verified/public_showcase_consent to true

5) Public RPC for Romega Solutions website:
- Function: public.get_public_talents()
- security definer
- returns only public-safe fields
- filters verified=true and public_showcase_consent=true
- grant execute to anon, authenticated
- revoke public execute

6) Do not weaken security:
- do not disable RLS
- do not grant anon direct select on full talents table unless explicitly needed

Required SQL migration template (generate and adapt exactly):

```sql
begin;

-- 1) Add ATS governance columns to talents
alter table if exists public.talents
   add column if not exists public_showcase_consent boolean not null default false,
   add column if not exists public_showcase_consent_at timestamptz,
   add column if not exists consent_policy_version varchar(50),
   add column if not exists consent_source varchar(100),
   add column if not exists created_by uuid,
   add column if not exists updated_by uuid;

-- Optional FK constraints (safe if auth.users exists and ids align)
do $$
begin
   if not exists (
      select 1
      from pg_constraint
      where conname = 'talents_created_by_fkey'
   ) then
      alter table public.talents
         add constraint talents_created_by_fkey
         foreign key (created_by) references auth.users(id) on delete set null;
   end if;

   if not exists (
      select 1
      from pg_constraint
      where conname = 'talents_updated_by_fkey'
   ) then
      alter table public.talents
         add constraint talents_updated_by_fkey
         foreign key (updated_by) references auth.users(id) on delete set null;
   end if;
end
$$;

-- 2) ATS admins table
create table if not exists public.ats_admins (
   user_id uuid primary key references auth.users(id) on delete cascade,
   can_publish boolean not null default false,
   created_at timestamptz not null default now()
);

-- 3) RLS
alter table public.talents enable row level security;
alter table public.ats_admins enable row level security;

-- 4) Helper predicates
create or replace function public.is_ats_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
   select exists (
      select 1
      from public.ats_admins a
      where a.user_id = uid
   );
$$;

create or replace function public.can_publish_talent(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
   select exists (
      select 1
      from public.ats_admins a
      where a.user_id = uid
         and a.can_publish = true
   );
$$;

revoke all on function public.is_ats_admin(uuid) from public;
revoke all on function public.can_publish_talent(uuid) from public;
grant execute on function public.is_ats_admin(uuid) to authenticated;
grant execute on function public.can_publish_talent(uuid) to authenticated;

-- 5) Policies on ats_admins
drop policy if exists ats_admins_select_self on public.ats_admins;
create policy ats_admins_select_self
on public.ats_admins
for select
to authenticated
using (user_id = auth.uid());

-- 6) Policies on talents (ATS admin write path)
drop policy if exists talents_select_admins on public.talents;
create policy talents_select_admins
on public.talents
for select
to authenticated
using (public.is_ats_admin(auth.uid()));

drop policy if exists talents_insert_admins on public.talents;
create policy talents_insert_admins
on public.talents
for insert
to authenticated
with check (public.is_ats_admin(auth.uid()));

drop policy if exists talents_update_admins on public.talents;
create policy talents_update_admins
on public.talents
for update
to authenticated
using (public.is_ats_admin(auth.uid()))
with check (
   public.is_ats_admin(auth.uid())
   and (
      -- If publishing fields are not turned on, any ATS admin can update
      (
         coalesce(verified, false) = false
         and coalesce(public_showcase_consent, false) = false
      )
      -- If publishing fields are on, require publish permission
      or public.can_publish_talent(auth.uid())
   )
);

drop policy if exists talents_delete_admins on public.talents;
create policy talents_delete_admins
on public.talents
for delete
to authenticated
using (public.is_ats_admin(auth.uid()));

-- 7) Public-safe RPC for website reads
create or replace function public.get_public_talents()
returns table (
   id uuid,
   name varchar,
   role varchar,
   tagline varchar,
   bio text,
   skills text[],
   experience_years integer,
   experience_level varchar,
   availability varchar,
   hourly_rate_min integer,
   hourly_rate_max integer,
   rate_currency varchar,
   location varchar,
   timezone varchar,
   remote_only boolean,
   category varchar,
   subcategories text[],
   avatar_url text,
   portfolio_url text,
   linkedin_url text,
   github_url text,
   featured boolean,
   verified boolean,
   experience_items jsonb,
   updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
   select
      t.id,
      t.name,
      t.role,
      t.tagline,
      t.bio,
      t.skills,
      t.experience_years,
      t.experience_level,
      t.availability,
      t.hourly_rate_min,
      t.hourly_rate_max,
      t.rate_currency,
      t.location,
      t.timezone,
      t.remote_only,
      t.category,
      t.subcategories,
      t.avatar_url,
      t.portfolio_url,
      t.linkedin_url,
      t.github_url,
      t.featured,
      t.verified,
      coalesce(p.metadata -> 'experience_items', '[]'::jsonb),
      t.updated_at
   from public.talents t
   left join public.people p on p.id = t.people_id
   where t.verified = true
      and t.public_showcase_consent = true
   order by t.featured desc, t.updated_at desc;
$$;

revoke all on function public.get_public_talents() from public;
grant execute on function public.get_public_talents() to anon, authenticated;

commit;
```

Required verification SQL (run in SQL Editor after migration):

```sql
-- Confirm tables
select table_name
from information_schema.tables
where table_schema = 'public'
   and table_name in ('talents', 'ats_admins');

-- Confirm required columns in talents
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
   and table_name = 'talents'
   and column_name in (
      'public_showcase_consent',
      'public_showcase_consent_at',
      'consent_policy_version',
      'consent_source',
      'created_by',
      'updated_by'
   )
order by column_name;

-- Confirm RLS enabled
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
   and tablename in ('talents', 'ats_admins');
```

ATS application implementation requirements:
1. Add middleware or server checks to require authenticated user.
2. Add role check against public.ats_admins for all talent write operations.
3. On create/update, set updated_by = auth user id.
4. On create, set created_by = auth user id.
5. Publish action:
   - requires can_publish=true
   - sets verified=true
   - sets public_showcase_consent=true only with explicit consent confirmation
   - sets public_showcase_consent_at=now()
   - sets consent_policy_version and consent_source
6. Add audit log entries for create/update/publish actions if audit table exists.

ATS UI requirements:
1. Editors can save drafts.
2. Only publisher role can click Publish.
3. Publish modal requires explicit consent checkbox and policy version display.
4. Show status badges:
   - Draft
   - Verified
   - Public
5. Prevent accidental unpublish without confirmation.

Testing requirements:
1. Unit tests for authorization checks.
2. Integration tests for RLS behavior using authenticated vs anon paths.
3. Verify anon can call public.get_public_talents() and only sees approved profiles.
4. Verify non-admin authenticated user cannot modify talents.
5. Verify can_publish=false user cannot publish.

Acceptance criteria:
1. Authorized ATS user can add and manage talent records.
2. Only approved records appear in Romega Solutions website.
3. Unapproved records never appear publicly.
4. RLS remains enabled and enforced.
5. No production secrets are hardcoded.

Output format expected from you:
1. File-by-file change summary.
2. Exact SQL migration scripts.
3. API/service code changes.
4. UI component changes.
5. Test evidence and commands used.
6. Rollback steps.

Important constraints:
1. Keep changes small and safe.
2. Preserve existing production behavior except talent publish flow.
3. Do not remove existing security headers/middleware.
4. Use existing project coding style and conventions.
5. If the ATS schema differs (for example, different rate or experience columns), adapt only the RPC return list while keeping security rules unchanged.

## Prompt End

---

## UI/UX Style Guide: ATS Add/Edit Profile Forms

Use this guide when building the ATS talent profile creation and editing screens.

### Form Architecture

**Page Layout**: Two-column grid for desktop, single-column for mobile
- Left sidebar (25%): Form progress indicator + publish status badge
- Main form area (75%): Sectioned form fields
- Right sidebar (optional): Real-time preview of public profile card

### Form Structure (Recommended Field Order)

#### **Section 1: Basic Identity** (Required)
```
┌─────────────────────────────────────────────┐
│ BASIC IDENTITY                              │
├─────────────────────────────────────────────┤
│ Full Name           [__________________]     │
│ Email               [__________________]     │
│ Role/Title          [__________________]     │
│ Tagline (one-liner) [__________________]     │
│                     (max 120 characters)     │
│ Bio / About         [_____________________] │
│                     [_____________________] │
│                     (max 500 characters)     │
└─────────────────────────────────────────────┘
```

#### **Section 2: Professional Profile** (Required)
```
┌─────────────────────────────────────────────┐
│ PROFESSIONAL PROFILE                        │
├─────────────────────────────────────────────┤
│ Experience Level    [Senior          ▼]     │
│                     Options:                 │
│                     Junior / Mid / Senior    │
│ Years of Experience [__] years               │
│ Location            [__________________]     │
│ Timezone            [UTC-05:00      ▼]      │
│ Remote Only         [ ] Yes, I prefer       │
│                         remote only          │
│ Availability        [Available      ▼]      │
│                     Options:                 │
│                     Available / Busy /       │
│                     Part-time / Unavailable  │
└─────────────────────────────────────────────┘
```

#### **Section 3: Skills & Expertise** (Required)
```
┌─────────────────────────────────────────────┐
│ SKILLS & EXPERTISE                          │
├─────────────────────────────────────────────┤
│ Category            [Web Development ▼]     │
│ Skills (add tags)   [Type skill...    ▼]   │
│                     [React  ✕] [Node ✕]    │
│                     [TypeScript ✕]         │
│                     [+ Add skill]           │
│ Sub-categories      [Web Dev ✕]            │
│                     [Database ✕]           │
│                     [+ Add category]        │
└─────────────────────────────────────────────┘
```

#### **Section 4: Rates & Market Position** (Optional)
```
┌─────────────────────────────────────────────┐
│ RATES & AVAILABILITY                        │
├─────────────────────────────────────────────┤
│ Hourly Rate Min     [USD $ |_____]          │
│ Hourly Rate Max     [USD $ |_____]          │
│ Currency            [USD            ▼]      │
│ Featured Talent     [ ] Highlight this      │
│                         profile (premium)   │
└─────────────────────────────────────────────┘
```

#### **Section 5: Links & Portfolio** (Optional)
```
┌─────────────────────────────────────────────┐
│ LINKS & PORTFOLIO                           │
├─────────────────────────────────────────────┤
│ Portfolio URL       [https://______...]     │
│ LinkedIn Profile    [https://linkedin...]   │
│ GitHub Profile      [https://github...]     │
│ Avatar / Photo      [📷 Upload Image    ]  │
│                     (optional, max 5MB)     │
└─────────────────────────────────────────────┘
```

#### **Section 6: Publication Settings** (Admin Only, With Warnings)
```
┌─────────────────────────────────────────────┐
│ PUBLICATION & CONSENT                       │
├─────────────────────────────────────────────┤
│ Profile Status      [Draft / Published]     │
│                     ⓘ Draft = Visible only  │
│                       to ATS admins         │
│                                             │
│ Verification        [ ] Mark as Verified   │
│                     ⚠ Only verified        │
│                     profiles appear public  │
│                                             │
│ Public Consent      [ ] Consent to Publish │
│                     ⓘ Talent agrees to      │
│                     appear on website       │
│                                             │
│ Consent Date        [________________]     │
│ Consent Source      [Form / Email / ▼]    │
│ Policy Version      [2026-03-20]           │
│                                             │
│ [PUBLISH]  [DRAFT]  [CANCEL]              │
│                                             │
│ ⓘ Publishing requires BOTH:               │
│   - Verified checkbox ✓                    │
│   - Public consent ✓                       │
└─────────────────────────────────────────────┘
```

### Input Field Types & Validation

| Field | Type | Validation | Example |
|-------|------|-----------|---------|
| **Name** | Text | Required, 2-100 chars | "Alymar T." |
| **Email** | Email | Required, valid format | "tantiadoalymar18@gmail.com" |
| **Role** | Combobox + Text | Required, 3-100 chars | "Web Developer" |
| **Tagline** | Text | Optional, max 120 chars | "Junior focused on practical systems" |
| **Bio** | Textarea | Optional, max 500 chars | Multi-line, spell-check |
| **Experience Level** | Dropdown | Fixed enum (Junior/Mid/Senior/Lead) | "Senior" |
| **Years** | Number | Required, 0-50 | "1" |
| **Location** | Autocomplete/Text | Optional, city/region | "Bohol, Philippines" |
| **Timezone** | Dropdown | IANA timezone list | "Asia/Manila" |
| **Remote** | Checkbox | Boolean | true/false |
| **Availability** | Dropdown | Fixed enum | "Available" |
| **Category** | Dropdown | Fixed categories | "development" |
| **Skills** | Tag input | Multi-select, autocomplete | ["PHP", "JavaScript"] |
| **Sub-categories** | Tag input | Multi-select | ["web dev", "databases"] |
| **Rate Min/Max** | Currency | Number, min ≤ max | "10" / "18" |
| **Currency** | Dropdown | ISO 4217 codes | "USD" |
| **Featured** | Checkbox | Boolean | true/false |
| **Portfolio URL** | URL | Optional, must be valid URL | "https://hr.calapebohol.com" |
| **Avatar** | File Upload | JPG/PNG, <5MB, 400x400px | image.jpg |

### Button & Action Patterns

#### **Primary Action: Publish Profile**
```
[🔒 PUBLISH PROFILE]  (Blue, prominent)
├─ Checks: verified=true & consent=true
├─ On click: Show confirmation modal
├─ Modal: "This profile will appear on Romega Solutions website"
└─ Confirmation required before final publish
```

#### **Secondary Actions**
```
[SAVE AS DRAFT]       (Gray outline)
└─ Saves without publishing; person stays private

[PREVIEW PUBLIC]      (Secondary blue)
└─ Opens read-only view of public profile card

[DELETE]              (Red, dangerous)
└─ Confirmation modal: "Permanently delete this profile?"
```

#### **Danger Zone / Conditional Actions**
```
IF published=true:
  [UNPUBLISH] (Yellow warning)
  └─ Confirmation: "Remove from website?"
  
IF verified=true:
  [UNVERIFY] (Red warning)
  └─ Confirmation: "This will hide from public"
```

### Status Indicators & Badges

```
┌─ Profile Status Sidebar ─┐
│                          │
│ ⚪ DRAFT                 │
│    Visible to ATS only   │
│                          │
│ vs.                      │
│                          │
│ 🟢 PUBLISHED             │
│    Active on website     │
│                          │
│ Checklist:              │
│  ☐ Verified             │
│  ☐ Public Consent       │
│  ✓ Profile Complete     │
│                          │
└──────────────────────────┘
```

### Responsive Design Rules

**Desktop (≥1024px)**
- Two-column: Form (70%) + Sidebar (30%)
- Section width: 600px max
- Inputs: Full width within section

**Tablet (768-1023px)**
- Single column, form full width
- Sidebar collapses to top status bar
- Preview card below form

**Mobile (<768px)**
- Single column, form full width
- No sidebar (status in header)
- Sections stack vertically
- Inputs full width
- Buttons stack full-width

### Color Scheme Reference

Align with Romega brand:
```
Primary:     [RGB: 0, 102, 204]    (Blue for CTAs)
Success:     [RGB: 34, 177, 76]    (Green for "Published")
Warning:     [RGB: 255, 152, 0]    (Orange for "Unpublish")
Danger:      [RGB: 244, 67, 54]    (Red for "Delete")
Neutral:     [RGB: 96, 125, 139]   (Gray for disabled/draft)
```

### Form Submission Flow

```
User fills form → Validates → Saves draft → 
  → Ready to publish?
     ├─ If NO: Show incomplete checklist
     └─ If YES: Enable [PUBLISH] button
        → Click → Confirmation modal → 
          → Set verified=true, consent=true, published_at=now() →
            → API response → Redirect to published profile view
```

### Error & Validation Messages

**Field-level errors**:
```
Email                [__________________]
❌ Invalid email format. Use: name@domain.com
```

**Form-level warnings**:
```
⚠️  To publish: Mark as Verified AND get Public Consent
    2 of 2 items required
```

**Success feedback**:
```
✓ Profile published successfully!
  View on website: [Link to public profile]
```

### Accessibility (WCAG 2.1 AA)

- All form labels explicit with `<label for="id">`
- Keyboard navigation: Tab through all fields in logical order
- Error messages linked to fields via `aria-describedby`
- Colors not sole indicator (use icons + text)
- Minimum font size: 14px
- Button min height: 44px (mobile touch target)

---

## Prompt End

---

## How to use

1. Open your Romega ATS project.
2. Paste the Prompt Start to Prompt End block into your AI coding assistant.
3. Ask it to implement in one small PR with migrations and tests.
4. Review SQL and policy changes before applying to production.
