# Assets and Cloud Providers Inventory

Last updated: 2026-03-15

## Quick Answer (For Sharing)

- Database cloud provider: Supabase (managed PostgreSQL)
- Server/hosting cloud provider: Vercel (primary recommended deployment for Next.js)
- Optional server model: Docker self-hosted deployment (cloud-agnostic; can run on your own VM/provider)

## Cloud Providers and Platforms

| Area | Provider/Platform | Status | Notes |
|---|---|---|---|
| Web app hosting | Vercel | Primary (recommended) | Next.js deployment, edge/CDN optimization |
| Database | Supabase (PostgreSQL) | Primary | Cloud-hosted relational database |
| Media object storage | Vercel Blob | In use for hero video flow | Private blob URL is proxied through API route |
| Email delivery | Resend | Recommended option | Server-side API key flow |
| Email delivery (alternative) | EmailJS | Optional | Supported by environment setup |
| Email delivery (alternative) | SMTP (Nodemailer) | Optional | Traditional SMTP fallback |
| Analytics | Google Analytics 4 | Optional/commonly enabled | Uses GA measurement ID env var |

## System Assets (Inventory Snapshot)

### Application Assets

- Next.js web application (romega-next)
- API routes for contact, careers, media, health, and metrics
- Security middleware/proxy layer (headers, CORS, rate limiting, bot checks)
- Prisma schema/migrations for PostgreSQL workflows

### Data and Storage Assets

- Supabase project (managed PostgreSQL)
- Environment-managed secrets for DB and service credentials
- Docker secrets files for local/self-host secret mounting
- Hero video media source via private blob URL and tokenized access

### Observability Assets

- Prometheus (metrics)
- Grafana (dashboards)
- Loki (log storage)
- Promtail (log shipping)

### CI/CD and Delivery Assets

- GitHub repository + GitHub Actions CI
- Vercel deployment path (primary documented workflow)
- Docker Compose deployment path (self-host alternative)

## Server Provider Clarification

There are two supported deployment modes in this repo:

1. Vercel mode (primary):
   - Server runtime and edge delivery are managed by Vercel.
   - Best fit for standard Next.js cloud deployment.

2. Docker self-host mode (alternative):
   - App runs in Docker containers.
   - Actual VM/cloud provider is not fixed in the repo (you choose where to host).

## Security Note

- This inventory intentionally excludes all secret values, keys, tokens, and passwords.
- Share this file publicly; share credential details only through secure channels.

## Evidence in Repository

- Vercel deployment guidance and env setup docs
- Supabase environment variables and PostgreSQL configuration
- Hero media API route using blob URL/token env variables
- Docker Compose services for app and observability stack
