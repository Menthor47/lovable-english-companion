# Architecture Overview

## Runtime Model

- Frontend: React + Vite + TypeScript
- Routing: React Router
- State/async: React Query + local hooks
- Backend: Firebase (Firestore + Functions)
- Hosting: static output (`dist/static`), uploaded by hand to Apache; routing and cache rules are in `public/.htaccess`

## Rendering Strategy

- Prerender/SSR output is generated during build via:
  - `vite build --ssr` (`src/entry-server.tsx`)
  - `prerender.js`
- Client mount path is controlled in `src/main.tsx` with hydration fallback.

## Data Flow (Lead Capture)

1. UI form components collect input.
2. The form (`use-contact-form` or `src/pages/Audit.tsx`) validates input and calls `api.contact.submit`.
3. Firestore write to `contact_requests` / `audit_requests`.
4. Firebase Functions trigger email workflows.

## Security Controls (Current)

- Firestore deny-by-default with constrained public create rules.
- CSP and security headers are defined only in `vercel.json`, which isn't used, so they aren't applied on the live Apache site.
- Best-effort, client-side rate-limit check using an endpoint with origin checks. The client calls it only when `VITE_RATE_LIMIT_FUNCTION_URL` is set. It doesn't limit direct creates to the public Firestore collections, which `firestore.rules` still allows.

## Known Improvement Tracks

- Consolidate env validation into a single typed config module.
- Strengthen function idempotency state transitions.
- Add CI quality gates and emulator-backed integration tests.
