# Resend Email Setup Guide

## ✅ What Changed

Your contact form now uses **Resend** instead of Gmail SMTP. This is:

- ✅ **Much simpler** - Just one API key, no SMTP configuration
- ✅ **More reliable** - Built for developers, no authentication issues
- ✅ **Free tier** - 3,000 emails/month, 100 emails/day
- ✅ **Professional** - Better deliverability than Gmail
- ✅ **Secure** - API key stays server-side only

---

## 🚀 Quick Setup (2 Minutes)

### Step 1: Create Resend Account

1. Go to https://resend.com/signup
2. Sign up with your email (use `kenpatrickgarcia123@gmail.com` or any email)
3. **Verify your email** (check inbox for verification link)
4. You'll be redirected to the dashboard

### Step 2: Get API Key

1. In the Resend dashboard, click **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Name it: **"Romega Website"**
4. Permission: **"Sending access"** (default)
5. Click **"Create"**
6. **Copy the API key** (starts with `re_...`)
   - ⚠️ **Important:** Copy it now! It won't be shown again

### Step 3: Update .env File

Open your `.env` file and replace:

```env
RESEND_API_KEY=your-resend-api-key-here
```

With your actual API key:

```env
RESEND_API_KEY=re_123abc456def789ghi...
```

Keep this line as is:
```env
ADMIN_EMAIL=info@romega-solutions.com
```

### Step 4: Test Locally

```bash
# Restart dev server
Ctrl + C
npm run dev
```

Then:
1. Go to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit

**Check terminal for:**
```
[Resend] Initializing...
[Resend] Sending email...
[Resend] Email sent successfully ✅
```

### Step 5: Check Your Email

Check `info@romega-solutions.com` inbox for the test email with:
- Beautiful Romega-branded design
- All form details
- Reply button
- Schedule meeting button

---

## 🎯 Verify Domain (Optional - For Production)

**Note:** For testing, you can use Resend's default sending domain (`onboarding@resend.dev`).

For production, verify your own domain:

1. In Resend dashboard, click **"Domains"**
2. Click **"Add Domain"**
3. Enter: `romega-solutions.com`
4. Follow DNS verification steps
5. Once verified, update the API route from:
   ```typescript
   from: 'Romega Contact Form <onboarding@resend.dev>',
   ```
   To:
   ```typescript
   from: 'Romega Contact Form <contact@romega-solutions.com>',
   ```

---

## 🔧 Vercel Deployment

### Update Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

**Remove these old variables:**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

**Add this new variable:**
```
RESEND_API_KEY=re_123abc456def789ghi...
```

**Keep these:**
```
ADMIN_EMAIL=info@romega-solutions.com
RECAPTCHA_SECRET_KEY=6LfNbmosAAAAALqdqm8HPLgAcPuZOHKXUSLM94h6
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfNbmosAAAAAPeZQRb-Fy0I22bIFL6zJRCiDB5G
```

Then redeploy:
```bash
git add .
git commit -m "Switch to Resend for email sending"
git push origin development
```

---

## 📊 Resend Dashboard Features

### Email Logs
- See all sent emails
- Track delivery status
- View open rates
- Check bounce/spam reports

### Rate Limits (Free Tier)
- **3,000 emails/month**
- **100 emails/day**
- **10 emails/second** (burst)

### Upgrade if Needed
- **Pro Plan:** $20/month → 50,000 emails/month
- **Enterprise:** Custom pricing for higher volumes

---

## 🔥 Benefits Over Gmail SMTP

| Feature | Gmail SMTP | Resend |
|---------|-----------|---------|
| Setup Complexity | ⚠️ Complex (2-step, app passwords) | ✅ Simple (one API key) |
| Authentication | ⚠️ Often fails | ✅ Always works |
| Free Tier | 500/day | 3,000/month, 100/day |
| Deliverability | ⚠️ Medium | ✅ High |
| Email Tracking | ❌ None | ✅ Full analytics |
| API | ❌ SMTP only | ✅ Modern REST API |
| Support | ❌ Community only | ✅ Email support |

---

## 🐛 Troubleshooting

### "API key missing" Error
**Solution:** Check that `RESEND_API_KEY` is set in `.env` and restart dev server

### Email not arriving
**Check:**
1. Spam folder in `info@romega-solutions.com`
2. Resend dashboard → Emails → Check delivery status
3. Terminal logs for "[Resend] Email sent successfully"
4. Verify `ADMIN_EMAIL` is correct

### "Rate limit exceeded"
**Solution:** 
- Free tier: Wait until next day (100/day limit)
- Or upgrade to Pro plan

### Want to switch back to Nodemailer?
**No problem:** Check `docs/NODEMAILER_SETUP.md` for instructions

---

## 📝 What Was Changed

### Files Modified:
1. **`app/api/contact/route.ts`**
   - Removed Nodemailer
   - Added Resend integration
   - Same security features (rate limiting, reCAPTCHA, validation)

2. **`.env`**
   - Removed SMTP configuration
   - Added Resend API key

3. **`package.json`**
   - Added `resend` package

### Email Template:
- ✅ Professional gradient header
- ✅ Priority alert banner
- ✅ Contact details card
- ✅ Subject, message, timestamp
- ✅ Reply and schedule meeting buttons
- ✅ Romega branding throughout
- ✅ Mobile-responsive design

---

## 🎉 You're All Set!

Once you add your API key:
1. Restart dev server
2. Test the form
3. Check your email
4. Deploy to Vercel

**Need help?** Check Resend docs at https://resend.com/docs

---

## 🔐 Security Notes

- **API key is server-side only** - Never exposed to browser
- **reCAPTCHA still active** - Blocks bots
- **Rate limiting still active** - 3 submissions per 5 minutes
- **Input validation still active** - SQL injection, XSS protection
- **Honeypot still active** - Silent bot rejection

All security features from before are still working! ✅
