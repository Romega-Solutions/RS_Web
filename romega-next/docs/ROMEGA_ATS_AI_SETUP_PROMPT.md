# Romega ATS AI Setup Prompt

Use this entire prompt as instructions for the AI coding assistant in the Romega ATS codebase.

---

## Prompt Start

You are working inside the Romega ATS repository.

Goal:
Set up secure talent management in ATS so only authorized users can create, edit, verify, and publish talent profiles, while Romega Solutions website can read only approved public profiles.

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

Required database setup (Supabase SQL):

1) Ensure columns in public.talents:
- public_showcase_consent boolean default false
- public_showcase_consent_at timestamptz
- consent_policy_version varchar(50)
- consent_source varchar(100)
- created_by uuid
- updated_by uuid

2) Create authorization table:
- public.ats_admins(user_id uuid primary key, can_publish boolean default false, created_at timestamptz default now())

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

## Prompt End

---

## How to use

1. Open your Romega ATS project.
2. Paste the Prompt Start to Prompt End block into your AI coding assistant.
3. Ask it to implement in one small PR with migrations and tests.
4. Review SQL and policy changes before applying to production.
