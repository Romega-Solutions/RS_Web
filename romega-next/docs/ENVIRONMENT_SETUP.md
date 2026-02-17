# Environment Variables Reference

## Quick Setup

```bash
# 1. Copy the example file
cp .env.example .env.production

# 2. Fill in your actual values
# 3. Keep this file secure - NEVER commit to git!
```

## Required Variables

### Application Core

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | `production` | Environment mode |
| `PORT` | Yes | `3000` | Application port |
| `HOSTNAME` | Yes | `0.0.0.0` | Bind hostname |

### Database (Supabase)

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `https://xxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `eyJhbGci...` | Public/anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes* | `eyJhbGci...` | Service role key (server-side only) |

*Required if using server-side database operations

**Get these from:** [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → API

### Email Service (Choose ONE)

#### Option 1: Resend (Recommended)

| Variable | Required | Example | Where to Get |
|----------|----------|---------|--------------|
| `RESEND_API_KEY` | Yes | `re_xxxxx` | [Resend API Keys](https://resend.com/api-keys) |

#### Option 2: EmailJS

| Variable | Required | Example | Where to Get |
|----------|----------|---------|--------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Yes | `service_xxx` | [EmailJS Dashboard](https://dashboard.emailjs.com/admin) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Yes | `template_xxx` | EmailJS → Email Templates |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Yes | `xxx` | EmailJS → Account → API Keys |

#### Option 3: SMTP (Nodemailer)

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `SMTP_HOST` | Yes | `smtp.gmail.com` | SMTP server host |
| `SMTP_PORT` | Yes | `587` | SMTP port (usually 587 for TLS) |
| `SMTP_USER` | Yes | `your@email.com` | SMTP username |
| `SMTP_PASSWORD` | Yes | `app-password` | SMTP password or app-specific password |
| `SMTP_FROM` | Yes | `noreply@romegasolutions.com` | From email address |

**For Gmail:** Use [App Passwords](https://myaccount.google.com/apppasswords)

## Optional Variables

### Analytics

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | `G-XXXXXXXXXX` | Google Analytics 4 measurement ID |

**Get from:** [Google Analytics](https://analytics.google.com) → Admin → Data Streams

### Security & Rate Limiting

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RATE_LIMIT_REQUESTS` | No | `10` | Max requests per window |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit window (ms) |
| `API_SECRET_KEY` | No | - | API authentication secret |

### Monitoring (New)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENABLE_METRICS` | No | `false` | Enable Prometheus metrics |
| `METRICS_AUTH_TOKEN` | No | - | Token to protect /api/metrics endpoint |

**Recommendation:** Always set `METRICS_AUTH_TOKEN` in production!

### Development Only

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISABLE_SECURITY` | No | `false` | **NEVER** set to `true` in production! |

## Docker Secrets

For highly sensitive data, use Docker secrets instead of environment variables:

### Setup

```bash
# Create secrets directory
mkdir -p secrets

# Add secret files
echo "your-smtp-password" > secrets/smtp_password.txt
echo "your-resend-api-key" > secrets/resend_api_key.txt
echo "your-api-keys" > secrets/api_keys.txt

# Ensure proper permissions
chmod 600 secrets/*
```

### Access in Application

Secrets are mounted at `/run/secrets/` in the container:

```typescript
// Read secret in Node.js
import fs from 'fs';

const smtpPassword = fs.readFileSync('/run/secrets/smtp_password', 'utf8').trim();
```

## Environment File Examples

### Development (.env.local)

```bash
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# Local Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key

# EmailJS for testing
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key

# Disable rate limiting for dev
RATE_LIMIT_REQUESTS=1000

# Enable metrics
ENABLE_METRICS=true
```

### Production (.env.production)

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0

# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend for production emails
RESEND_API_KEY=re_your_production_key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Security
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
API_SECRET_KEY=your-secure-random-key

# Monitoring
ENABLE_METRICS=true
METRICS_AUTH_TOKEN=your-secure-metrics-token
```

## Security Best Practices

### ✅ DO:

- Use strong, random values for all secrets
- Keep `.env.production` out of version control
- Use Docker secrets for highly sensitive data
- Rotate secrets regularly
- Use different values for dev/staging/production
- Store production secrets in a vault (AWS Secrets Manager, HashiCorp Vault, etc.)

### ❌ DON'T:

- Commit `.env` files with real values
- Share secrets in chat or email
- Use weak or default passwords
- Reuse secrets across environments
- Log secrets in application logs
- Store secrets in client-side code

## Validation

The application validates environment variables on startup using Zod schemas.

**Check for errors:**

```bash
# Start application
npm run build && npm start

# Look for validation errors in logs
# Example error: "Missing required environment variable: RESEND_API_KEY"
```

**Manual validation:**

```typescript
// lib/security/env-validation.ts
import { validateEnv } from '@/lib/security/env-validation';

const env = validateEnv();
// Throws error if validation fails
```

## Troubleshooting

### "Cannot find environment variable"

**Problem:** Application can't read `.env.production`

**Solutions:**
1. Ensure file exists in project root
2. Verify filename is exactly `.env.production`
3. Check file permissions (must be readable)
4. Docker: Use `env_file` in docker-compose.yaml

### "Invalid value for environment variable"

**Problem:** Value doesn't match expected format

**Solutions:**
1. Check for extra spaces or quotes
2. Verify URL format (must include `https://`)
3. Ensure no line breaks in keys

### Secrets not working in Docker

**Problem:** Container can't access secrets

**Solutions:**
```bash
# 1. Verify secrets exist
ls -la secrets/

# 2. Check docker-compose.yaml has secrets section
# 3. Verify container has secrets mounted
docker exec romega-solutions-website ls -la /run/secrets/
```

## Need Help?

- [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Docker Secrets Docs](https://docs.docker.com/engine/swarm/secrets/)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)

---

**Last Updated:** February 2026  
**For Questions:** See [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) or project README
