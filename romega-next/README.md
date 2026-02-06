# Romega Solutions Website - Next.js 16

> A secure, modern, production-ready website built with Next.js 16.1.4, featuring enterprise-grade security hardening and comprehensive vulnerability protection.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat&logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](LICENSE)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/your-org/romega-solutions-website.git
cd romega-solutions-website/romega-next

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Run development server
npm run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start

# Or use PM2 for production
pm2 start npm --name "romega-next" -- start
```

---

## 🛡️ Security Features

This application implements **multi-layer security** designed to pass vulnerability assessments:

### 🔒 Application Layer Security
- **Rate Limiting**: 
  - General routes: 60 requests/minute per IP
  - API routes: 60 requests/minute (with per-endpoint limits via `withSecurity()`)
  - Jobs API: 30 requests/minute
  - Development: Rate limiting bypassed for localhost
- **Attack Prevention**: SQL injection, XSS, path traversal, CSRF protection
- **Bot Detection**: Blocks SQLMap, Nessus, Nikto, Burp Suite, and other scanners
- **Input Validation**: Zod schemas, sanitization, type checking
- **Error Obfuscation**: No system information leaked in error responses

### 🌐 Network Layer Security
- **Security Headers**: 
  - Content Security Policy (CSP) with strict rules
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - HSTS with 1-year duration
  - Referrer-Policy: strict-origin-when-cross-origin
- **CORS**: Whitelist-based origin validation
- **File Protection**: Direct access to .env, config files blocked

### 🐳 Container Security
- **Non-root User**: Runs as UID 1001
- **Read-only Filesystem**: With tmpfs for necessary writes
- **Capability Restrictions**: All capabilities dropped
- **Resource Limits**: CPU and memory constraints

### 📚 Security Documentation
- [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) - Complete implementation guide
- [SECURITY_QUICK_REFERENCE.md](../SECURITY_QUICK_REFERENCE.md) - Quick reference card
- [SECURITY_ASSESSMENT_RESPONSE.md](../SECURITY_ASSESSMENT_RESPONSE.md) - Assessment documentation
- [CAREERS_SECURITY_FIXES.md](./CAREERS_SECURITY_FIXES.md) - Jobs API security details
- [PROXY_MIGRATION.md](./PROXY_MIGRATION.md) - Next.js 16+ middleware migration

---

## 📁 Project Structure

```
romega-next/
├── app/                           # Next.js 16 App Router
│   ├── api/                      # API Routes (all secured)
│   │   ├── careers/jobs/         # Jobs API proxy (30 req/min)
│   │   └── contact/              # Contact form (secured)
│   ├── about/                    # About page
│   ├── careers/                  # Careers & job listings
│   ├── contact/                  # Contact page
│   ├── services/                 # Services showcase
│   ├── talent/                   # Talent page
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                    # React Components (Atomic Design)
│   ├── atoms/                    # Basic building blocks
│   ├── molecules/                # Simple component groups
│   ├── organisms/                # Complex UI sections
│   │   ├── about/               # About page organisms
│   │   ├── careers/             # Careers components (JobListings, etc.)
│   │   ├── contact/             # Contact form
│   │   ├── home/                # Home page (HeroSection with video)
│   │   └── services/            # Services components
│   └── layout/                   # Layout components (Footer, etc.)
│
├── lib/                          # Utilities & Libraries
│reate a `.env.local` file in the `romega-next/` directory:

```bash
# ==============================================
# App Configuration
# ==============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ==============================================
# Jobs API (Server-side ONLY - Not exposed to client)
# ==============================================
JOBS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# ==============================================
# Supabase (Database & Authentication)
# ==============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# ==============================================
# Email Services
# ==============================================
RESEND_API_KEY=re_your_resend_api_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# ==============================================
# Analytics
# ==============================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ==============================================
# Security (Optional - Defaults provided)
# ==============================================
RATE_LIMIT_WINDOW=60000          # 1 minute in ms
RATE_LIMIT_MAX_REQUESTS=60       # General routes
API_RATE_LIMIT_MAX_REQUESTS=60   # API routes
```

### 🔐 Security Notes

| Variable | Visibility | Purpose |
|----------|-----------|---------|
| `JOBS_API_URL` | **Server-only** | Google Apps Script URL - hidden from client for security |
| `NEXT_PUBLIC_*` | **Client-exposed** | Safe for browser exposure |
| `*_API_KEY` | **Server-only** | Never exposed to client |

> ⚠️ **Important**: Never commit `.env.local` to git. Use `.env.example` as a template
│                                 # - Bot blocking
│                                 # - Security headers (CSP, CORS, etc.)
│                                 # - Supabase session management
│
├── next.config.ts                # Next.js Configuration
│                                 # - Turbopack support
│                                 # - Security headers
│                                 # - Image optimization
│
├── .env.local                    # Environment Variables (not in git)
├── .env.example                  # Environment template
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies & scripts
```

### Key Files Explained

| File | Purpose | Security Features |
|------|---------|-------------------|
| `proxy.ts` | Main security middleware | Rate limiting, attack detection, security headers |
| `lib/security/api-protection.ts` | API route wrapper | Per-route rate limits, request validation |
| `lib/security/validation.ts` | Input sanitization | SQL injection, XSS prevention |
| `app/api/careers/jobs/route.ts` | Jobs API proxy | Hides external API URL, adds caching |
| `.env.local` | Secret configuration | Never committed to git |

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Jobs API (Server-side only)
JOBS_API_URL=your-google-apps-script-url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Email & Analytics (`withSecurity()` wrapper):

| Route | Method | Rate Limit | Purpose |
|-------|--------|------------|---------|
| `/api/careers/jobs` | GET | 30 req/min | Job listings proxy (hides Google Apps Script URL) |
| `/api/contact` | POST | 3 req/5min | Contact form submission |
| All `/api/*` routes | * | 60 req/min | General API rate limit (via proxy.ts) |

### API Security Features
- **Rate limiting**: Per-IP, sliding window
- **Request validation**: Content-Type, body structure, required fields
- **CORS**: Whitelist-based origin checking
- **Error obfuscation**: No sensitive data in error responses
- **Bot detection**: User-Agent analysis
- **Development bypass**: localhost excluded from rate limits

---

## 🧪 Testing & Verification

### Security Testing

```bash
# 1. Test rate limiting (should block after 60 requests)
for i in {1..65}; do 
  curl -s http://localhost:3000/api/careers/jobs | grep -q "error" && echo "Request $i: Blocked" || echo "Request $i: OK"
done

# 2. Test SQL injection protection (should return 403)
curlCommon Issues & Solutions

#### ❌ "Failed to fetch jobs: API responded with status: 403"
**Cause**: Rate limiting or CORS blocking requests  
**Solution**: 
1. Check if you exceeded 30 req/min for jobs API
2. Restart dev server to reset rate limits
3. In development, localhost is auto-allowed in CORS

```bash
# Restart dev server
Ctrl + C
npm run dev
```
Option 1: Vercel (Recommended)

Vercel is optimized for Next.js and handles security headers automatically.

```bash
# 1. Push to GitHub
git add .
git commit -m "Production ready"
git push origin main

# 2. Deploy to Vercel
# - Go to https://vercel.com
# - Import your GitHub repository
# - Set environment variables (see .env.example)
# - Deploy
```

**Vercel Environment Variables** (Project Settings → Environment Variables):
- Add all variables from `.env.local`
- Mark sensitive variables as "Sensitive" (hidden in logs)
- Set `NODE_ENV=production`

### Option 2: Docker + nginx

For self-hosted deployments with enhanced security.

```bash
# Build and run with docker-compose (includes nginx reverse proxy)
cd .. # Go to project root
docker-compose up -d

# Or build Docker image manually
docker build -t romega-solutions ./romega-next
docker run -p 3000:3000 --env-file .env.local romega-solutions

# Stop containers
docker-compose down
```

**Docker Features**:
- ✅ Non-root user (UID 1001)
- ✅ Read-only filesystem with tmpfs
- ✅ Capability restrictions (no privileged access)
- ✅ Resource limits (memory/CPU)
- ✅ nginx rate limiting & WAF

See [docker-compose.yaml](../docker-compose.yaml) for full configuration.

### Option 3: VPS (Ubuntu/Debian)

```b� Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Bundle Size**: Optimized with Next.js 16 Turbopack
- **Image Optimization**: Automatic with Next/Image

### Performance Features
- Server-side rendering (SSR)
- Static generation where applicable
- Image optimization & lazy loading
- Code splitting & tree shaking
- Turbopack build optimization
- CDN-ready static assets

---

## 🔄 Recent Updates

### v2.0.0 (February 2026)
- ✅ Migrated to Next.js 16.1.4 with Turbopack
- ✅ Replaced middleware.ts with proxy.ts (Next.js 16+ requirement)
- ✅ Enhanced security: multi-layer protection
- ✅ Fixed video playback on home page
- ✅ Fixed 403 errors on careers page
- ✅ Fixed false positive security warnings
- ✅ Improved rate limiting with localhost bypass
- ✅ Added comprehensive security documentation
- ✅ Docker security hardening
- ✅ **Comprehensive SEO implementation**:
  - Dynamic sitemap.xml generation
  - robots.txt with bad bot blocking
  - PWA manifest for installability
  - Enhanced metadata on all pages
  - Structured data (JSON-LD) for rich snippets
  - Open Graph & Twitter Card optimization
  - Target Lighthouse SEO score: 100

See [CHANGELOG.md](./CHANGELOG.md) for full history.

---

## 🔍 SEO Features

### Technical SEO
- **robots.txt**: Configured with crawler rules, sitemap location, AI/bad bot blocking
- **sitemap.xml**: Auto-generated with proper priorities and change frequencies
- **manifest.json**: PWA support for mobile installability
- **Canonical URLs**: All pages have proper canonical tags
- **Structured Data**: JSON-LD schema markup (Organization, ContactPage, WebPage)

### On-Page SEO
- **Meta Tags**: Unique titles, descriptions, keywords for each page
- **Open Graph**: Full OG tags for social media sharing (Facebook, LinkedIn)
- **Twitter Cards**: Large image cards configured
- **Image Optimization**: Next/Image with lazy loading & WebP
- **Semantic HTML**: Proper heading hierarchy (H1-H6)

### Performance SEO
- **Lighthouse Score Target**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized LCP, FID, CLS
- **Mobile-First**: Responsive design with mobile optimization
- **Fast Loading**: <3s page load with Turbopack optimization

### SEO Documentation
- [SEO_GUIDE.md](./docs/SEO_GUIDE.md) - Complete SEO implementation guide
- [Google Search Console Setup](#) - Coming soon
- [Analytics Dashboard](#) - GA4 tracking

### SEO Testing
```bash
# Check robots.txt
curl http://localhost:3000/robots.txt

# Check sitemap
curl http://localhost:3000/sitemap.xml

# Check manifest
curl http://localhost:3000/manifest.json

# Run Lighthouse audit (Chrome DevTools)
# Target: SEO score 100/100
```

---

## 📚 Additional Resources

### Documentation
- **Security**: [SECURITY_GUIDE.md](./SECURITY_GUIDE.md)
- **SEO**: [SEO_GUIDE.md](./docs/SEO_GUIDE.md)
- **API Security**: [CAREERS_SECURITY_FIXES.md](./CAREERS_SECURITY_FIXES.md)
- **Migration**: [PROXY_MIGRATION.md](./PROXY_MIGRATION.md)
- **Quick Reference**: [SECURITY_QUICK_REFERENCE.md](../SECURITY_QUICK_REFERENCE.md)

### External Resources
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Turbopack Documentation](https://nextjs.org/docs/architecture/turbopack)
- [React 19 Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

This is a private project for Romega Solutions. For internal development:

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes and test thoroughly
3. Run linter and type check: `npm run lint && npx tsc --noEmit`
4. Commit with conventional commits: `git commit -m "feat: add new feature"`
5. Push and create a pull request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📄 License

**Proprietary License** - © 2026 Romega Solutions. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 📞 Support

For questions, issues, or support:

- **Email**: info@romega-solutions.com
- **Website**: [www.romega-solutions.com](https://www.romega-solutions.com)
- **Address**: 222 Pacific Coast Hwy, #10, El Segundo, CA 90245

---

<div align="center">

**Built with ❤️ by the Romega Solutions Development Team**

[Website](https://www.romega-solutions.com) • [LinkedIn](https://www.linkedin.com/company/romega-solutions) • [Facebook](https://www.facebook.com/romegasolutions)

</div>
npm install
npm run build

# 4. Start with PM2
pm2 start npm --name "romega-next" -- start
pm2 save
pm2 startup

# 5. Setup nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/romega-solutions
# Configure nginx (see ../nginx.conf for template)
sudo ln -s /etc/nginx/sites-available/romega-solutions /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] `NEXT_PUBLIC_APP_URL` points to production domain
- [ ] SSL/TLS certificate installed (Let's Encrypt recommended)
- [ ] Rate limits appropriate for production traffic
- [ ] Security headers verified (check with [securityheaders.com](https://securityheaders.com))
- [ ] CSP tested and no console errors
- [ ] Analytics (Google Analytics) tracking
- [ ] Error monitoring setup (Sentry recommended)
- [ ] Database backups configured (Supabase auto-backup enabled)

---
turbopack: {}, // Empty config to acknowledge Turbopack
```

#### ❌ Rate Limiting in Development
**Cause**: Hitting rate limits during testing  
**Solution**: localhost is automatically excluded in development mode. If issues persist:

```typescript
// In proxy.ts - already implemented
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = clientId.includes('localhost');
if (!isDevelopment || !isLocalhost) {
  // Rate limiting only applied in production or non-localhost
}
```

#### ❌ CSP Violations (Console Errors)
**Cause**: Content Security Policy blocking resources  
**Solution**: Check browser console for specific violations. Update CSP in `proxy.ts`:

```typescript
// Current CSP in proxy.ts
"default-src 'self'",
"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com ...",
"media-src 'self' blob:", // Allows video playback
"img-src 'self' data: https: blob:",
```

#### ❌ API Route Not Working
**Steps to debug**:
1. Check if API route has `withSecurity()` wrapper
2. Check browser Network tab for actual error
3. Check server console for detailed logs
4. Verify environment variables in `.env.local`

```typescript
// API route template
export const GET = withSecurity(handler, {
  windowMs: 60 * 1000,
  maxRequests: 30,
});
```

#### ❌ Supabase Connection Issues
**Solution**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
2. Check Supabase project is active
3. Restart dev server after adding environment variables

---

# 6. Test bot detection (should return 403)
curl -A "sqlmap/1.0" http://localhost:3000/
```

### Development Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

---*Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔐 API Routes

All API routes are protected with security middleware:

- `GET /api/careers/jobs` - Fetch job listings (rate limited: 30 req/min)
- `POST /api/contact` - Contact form submission (rate limited: 3 req/5min)
- Additional routes protected by `proxy.ts`

## 🧪 Testing Security

```bash
# Test rate limiting
for i in {1..15}; do curl http://localhost:3000/api/careers/jobs; done

# Test SQL injection protection
curl "http://localhost:3000/?test=1'%20OR%20'1'='1"

# Test file access protection
curl http://localhost:3000/.env
```

## 📚 Documentation

- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) - Comprehensive security documentation
- [SECURITY_QUICK_REFERENCE.md](../SECURITY_QUICK_REFERENCE.md) - Quick reference card
- [SECURITY_ASSESSMENT_RESPONSE.md](../SECURITY_ASSESSMENT_RESPONSE.md) - Assessment documentation
- [CAREERS_SECURITY_FIXES.md](CAREERS_SECURITY_FIXES.md) - Jobs API security details
- [PROXY_MIGRATION.md](PROXY_MIGRATION.md) - Next.js 16+ migration notes

## 🐛 Troubleshooting

### Turbopack Warning
If you see Turbopack warnings, the `next.config.ts` includes `turbopack: {}` to acknowledge the configuration.

### Rate Limiting Issues
Adjust rate limits in `proxy.ts`:
```typescript
const RATE_LIMIT_MAX_REQUESTS = 60; // Adjust as needed
```

### CSP Violations
Check browser console and update CSP in `proxy.ts`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Docker

```bash
# Build image
docker build -t romega-solutions .

# Run container
docker run -p 3000:3000 romega-solutions
```

See [docker-compose.yaml](../docker-compose.yaml) for production deployment.

## 📄 License

Proprietary - Romega Solutions © 2026

## 🤝 Contributing

This is a private project. For issues or questions, contact the development team.

---

Built with ❤️ by Romega Solutions Team
