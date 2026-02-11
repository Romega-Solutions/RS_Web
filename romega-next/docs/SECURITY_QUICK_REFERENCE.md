# Quick Security Reference Card

## 🚨 For Vulnerability Assessment (University of Makati)

### What They'll Test
1. ✅ **Base Operation** - How the system operates
2. ✅ **Current Security Measures** - Our defenses  
3. ✅ **Asset Discovery** - What endpoints/files they can find

### What We've Protected
- ✅ Hidden server information (no version numbers)
- ✅ Blocked sensitive files (.env, .git, etc.)
- ✅ Rate limiting active (prevents brute force)
- ✅ SQL injection blocked
- ✅ XSS attack blocked
- ✅ Generic error messages (no info leakage)
- ✅ Non-root container execution
- ✅ Read-only filesystem

---

## 🔥 Quick Commands

### Start with Security
```bash
# Development
cd romega-next
npm run dev

# Production (Docker)
docker-compose up -d

# Check security status
docker exec romega-solutions-website whoami  # Should be: nginx-app
docker exec romega-solutions-website ls -la  # Check permissions
```

### Test Security Features
```bash
# Test rate limiting
for i in {1..15}; do curl http://localhost:3000/api/test; done

# Test SQL injection block
curl "http://localhost:3000/?test=1'%20OR%20'1'='1"

# Test file access block
curl http://localhost:3000/.env
curl http://localhost:3000/.git/config
```

---

## 💻 Code Examples

### Protect an API Route
```typescript
// app/api/your-route/route.ts
import { withSecurity } from '@/lib/security';

async function handler(req: NextRequest) {
  // Your code here
  return NextResponse.json({ success: true });
}

// Wrap with security (rate limit: 5 req/min)
export const POST = withSecurity(handler, {
  windowMs: 60000,
  maxRequests: 5,
});
```

### Validate User Input
```typescript
import { 
  isValidEmail, 
  sanitizeHtml, 
  containsSqlInjection 
} from '@/lib/security';

// Validate email
if (!isValidEmail(email)) {
  return error('Invalid email');
}

// Sanitize HTML input
const safeMessage = sanitizeHtml(userInput);

// Check for SQL injection
if (containsSqlInjection(input)) {
  return blocked();
}
```

### Add Honeypot (Bot Detection)
```typescript
import { checkHoneypot } from '@/lib/security';

// In your form, add hidden field: <input name="website" style="display:none">
const body = await request.json();

if (!checkHoneypot(body.website)) {
  return error('Bot detected');
}
```

---

## 📊 Active Security Layers

### Layer 1: Proxy/Middleware (All Requests)
- ✅ Rate limiting: 60/min (pages), 10/min (API)
- ✅ Bot detection
- ✅ Pattern matching (SQL, XSS, traversal)
- ✅ Security headers

### Layer 2: API Protection (API Routes)
- ✅ Input validation
- ✅ Origin verification  
- ✅ Body size limits
- ✅ Content-type checks

### Layer 3: Nginx (Web Server)
- ✅ Rate limiting: 10/sec
- ✅ Connection limiting: 10/IP
- ✅ File type blocking
- ✅ Timeout protection
- ✅ Buffer overflow protection

### Layer 4: Docker (Container)
- ✅ Non-root user
- ✅ Read-only filesystem
- ✅ No new privileges
- ✅ Resource limits
- ✅ Capability restrictions

---

## 🎯 Common Scenarios

### Scenario 1: Form Submission
```typescript
import { validateContactForm, sanitizeText } from '@/lib/security';

const validation = validateContactForm(data);
if (!validation.passed) {
  return error(validation.error);
}

const clean = {
  name: sanitizeText(data.name),
  message: sanitizeHtml(data.message),
};
```

### Scenario 2: Database Query
```typescript
import { containsSqlInjection, sanitizeText } from '@/lib/security';

if (containsSqlInjection(userInput)) {
  console.warn('SQL injection attempt blocked');
  return blocked();
}

// Use parameterized queries (Prisma does this automatically)
const result = await prisma.user.findMany({
  where: { name: sanitizeText(userInput) }
});
```

### Scenario 3: File Upload
```typescript
import { isValidFileType } from '@/lib/security';

const allowedTypes = ['pdf', 'doc', 'docx'];
const filename = file.name;

if (!isValidFileType(filename, allowedTypes)) {
  return error('Invalid file type');
}
```

---

## 🔍 Monitoring

### Check Logs for Security Events
```bash
# Docker logs
docker logs romega-solutions-website | grep SECURITY

# Look for:
# - [SECURITY] RATE_LIMIT_EXCEEDED
# - [SECURITY] INVALID_HEADERS  
# - [SECURITY] INVALID_BODY
```

### What to Watch For
- Multiple rate limit hits from same IP
- Repeated 403 errors
- SQL/XSS pattern matches
- Bot user-agent strings

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `proxy.ts` | Main security proxy (Next.js 16+) |
| `lib/security/` | Security utilities |
| `next.config.ts` | Next.js security settings |
| `nginx.conf` | Web server security |
| `Dockerfile` | Container hardening |
| `docker-compose.yaml` | Container security options |

---

## 🚀 Before Assessment

1. ✅ All placeholder values removed from `.env.local`
2. ✅ Security middleware active
3. ✅ Docker running with security options
4. ✅ Logs monitoring enabled
5. ✅ All sensitive files in `.dockerignore`

---

## 📞 Emergency Response

If you see heavy attack traffic:

```bash
# Restart with fresh rate limits
docker-compose restart

# Or rebuild completely
docker-compose down
docker-compose up -d --build

# Check what's being blocked
docker logs romega-solutions-website --tail 100 | grep -E "403|429|SECURITY"
```

---

## 📚 Full Documentation
- [SECURITY_IMPLEMENTATION.md](SECURITY_IMPLEMENTATION.md) - Overview
- [romega-next/SECURITY_GUIDE.md](romega-next/SECURITY_GUIDE.md) - Detailed guide
- [romega-next/app/api/*/route.example.ts](romega-next/app/api/) - Code examples

---

**Status**: 🛡️ Protected and ready for assessment

**Last Updated**: February 6, 2026
