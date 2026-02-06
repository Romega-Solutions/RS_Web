# SEO Quick Test Guide
## Verify SEO Implementation

Run these quick tests after deployment to verify SEO is working correctly.

---

## 🚀 Quick Tests (5 minutes)

### 1. Check Core SEO Files

```bash
# Test locally (development)
npm run build
npm run start

# Then test these URLs:
```

**robots.txt**
- URL: http://localhost:3000/robots.txt
- ✅ Should show: User-agent rules, Sitemap location, Disallow rules
- ✅ Should block: Bad bots (AhrefsBot, GPTBot, etc.)

**sitemap.xml**
- URL: http://localhost:3000/sitemap.xml
- ✅ Should show: XML format with all pages
- ✅ Should include: changeFrequency, priority, lastModified
- ✅ Pages: /, /about, /services, /careers, /talent, /contact

**manifest.json**
- URL: http://localhost:3000/manifest.webmanifest
- ✅ Should show: PWA configuration
- ✅ Should include: name, icons, theme_color, display

---

## 🔍 Browser Tests

### Open Graph Preview (Facebook/LinkedIn)
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL (production): https://www.romegasolutions.com
3. Click "Debug"
4. ✅ Verify: Title, Description, Image appear correctly

### Twitter Card Preview
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. ✅ Verify: Card type "summary_large_image", Image loads

### Mobile-Friendly Test
1. Go to: https://search.google.com/test/mobile-friendly
2. Enter your URL
3. ✅ Target: "Page is mobile-friendly"

---

## 📊 Lighthouse Audit

### Chrome DevTools Method
1. Open your site: https://www.romegasolutions.com
2. Press F12 (DevTools)
3. Go to "Lighthouse" tab
4. Select: Performance, Accessibility, Best Practices, SEO
5. Click "Analyze page load"

### Target Scores
```
✅ Performance:     90+
✅ Accessibility:   95+
✅ Best Practices:  95+
✅ SEO:            100
```

### Key SEO Checks in Lighthouse
- ✅ Document has a `<title>` element
- ✅ Document has a meta description
- ✅ Links have descriptive text
- ✅ Image elements have [alt] attributes
- ✅ Page has successful HTTP status code
- ✅ Document has a valid `rel=canonical`
- ✅ Document has a `<meta name="viewport">` tag with width or initial-scale
- ✅ robots.txt is valid
- ✅ Page has the HTML doctype
- ✅ Charset declaration is present

---

## 🧪 Structured Data Validation

### Schema.org Validator
1. Go to: https://validator.schema.org
2. Enter your URL or paste HTML
3. ✅ Should find: Organization schema (homepage)
4. ✅ Should find: ContactPage schema (contact page)
5. ✅ No errors or warnings

### Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter your URL
3. ✅ Verify: Organization schema is valid
4. ✅ Check for: Rich snippets eligibility

---

## 📈 Google Search Console Setup

### After Production Deployment

1. **Add Property**
   - Go to: https://search.google.com/search-console
   - Click "Add Property"
   - Enter domain: www.romegasolutions.com
   - Choose verification method (DNS recommended)

2. **Verify Ownership**
   - Add verification code to DNS or meta tag
   - Click "Verify"

3. **Submit Sitemap**
   - Go to "Sitemaps" in left sidebar
   - Enter: https://www.romegasolutions.com/sitemap.xml
   - Click "Submit"
   - Wait 24-48 hours for indexing

4. **Monitor**
   - Coverage: Check indexed pages
   - Performance: Track clicks, impressions, CTR
   - Enhancements: Check mobile usability

---

## 🎯 Post-Launch Checklist

### Week 1
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify all pages are indexed
- [ ] Check for crawl errors
- [ ] Set up Google Analytics goals

### Week 2-4
- [ ] Monitor keyword rankings
- [ ] Check page load speeds
- [ ] Review top landing pages
- [ ] Identify and fix 404 errors
- [ ] Optimize underperforming pages

### Monthly
- [ ] Review Search Console performance
- [ ] Update content (especially careers page)
- [ ] Check for broken links
- [ ] Monitor competitor SEO
- [ ] A/B test meta descriptions

---

## 🔧 Command Line Tests

```bash
# Test robots.txt
curl https://www.romegasolutions.com/robots.txt

# Test sitemap (should return XML)
curl https://www.romegasolutions.com/sitemap.xml

# Test manifest
curl https://www.romegasolutions.com/manifest.webmanifest

# Test meta tags (grep for specific tags)
curl https://www.romegasolutions.com | grep -i "<title>"
curl https://www.romegasolutions.com | grep -i "og:title"
curl https://www.romegasolutions.com | grep -i "twitter:card"

# Check response headers (should include security headers)
curl -I https://www.romegasolutions.com
```

---

## 📱 Mobile Testing

### Manual Testing
1. Open site on actual mobile device
2. Test navigation, forms, CTAs
3. Check image loading
4. Verify text readability (no zooming needed)
5. Test touch targets (buttons, links)

### Chrome DevTools Mobile Emulation
1. Press F12
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device: iPhone 13, Pixel 5, etc.
4. Test page load and interactions

---

## ✅ Success Metrics

### Immediate (Week 1)
- ✅ All pages indexed in Google Search Console
- ✅ No crawl errors
- ✅ Lighthouse SEO score: 100
- ✅ Mobile-friendly test passed

### Short-term (Month 1)
- ✅ Organic traffic baseline established
- ✅ Top 5 keywords identified
- ✅ Average position < 50 for target keywords
- ✅ CTR > 2% from search

### Long-term (3-6 months)
- ✅ Target keywords in top 10 positions
- ✅ Organic traffic growth: 20%+ MoM
- ✅ Featured snippets for 2+ queries
- ✅ Domain authority improvement

---

## 🆘 Troubleshooting

### Pages Not Indexed
1. Check robots.txt isn't blocking
2. Verify sitemap submitted to Search Console
3. Request indexing manually in Search Console
4. Check for `noindex` meta tags (shouldn't have any)

### Low SEO Score
1. Run Lighthouse audit to see specific issues
2. Check meta descriptions (unique per page)
3. Verify heading hierarchy (H1 > H2 > H3)
4. Ensure images have alt text
5. Fix any broken links

### Slow Page Speed
1. Optimize images (use WebP format)
2. Enable caching
3. Minimize JavaScript
4. Use CDN for static assets
5. Check server response time

---

## 📞 Support

For SEO issues or questions:
- **Documentation**: [SEO_GUIDE.md](./SEO_GUIDE.md)
- **Email**: info@romega-solutions.com

---

**Last Updated**: February 2026
