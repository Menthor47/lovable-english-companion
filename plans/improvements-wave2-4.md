# AGSEO Improvement Plan — Waves 2-4

## Status: Wave 1 security fixes COMPLETE. This plan covers everything remaining.

---

## Wave 2: Accessibility, UX Polish & Missing Functionality

### 2.1 Fix skip-link target across all pages
**Problem:** Skip link in [`main.tsx`](../src/main.tsx:23) points to `#main`, but only [`Index.tsx`](../src/pages/Index.tsx:46) has `id="main"` on its `<main>`. Every other page wraps content in a `<div>` without a main landmark id.

**Fix:** Create a shared `PageLayout` component that wraps Header + `<main id="main">` + Footer so every page gets the landmark automatically.

**Files:** Create `src/components/layout/PageLayout.tsx`, update all 27+ page files.

---

### 2.2 Add Skeleton/loading states for content-heavy pages
**Problem:** Blog, Glossary, Comparisons, and Case Studies pages render instantly from static data but have no visual loading feedback during lazy-load chunk fetch.

**Fix:** Add a `Skeleton` UI component and use it as fallback in `Suspense` boundaries per route group.

**Files:** Create `src/components/ui/skeleton.tsx`, update [`AnimatedRoutes.tsx`](../src/components/layout/AnimatedRoutes.tsx).

---

### 2.3 Add message/textarea field to Contact form
**Problem:** The contact form in [`Contact.tsx`](../src/components/sections/Contact.tsx:102) collects email, phone, and website but has no free-text message field. The Zod schema and API support it, but the UI doesn't expose it.

**Fix:** Add a `<textarea>` for message in the contact form UI.

**Files:** [`src/components/sections/Contact.tsx`](../src/components/sections/Contact.tsx), [`src/hooks/use-contact-form.ts`](../src/hooks/use-contact-form.ts) schema already supports it.

---

### 2.4 Add scroll-depth tracking
**Problem:** Analytics tracks page views and form submits but not engagement depth.

**Fix:** Create a `useScrollDepth` hook that fires `trackScrollDepth()` at 25/50/75/100% thresholds. Wire it into the `AnalyticsTracker` component.

**Files:** Create `src/hooks/useScrollDepth.ts`, update [`AnalyticsTracker.tsx`](../src/components/analytics/AnalyticsTracker.tsx).

---

### 2.5 Add CTA click tracking to all buttons
**Problem:** `trackCTAClick()` exists in analytics but is not wired to any CTA buttons.

**Fix:** Add `onClick` tracking to Hero CTAs, pricing CTAs, and contact CTAs.

**Files:** [`Hero.tsx`](../src/components/sections/Hero.tsx), [`Pricing.tsx`](../src/pages/Pricing.tsx), header CTA.

---

### 2.6 Passive scroll listener in Header
**Problem:** Scroll handler in [`Header.tsx`](../src/components/layout/Header.tsx:31) uses default non-passive listener, causing jank on mobile.

**Fix:** Add `{ passive: true }` to the scroll event listener.

**Files:** [`src/components/layout/Header.tsx`](../src/components/layout/Header.tsx).

---

## Wave 3: SEO, Build Pipeline & Performance

### 3.1 Replace regex-based sitemap generation with typed route registry
**Problem:** [`vite.config.ts`](../vite.config.ts:74) parses TypeScript source files with regex to extract slugs for sitemap. This is fragile and breaks silently on refactors.

**Fix:** Create a `src/data/routes.ts` that exports all route paths as typed data. Both the sitemap generator and `AnimatedRoutes` consume this single source of truth.

**Files:** Create `src/data/routes.ts`, update [`vite.config.ts`](../vite.config.ts), update [`AnimatedRoutes.tsx`](../src/components/layout/AnimatedRoutes.tsx).

---

### 3.2 Add RSS feed generation
**Problem:** Blog exists with posts but no RSS feed for syndication.

**Fix:** The script [`scripts/generate-rss.ts`](../scripts/generate-rss.ts) exists but isn't wired into the build. Add it to the build pipeline.

**Files:** [`package.json`](../package.json) build script, verify [`scripts/generate-rss.ts`](../scripts/generate-rss.ts).

---

### 3.3 Add `<link rel="alternate" hreflang>` tags for i18n
**Problem:** Site supports EN and RO but doesn't signal this to search engines via hreflang tags.

**Fix:** Add hreflang link tags in the Helmet output for each page.

**Files:** Create a shared SEO helper or update [`StructuredData.tsx`](../src/components/seo/StructuredData.tsx).

---

### 3.4 Optimize large comparison images
**Problem:** PNG comparison images in `public/images/comparisons/` are 700KB-950KB each. These are served unoptimized.

**Fix:** Convert to WebP, add responsive `srcset`, or run through the existing [`scripts/optimize-images.js`](../scripts/optimize-images.js) as part of CI.

**Files:** Image assets, build pipeline.

---

### 3.5 Add bundle size budget check
**Problem:** No CI gate on bundle size regression.

**Fix:** Add `vite-plugin-bundle-analyzer` or a simple size check script that fails CI if total JS exceeds a threshold.

**Files:** [`vite.config.ts`](../vite.config.ts), CI config.

---

## Wave 4: Testing, DX & Repo Hygiene

### 4.1 Add integration tests for critical flows
**Problem:** Zero test coverage. Vitest is configured but no tests exist beyond one config test.

**Priority tests:**
1. Contact form submission flow - validates Zod schema, honeypot, API call
2. Newsletter signup flow - validates email, Firestore write
3. Auth hook - login/logout/demo mode behavior
4. Route rendering - each page renders without crash

**Files:** Create `src/__tests__/` directory with test files.

---

### 4.2 Add Storybook stories for core UI components
**Problem:** Storybook is configured but only has default template stories, not actual project components.

**Fix:** Add stories for Button variants, GlassCard, FormFeedback, PageLoader, Contact form.

**Files:** `src/stories/` directory.

---

### 4.3 Clean up legacy artifacts from repo
**Problem:** Large files bloating the repo:
- `old BIGAUDIT/` — 2MB+ of audit PDFs, JSON dumps, markdown
- `agseo.zip` — 6MB archive
- `index_footer_check.txt` — 144KB debug dump
- `khroma colors` — design reference file
- `cmd` — empty file

**Fix:** Move to a separate archive or delete. Add to `.gitignore`.

**Files:** Root directory cleanup.

---

### 4.4 Add proper error reporting to Sentry from ErrorBoundary
**Problem:** [`ErrorBoundary`](../src/components/ErrorBoundary.tsx:21) only logs to console, doesn't report to Sentry.

**Fix:** Import Sentry and call `Sentry.captureException()` in `componentDidCatch`.

**Files:** [`src/components/ErrorBoundary.tsx`](../src/components/ErrorBoundary.tsx).

---

### 4.5 Add CONTRIBUTING.md and ENVIRONMENT.md docs
**Problem:** No onboarding documentation for new developers.

**Fix:** Create developer docs explaining setup, architecture decisions, deployment flow.

**Files:** Create `CONTRIBUTING.md`, `docs/ENVIRONMENT.md`.

---

## New Feature Ideas

### F1: Real audit functionality
The audit tool at [`/tools/audit`](../src/pages/Audit.tsx) currently simulates a scan with fake progress. Consider integrating a real Lighthouse/PageSpeed API call via a Cloud Function to provide actual scores.

### F2: Blog search and filtering
The blog page lists all posts but has no search, category filter, or tag system.

### F3: Multi-language URL routing
Currently both EN and RO share the same URL paths. Consider `/ro/` prefix routing for proper i18n SEO.

### F4: Client dashboard with real data
The dashboard is demo-only. Consider connecting it to real Google Search Console / Analytics data via OAuth for paying clients.

### F5: Email template system
Cloud Functions use inline HTML strings. Consider using a template engine like MJML or React Email for maintainable, responsive email templates.

---

## Priority Order for Implementation

| Priority | Item | Impact |
|----------|------|--------|
| 1 | 2.1 PageLayout + skip-link fix | A11y compliance |
| 2 | 2.3 Add message field to contact form | Lead quality |
| 3 | 2.6 Passive scroll listener | Mobile perf |
| 4 | 3.1 Typed route registry | Build reliability |
| 5 | 4.4 Sentry in ErrorBoundary | Observability |
| 6 | 4.3 Clean up legacy artifacts | Repo hygiene |
| 7 | 2.4 Scroll depth tracking | Analytics |
| 8 | 2.5 CTA click tracking | Analytics |
| 9 | 2.2 Skeleton loading states | UX polish |
| 10 | 3.3 Hreflang tags | International SEO |
| 11 | 3.4 Image optimization | Performance |
| 12 | 4.1 Integration tests | Quality gates |
| 13 | 3.2 RSS feed | Content distribution |
| 14 | 4.5 Developer docs | DX |

---

*Created: 2026-02-26*
