# IT Governance Self-Assessment Report
**Company Name:** Romega Solutions  
**Headquarters:** 222 Pacific Coast Hwy, #10, El Segundo, CA 90245, US  
**Years in Operation:** 2 Years  
**Number of Employees:** 20  
**Nature of Business:** Technology, Information and Internet, Market Intelligence  
**Assessment Date:** March 3, 2026  
**Prepared By:** Internal Review — Engineering Team

---

## Data Privacy Policy Statement

**In Plain Terms:**  
Romega Solutions takes privacy seriously. When we collect your information — whether through our contact form, career page, or talent pool — we only use it for the purpose you gave it to us (e.g., to respond to your inquiry or consider you for a role). We do not sell or share your data with third parties. You can ask us to delete your data at any time.

**In Technical Terms:**  
Romega Solutions collects personal data (name, email, phone, message content) through contact and career form submissions processed server-side via Next.js API routes ([`app/api/contact/route.ts`](../app/api/contact/route.ts), [`app/api/careers/route.ts`](../app/api/careers/route.ts)). Data is stored in a cloud-hosted Supabase (PostgreSQL) database. All submissions are validated and sanitized using [`lib/security/validation.ts`](../lib/security/validation.ts) before storage. The confidential talent pool is explicitly described as GDPR-compliant in the company spec. Secrets (API keys, SMTP credentials) are managed via Docker Secrets ([`secrets/`](../../secrets/)) and environment variables — never committed to the repository. Sensitive data is obfuscated in logs via [`lib/security/env-validation.ts`](../lib/security/env-validation.ts).

---

## Rating Scale

| Score | Label |
|-------|-------|
| **4** | Strongly Agree |
| **3** | Agree |
| **2** | Disagree |
| **1** | Strongly Disagree |

---

## I. BUSINESS STRATEGY

### 1. The business strategy has been documented, business objectives defined, and the role of IT clearly spelled out.

**Rating: 4 — Strongly Agree**

> **Plain Terms:** Romega's mission, vision, core values, and all six service lines (RPO, BPO, Strategic HR, Quality Hire, Mentoring, Teaching) are written down in a master company spec. IT's function — running the website, talent platform, and client-facing systems — is clearly tied to these goals.
>
> **Technical Terms:** [`ROMEGA_SPEC.md`](../../ROMEGA_SPEC.md) documents mission, vision, core values (RO-ME-GA framework), all service offerings with measurable KPIs (e.g., 95% retention, 2-week fill time), and company details. The website (`romega-next/`) directly enables the core business through the talent acquisition portal, contact pipeline, and public brand presence. IT delivery is governed by [`AGENTS.md`](../../AGENTS.md), which defines the engineering playbook, CI/CD rules, and agentic development standards.

---

### 2. IT issues and opportunities have been adequately assessed and reflected in the organization's strategy (long-term and short-term).

**Rating: 3 — Agree**

> **Plain Terms:** The company actively improves its tech stack and has documented plans for the website, email systems, database, and monitoring. However, a formal IT risk register or separate IT strategy document that maps every business objective to an IT initiative does not yet exist.
>
> **Technical Terms:** Short-term IT improvements are tracked via [`AGENTS.md`](../../AGENTS.md) (sprint-style agent loops, PR caps, safe categories). Numerous planning docs exist: [`TALENT_PAGE_COMPLETE_PLAN.md`](TALENT_PAGE_COMPLETE_PLAN.md), [`PHASE_2_GUIDE.md`](PHASE_2_GUIDE.md), [`PROXY_MIGRATION.md`](PROXY_MIGRATION.md), [`VERCEL_CDN_SETUP.md`](VERCEL_CDN_SETUP.md). A dedicated long-range IT strategy document aligned to a 3–5 year business horizon is not yet formalized.

---

### 3. Assessments are made periodically to ensure that IT initiatives support the organizational mission and goals.

**Rating: 3 — Agree**

> **Plain Terms:** The team regularly reviews the system through automated testing (unit tests + E2E) and security scans. Updates are made in small, safe batches. However, a formal calendar-based IT assessment schedule (e.g., quarterly review meetings with documented outcomes) is not yet established.
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) enforces a continuous agent execution loop with hard safety caps (max 5 PRs/day, 30-min max runtime). CI pipelines run `npm run lint`, `npm test`, and `E2E_TEST=1 npm run test:e2e` on every change. Security scans are scripted in [`script/security-scan.sh`](../../script/security-scan.sh) and [`script/security-scan.bat`](../../script/security-scan.bat). There is no documented quarterly review process with board-level sign-off.

---

### 4. Major developments in technology (hardware, software, communications) have been assessed for business strategy impact.

**Rating: 3 — Agree**

> **Plain Terms:** The company actively tracks technology changes — for example, they have already built AI/ML upskilling workshops into their service offering and keep their own website stack updated. No formal technology horizon-scanning report is produced, but the team responds quickly when changes are needed.
>
> **Technical Terms:** The stack uses current LTS tooling: Next.js (latest version per `package.json`), Supabase for managed Postgres, Resend/Nodemailer for transactional email, Docker + Alpine for containers. Architecture decisions are logged in docs like [`MIGRATION_FROM_HTML_TO_NEXTJS.md`](MIGRATION_FROM_HTML_TO_NEXTJS.md) and [`PROXY_MIGRATION.md`](PROXY_MIGRATION.md). No formal technology assessment report tied to business impact cycles is documented yet.

---

### 5. The business strategy incorporates recognized information security frameworks (e.g., NIST, ISO 27001).

**Rating: 2 — Disagree**

> **Plain Terms:** The company has strong security practices in place, but it has not formally adopted a named framework like NIST or ISO 27001. Security is implemented practically (rate limiting, headers, etc.) rather than mapped to a recognized standard with certifications.
>
> **Technical Terms:** [`SECURITY_IMPLEMENTATION.md`](SECURITY_IMPLEMENTATION.md) and [`SECURITY_GUIDE.md`](SECURITY_GUIDE.md) document multi-layer defenses (application, network, container) consistent with NIST SP 800-53 control families (AC, SI, SC, RA), but no formal NIST or ISO 27001 alignment mapping document exists. No third-party certification has been pursued.

---

### 6. Strategic planning includes regular audits to ensure IT operations meet international and local industry security standards.

**Rating: 2 — Disagree**

> **Plain Terms:** The company runs automated security scans and checks its code regularly, but has not yet scheduled formal external audits by a third party to verify compliance with international standards.
>
> **Technical Terms:** Internal automated scanning is present via [`script/security-scan.sh`](../../script/security-scan.sh). The [`SECURITY_ASSESSMENT_RESPONSE.md`](SECURITY_ASSESSMENT_RESPONSE.md) was produced in response to an external university request (February 2026), which indicates reactive rather than proactive audit scheduling. No annual third-party penetration test or compliance audit cycle is documented.

---

### 7. The organization's long-term strategy includes provisions for compliance with national and international data protection laws (e.g., GDPR, Data Privacy Act).

**Rating: 3 — Agree**

> **Plain Terms:** GDPR compliance is specifically called out as a feature of the talent pool. The contact and application forms are built to collect only what is needed. However, a formally published, board-approved privacy compliance roadmap does not yet exist as a document.
>
> **Technical Terms:** [`ROMEGA_SPEC.md`](../../ROMEGA_SPEC.md) explicitly states the talent pool is "fully confidential and GDPR-compliant." Input validation in [`lib/security/validation.ts`](../lib/security/validation.ts) limits data collection to required fields. Docker Secrets and `.env` exclusions in `.dockerignore` prevent credential leakage. A dedicated Data Protection Impact Assessment (DPIA) or formal GDPR compliance register is not yet documented.

---

### 8. Legal and regulatory compliance requirements regarding data security are reviewed at the board level as part of organizational risk management strategy.

**Rating: 2 — Disagree**

> **Plain Terms:** As a 20-person, 2-year-old company, it does not yet have a formal board-level risk committee that reviews data security compliance on a scheduled basis. The founder/CEO likely handles this informally.
>
> **Technical Terms:** No board-level risk register, minutes, or governance framework document exists in the repository. Compliance-related decisions (e.g., choice of Supabase, GDPR mention in spec) appear to be made at the engineering/leadership level without a documented governance review process.

---

## II. LONG-TERM IT STRATEGY

### 1. A long-term IT strategy exists and is documented.

**Rating: 2 — Disagree**

> **Plain Terms:** There are lots of useful guides for how the website works and how to deploy it, but there is no single document that lays out "where do we want our technology to be in 3 years?"
>
> **Technical Terms:** The `docs/` directory contains over 30 operational guides covering specific topics (Docker, security, SEO, monitoring, email setup). [`AGENTS.md`](../../AGENTS.md) defines the development operations contract. However, there is no dedicated long-range IT strategy document covering a 3–5 year IT roadmap with milestones, investment plans, or alignment to business objectives.

---

### 2. The long-term plan covers existing and proposed hardware/networking architecture and its rationale.

**Rating: 3 — Agree**

> **Plain Terms:** The current system architecture is well-described — the website, database, email, monitoring, and container setup are all documented. What's missing is a forward-looking "this is where the architecture will grow" plan.
>
> **Technical Terms:** [`DOCKER.md`](DOCKER.md) documents the multi-stage build rationale. [`MONITORING_SETUP.md`](MONITORING_SETUP.md) maps the observability stack (Prometheus + Grafana + Loki + Promtail). [`SECURITY_ASSESSMENT_RESPONSE.md`](SECURITY_ASSESSMENT_RESPONSE.md) details the system architecture (Next.js, Nginx, Docker, Supabase). [`VERCEL_CDN_SETUP.md`](VERCEL_CDN_SETUP.md) covers CDN architecture. No multi-year architecture evolution plan exists.

---

### 4. Standards for hardware/software are prescribed by the proposed architecture.

**Rating: 3 — Agree**

> **Plain Terms:** The team has clear rules about which tools to use: which Node version, which package manager, which security practices. These are enforced by code and configuration files, not just guidelines.
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) mandates `npm ci` as the only install command (lockfile-enforced). [`next.config.ts`](../next.config.ts) enforces build-time standards (source map disabled in prod, `poweredByHeader: false`). Docker Compose and Dockerfile enforce Alpine Linux and non-root user as standard. [`eslint.config.mjs`](../eslint.config.mjs) enforces code style standards. [`tsconfig.json`](../tsconfig.json) enforces TypeScript strict mode.

---

### 5. Strategy for outsourcing, in-sourcing, off-the-shelf software, and information security architecture.

**Rating: 3 — Agree**

> **Plain Terms:** The company uses a deliberate mix: Supabase for the database (outsourced/cloud), Resend for email (SaaS), Vercel (CDN option), but builds its own security logic and website in-house. The rationale for these choices is visible across the docs, even if not in one summary document.
>
> **Technical Terms:** Documented outsourcing decisions: Supabase (managed Postgres) in [`TALENT_SUPABASE_SETUP.md`](TALENT_SUPABASE_SETUP.md), Resend transactional email in [`RESEND_SETUP.md`](RESEND_SETUP.md), Vercel CDN option in [`VERCEL_CDN_SETUP.md`](VERCEL_CDN_SETUP.md). In-house: security middleware ([`lib/security/`](../lib/security/)), proxy layer ([`proxy.ts`](../proxy.ts)), monitoring stack ([`docker-compose.yaml`](../../docker-compose.yaml)). No single "build-vs-buy" decision matrix document.

---

### 6. The IT department's organizational structure is documented and made part of the IT plan.

**Rating: 2 — Disagree**

> **Plain Terms:** There is no org chart or "who is responsible for what in IT" document. For a 20-person company this is common, but it is a gap.
>
> **Technical Terms:** No `TEAM_STRUCTURE.md` or IT RACI matrix exists in the repository. [`AGENTS.md`](../../AGENTS.md) defines automation agent responsibilities but does not map human roles (e.g., who owns the Grafana dashboards, who approves production deployments, who holds the Supabase service role key).

---

### 7. The IT long-range plan supports the achievement of the organization's overall mission and goals.

**Rating: 3 — Agree**

> **Plain Terms:** The technology built directly serves the mission: the talent platform enables the recruitment business, the website supports brand credibility, and the AI workshop delivery aligns with the "teaching" service line. The connection exists but is implicit rather than formally mapped.
>
> **Technical Terms:** The application enables core revenue services: `/app/talent/` powers RPO/talent acquisition, `/app/careers/` supports employer branding, `/app/contact/` enables client acquisition. Metrics tracked include request latency and uptime (Prometheus), which directly support service reliability goals. Formal mapping of IT KPIs to business KPIs (e.g., website uptime → client conversion rate) is not yet documented.

---

### 8. Before changing the long-term IT plan, management assesses existing systems — particularly security, threats, vulnerabilities, and risks.

**Rating: 3 — Agree**

> **Plain Terms:** Before making changes to the system, the team runs security checks, code linting, and automated tests. The AGENTS.md playbook specifically forbids security-weakening changes without human approval. However, a formal risk assessment sign-off process before major IT changes is not documented.
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) Section 0 hard-bans "security weakening in production" and requires CI green (lint, unit, E2E) before merging. Section 5 lists "auth/security/middleware behavior changes" as requiring explicit human approval. [`SECURITY_ASSESSMENT_RESPONSE.md`](SECURITY_ASSESSMENT_RESPONSE.md) demonstrates a retrospective assessment was conducted. No pre-change security risk assessment template or sign-off log exists.

---

## III. INFORMATION SYSTEM SECURITY POLICY

### 1. A well-documented security policy is available.

**Rating: 4 — Strongly Agree**

> **Plain Terms:** The company has written down, in detail, how it protects its systems. This includes what tools block attacks, how passwords and credentials are handled, and what to do to add security to new features.
>
> **Technical Terms:** [`SECURITY_IMPLEMENTATION.md`](SECURITY_IMPLEMENTATION.md) provides a full summary of all security controls across application, network, and container layers. [`SECURITY_GUIDE.md`](SECURITY_GUIDE.md) is an operational guide for developers. [`SECURITY_QUICK_REFERENCE.md`](SECURITY_QUICK_REFERENCE.md) provides a rapid lookup. [`SECURITY_ASSESSMENT_RESPONSE.md`](SECURITY_ASSESSMENT_RESPONSE.md) provides an external-facing disclosure. Together these constitute a comprehensive, multi-document security policy.

---

### 2. An inventory of IT assets has been made part of the policy.

**Rating: 2 — Disagree**

> **Plain Terms:** We know what systems we run (website, database, email service, monitoring stack), but there is no formal list/register of all IT assets (hardware, software licenses, cloud accounts, API keys) maintained as a living document.
>
> **Technical Terms:** Assets are implicitly inventoried — `docker-compose.yaml` lists all running services (romega-website, grafana, prometheus, loki, promtail), [`ENVIRONMENT_SETUP.md`](ENVIRONMENT_SETUP.md) lists all third-party services (Supabase, Resend, EmailJS, SMTP). However, no formal Configuration Management Database (CMDB) or asset inventory register is maintained as a policy artifact.

---

### 3. The inventory of IT assets is kept regularly updated.

**Rating: 2 — Disagree**

> **Plain Terms:** The tools and systems in use are kept up-to-date technically (packages update, Docker images rebuild), but there is no scheduled review to add new assets to a formal registry.
>
> **Technical Terms:** `package.json` and `docker-compose.yaml` implicitly reflect current asset state and are updated per-deployment. No automated asset discovery tool (e.g., AWS Config, Snipe-IT) or scheduled manual audit is documented. `npm ci` lockfile enforcement ensures dependency consistency but is not a substitute for asset management.

---

### 4. Policies related to IT activities are listed in the security policy.

**Rating: 3 — Agree**

> **Plain Terms:** There are specific rules documented for how to write secure code, how to handle secrets, how to set up new API routes safely, and how to run the CI pipeline. Most key IT activities have a written policy.
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) covers CI/CD policy, branch naming, PR size limits, merge rules. [`SECURITY_GUIDE.md`](SECURITY_GUIDE.md) covers API route protection, input validation, and environment variable handling. [`DOCKER_QUICKREF.md`](DOCKER_QUICKREF.md) covers container operations policy. Gaps: no formal acceptable use policy (AUP), no BYOD/remote work policy, no change management policy document.

---

### 5. The policy takes into account the business strategy/plan for the next 3 to 5 years.

**Rating: 2 — Disagree**

> **Plain Terms:** The security policy is very good at protecting what exists today. It does not yet plan ahead for "what new security challenges will we face when we add 50 more clients" or "what if we expand into healthcare data?"
>
> **Technical Terms:** Current security policy is reactive and operational (covers the existing Next.js/Docker/Supabase stack). No forward-looking threat modeling document exists for planned expansions (e.g., HIPAA compliance if health clients onboard, SOC 2 preparation if enterprise clients require it). The policy references "the next 3 to 5 years" is not addressed anywhere in the documentation.

---

### 6. The policy takes into account legal requirements.

**Rating: 3 — Agree**

> **Plain Terms:** The privacy policy mentions GDPR. The talent pool is built to be GDPR compliant. The contact forms only collect what is legally necessary. However, a full legal compliance checklist (e.g., California Consumer Privacy Act, CAN-SPAM) is not formally part of the policy document.
>
> **Technical Terms:** GDPR compliance referenced in [`ROMEGA_SPEC.md`](../../ROMEGA_SPEC.md). Rate limiting and honeypot anti-bot fields in [`lib/security/validation.ts`](../lib/security/validation.ts) support CAN-SPAM anti-spam compliance for email forms. HTTPS requirement enforced in [`lib/security/env-validation.ts`](../lib/security/env-validation.ts). No formal legal compliance matrix (CCPA, CAN-SPAM, GDPR) mapped to implemented controls.

---

### 7. The policy takes into account regulatory requirements.

**Rating: 2 — Disagree**

> **Plain Terms:** The company is aware of GDPR and builds with it in mind, but there is no documented review of all applicable regulations (California's CCPA, federal data laws, sector-specific rules) and a formal sign-off that the policy addresses each one.
>
> **Technical Terms:** No regulatory compliance register exists. The company operates in the US and handles EU talent data (GDPR) and California residents (CCPA). No documented CCPA "notice at collection" policy, no data processing agreements (DPAs) with Supabase/Resend are referenced in the codebase. [`VULNERABILITY_ASSESSMENT_EMAIL.md`](VULNERABILITY_ASSESSMENT_EMAIL.md) and [`CAREERS_SECURITY_FIXES.md`](CAREERS_SECURITY_FIXES.md) address specific vulnerability findings but not a regulatory framework.

---

### 8. The policy has been approved and adopted by the board of directors/top management.

**Rating: 2 — Disagree**

> **Plain Terms:** The security practices are applied and enforced in the code, but there is no written sign-off or approval record from the CEO or leadership team formally adopting the security policy as company policy.
>
> **Technical Terms:** No version-controlled policy document with a signature block, approval date, or management sign-off exists in the repository. Policy documents are engineering-authored operational guides. For a 20-person company, the CEO/founder likely informally endorses these, but no governance artifact captures this.

---

### 9. The policy has been communicated to all concerned and is understood by them.

**Rating: 3 — Agree**

> **Plain Terms:** Developers working on the codebase have access to all the security guides and the playbook (AGENTS.md). The AGENTS.md file is the "source of truth" for how to work on the project. However, there is no record of scheduled training sessions or acknowledgment sign-offs from all staff.
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) is required reading for all contributors (agents and humans) per its own preamble ("Agents must follow this file strictly"). Security guides are in the [`docs/`](.) directory, co-located with the codebase. No onboarding checklist, training log, or policy acknowledgment mechanism (e.g., signed PDF, HR system record) is documented.

---

## IV. INCIDENT MANAGEMENT (Incident Response, Business Continuity, Disaster Recovery)

### 1. A formal Incident Response Plan (IRP) exists with a designated team and defined roles.

**Rating: 2 — Disagree**

> **Plain Terms:** There are automatic alerts and monitoring set up to catch problems, but there is no written plan that says "if the website goes down or gets hacked, here is who gets called, in what order, and what they must do."
>
> **Technical Terms:** [`AGENTS.md`](../../AGENTS.md) Section 7 mandates alerting for agent run failure rate >30%, E2E failures, Prometheus target down, and Loki ingestion errors — these are detective controls. However, no Incident Response Plan document exists defining an incident commander, escalation path, severity classification, SLA targets, or communication templates. No `INCIDENT_RESPONSE.md` exists in `docs/`.

---

### 2. Established procedures exist for timely detection, reporting, and escalation of security incidents.

**Rating: 3 — Agree**

> **Plain Terms:** The monitoring stack (Grafana + Prometheus + Loki) will alert the team if something goes wrong. Security threats (SQL injection, XSS, bot scans) are automatically blocked and logged. The gap is that escalation to humans after an alert is not formally scripted.
>
> **Technical Terms:** Detection: Prometheus metrics at `/api/metrics`, Loki log aggregation, Grafana alerting rules (configured in [`monitoring/`](../../monitoring/)). Response: [`proxy.ts`](../proxy.ts) auto-blocks detected threats (rate limiting, pattern matching, bot detection). Automatic IP blocking after repeated violations in [`lib/security/api-protection.ts`](../lib/security/api-protection.ts). Gap: No documented human escalation path (PagerDuty/Slack webhook/on-call rotation).

---

### 3. A Business Continuity Plan (BCP) based on Business Impact Analysis (BIA) exists.

**Rating: 1 — Strongly Disagree**

> **Plain Terms:** There is no written plan for "how do we keep the business running if the website crashes, the database fails, or a key person is unavailable?" This is a significant gap for a company that sells technology-dependent services.
>
> **Technical Terms:** No BCP or BIA document exists in the repository. Docker health checks (`healthcheck` in `docker-compose.yaml`) and Prometheus health metrics (`health_check_status`) provide basic availability monitoring, but these are operational tools, not a business continuity strategy. No RTO/RPO targets are defined. No failover configuration (e.g., multi-region Supabase, CDN fallback) is documented.

---

### 4. A Disaster Recovery Plan (DRP) exists with secure, off-site backups.

**Rating: 2 — Disagree**

> **Plain Terms:** The database is hosted by Supabase, which has its own backup system, and the code is stored in version control (Git). However, there is no written disaster recovery plan that covers what to do if Supabase goes down, if the Docker host fails, or if the domain is lost.
>
> **Technical Terms:** Supabase handles managed Postgres backups (inherited capability, not explicitly configured or documented by Romega). The codebase is in Git (implicit DR for code). [`docker-compose.yaml`](../../docker-compose.yaml) enables fast re-deployment. No explicit DRP document exists defining: backup frequency, retention policy, backup verification procedure, off-site storage location, RTO/RPO, and step-by-step restoration runbook.

---

### 5. IRP, BCP, and DRP are tested at least annually through drills or simulations.

**Rating: 1 — Strongly Disagree**

> **Plain Terms:** Since none of these plans are formally documented yet, they have not been tested through drills or simulations.
>
> **Technical Terms:** E2E tests ([`e2e/`](../e2e/)) test application functionality but are not DR/BCP drills. No chaos engineering exercises, failover tests, or tabletop exercises are documented. This is the most critical gap in the incident management domain.

---

### 6. A post-incident "lessons learned" process and external crisis communication strategy exist.

**Rating: 2 — Disagree**

> **Plain Terms:** The team does review what went wrong with code issues (through PR comments and commit history), but there is no formal "after-action report" process for security incidents, and no PR-ready statement for communicating a breach to customers.
>
> **Technical Terms:** Git history and PR descriptions capture technical post-mortems informally. [`AGENTS.md`](../../AGENTS.md) Section 8 (DoD) requires summarizing changes with "risks + validation steps," which is a lightweight lessons-learned mechanism for code changes. No formal incident post-mortem template, no crisis communications plan, and no breach notification procedure (required under GDPR Article 33 within 72 hours) is documented.

---

## V. PHYSICAL ACCESS CONTROLS

> **Context Note:** Romega Solutions is a US-based company with 20 employees operating in a cloud-first, likely remote/hybrid model. Physical controls below are assessed in the context of both the physical office and the digital/logical access equivalents in the codebase.

### 1. A formal access policy is integrated into the primary security policy.

**Rating: 3 — Agree**

> **Plain Terms:** There are clear rules about who can access the website's code and systems, enforced through GitHub branch protection and container security rules. Physical office access rules are not documented here.
>
> **Technical Terms:** Logical access policy is embedded in [`AGENTS.md`](../../AGENTS.md) (branch protection: no direct pushes to `main`) and [`SECURITY_GUIDE.md`](SECURITY_GUIDE.md) (API route protection with `withSecurity()` wrapper). Docker container runs as non-root (UID 1001) enforcing least privilege at OS level. No physical premises access policy document exists.

---

### 2. A mechanism exists to review and update access permissions on a regular, scheduled basis.

**Rating: 2 — Disagree**

> **Plain Terms:** Access to code and systems is controlled, but there is no calendar reminder or scheduled review to check "does this person still need access? Do any API keys need to be rotated?"
>
> **Technical Terms:** No access review schedule or automated key rotation policy is documented. Supabase API keys are static environment variables. No secret rotation procedure exists in `docs/`. Rate-limit state is in-memory (resets on restart) per [`lib/security/api-protection.ts`](../lib/security/api-protection.ts) — no persistence layer for access reviews.

---

### 3. Access is granted strictly on a "least privilege" or "least access needed" basis.

**Rating: 4 — Strongly Agree**

> **Plain Terms:** The entire system is designed so that each part only has the minimum access it needs. The website process cannot write to most of the system. The database uses a public key for reads and a service key only for admin operations.
>
> **Technical Terms:** Container: [`Dockerfile`](../../Dockerfile) runs as UID 1001 with `cap_drop: [ALL]`. [`docker-compose.yaml`](../../docker-compose.yaml): `read_only: true`, `no-new-privileges: true`. Database: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (read-only public) vs. `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to client). API routes use `withSecurity()` wrapper preventing unauthorized access. Nginx: minimal open ports (port 80 only).

---

### 4. Identification and authorization procedures (badges for physical, credentials for digital) are adequate and verified.

**Rating: 3 — Agree**

> **Plain Terms:** Digital access is verified — API routes check where requests come from, validate credentials, and block suspicious requests. Physical ID/badge procedures for the office are not documented in this system.
>
> **Technical Terms:** `isValidOrigin()` in [`lib/security/validation.ts`](../lib/security/validation.ts) verifies request origin against an allowlist (romegasolutions.com + localhost in dev). CSRF token generation is implemented. Supabase session management is integrated in [`proxy.ts`](../proxy.ts). For physical: no badge system or visitor log policy is documented.

---

### 5. Periodic reviews of access profiles are carried out to ensure only authorized personnel have entry.

**Rating: 2 — Disagree**

> **Plain Terms:** There is no documented schedule where someone checks "who has access to the GitHub repo, the Supabase dashboard, the Grafana panel, and do they still need it?"
>
> **Technical Terms:** No IAM review cadence documented. Grafana default credentials (`admin/admin123`) noted in [`MONITORING_SETUP.md`](MONITORING_SETUP.md) should be changed at first login — no evidence of enforced credential rotation policy. Supabase and Resend API key ownership and access review schedule are not documented.

---

### 6. Access to critical areas or sensitive data is restricted and kept behind locked or encrypted barriers.

**Rating: 4 — Strongly Agree**

> **Plain Terms:** Sensitive parts of the system are locked down: secrets are stored in protected files, the production database requires a special server-side-only key, and the monitoring tools are behind authentication.
>
> **Technical Terms:** Docker Secrets in [`secrets/`](../../secrets/) directory (files, not environment variables). `SUPABASE_SERVICE_ROLE_KEY` is server-side only (never passed to `NEXT_PUBLIC_` env vars). `.dockerignore` explicitly excludes `secrets/`, `.env*`, `*.txt`, `*.key` from container images. Nginx blocks access to `.env`, `.git`, `package.json`, `.sql`, `.backup` files. Source maps disabled in production in [`next.config.ts`](../next.config.ts).

---

### 7. A formal registration or logging process exists for all entry and exit activities.

**Rating: 3 — Agree**

> **Plain Terms:** The system logs all web requests, and the monitoring stack stores these logs centrally. Security incidents (blocked bots, rate-limit violations) are logged. However, there is no HR/facilities visitor log system for physical access.
>
> **Technical Terms:** Promtail ships all container logs to Loki (configured in [`monitoring/promtail-config.yml`](../../monitoring/promtail-config.yml)). Prometheus records HTTP request metrics (total, duration, status) via [`lib/metrics/`](../lib/metrics/). Nginx access logs are collected. Log rotation is configured in `docker-compose.yaml` (limits log flooding). No structured audit log for admin console access (Supabase dashboard, Grafana, GitHub) exists.

---

### 8. Surveillance or monitoring is in place to track access.

**Rating: 4 — Strongly Agree**

> **Plain Terms:** The monitoring stack (Grafana dashboards, Prometheus metrics, Loki logs) continuously watches the system. Any unusual traffic spikes, errors, or suspicious patterns are visible in real time.
>
> **Technical Terms:** Full observability stack: Prometheus scrapes `/api/metrics` every ~10s, Grafana dashboards in [`monitoring/grafana/dashboards/`](../../monitoring/grafana/dashboards/), Loki receives logs from Promtail, `http_requests_total` + `http_request_duration_seconds` + `health_check_status` + `nodejs_heap_size_bytes` + `nodejs_uptime_seconds` are all tracked. [`AGENTS.md`](../../AGENTS.md) Section 6 mandates `agent_run_total`, `agent_run_duration_seconds`, `ci_job_fail_total` Prometheus metrics.

---

### 9. Security awareness training regarding access protocols is conducted across the entire organization.

**Rating: 2 — Disagree**

> **Plain Terms:** The security documentation is thorough for developers, but there is no evidence of company-wide security awareness training (e.g., phishing simulations, lunch-and-learn sessions, mandatory annual training).
>
> **Technical Terms:** Developer-facing security education exists via `docs/` (20+ security-related documents). [`AGENTS.md`](../../AGENTS.md) is engineering-focused. No employee security awareness training program, LMS records, or phishing simulation reports are referenced anywhere in the repository.

---

### 10. Security is maintained at third-party or supplier facilities where the organization's assets or data are processed.

**Rating: 3 — Agree**

> **Plain Terms:** The company chose third-party providers (Supabase, Resend, Vercel) that have their own security certifications. This partially covers this requirement, but the company has not formally reviewed vendor security attestations or signed Data Processing Agreements (DPAs).
>
> **Technical Terms:** Supabase is SOC 2 Type II certified and provides managed security for Postgres. Resend and Vercel have their own security programs. No vendor security assessment questionnaire, DPA register, or third-party risk management framework is documented in the repository. Selection of cloud providers implicitly inherits their security posture.

---

## VI. NETWORK MANAGEMENT

### 1. All platforms, links, and devices have appropriate management; non-compliant parts are reviewed to bring risks to acceptable levels.

**Rating: 3 — Agree**

> **Plain Terms:** All running services (website, Grafana, Prometheus, Loki) are managed together through Docker Compose, and the monitoring stack watches them all. However, personal devices used by the 20 employees to access company systems (laptops, phones) do not have a documented management policy.
>
> **Technical Terms:** All services defined in [`docker-compose.yaml`](../../docker-compose.yaml) are managed as a single unit with health checks, resource limits, and log rotation. Prometheus monitors all containers. Nginx enforces network-level controls. Network policy gaps: no MDM (Mobile Device Management) policy, no VPN requirement for remote admin access, no network segmentation between services beyond Docker internal networking.

---

### 2. Vendor-supplied products have cryptographic functions verified against approved algorithms and key lengths.

**Rating: 2 — Disagree**

> **Plain Terms:** The company uses HTTPS (TLS encryption) everywhere, and Supabase and Resend handle encryption for their services. But the company has not formally audited "what encryption standard does Supabase use? What key length? Is it still secure?" and documented the findings.
>
> **Technical Terms:** TLS enforcement is required in production via [`lib/security/env-validation.ts`](../lib/security/env-validation.ts) (HTTPS URL validation). Supabase uses TLS 1.2/1.3 for connections (inherited, not explicitly configured). No cryptographic standards policy document exists specifying approved algorithms (e.g., AES-256, RSA-2048, ECDSA P-256) or key lengths for vendor products. No formal vendor cryptographic attestation review process is documented.

---

### 3. Background and reference checks are carried out for internal and outsourced vendor staff performing security-related functions.

**Rating: 3 — Agree**

> **Plain Terms:** As an RPO (Recruitment Process Outsourcing) company, background checks and culture-fit diagnostics are a core product offering — this expertise would naturally apply internally. However, no documentation in the codebase or repository confirms that formal background checks are required for employees with admin system access.
>
> **Technical Terms:** Romega's own service offering (Quality Hire, RPO) includes a 4-step Culture Fit Diagnostic and presumably background checks for the staffing they perform for clients. There is no internal HR policy documented in the repository that mandates background checks for employees with privileged access to production systems (Supabase service keys, GitHub admin, Grafana admin). This is a process gap outside the codebase.

---

### 4. Cloud-based network assets (e.g., AWS VPCs, Azure Virtual Networks) are configured according to the organization's security baseline and industry best practices.

**Rating: 3 — Agree**

> **Plain Terms:** The company uses cloud services (Supabase, Vercel/CDN option) that are already well-configured and secure by default. The website itself runs in a hardened Docker container. The gap is a lack of formal documented baseline that all cloud services must be checked against.
>
> **Technical Terms:** Supabase cloud Postgres is configured with Row Level Security (RLS) policies (documented in [`TALENT_SUPABASE_SETUP.md`](TALENT_SUPABASE_SETUP.md) and [`SUPABASE_TALENTS_COMPLETE_SETUP.sql`](SUPABASE_TALENTS_COMPLETE_SETUP.sql)). The self-hosted monitoring stack uses Docker internal networking (not exposed to the internet except on defined ports). Vercel CDN option documented in [`VERCEL_CDN_SETUP.md`](VERCEL_CDN_SETUP.md). No formal Cloud Security Baseline document (CIS Benchmarks or equivalent) is defined.

---

### 5. A formal process exists for managing and auditing access to cloud service provider management consoles (e.g., AWS Management Console, Supabase Dashboard, Vercel Dashboard).

**Rating: 2 — Disagree**

> **Plain Terms:** The team has accounts and logins for Supabase, Resend, Vercel, and GitHub, but there is no formal log of who has admin access, no regular review of those accounts, and no multi-factor authentication (MFA) enforcement policy documented.
>
> **Technical Terms:** [`ENVIRONMENT_SETUP.md`](ENVIRONMENT_SETUP.md) documents which cloud consoles are used (Supabase Dashboard, Resend Dashboard, EmailJS Dashboard, Google Analytics). No IAM access log, no MFA enforcement policy, no privileged access workstation (PAW) requirement, and no cloud console access audit log are documented. Supabase service role key is stored in a secrets file but there is no documented rotation or access review schedule.

---

## Summary Scorecard

| Section | Score | Rating |
|---------|-------|--------|
| **I. Business Strategy** | 23/32 | **Agree — Strong** |
| **II. Long-Term IT Strategy** | 18/32 | **Developing** |
| **III. Information System Security Policy** | 26/36 | **Agree** |
| **IV. Incident Management** | 10/24 | **Significant Gap** |
| **V. Physical Access Controls** | 28/40 | **Agree** |
| **VI. Network Management** | 13/20 | **Agree — Developing** |
| **OVERALL** | **118/184** | **64% — Developing Maturity** |

---

## Top 5 Priority Recommendations

| Priority | Gap Identified | Plain Fix | Technical Fix |
|----------|----------------|-----------|---------------|
| **1** | No Incident Response Plan | Write a one-page "who to call and what to do" for a breach or outage | Create `docs/INCIDENT_RESPONSE_PLAN.md` with severity levels, escalation contacts, SLA targets, and a 72-hour GDPR breach notification checklist |
| **2** | No BCP/DRP | Write down how the business keeps running if the website goes down | Define RTO/RPO targets, document Supabase backup restoration steps, create `docs/DISASTER_RECOVERY_PLAN.md` |
| **3** | No IT Asset Inventory | Keep a live list of all tools, accounts, and API keys the company uses | Create a `docs/ASSET_INVENTORY.md` — list all services (Supabase, Resend, Vercel, GitHub), their owners, access credentials location, and review date |
| **4** | No Cloud Console Access Audit | Schedule a quarterly check of who has admin access to Supabase, Vercel, GitHub, and remove anyone who no longer needs it | Implement MFA on all cloud consoles; document access review schedule in `AGENTS.md` |
| **5** | No formal Security Framework alignment | Pick one framework (NIST CSF is recommended for a company this size) and check the policy against it | Map existing controls in `SECURITY_IMPLEMENTATION.md` to NIST CSF function areas (Identify, Protect, Detect, Respond, Recover) |
