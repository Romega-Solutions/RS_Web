# Security Implementation Guide

This document outlines the comprehensive security measures implemented to protect the Romega Solutions website against vulnerability assessments and potential attacks.

## 🛡️ Security Layers Implemented

### 1. **Application Layer Security (Next.js)**

#### Proxy Protection ([proxy.ts](../proxy.ts))
- **Rate Limiting**: 60 requests/minute for regular routes, 10 requests/minute for API routes
- **Suspicious Pattern Detection**: Blocks SQL injection, XSS, and path traversal attempts
- **Bot/Scanner Detection**: Identifies and blocks common security scanning tools
- **Security Headers**: Comprehensive security headers on all responses

#### Security Headers Applied:
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: Strict CSP policy
```

### 2. **API Route Protection**

#### Security Utilities ([lib/security/](lib/security/))

**api-protection.ts**: Wrapper for API routes with automatic security checks
- Rate limiting per client
- Request validation
- Origin verification
- Body size validation
- Injection attempt detection

**validation.ts**: Input validation and sanitization
- Email validation with strict regex
- Phone number validation
- HTML and text sanitization
- SQL injection detection
- XSS pattern detection
- URL validation
- Honeypot field checking
- CSRF token generation

**env-validation.ts**: Environment variable validation
- Checks for placeholder values in production
- Validates URL formats
- Ensures HTTPS in production
- Obfuscates sensitive keys in logs

### 3. **Network Layer Security (Nginx)**

Enhanced [nginx.conf](../nginx.conf) with:
- **Version Hiding**: `server_tokens off`
- **Buffer Overflow Protection**: Limited buffer sizes
- **Timeout Protection**: Prevents slowloris attacks
- **Rate Limiting**: 10 requests/second with burst capacity
- **Connection Limiting**: Max 10 connections per IP
- **File Type Blocking**: Blocks .php, .asp, .jsp, .cgi files
- **Sensitive File Protection**: Blocks access to .env, .git, package.json, etc.
- **SQL Injection URL Blocking**: Blocks URLs with SQL keywords
- **Error Obfuscation**: Shows 404 for 403 and 500 errors

### 4. **Container Security (Docker)**

Enhanced [Dockerfile](../Dockerfile):
- **Non-root User**: Runs as user ID 1001
- **Minimal Base Image**: Alpine Linux
- **Security Labels**: Metadata for tracking
- **File Permissions**: Strict ownership and permissions
- **Regular Updates**: Package upgrades on build

Enhanced [docker-compose.yaml](../docker-compose.yaml):
- **Read-only Root Filesystem**: Prevents unauthorized modifications
- **Capability Restrictions**: Drops all capabilities, adds only necessary ones
- **Resource Limits**: CPU and memory constraints
- **Security Options**: `no-new-privileges` enabled
- **Temporary Filesystems**: Limited and no-exec tmpfs mounts
- **Logging Limits**: Prevents log flooding attacks

## 🔒 How to Use Security Features

### Protecting API Routes

```typescript
// app/api/contact/route.ts
import { NextRequest } from 'next/server';
import { withSecurity, validateContactForm } from '@/lib/security/api-protection';

async function handleContact(request: NextRequest) {
  const body = await request.json();
  
  // Validate contact form
  const validation = validateContactForm(body);
  if (!validation.passed) {
    return createSecurityErrorResponse(
      validation.error!,
      validation.statusCode
    );
  }

  // Process the contact form
  // ... your logic here
}

// Wrap with security middleware
export const POST = withSecurity(handleContact, {
  windowMs: 300000, // 5 minutes
  maxRequests: 3,   // 3 requests per 5 minutes
});
```

### Manual Security Checks

```typescript
import { 
  isValidEmail, 
  sanitizeHtml, 
  containsSqlInjection,
  containsXss 
} from '@/lib/security/validation';

// Validate input
if (!isValidEmail(email)) {
  throw new Error('Invalid email');
}

// Sanitize user input
const safeMessage = sanitizeHtml(userMessage);

// Check for attacks
if (containsSqlInjection(input) || containsXss(input)) {
  // Block the request
}
```

## 🎯 Protection Against Vulnerability Assessment

The implemented security measures specifically address the assessment criteria:

### 1. **Base Operation Security**
- ✅ Obfuscated server information (nginx version hidden)
- ✅ Minimal error information disclosure
- ✅ Secure file permissions in Docker
- ✅ Non-root process execution

### 2. **Current Security Measures**
- ✅ Multi-layer security (Application, Network, Container)
- ✅ Rate limiting and connection limiting
- ✅ Input validation and sanitization
- ✅ Security headers and CSP
- ✅ Automated threat detection

### 3. **Asset Discovery Protection**
- ✅ Hidden file system information
- ✅ Blocked access to sensitive files (.env, .git, etc.)
- ✅ Technology stack obfuscation
- ✅ Generic error messages
- ✅ Disabled directory listing

## 🚀 Deployment Checklist

Before deploying to production:

1. **Environment Variables**
   ```bash
   # Run validation
   npm run build
   # Check for warnings about placeholder values
   ```

2. **Enable HTTPS**
   - Update nginx.conf to listen on port 443
   - Add SSL certificates
   - Enable HSTS header

3. **Update CSP**
   - Review and update Content-Security-Policy in proxy.ts
   - Add production domains to allowlist

4. **Docker Security**
   ```bash
   # Build with security scanning
   docker build --no-cache -t romega-solutions:latest .
   
   # Run with security options
   docker-compose up -d
   ```

5. **Monitoring**
   - Set up log monitoring for security events
   - Monitor rate limit triggers
   - Track suspicious request patterns

## 📊 Security Monitoring

The system logs security events with obfuscated IP addresses:

```
[SECURITY] RATE_LIMIT_EXCEEDED - IP: 192.168.xxx.xxx - Path: /api/contact
[SECURITY] INVALID_HEADERS - IP: 10.0.xxx.xxx - Path: /api/careers
```

Review logs regularly for:
- Repeated rate limit violations
- Suspicious request patterns
- Invalid input attempts
- Bot/scanner access attempts

## 🔐 Additional Recommendations

1. **For Production**:
   - Enable HTTPS/TLS with valid certificates
   - Use environment-specific rate limits
   - Implement Redis for distributed rate limiting
   - Add Web Application Firewall (WAF)
   - Enable DDoS protection (Cloudflare, AWS Shield)

2. **Regular Maintenance**:
   - Update dependencies monthly: `npm audit fix`
   - Rebuild Docker images with latest Alpine: `docker-compose build --no-cache`
   - Review and update security patterns
   - Test security measures periodically

3. **Compliance**:
   - Document security measures for assessments
   - Keep security audit logs
   - Maintain incident response plan

## 🛠️ Troubleshooting

### Rate Limiting Too Strict
Edit [proxy.ts](../proxy.ts):
```typescript
const RATE_LIMIT_MAX_REQUESTS = 100; // Increase from 60
```

### Blocked Legitimate Traffic
Review suspicious patterns in proxy.ts and adjust:
```typescript
const SUSPICIOUS_PATTERNS = [
  // Comment out patterns causing false positives
];
```

### CSP Violations
Check browser console for CSP errors and update policy in proxy.ts

## 📝 Security Compliance

This implementation provides protection against:
- ✅ OWASP Top 10 vulnerabilities
- ✅ SQL Injection attacks
- ✅ Cross-Site Scripting (XSS)
- ✅ Cross-Site Request Forgery (CSRF)
- ✅ Clickjacking
- ✅ Information disclosure
- ✅ Brute force attacks
- ✅ DDoS attacks (basic protection)
- ✅ Path traversal attacks
- ✅ Header injection attacks

---

**Note**: This is a multi-layered security approach. No single layer is perfect, but together they provide comprehensive protection for your website during vulnerability assessments.

For questions or issues, refer to individual security module documentation in [lib/security/](lib/security/).
