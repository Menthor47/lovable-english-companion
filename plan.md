# Plan & Status

## Completed (verified)

- Robots directive conflict fixed for noindex pages
  - `index.html` uses a `<!--seo-robots-->...<!--/seo-robots-->` placeholder
  - `prerender.js` replaces it with Helmet robots when present (e.g. `noindex` on 404)
- Contact form fail-fast on static hosting when API base URL is `/api` (`src/lib/api.ts`)
- Audit tool form validation added (Zod `safeParse`) (`src/pages/Audit.tsx`)
- React Query `QueryClient` is per app instance (SSR-safe) (`src/App.tsx`)
- Structured data hardened to avoid placeholder business info (`src/components/seo/StructuredData.tsx`)
  - Uses `LocalBusiness` only when address isn’t placeholder
  - Omits phone when it’s placeholder
- ErrorBoundary does not expose raw error messages to users (`src/components/ErrorBoundary.tsx`)
- Cookie consent state type deduplicated (`src/types/cookie-consent.ts`)
  - Analytics now imports/re-exports this type (`src/lib/analytics.ts`)

## Next steps (do these in order)

1. Verify project health
   - `cmd /c npm run typecheck`
   - `cmd /c npm run lint`

2. Production blockers (static hosting + Supabase Edge Functions)
   - Frontend build-time env (required):
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Supabase Edge Function env (contact) (required for browser calls to work cross-origin):
     - `ALLOWED_ORIGINS` (comma-separated, e.g. `https://agseo.pro,https://www.agseo.pro`)
     - `RESEND_API_KEY`
     - `RESEND_FROM_EMAIL`
     - `LEADS_TO_EMAIL`

3. Smoke test before deploy
   - `cmd /c npm run build`
   - Verify robots output:
     - `dist/static/index.html` contains `index, follow...`
     - `dist/static/404.html` contains exactly one `robots` meta with `noindex`
   - Submit both forms (Contact + Audit) and confirm:
     - No silent failures
     - Supabase function returns `{ success: true }`
     - Email + DB insert succeed

## Optional improvements

- Replace class-based ErrorBoundary with a functional alternative (if you want strict no-classes everywhere)
- Consolidate duplicate `window.gtag` typing into a single global `.d.ts`
