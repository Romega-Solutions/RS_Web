# Careers/Jobs Security Fixes - Implementation Summary

## Issues Fixed

### 🚨 Critical Security Issue Resolved
**Problem**: Google Apps Script URL was exposed in client-side code, making it vulnerable to:
- Direct API access bypass
- Rate limit circumvention
- Data scraping
- Endpoint enumeration during vulnerability assessment

**Solution**: Implemented secure API proxy pattern

---

## Changes Made

### 1. **Created Secure API Proxy Route**
**File**: [app/api/careers/jobs/route.ts](app/api/careers/jobs/route.ts)

```typescript
✅ Server-side API proxy
✅ Rate limiting: 30 requests/minute per IP
✅ Timeout protection (10 seconds)
✅ Error obfuscation (doesn't expose internal errors)
✅ Response caching (5 minutes)
✅ Security headers applied
✅ withSecurity() wrapper
```

**Benefits**:
- Hides actual Google Apps Script URL from clients
- Adds rate limiting to external API calls
- Provides caching to reduce external API load
- Returns graceful fallbacks on errors

### 2. **Updated Jobs Fetching Logic**
**File**: [lib/api/jobs.ts](lib/api/jobs.ts)

**Before**:
```typescript
// ❌ Exposed external URL in client code
const JOBS_API_URL = "https://script.google.com/macros/s/...";
fetch(JOBS_API_URL)
```

**After**:
```typescript
// ✅ Uses internal API route
const apiUrl = `/api/careers/jobs`;
fetch(apiUrl)
```

### 3. **Fixed JobListings Component**
**File**: [components/organisms/careers/JobListings.tsx](components/organisms/careers/JobListings.tsx)

**Changes**:
- ✅ Removed hardcoded API URL
- ✅ Uses `fetchJobs()` from lib/api/jobs
- ✅ Added proper TypeScript types
- ✅ Auto-refresh every 5 minutes
- ✅ Better error handling with fallbacks
- ✅ Uses JobCard component for consistency

### 4. **Enabled Job Listings Display**
**File**: [app/careers/page.tsx](app/careers/page.tsx)

**Before**:
```tsx
{/* <JobListings /> */}  ❌ Commented out
```

**After**:
```tsx
<JobListings />  ✅ Active
```

### 5. **Moved API URL to Environment Variables**
**Files**: [.env.local](.env.local), [.env.example](.env.example)

Added:
```bash
# Jobs API (Google Apps Script)
# SECURITY: This URL is used server-side only
JOBS_API_URL=https://script.google.com/macros/s/.../exec
```

**Security Benefits**:
- URL not in version control (via .gitignore)
- Can be rotated without code changes
- Only accessible server-side
- Not included in client bundle

---

## Security Architecture

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ GET /api/careers/jobs
       │ ✅ Rate limited
       │ ✅ Origin validated
       ▼
┌─────────────────┐
│  Next.js API    │
│   Middleware    │
│ ✅ withSecurity  │
└────────┬────────┘
         │ Proxy request
         │ 🔒 URL hidden
         ▼
  ┌──────────────────┐
  │ Google Apps      │
  │ Script           │
  │ (External API)   │
  └──────────────────┘
```

## Security Benefits

### Before (Vulnerable):
- ❌ API URL exposed in client JavaScript
- ❌ Direct external API access
- ❌ No rate limiting on external calls
- ❌ Attackers could bypass application logic
- ❌ Endpoint visible during vulnerability scan

### After (Protected):
- ✅ API URL only in server environment
- ✅ All requests go through secure proxy
- ✅ Rate limiting enforced (30 req/min)
- ✅ Request validation and sanitization
- ✅ Timeout protection
- ✅ Error obfuscation
- ✅ Response caching (reduces load)
- ✅ Security headers applied
- ✅ Endpoint protected by middleware

---

## Testing

### Test the Secure Endpoint

```bash
# Should succeed (returns jobs)
curl http://localhost:3000/api/careers/jobs

# Test rate limiting (send many requests)
for i in {1..35}; do 
  curl http://localhost:3000/api/careers/jobs
done
# After 30 requests in 1 minute, should return 429 Too Many Requests

# Check that external URL is not accessible from client
curl http://localhost:3000/_next/static/...  # Check bundle
# The Google Apps Script URL should NOT appear in any client bundle
```

### Verify Jobs Display

1. Navigate to `/careers` page
2. Jobs should load automatically
3. Should see job listings with:
   - Job titles
   - Location, work type, employment type
   - Posted date
   - "See Details in LinkedIn" button (for active jobs)
4. Should auto-refresh every 5 minutes

---

## API Route Details

### Endpoint: `GET /api/careers/jobs`

**Rate Limit**: 30 requests per minute per IP

**Response Format** (Success):
```json
[
  {
    "job_title": "Senior HR Manager",
    "location": "Remote",
    "work_type": "Remote",
    "employment_type": "Full-Time",
    "status": "Active",
    "application_url": "https://linkedin.com/...",
    "posted_date": "2026-02-01"
  }
]
```

**Response Format** (Error):
```json
{
  "error": "Unable to fetch jobs",
  "jobs": []
}
```

**Cache Headers**:
```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```
- Cached for 5 minutes
- Stale cache served for up to 10 minutes while revalidating

**Security Headers**:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

---

## Environment Variables

### Required for Production

Update these in your production environment:

```bash
# Server-side only (not exposed to client)
JOBS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Client-side (for API URL resolution)
NEXT_PUBLIC_APP_URL=https://romegasolutions.com
```

### Verification

The security implementation validates environment variables on startup:
```bash
npm run dev
# Should show: ✅ Environment validation passed
```

---

## For Vulnerability Assessment

### Protected Against:
- ✅ **Endpoint Enumeration**: External URL not discoverable
- ✅ **Direct API Access**: All requests proxied through secure route
- ✅ **Rate Limit Bypass**: Enforced at proxy level
- ✅ **Data Scraping**: Rate limits prevent bulk extraction
- ✅ **Information Disclosure**: Generic error messages
- ✅ **DoS Attacks**: Timeout + rate limiting protection

### Assessment Team Will See:
- `/api/careers/jobs` endpoint (properly secured)
- Rate limiting after 30 requests
- Generic error messages (no stack traces)
- Cached responses (reduces load)
- No external API URL in client code

---

## Maintenance

### Rotating the API URL

If you need to change the Google Apps Script URL:

1. Update `.env.local`:
   ```bash
   JOBS_API_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
   ```

2. Restart the application:
   ```bash
   npm run dev  # or
   docker-compose restart
   ```

No code changes required!

### Monitoring

Check logs for security events:
```bash
# Development
npm run dev

# Production (Docker)
docker logs romega-solutions-website | grep JOBS

# Look for:
# - [JOBS API ERROR] - API failures
# - [SECURITY] RATE_LIMIT_EXCEEDED - Rate limit hits
```

---

## Summary

✅ **Security Issue**: Fixed - External API URL no longer exposed  
✅ **Job Listings**: Enabled - Now displaying on /careers page  
✅ **Rate Limiting**: Active - 30 requests/minute  
✅ **Error Handling**: Improved - Graceful fallbacks  
✅ **Caching**: Implemented - 5-minute cache  
✅ **Type Safety**: Enhanced - Proper TypeScript types  

**Status**: Ready for vulnerability assessment 🛡️

The careers/jobs functionality is now properly secured and will not expose sensitive API endpoints during the assessment.
