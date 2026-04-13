# Implementation Plan: Applicant Privacy Policy and Consent Alignment

**Branch**: `[002-applicant-privacy-policy-consent]` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-applicant-privacy-policy-consent/spec.md`

## Summary

The website currently uses modal-based legal content for privacy and terms. The privacy text is high-level and does not yet fully reflect the signed Applicant Data Privacy and Consent Agreement structure (collection, purpose, retention, sharing, rights, and explicit consent scopes). The implementation should create one canonical policy source, align all policy entry points, introduce granular consent evidence tracking, and enforce public talent showcase rules so no profile is published without explicit publication consent.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16 App Router  
**Primary Dependencies**: Next.js App Router, existing modal components, Supabase talent data access layer  
**Storage**: Supabase/PostgreSQL for talent and consent metadata  
**Testing**: `npm run lint`, `npm test`, `E2E_TEST=1 npm run test:e2e`  
**Target Platform**: Web (desktop and mobile)  
**Project Type**: Next.js web app  
**Constraints**: No public showcase without explicit consent, no sensitive applicant fields on public pages, legal wording finalized by authorized owner before production release  
**Scope**: Privacy policy content and website consent/publishing controls related to applicant and talent data

## Constitution Check

- **Code Quality and TypeScript Excellence**: Pass if policy and consent logic is centralized and typed, and duplicated legal strings are minimized.
- **Consistent UI/UX and Design System Adherence**: Pass if legal content is readable, accessible, and consistent across footer/contact/modal/page entry points.
- **Accessibility First**: Pass if privacy content is keyboard accessible and readable on mobile; consent controls are label-associated and screen-reader friendly.
- **Performance Optimization**: Pass if legal content rendering does not add heavy client-side overhead.
- **Test Coverage and Quality Assurance**: Pass if consent flow and policy visibility are covered by tests.
- **Security and Production Safety**: Pass if publication gating enforces explicit consent and disallowed data stays private.

## Project Structure

### Documentation (this feature)

```text
specs/002-applicant-privacy-policy-consent/
├── spec.md
└── plan.md
```

### Source Code (planned changes)

```text
components/organisms/shared/
├── PrivacyModal.tsx
└── TermsModal.tsx

components/organisms/layout/
└── Footer.tsx

app/
├── contact/ContactPageClient.tsx
├── privacy/page.tsx                     (new, recommended canonical policy page)
└── talent/[id]/page.tsx                (publication metadata and safe rendering checks)

components/organisms/contact/
└── ContactForm.tsx                      (if applicant consent checkbox/scope capture is needed on this path)

types/
└── jobs.ts                              (consent-related typing additions for talent publication)

lib/supabase/
└── talents.ts                           (query-level publication consent gating)

docs/
└── TALENT_SHOWCASE_LEGAL_CHECKLIST_PH_US.md (reference baseline already added)
```

**Structure Decision**: Keep a canonical privacy policy page as source of truth, and let modals either summarize with a link or render content from a single shared policy source to prevent drift.

## Phase 0 - Finalize Policy Baseline

1. Normalize the signed Applicant Data Privacy and Consent Agreement text into website-ready policy language.
2. Correct all branding/contact details in legal copy.
3. Define policy version format (example: `PP-2026-03-20-v1`).
4. Approve final legal text owner and change-control path.

## Phase 1 - Canonical Privacy Policy Delivery

1. Create a dedicated privacy route (recommended: `/privacy`) with full structured policy sections:
   - Collection of personal data
   - Purpose of processing
   - Retention
   - Sharing and disclosure
   - Security safeguards
   - Applicant rights
   - Voluntary consent statement
2. Update footer/contact/modal entry points to open the canonical policy destination consistently.
3. Keep `PrivacyModal` either as:
   - compact summary + link to full page, or
   - a shared renderer sourced from one policy data file.
4. Add explicit "Last updated" and policy version indicator.

## Phase 2 - Consent Scope Model and Data Contract

1. Define consent scopes aligned with agreement and legal checklist:
   - Required: data processing for recruitment evaluation
   - Optional: retention for future opportunities
   - Optional: sharing with clients/partners for matching
   - Optional and separate: public talent showcase publication
2. Extend talent/applicant data contracts with consent evidence fields.
3. Add migration/schema updates for consent metadata storage.
4. Ensure legacy records default to no publication unless consent evidence exists.

## Phase 3 - Public Showcase Gating and Data Minimization

1. Update talent fetch and rendering logic to enforce publication consent gating.
2. Maintain an allowlist of public-safe fields for talent profiles.
3. Explicitly exclude direct personal contact details and sensitive fields from public pages.
4. Add fallback behavior for records with missing/invalid consent metadata.

## Phase 4 - Rights and Withdrawal Operations

1. Provide clear contact path for access/correction/deletion/withdrawal requests.
2. Define internal SLA and status tracking for data subject requests.
3. Add operation notes/runbook for takedown and consent withdrawal handling.
4. Ensure withdrawal triggers unpublish path for affected profiles.

## Phase 5 - Testing and Verification

1. Unit/component tests:
   - Policy entry points resolve to canonical content
   - Consent gating hides non-consented profiles
   - Public-safe field allowlist is respected
2. E2E tests:
   - Privacy policy accessible from footer and contact page
   - Talent page does not expose blocked fields
   - Non-consented talent profiles are not publicly visible
3. Validation commands:
   - `npm run lint`
   - `npm test`
   - `E2E_TEST=1 npm run test:e2e`

## Risks and Mitigations

- **Risk**: Legal text drift between modal and page.
  - **Mitigation**: Single source of truth for policy content.
- **Risk**: Legacy talent records lack consent evidence.
  - **Mitigation**: Default to unpublished until explicit consent is recorded.
- **Risk**: Sensitive fields exposed through existing types or API payloads.
  - **Mitigation**: Public payload allowlist + tests for forbidden fields.
- **Risk**: Consent collected but not auditable.
  - **Mitigation**: Store policy version, timestamp, and source channel in consent records.

## Validation Plan

- **Functional**: Policy content and consent workflow follow the signed agreement structure.
- **Compliance**: Public showcase follows explicit publication consent rule.
- **Security/Privacy**: Sensitive data remains private by default.
- **Regression**: Existing contact, footer, and talent browsing behaviors remain stable.

## Rollout Strategy

1. Ship policy content and canonical entry points first.
2. Ship consent data model and publication gating second.
3. Run a one-time legacy consent audit before enabling any expanded public showcase.
4. Publish internal operations checklist for takedown/rights requests.

## Open Decisions Before Implementation

- Final legal owner approval workflow and sign-off format.
- Exact retention duration to display publicly (for example, fixed period vs policy-based "reasonable period").
- Whether contact-form consent capture should include future opportunity and public showcase scopes, or if that belongs only to dedicated applicant/talent intake channels.
- Whether to keep modal-first experience or make `/privacy` the primary destination.
