# AGENTS.md — Roméga Agentic Engineering Playbook
_Last updated: 2026-03-02_

This repo supports **continuous, agent-driven development** with strong quality gates and observability.
Agents (Codex CLI / ChatGPT agents) must follow this file strictly.

---

## 0) Non-Negotiables

- **No direct pushes to `main`.** Agents work on branches and open PRs.
- **CI must be green** (lint, unit, e2e when applicable).
- **Small diffs**: target <200 net LOC per PR unless explicitly approved.
- **No security weakening in production.**
- **Idempotent automation**: retries must not duplicate side effects (PR spam, deployments, webhooks).
- **Observability required** for continuous runs (logs + metrics + alerts).

---

## 1) Repo Commands (Source of Truth)

Agents must not guess commands. Use these only.

### Install
- `npm ci`

### Dev
- `npm run dev`

### Lint / Typecheck
- `npm run lint`
- `npm run typecheck` (if defined)

### Unit tests
- `npm test` (or `npm run test`)

### E2E (Playwright)
- `E2E_TEST=1 npm run test:e2e`

---

## 2) Test Harness Modes

### E2E_TEST mode (required for E2E in CI/local)
E2E must run with:
- `E2E_TEST=1`

In `E2E_TEST=1`, the app is allowed to:
- bypass rate limiting
- bypass strict “invalid headers” checks
**ONLY** when `NODE_ENV != "production"`.

Do not remove anti-bot measures (honeypots). Tests must exclude them.

---

## 3) Playwright Rules (Stability)

### Selector policy
- Prefer `data-testid`
- Next: `getByRole` / `aria-label`
- Avoid: broad CSS + `.first()` unless filtered

### Honeypot policy
If there is a honeypot field (e.g. `name="botfield"`):
- tests must exclude it in visibility assertions
- do not delete it to “fix tests”

### Wait policy
- prefer `domcontentloaded`
- then wait on a specific UI anchor (nav/form/etc.)

---

## 4) Workspace + Lockfile Policy

- Do not introduce additional lockfiles.
- If a sub-app is the execution root, CI must `cd` into it consistently.
- Next.js root inference warnings must be resolved by:
  - removing redundant lockfiles OR
  - explicitly setting Next config (`outputFileTracingRoot`) OR
  - standardizing the working directory in CI.

---

## 5) Continuous Agent Loop (GitHub + Codex CLI)

### Purpose
Run agents continuously to:
- fix flaky tests
- improve docs
- add missing test coverage
- small refactors (strictly bounded)

### Safety limits (hard caps)
- **Max PRs/day:** 5 (increase only when stable)
- **Max commits/PR:** 3 (squash preferred)
- **Max runtime/run:** 30 minutes
- **Max concurrent runs:** 1 per repo (no overlap)
- **Forbidden categories without explicit human approval:**
  - auth/security/middleware behavior changes (outside E2E_TEST gates)
  - dependency major upgrades
  - large refactors (>200 net LOC)
  - production infra changes

### Branch naming
- `agent/<yyyy-mm-dd>/<topic>`

### PR labeling
- `agent` label required
- optional: `safe-docs`, `safe-tests`, `safe-refactor`

### When to auto-merge
Only for **safe** categories and only if:
- all checks pass
- diff size is small
- no production behavior change

---

## 6) Observability Requirements (Grafana + Loki + Prometheus)

This repo operates with:
- Prometheus scraping app metrics at `/api/metrics` every ~10s
- Promtail shipping container logs to Loki
- Grafana dashboards provisioned via Docker Compose

### 6.1 Required log fields (JSON logs)
Any agent runner / automation must emit logs as JSON including:
- `service`: `romega-next` | `agent-runner`
- `run_id`: unique per run
- `branch`
- `commit_sha` (when available)
- `pr_number` (when available)
- `status`: `started|succeeded|failed`
- `duration_ms`
- `failure_reason` (on failure)

**Do not log secrets.**

### 6.2 Required Prometheus metrics (minimum)
Expose these via `/api/metrics`:
- `agent_run_total{status="success|fail"}`
- `agent_run_duration_seconds`
- `ci_job_fail_total{job="lint|unit|e2e|build"}`
- `e2e_flake_total{test="<name>"} (optional)`

Label strategy:
- keep cardinality low (no user ids, no full URLs)
- prefer `route`, `method`, `status` with bounded sets

---

## 7) Alerting (Mandatory for Continuous Mode)

Continuous mode is not considered enabled unless there is an alert path.

Minimum alerts:
- Agent run failure rate > 30% over 6h
- E2E failures > threshold over 6h
- Prometheus target down
- Loki ingestion errors
- CI duration p95 regression (optional)

If Alertmanager is not present yet, agents may add:
- `alerting` rules + Alertmanager wiring (preferred)
OR
- a minimal “fail loud” notification step in GitHub Actions (fallback)

---

## 8) Agent Execution Contract

### Agents MUST do
1) Read relevant files first.
2) Provide a short plan:
   - changes
   - risks
   - test plan
3) Implement small commits.
4) Run the validation commands:
   - `npm run lint`
   - `npm test` (or `npm run test`)
   - `E2E_TEST=1 npm run test:e2e` when UI/E2E affected
5) Summarize with:
   - what changed
   - evidence (command outputs)
   - next steps

### Agents MUST NOT do
- Disable tests to “make CI green”
- Bypass prod security/rate limits outside `E2E_TEST`
- Add secrets to repo
- Spam PRs / commits beyond caps

---

## 9) Copy/Paste Prompts for Codex CLI (Continuous)

### A) Validate compliance (no code changes)
**Prompt:**
Read `AGENTS.md` and follow it strictly. Run:
- `npm ci`
- `npm run lint`
- `npm test`
- `E2E_TEST=1 npm run test:e2e`
Do not change code. Report any failure with the smallest fix proposal.

### B) Safe PR (docs/tests only)
**Prompt:**
Follow `AGENTS.md`. Produce ONE PR in the category: docs OR tests.
Constraints: <200 net LOC, max 3 commits, no prod behavior changes.
Run full validation, then open PR with checklist.

### C) E2E stability improvement (flake reduction)
**Prompt:**
Follow `AGENTS.md`. Reduce E2E flakiness without disabling tests.
Prefer stable selectors (`data-testid`, `getByRole`) and deterministic waits.
Run `E2E_TEST=1 npm run test:e2e` twice. Provide before/after evidence.

### D) Observability hardening
**Prompt:**
Follow `AGENTS.md`. Ensure logs are JSON with required fields and add minimal metrics
for agent runs and CI job failures. Do not add high-cardinality labels.
Update docs in `docs/observability.md` with example Loki queries and PromQL.

---

## 10) Definition of Done (DoD)

A change is done only if:
- CI is green
- tests updated/added as needed
- docs updated if behavior changes
- observability preserved (no broken dashboards/metrics/logs)
- PR summary includes risks + validation steps