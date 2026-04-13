# Nodemailer Setup Guide

## ✅ What Was Changed

Your contact form now uses **Nodemailer** (server-side email) instead of EmailJS. This means:

- 🔒 **No API keys exposed in browser** - Everything is server-side
- ✅ **Free forever** with Gmail (500 emails/day)
- ✅ **More secure** - Credentials stay on the server
- ✅ **Professional** - Uses your own email address
- ✅ **Better deliverability** - Less likely to be marked as spam

## 📧 Gmail SMTP Setup (5 minutes)

### Step 1: Enable 2-Step Verification

1. Go to https://myaccount.google.com/security
2. Click **2-Step Verification**
3. Follow the prompts to enable it (if not already enabled)

### Step 2: Generate App Password

1. Still in Google Account Security, search for **"App passwords"**
2. Click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)** → Type: "Romega Website"
5. Click **Generate**
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

### Step 3: Update .env File

Open `.env` and update these lines:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=info@romega-solutions.com
```

**Important:**
- `SMTP_USER` = Your Gmail address
- `SMTP_PASS` = The 16-character app password (with or without spaces)
- `ADMIN_EMAIL` = Where you want to receive contact form submissions

### Step 4: Update Vercel Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these (remove the old EmailJS ones):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=info@romega-solutions.com
RECAPTCHA_SECRET_KEY=6LfNbmosAAAAALqdqm8HPLgAcPuZOHKXUSLM94h6
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfNbmosAAAAAPeZQRb-Fy0I22bIFL6zJRCiDB5G
```

**Note:** Keep the reCAPTCHA variables - they're still used for bot protection.

### Step 5: Test Locally

```bash
npm run dev
```

Go to `http://localhost:3000/contact` and submit a test form.

Check your terminal for:
```
[Nodemailer] Creating transporter...
[Nodemailer] Sending email...
[Nodemailer] Email sent successfully
```

### Step 6: Deploy

```bash
git add .
git commit -m "Switch from EmailJS to Nodemailer for secure server-side email"
git push origin development
```

Vercel will automatically deploy with the new environment variables.

## 🔧 Alternative SMTP Providers

If you don't want to use Gmail, here are other options:

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Outlook/Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Custom Domain Email (cPanel, etc.)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=info@yourdomain.com
SMTP_PASS=your-email-password
```

## 🛡️ Security Improvements

### What's Protected Now:

| Feature | Before (EmailJS) | After (Nodemailer) |
|---------|------------------|-------------------|
| API Keys | ⚠️ Exposed in browser | ✅ Server-side only |
| Email Credentials | ⚠️ Public keys visible | ✅ Hidden in environment |
| Rate Limiting | ✅ Active (3 per 5 min) | ✅ Active (3 per 5 min) |
| reCAPTCHA | ✅ Active | ✅ Active |
| Honeypot | ✅ Active | ✅ Active |
| Input Validation | ✅ Active | ✅ Active |
| SQL Injection Check | ✅ Active | ✅ Active |
| XSS Protection | ✅ Active | ✅ Active |

## 🎨 Email Template

Your emails now include:
- ✨ Professional gradient header with Romega branding
- 📊 Contact details in a beautiful card layout
- 🎯 Priority alert banner
- 📧 Quick reply button (opens email client)
- 📅 Schedule meeting button (HubSpot link)
- 🏢 Complete footer with company info
- 📱 Mobile-responsive design
- 🎨 Modern styling with shadows and borders

## 🐛 Troubleshooting

### "SMTP configuration missing"
**Solution:** Check that all SMTP variables are set in `.env` and Vercel

### "Invalid login" or "Authentication failed"
**Solutions:**
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable 2-Step Verification first
- Check that `SMTP_USER` matches the email that generated the app password

### Emails not arriving
**Check:**
1. Spam folder
2. Terminal logs for "[Nodemailer] Email sent successfully"
3. Gmail account hasn't hit daily limit (500/day)
4. `ADMIN_EMAIL` is correct

### "Connection timeout"
**Solutions:**
- Try port `465` instead of `587` (update `SMTP_PORT=465`)
- Check firewall/network settings
- Verify Gmail SMTP is not blocked

## 📊 Gmail Limits

- **Free Gmail:** 500 emails/day
- **Google Workspace:** 2,000 emails/day

If you need more, consider:
- SendGrid: 100 emails/day free, then $19.95/month for 40,000
- AWS SES: $0.10 per 1,000 emails
- Mailgun: 5,000 emails/month free

## 🚀 Next Steps

1. ✅ Get Gmail App Password
2. ✅ Update `.env` file
3. ✅ Test locally
4. ✅ Update Vercel environment variables
5. ✅ Deploy and test in production
6. ✅ Delete EmailJS account (optional)

## 📝 Files Changed

- `app/api/contact/route.ts` - Replaced EmailJS with Nodemailer
- `components/organisms/contact/ContactForm.tsx` - Now calls API route
- `.env` - Removed EmailJS config, added SMTP config
- `package.json` - Added nodemailer and @types/nodemailer

## ❓ Need Help?

Common issues and solutions:
- **"Can't find App passwords"** → Enable 2-Step Verification first
- **"Wrong password"** → Use App Password (16 chars), not regular password
- **"Less secure apps"** → Not needed with App Passwords
- **Still stuck?** → Share the error message from terminal/logs
