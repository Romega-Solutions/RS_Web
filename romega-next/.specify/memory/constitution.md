<!--
Sync Impact Report:
- Version change: none → 1.0.0
- Constitution created from template
- Principles defined: 6 core principles
- Templates sync: ✅ All templates aligned with constitution
- Follow-up TODOs: None
-->

# Roméga Solutions Website Constitution

## Core Principles

### I. Code Quality & TypeScript Excellence (NON-NEGOTIABLE)
All code MUST be:
- Written in TypeScript with strict type checking enabled
- Free of `any` types unless explicitly justified in code comments
- Properly typed with interfaces/types for all function parameters and return values
- Linted and formatted according to project ESLint configuration
- Self-documenting with clear variable/function names

**Rationale**: Static typing prevents runtime errors, improves maintainability, and enables better IDE support and refactoring capabilities.

### II. Consistent UI/UX & Design System Adherence
All UI components MUST:
- Follow BEM (Block Element Modifier) methodology for CSS class naming
- Adhere to Atomic Design principles (Atoms → Molecules → Organisms → Templates → Pages)
- Use existing design system tokens (colors, spacing, typography) from CSS variables
- Be responsive across mobile, tablet, and desktop viewports
- Maintain visual consistency with existing components

**Rationale**: Design system consistency creates cohesive user experiences, reduces development time, and simplifies maintenance.

### III. Accessibility First (WCAG 2.1 AA Compliance)
All interactive elements MUST:
- Include proper ARIA labels and roles
- Be keyboard navigable (tab, enter, escape)
- Provide sufficient color contrast ratios (4.5:1 for text, 3:1 for UI components)
- Use semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, etc.)
- Support screen readers with descriptive text

**Rationale**: Accessible applications are usable by everyone, comply with legal requirements, and improve overall UX for all users.

### IV. Performance Optimization
All features MUST:
- Achieve Lighthouse scores ≥90 (Performance, Accessibility, Best Practices, SEO)
- Lazy-load images and heavy components
- Minimize bundle size (code splitting, tree shaking, dynamic imports)
- Optimize Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)
- Cache static assets appropriately

**Rationale**: Fast-loading applications improve user engagement, SEO rankings, and conversion rates.

### V. Test Coverage & Quality Assurance
All new features MUST include:
- Unit tests for business logic (Vitest) with ≥80% coverage
- Integration tests for API endpoints
- E2E tests for critical user flows (Playwright) with stable selectors (`data-testid`)
- Tests MUST pass before merging (CI gate)
- No disabling of tests to "make CI green"

**Rationale**: Comprehensive testing prevents regressions, documents expected behavior, and enables confident refactoring.

### VI. Security & Production Safety
All code MUST:
- Never weaken production security measures
- Validate and sanitize all user inputs
- Implement rate limiting for API endpoints
- Use environment variables for secrets (never commit credentials)
- Follow OWASP security best practices
- Maintain honeypot protection and CAPTCHA where applicable

**Rationale**: Security vulnerabilities can lead to data breaches, legal liability, and loss of user trust.

## Development Workflow
All changes MUST follow this workflow:
1. **Branch Creation**: Create feature branch from `main` (`feat/description` or `fix/description`)
2. **Implementation**: Write code following all Core Principles
3. **Testing**: Run `npm run lint`, `npm test`, `E2E_TEST=1 npm run test:e2e`
4. **PR Creation**: Open pull request with descriptive title and summary
5. **CI Validation**: All automated checks MUST pass (lint, unit tests, e2e tests, build)
6. **Code Review**: At least one approval required
7. **Merge**: Squash and merge to `main`

**Branch Naming**:
- Features: `feat/<description>`
- Fixes: `fix/<description>`
- Agent work: `agent/YYYY-MM-DD/<topic>`

**PR Size Limits**:
- Target <200 net LOC per PR (unless explicitly approved)
- Max 3 commits per PR (prefer squash)

## Observability & Monitoring
All production code MUST support:
- **Structured Logging**: JSON logs with required fields (`service`, `level`, `timestamp`, `message`, `run_id`, `status`)
- **Metrics Exposure**: Prometheus metrics at `/api/metrics` endpoint
- **Error Tracking**: Comprehensive error handling with meaningful messages
- **Performance Monitoring**: Core Web Vitals tracking

Required Prometheus Metrics:
- `http_request_total{method, route, status}`
- `http_request_duration_seconds{method, route}`
- `agent_run_total{status="success|fail"}`
- `ci_job_fail_total{job="lint|unit|e2e|build"}`

**Rationale**: Observability enables proactive issue detection, performance optimization, and data-driven decision making.

## Technology Stack & Constraints
**Framework**: Next.js 16+ (App Router)
**Language**: TypeScript 5.0+
**UI Library**: React 19+
**Styling**: CSS Modules with BEM methodology
**Testing**: Vitest (unit), Playwright (E2E)
**Database**: Supabase (PostgreSQL)
**Monitoring**: Prometheus + Grafana + Loki
**CI/CD**: GitHub Actions

**Forbidden Actions**:
- Direct pushes to `main` branch
- Committing secrets or API keys
- Disabling security measures in production
- Bypassing rate limits outside `E2E_TEST` mode
- Major dependency upgrades without approval

## Continuous Agent Workflow
Automated agents MAY perform:
- Documentation improvements
- Test coverage additions
- Flaky test fixes
- Small refactors (<200 LOC)

Agents MUST NOT perform without human approval:
- Auth/security/middleware changes
- Major dependency upgrades
- Large refactors (>200 LOC)
- Production infrastructure changes

**Agent Limits**:
- Max 5 PRs/day
- Max 3 commits/PR
- Max 30 minutes runtime/run
- Max 1 concurrent run per repo

## Governance
This constitution supersedes all other development practices.

**Amendment Process**:
1. Propose changes via PR with rationale
2. Document impact on existing code
3. Require team approval
4. Update version according to semantic versioning:
   - **MAJOR**: Backward-incompatible principle changes
   - **MINOR**: New principles or sections added
   - **PATCH**: Clarifications, wording fixes, typos

**Compliance**:
- All PRs MUST verify compliance with this constitution
- Use `AGENTS.md` for operational agent guidance
- Constitution violations MUST be addressed before merge

**Version**: 1.0.0 | **Ratified**: 2026-03-10 | **Last Amended**: 2026-03-10
