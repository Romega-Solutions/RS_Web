# Implementation Plan: Optimize Homepage Hero Video Delivery

**Branch**: `[001-optimize-hero-video]` | **Date**: 2026-03-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-optimize-hero-video/spec.md`

## Summary

The homepage hero now points to `public/romega-video.mp4` in `components/organisms/home/HeroSection.tsx`. This approved stakeholder source is **58.838 seconds** long and currently weighs **95,368,673 bytes (~91 MB)**. The poster `public/images/home/hero-right.png` weighs **1,175,969 bytes (~1.2 MB)**. Because these assets are above the fold and currently shipped from the app, they create high transfer cost and weak first-load behavior. The fix is a poster-first progressive enhancement approach: prepare optimized derived assets, deliver them from an external object-storage/CDN origin, keep a lightweight local fallback visual, and only enhance to video when the visitor's conditions support it.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16 App Router  
**Primary Dependencies**: Native `<video>`, CSS Modules with BEM, existing env validation utilities, Playwright, external `ffmpeg` asset processing  
**Storage**: External object storage/CDN for published hero media; local repo stores only lightweight fallback assets  
**Testing**: `npm run lint`, `npm test`, `E2E_TEST=1 npm run test:e2e`  
**Target Platform**: Chrome 91+, Edge 91+, Firefox 90+, Safari 15+, iOS 15+  
**Project Type**: Web application  
**Performance Goals**: Desktop hero video <=5 MB, optional smaller mobile variant <=3 MB, fallback poster <=250 KB, no blank hero region during load, no user-visible layout shift from media state changes  
**Constraints**: No raw large video in `public`, no CSP broadening with permissive wildcards, preserve current hero layout and CTA behavior, keep autoplay muted and inline only, avoid test dependence on third-party media availability  
**Scale/Scope**: Homepage hero only, plus supporting config, tests, and documentation for the media workflow

## Constitution Check

- **Code Quality & TypeScript Excellence**: Pass if media URLs are centralized in typed config/constants and no untyped runtime branching is introduced.
- **Consistent UI/UX & Design System Adherence**: Pass if the current HeroSection layout, CTA placement, and BEM styling remain intact.
- **Accessibility First**: Needs explicit handling. The hero video should remain decorative, the text and CTA must carry the meaning, and reduced-motion users should not be forced into autoplay motion.
- **Performance Optimization**: Primary driver for this feature. The current ~91 MB source video and 1.2 MB poster violate the intent of this principle for above-the-fold media.
- **Test Coverage & Quality Assurance**: Pass if homepage E2E covers fallback behavior and unit/component tests cover media selection logic.
- **Security & Production Safety**: Pass only if the chosen media origin is explicitly allowed in CSP and validated through environment safeguards.

## Project Structure

### Documentation (this feature)

```text
specs/001-optimize-hero-video/
├── spec.md
└── plan.md
```

### Source Code (planned changes)

```text
components/organisms/home/
├── HeroSection.tsx
├── HeroSection.module.css
└── HeroMedia.tsx

lib/
├── constants.ts
└── security/
    └── env-validation.ts

__tests__/
└── components/
    └── home/
        └── HeroMedia.test.tsx

e2e/
└── homepage.spec.ts

docs/
├── optimization.md
└── IMAGE_ASSET_GUIDE.md

next.config.ts
```

**Structure Decision**: Keep the hero layout in the existing home organism, extract media loading and fallback behavior into a small dedicated client component, and update only the config/security files required to support external media delivery.

## Phase 0 Research Decisions

- Keep the hero video decorative and muted. Because the homepage message is already in text, the web-delivered hero asset does not need an audio track.
- Use a poster-first strategy. Server render should always produce a stable hero visual even if video never loads.
- Publish hero media outside the Next.js app. The repo should not remain the delivery source for the heavy hero video.
- Keep MP4 as the required compatibility fallback. Optional WebM can be added after the MP4 path is stable and measured.
- Prefer exact allowed media origins in CSP over broad `https:` or wildcard media rules.

## Implementation Phases

### Phase 1 - Prepare the media assets

1. Produce a lightweight poster from the approved source video and replace the current 1.2 MB PNG fallback with a web-appropriate asset.
2. Generate at least one optimized production video variant for desktop browsers and optionally a smaller mobile variant.
3. Remove audio from web video outputs unless the business decides sound is required for a different non-hero context.
4. Keep the original high-quality source outside the application repository.

Recommended commands:

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':-2" -an -c:v libx264 -preset slow -crf 28 -movflags +faststart hero-720p.mp4
ffmpeg -i input.mp4 -vf "scale='min(960,iw)':-2" -an -c:v libx264 -preset slow -crf 30 -movflags +faststart hero-480p.mp4
ffmpeg -i input.mp4 -ss 00:00:01.000 -vframes 1 -q:v 3 hero-poster.jpg
```

Asset targets:

- `hero-720p.mp4`: <=5 MB
- `hero-480p.mp4`: <=3 MB
- `hero-poster.jpg`: <=250 KB

### Phase 2 - Move delivery off the app bundle

1. Upload optimized outputs to a CDN-backed object storage bucket.
2. Introduce a public configuration value such as `NEXT_PUBLIC_HOME_HERO_MEDIA_BASE_URL` or explicit hero asset URLs.
3. Never fall back to the current ~91 MB local MP4 when CDN media is not configured. The safe fallback is poster-only rendering.
4. Keep a lightweight local poster asset for SSR fallback and deployment safety.

### Phase 3 - Update homepage rendering

1. Add a small `HeroMedia` client component that initially renders the poster or fallback state.
2. After mount, upgrade to video only when all of the following are true:
   - optimized media URLs are configured
   - the user is not in reduced-motion mode
   - the browser and network conditions do not indicate a constrained experience
3. Keep `muted`, `loop`, `playsInline`, and `preload="none"`.
4. Add stable test selectors such as `data-testid="home-hero-media"` and `data-testid="home-hero-poster"`.
5. Remove the current empty `<track>` element unless a real captions asset is provided.

### Phase 4 - Security and config hardening

1. Update `next.config.ts` CSP headers to explicitly allow the chosen CDN origin for `media-src`.
2. Validate the new public media URL env var in `lib/security/env-validation.ts`.
3. Keep the policy tight:
   - production requires an HTTPS media origin
   - no wildcard host allowances for media delivery
4. If remote poster images are used outside native `video[poster]`, add the CDN host to Next image remote patterns only when necessary.

### Phase 5 - Testing and verification

1. Add unit or component tests for media selection logic:
   - poster-only when media config is missing
   - poster-only when reduced motion is preferred
   - video enabled when config is present and conditions allow
2. Extend `e2e/homepage.spec.ts` to verify:
   - hero fallback is visible on first render
   - homepage remains functional when hero video is unavailable
   - no broken media request blocks the main CTA and headline
3. Run validation commands:
   - `npm run lint`
   - `npm test`
   - `E2E_TEST=1 npm run test:e2e`
4. Measure the homepage after implementation:
   - confirm the local ~91 MB MP4 is no longer requested
   - confirm the poster loads before video
   - confirm no CSP violations appear in the console
   - confirm Lighthouse and Core Web Vitals improve or do not regress

## Risks and Mitigations

- **External media origin blocked by CSP**: Add an exact `media-src` allowlist and verify in preview before production rollout.
- **CDN asset missing or misconfigured**: Keep poster-first rendering and avoid a hard dependency on video presence.
- **Safari or older browser codec mismatch**: Keep MP4 as the baseline fallback and add WebM only as an additional source.
- **Mobile bandwidth still too high**: Ship a smaller mobile MP4 variant or suppress autoplay under constrained conditions.
- **Editors upload oversized replacement media later**: Document the encoding workflow and file-size thresholds in project docs.

## Validation Plan

- **Functional**: The homepage remains visually complete and usable with or without video playback.
- **Performance**: Hero media payload is reduced to the stated thresholds and no longer dominates initial page transfer.
- **Accessibility**: Reduced-motion users and autoplay-restricted browsers receive a stable non-breaking fallback.
- **Security**: CSP changes remain minimal and environment validation rejects insecure production media origins.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Small client-side media component | Needed to keep SSR poster-first and avoid forcing video load for reduced-motion or constrained users | Rendering the video directly in `HeroSection.tsx` cannot reliably prevent autoplay or download on all clients while preserving a strong fallback |