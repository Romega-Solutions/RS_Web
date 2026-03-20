# Sample Talent Profile (Legal-Safe): Alymar Tantiado

Last updated: 2026-03-20
Policy reference: PP-2026-03-20-v1

## 1) Public Profile (Safe to Show on Website)

Use only these details for public pages.

- Display name: Alymar T. (or full name only if separate full-name display consent exists)
- Role: Web Developer
- Tagline: Junior Web Developer focused on responsive web systems and practical municipal solutions
- Location (general): Bohol, Philippines
- Experience level: Junior
- Experience years: 1
- Availability: Available
- Category: development
- Skills:
  - PHP
  - JavaScript
  - HTML
  - CSS
  - MySQL
  - AJAX
  - Bootstrap
  - REST API Integration
  - Git
  - GitHub
  - XAMPP
  - VS Code
- Portfolio links:
  - https://hr.calapebohol.com/
  - https://waterworks.calapebohol.com/

### Public Bio (Sample)

Computer Science graduate with hands-on experience in web development, database workflows, and software support. Built practical systems for municipal operations, including water billing and daily time record processes. Delivers responsive web solutions, meets deadlines, and collaborates well with cross-functional teams.

## 2) Do Not Show Publicly

Keep these fields private/internal only:

- Personal phone number: +63 938 949 5814
- Personal email: tantiadoalymar18@gmail.com
- Exact street/barangay address: Sta. Cruz, Calape, Bohol
- Full raw resume file (unless redacted and separately approved)
- Any government IDs or sensitive personal data

## 3) Internal Backend Record (Private)

Use this for internal database/admin use. Do not expose directly to frontend.

```json
{
  "id": "<uuid>",
  "name": "Alymar Tantiado",
  "email": "tantiadoalymar18@gmail.com",
  "phone": "+639389495814",
  "role": "Web Developer",
  "tagline": "Junior Web Developer focused on responsive web systems and practical municipal solutions",
  "bio": "Computer Science graduate with experience in web development, database management, and software support for municipal systems.",
  "skills": [
    "PHP",
    "JavaScript",
    "HTML",
    "CSS",
    "MySQL",
    "AJAX",
    "Bootstrap",
    "REST API Integration",
    "Git",
    "GitHub",
    "XAMPP",
    "VS Code",
    "Android Studio",
    "Canva"
  ],
  "experience_years": 1,
  "experience_level": "Junior",
  "availability": "Available",
  "location": "Bohol, Philippines",
  "remote_only": true,
  "category": "development",
  "subcategories": ["web development", "backend", "database systems"],
  "portfolio_url": "https://hr.calapebohol.com/",
  "linkedin_url": null,
  "github_url": null,
  "verified": true,
  "featured": false,
  "public_showcase_consent": true,
  "public_showcase_consent_at": "2026-03-20T00:00:00Z",
  "consent_policy_version": "PP-2026-03-20-v1",
  "consent_source": "signed-applicant-consent-form"
}
```

## 4) Public API Output (Sanitized)

Only send this shape to public talent pages.

```json
{
  "id": "<uuid>",
  "name": "Alymar T.",
  "role": "Web Developer",
  "tagline": "Junior Web Developer focused on responsive web systems and practical municipal solutions",
  "bio": "Computer Science graduate with hands-on web and database experience, including municipal web systems.",
  "skills": ["PHP", "JavaScript", "HTML", "CSS", "MySQL", "AJAX", "Bootstrap", "REST API Integration"],
  "experience_years": 1,
  "experience_level": "Junior",
  "availability": "Available",
  "location": "Bohol, Philippines",
  "remote_only": true,
  "category": "development",
  "portfolio_url": "https://hr.calapebohol.com/",
  "public_showcase_consent": true,
  "consent_policy_version": "PP-2026-03-20-v1"
}
```

## 5) Consent Checklist Before Publishing

All must be true before profile goes live:

- Explicit privacy consent captured
- Separate public showcase consent captured
- Consent policy version stored
- Consent timestamp stored
- No personal phone/email/address on public page
- No sensitive personal data in public payload

If any item is missing, do not publish.

## 6) Optional SQL Template (If Needed)

Use this only after confirming your table has consent columns.

```sql
INSERT INTO talents (
  name,
  email,
  phone,
  role,
  tagline,
  bio,
  skills,
  experience_years,
  experience_level,
  availability,
  location,
  remote_only,
  category,
  subcategories,
  portfolio_url,
  verified,
  featured,
  public_showcase_consent,
  public_showcase_consent_at,
  consent_policy_version,
  consent_source
)
VALUES (
  'Alymar Tantiado',
  'tantiadoalymar18@gmail.com',
  '+639389495814',
  'Web Developer',
  'Junior Web Developer focused on responsive web systems and practical municipal solutions',
  'Computer Science graduate with experience in web development, database systems, and practical municipal solutions.',
  ARRAY['PHP','JavaScript','HTML','CSS','MySQL','AJAX','Bootstrap','REST API Integration','Git','GitHub','XAMPP','VS Code'],
  1,
  'Junior',
  'Available',
  'Bohol, Philippines',
  true,
  'development',
  ARRAY['web development','backend','database systems'],
  'https://hr.calapebohol.com/',
  true,
  false,
  true,
  NOW(),
  'PP-2026-03-20-v1',
  'signed-applicant-consent-form'
);
```
