# Talent Showcase Legal Checklist (Philippines + United States)

Last updated: 2026-03-20
Owner: Operations + Engineering + Compliance
Applies to: Talent profile pages, resume snippets, candidate case studies, public portfolio pages

## Important Disclaimer

This document is an internal compliance guide, not legal advice. Use this as an operating baseline and have counsel review before launch.

## 1. Can We Publicly Showcase Candidate Resumes?

Short answer: Yes, but only if there is clear, written, specific consent for public website publication.

Core rule: no consent, no publish.

Based on your current applicant situation (some prior applicants have no consent), only publish profiles for candidates who gave explicit publication permission.

## 2. Laws and Rules You Should Consider

| Jurisdiction | Rule / Law | Why it matters for talent showcases | What to do |
|---|---|---|---|
| Philippines | Data Privacy Act of 2012 (RA 10173) + IRR + NPC guidance | Resume data is personal data; public posting is processing/disclosure | Use explicit informed consent, data minimization, secure storage, takedown process |
| Philippines | Sensitive Personal Information rules under RA 10173 | Some resume fields are sensitive and high-risk if exposed | Avoid publishing sensitive fields unless strictly necessary and explicitly consented |
| Philippines | NPC breach notification requirements | If exposed data is breached, reporting obligations can apply | Keep logs, incident playbook, and rapid containment process |
| United States | FTC Act Section 5 (unfair/deceptive practices) | Misleading profile claims or hidden data use can be treated as deceptive | Keep claims accurate, keep privacy notice truthful and complete |
| United States | State privacy laws (for example California CPRA, Virginia VCDPA, Colorado CPA, etc.) | Public profile data collection/use may trigger notice and rights obligations | Publish notice at collection, rights workflow, and deletion handling |
| United States | State breach notification laws | Nearly all states require notice after qualifying breaches | Maintain incident response and legal notification workflow |
| United States | Biometric privacy laws in some states (for example Illinois BIPA) | Face templates, voice prints, or biometric processing is highly regulated | Do not process biometrics for talent pages unless counsel approves |
| United States | Anti-discrimination employment laws (federal and state) | Displaying protected attributes can create discrimination risk | Do not publish protected-class data and avoid biased filters |

## 3. Data You Can Usually Publish (Lower Risk)

Publish only what is needed to market professional capability.

| Field | Risk | Notes |
|---|---|---|
| Public display name (alias or first name + initial) | Low | Prefer alias where possible |
| Professional title (for example Frontend Developer) | Low | Keep factual and current |
| Skills / tools / tech stack | Low | Avoid overstating proficiency |
| Experience range (for example 4-6 years) | Low | Prefer ranges, not exact timelines if unnecessary |
| Portfolio summary and project highlights | Low | Remove client-confidential details |
| Certifications (name + year) | Low to medium | Verify before publishing |
| General location (city + country or timezone) | Medium | Avoid exact address |
| Availability status (Available, Part-time, Busy) | Low | Safe if candidate-approved |
| Compensation range (optional) | Medium | Use ranges only |

## 4. Data Allowed Only With Strong Justification + Explicit Consent

Use only when needed for business value and only with clear opt-in.

| Field | Why high risk | Controls required |
|---|---|---|
| Full legal name | Identifies person directly | Separate consent checkbox for full-name display |
| Candidate photo or video | Personal image/publicity risk | Separate media consent; removal workflow |
| Full work history with exact dates | Re-identification risk | Publish summary form only |
| Education details | Can be treated as sensitive under PH context | Keep broad and optional; require explicit consent |
| Direct profile links (LinkedIn, GitHub) | Traces identity and activity | Candidate confirms each link |

## 5. Data You Should Not Publish Publicly

Do not publish these on open web pages.

| Field type | Examples |
|---|---|
| Direct contact details | Personal email, mobile number, private messaging handles |
| Government identifiers | SSS, TIN, passport, driver license, national IDs |
| Full address and exact birthdate | Street, unit number, full DOB |
| Protected/sensitive attributes | Religion, race, ethnicity, political views, sexual orientation, disability, health data |
| Civil/family details | Marital status, names of spouse/children |
| Background check and legal records | Police clearance details, case history |
| Raw resume files with hidden metadata | DOC/PDF containing author metadata, revision history, embedded contacts |

## 6. Consent Requirements (Minimum Standard)

Use a publication-specific consent flow (not bundled into a general application checkbox).

Consent must be:
- Freely given
- Specific
- Informed
- Unambiguous
- Recorded and retrievable

Store proof of:
- Candidate identity
- Date/time consented
- Exact text they agreed to
- Which fields they approved
- Where it will be published (website URL scope)
- Withdrawal method shown to candidate

## 7. Website and Policy Requirements Before Go-Live

At minimum, publish and implement:
- Privacy Notice with talent-showcase purpose, legal basis, retention, and rights
- Notice at collection for applicants
- Data subject request path (access, correction, deletion, objection)
- Fast takedown channel (email/web form)
- Internal SLA for removal requests (recommended: within 5 business days)
- Data retention rule (recommended review every 6-12 months)

## 8. Recommended Safe Profile Format (Instead of Posting Full Resume)

Use structured profile cards instead of uploading raw resume documents.

Suggested public schema:
- display_name
- title
- skills[]
- experience_range
- certifications_summary
- portfolio_summary
- availability
- location_general
- approved_links[]
- consent_version
- consent_timestamp

Keep private internally:
- personal email
- phone number
- full CV/resume file
- full legal identifiers

## 9. Operational Workflow (No Consent, No Publish)

1. Intake resume internally (private only).
2. Create redacted public profile draft.
3. Send publication consent form listing each field to be displayed.
4. Publish only approved fields.
5. Log consent evidence and profile version.
6. Reconfirm consent on major profile updates.
7. Remove quickly when consent is withdrawn.

## 10. US + PH Risk Reduction Controls

Implement these controls in process and product:
- Role-based access for who can publish/edit profiles
- Audit logs of publish/unpublish actions
- Scheduled consent revalidation (every 12 months)
- Automated checks to block disallowed fields
- Security scanning for accidental PII leaks
- Incident response runbook linked to legal notification steps

## 11. Quick Pre-Publish Checklist

Use this before every profile goes live.

- Candidate has explicit publication consent
- Approved fields match exactly what will be published
- No direct personal contact details shown
- No sensitive/protected data shown
- No raw resume file publicly accessible
- Privacy notice is updated and accessible
- Takedown contact path is visible
- Internal owner is assigned for this profile

If any item is false, do not publish.

## 12. Sample Consent Wording (Draft)

"I agree that Romega Solutions may publish the approved professional profile fields I selected in this form on its public website for talent showcase and client matching purposes. I understand I may withdraw consent at any time by contacting [compliance contact], and Romega Solutions will remove my public profile within the stated policy timeline."

## 13. Recommended Next Internal Actions

1. Add a dedicated Talent Showcase Consent Form (field-by-field approval).
2. Add an internal publish gate in the CMS/admin tool that requires consent evidence.
3. Add a public takedown request page linked from each profile.
4. Ask counsel to review this guide and align it with your final Privacy Notice text.
