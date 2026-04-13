# 🚨 CRITICAL: Vercel Environment Variables Setup

## Required Environment Variables

Go to your Vercel Dashboard → Your Project → Settings → Environment Variables and add:

### 1. **NEXT_PUBLIC_APP_URL** (CRITICAL)
- **Value**: `https://www.romegasolutions.com`
- **Environment**: `Production`, `Preview`, `Development`
- **Why**: Without this, API calls will fail with localhost:3000 errors

### 2. **Supabase Variables** (if using Supabase)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Other API Keys**
Add any other environment variables from your `.env.local`

## After Adding Variables

1. Redeploy your application:
   ```bash
   vercel --prod
   ```

2. Or trigger a new deployment by pushing to GitHub

## Verification

After deployment, check console for:
- ✅ No "localhost:3000" errors
- ✅ API calls working properly
- ✅ No CSP violations

---

**Current Status**: ❌ Missing NEXT_PUBLIC_APP_URL
**Action Required**: Add environment variables in Vercel Dashboard NOW
