## Recommendation

For a **200 MB video**, do **not** ship the raw file directly inside your Next.js app. The best practical setup is:

1. **Compress the source video aggressively**
2. **Generate at least two versions**

   * `poster.jpg` for instant preview
   * `video.mp4` (H.264) for universal compatibility
   * optional `video.webm` (AV1 or VP9) for better compression
3. **Host the video on object storage/CDN**, not inside the bundled app
4. **Lazy-load the video**
5. **Never autoplay a huge full-resolution file above the fold unless it is critical**

That aligns with Next.js guidance to optimize videos carefully and with Vercel’s recommendation to avoid serving large video assets in ways that create unnecessary bandwidth and performance cost. ([Next.js][1])

---

## Best usage for a Next.js website

### Fast-shipping approach

Use this when you need a good result immediately:

* Convert the video to **MP4 (H.264 + AAC)**
* Resize to **720p** unless the section truly needs 1080p
* Target roughly **1.5–4 MB** for short hero/background videos
* Extract a **poster image**
* Store video in:

  * Vercel Blob
  * Cloudflare R2 + CDN
  * S3 + CloudFront
* Render with native `<video>` and `preload="none"` unless the video is the main LCP asset

### Long-term scalable architecture

Use this for production-scale sites:

* Upload original video to storage
* Run a video pipeline that generates:

  * `poster.jpg`
  * `480p.mp4`
  * `720p.mp4`
  * optional `720p.webm`
* Serve through CDN
* Pick source based on viewport or use multiple `<source>` tags
* Add analytics on:

  * start rate
  * completion rate
  * buffering rate
  * bytes transferred
* Add fallback for mobile / low bandwidth

---

## Target output sizes

For web delivery, a good target is:

| Video Type                 |                 Suggested Size |
| -------------------------- | -----------------------------: |
| Short UI/demo clip (5–15s) |                         1–3 MB |
| Hero/background loop       |                         1–5 MB |
| Product explainer (15–45s) |                         3–8 MB |
| Long-form video            | Do not inline; stream or embed |

A **200 MB file** is almost certainly too large for normal website delivery unless it is being streamed externally.

---

## Best codec strategy

### Safest default

* **MP4 container**
* **H.264 video**
* **AAC audio**

This remains the safest compatibility option across browsers. ([MDN Web Docs][2])

### Better compression

* Add a **WebM** version with **AV1** or **VP9**
* Keep MP4 as fallback

MDN notes AV1 can provide strong compression efficiency, but Safari support is more limited on older Apple devices, so fallback is important. ([MDN Web Docs][3])

**Practical decision:**

* Use **MP4 only** if you want simplicity
* Use **WebM + MP4 fallback** if performance matters more and you can afford extra encoding/storage

---

## Exact ffmpeg command to compress it

### Balanced web output

```bash
ffmpeg -i input.mp4 \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -preset slow -crf 28 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  output-720p.mp4
```

### More aggressive compression

```bash
ffmpeg -i input.mp4 \
  -vf "scale='min(960,iw)':-2" \
  -c:v libx264 -preset slow -crf 30 \
  -c:a aac -b:a 64k \
  -movflags +faststart \
  output-small.mp4
```

### Poster image

```bash
ffmpeg -i input.mp4 -ss 00:00:01.000 -vframes 1 poster.jpg
```

### Optional WebM version

```bash
ffmpeg -i input.mp4 \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libvpx-vp9 -b:v 0 -crf 33 \
  -c:a libopus -b:a 64k \
  output-720p.webm
```

---

## Why these settings matter

### `-crf`

Controls quality vs file size.

* `23` = higher quality, larger size
* `28` = good for web
* `30+` = smaller, but quality drops faster

### `-preset slow`

Takes longer to encode, but gives smaller files at similar quality.

### `-movflags +faststart`

Moves MP4 metadata to the front so playback can begin sooner on the web. This is important for perceived performance.

### `scale`

Do not keep 4K or even 1080p unless the design actually needs it.

---

## Best Next.js implementation

### Recommended component

```tsx
export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/videos/poster.jpg"
      className="h-full w-full object-cover"
    >
      <source src="https://cdn.yoursite.com/videos/hero-720p.webm" type="video/webm" />
      <source src="https://cdn.yoursite.com/videos/hero-720p.mp4" type="video/mp4" />
    </video>
  );
}
```

---

## Performance rules that matter most

### 1. Do not import large videos into your app bundle

Bad:

```tsx
import heroVideo from '@/public/huge-video.mp4'
```

That makes asset management heavier and is not ideal for large media.

Better:

* host via CDN/object storage
* reference by URL

### 2. Use a poster image

Show the poster first. This improves perceived load speed and reduces blank areas while video initializes. Next.js specifically discusses handling videos carefully and using good loading patterns. ([Next.js][1])

### 3. Use `preload="none"` or `metadata`

* `none` for non-critical videos
* `metadata` if you want duration and first metadata only
* avoid `auto` unless necessary

### 4. Only autoplay when muted

For hero/background videos, use:

* `muted`
* `playsInline`
* `loop`

### 5. Keep the video out of LCP when possible

If your hero video is above the fold, it can hurt initial render perception. Prefer:

* poster as visible LCP element
* video hydrates shortly after

### 6. Consider external streaming for long-form video

For tutorials, demos, webinars:

* YouTube embed
* Vimeo
* Mux
* Cloudflare Stream

This is usually better than self-hosting a large progressive file.

---

## Best architecture

### Recommendation

For most production Next.js sites:

**Upload pipeline**

* Original video uploaded to storage
* Background job transcodes to web variants
* Store outputs in CDN bucket
* Save metadata in DB/CMS

**Delivery**

* Next.js page renders poster immediately
* video loads lazily
* optional intersection observer starts loading only when near viewport

### Architecture

* Next.js frontend
* CDN/object storage for assets
* ffmpeg job in background worker
* CMS/DB stores:

  * URL
  * poster URL
  * duration
  * resolution
  * mime type
  * file size

### Trade-offs

* **Fast shipping**: manual ffmpeg + upload compressed MP4
* **Scalable**: automated transcoding pipeline

### Failure modes + mitigations

* Huge files uploaded by content editors
  → validate file size and duration on upload
* Wrong codec/browser issues
  → keep MP4 fallback
* High CDN bills
  → use lower resolutions, lazy load, external streaming for long videos
* Slow mobile experience
  → serve smaller mobile variant or avoid autoplay on mobile
* Poor CLS/LCP
  → always use fixed container dimensions and poster image

### Tests + observability

Track:

* video start time
* percentage watched
* buffering errors
* transferred bytes
* page LCP and INP
* mobile performance by connection type

Vercel’s production guidance emphasizes measuring real performance and optimizing Core Web Vitals in production, not just locally. ([Vercel][4])

---

## My concrete recommendation for you

For your **next build**, do this:

1. Compress 200 MB video to **720p MP4**
2. Aim for **under 5 MB** if it is a short landing-page video
3. Generate a **poster.jpg**
4. Upload both to **S3/R2/Vercel Blob**
5. Use:

   * `poster`
   * `preload="none"`
   * `muted playsInline loop` if background video
6. Add WebM later only if needed
7. Do not place the raw 200 MB file in `/public` and call it done

---

## Best default for a landing page hero

```tsx
export default function HeroSection() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="https://cdn.yoursite.com/videos/hero-poster.jpg"
      >
        <source src="https://cdn.yoursite.com/videos/hero-720p.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Your Headline</h1>
      </div>
    </section>
  );
}
```

---

## Principal-level call

Do **not** treat video compression as just a frontend concern. It is an **asset pipeline problem** involving:

* encoding strategy
* browser compatibility
* CDN cost
* perceived performance
* mobile degradation
* observability

The strongest production choice is:

**poster-first + compressed CDN-hosted MP4 + lazy loading + optional WebM fallback**

That is the highest ROI setup for performance and operational simplicity.

I can give you a **copy-paste ffmpeg workflow plus a reusable Next.js Video component with lazy loading and mobile fallback**.

[1]: https://nextjs.org/docs/app/guides/videos?utm_source=chatgpt.com "Guides: Videos"
[2]: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers?utm_source=chatgpt.com "Media container formats (file types) - MDN Web Docs - Mozilla"
[3]: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs?utm_source=chatgpt.com "Web video codec guide - Media - MDN Web Docs"
[4]: https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024?utm_source=chatgpt.com "Optimizing Core Web Vitals in 2024"
