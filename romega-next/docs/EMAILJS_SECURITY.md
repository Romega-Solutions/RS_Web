# EmailJS Security Configuration

## ⚠️ Important: API Key Exposure

**EmailJS public keys are INTENTIONALLY exposed in the browser.** This is not a security flaw - it's how EmailJS works for browser-based applications.

## 🔒 Protection Measures

### 1. Domain Restrictions (CRITICAL)

Go to EmailJS Dashboard → Account → Security:

**Allowed Domains:**
```
romega-solutions.com
www.romega-solutions.com
localhost
```

This prevents your API keys from being used on other websites.

### 2. reCAPTCHA Integration (ACTIVE)

- Site Key: `6LfNbmosAAAAAPeZQRb-Fy0I22bIFL6zJRCiDB5G`
- Blocks bot submissions
- Required before any email is sent

### 3. Honeypot Field (ACTIVE)

- Hidden form field that bots fill out
- Legitimate users can't see it
- Silently rejects bot submissions

### 4. Rate Limiting (EmailJS Side)

EmailJS automatically rate limits requests:
- **200 emails/month** on free tier
- **10 emails/second** per account

### 5. Email Validation (ACTIVE)

Client-side validation ensures:
- Valid email format
- Required fields filled
- Phone number format
- Message length limits

## 📧 Current Configuration

Service ID: `service_db7tjo4`
Template ID: `template_7kwm8ne`
Public Key: `U9EUeH6CDqh2eHTqj`

## 🚨 What NOT to Expose

❌ **Private API Key** - NEVER add `EMAILJS_PRIVATE_KEY` with `NEXT_PUBLIC_` prefix
❌ **Database Credentials** - Keep server-side only
❌ **Secret Keys** - Use environment variables without `NEXT_PUBLIC_`

## ✅ Safe to Expose

✅ EmailJS Public Key (required for browser calls)
✅ reCAPTCHA Site Key (not the secret key)
✅ Google Analytics ID
✅ Supabase Anon Key (designed to be public)

## 🛡️ Additional Recommendations

1. **Monitor Usage:** Check EmailJS dashboard regularly for suspicious activity
2. **Set Up Alerts:** Configure EmailJS to notify you when approaching limits
3. **Domain Whitelist:** Keep domain restrictions strict
4. **Update Keys:** Rotate keys if compromised
5. **Review Logs:** Check email logs for spam patterns

## 🔄 If Keys are Compromised

1. Go to EmailJS Dashboard → Account → API Keys
2. Click "Regenerate" to create new public key
3. Update `.env` file with new key
4. Redeploy to Vercel with new environment variable
5. Old key becomes invalid immediately

## 📝 Vercel Environment Variables

Make sure these are set in Vercel Dashboard → Your Project → Settings → Environment Variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_db7tjo4
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_7kwm8ne
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=U9EUeH6CDqh2eHTqj
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfNbmosAAAAAPeZQRb-Fy0I22bIFL6zJRCiDB5G
RECAPTCHA_SECRET_KEY=6LfNbmosAAAAALqdqm8HPLgAcPuZOHKXUSLM94h6
```

**Note:** The reCAPTCHA secret key does NOT have `NEXT_PUBLIC_` prefix, keeping it server-side only.

## 🎯 Security Summary

| Protection Layer | Status | Effectiveness |
|------------------|--------|---------------|
| Domain Restrictions | ⚠️ CONFIGURE | High |
| reCAPTCHA v2 | ✅ Active | High |
| Honeypot Field | ✅ Active | Medium |
| EmailJS Rate Limit | ✅ Active | Medium |
| Input Validation | ✅ Active | Low |

**Action Required:** Set up domain restrictions in EmailJS dashboard for maximum protection.
