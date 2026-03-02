# Architecture Overview

## Runtime Model

- Frontend: React + Vite + TypeScript
- Routing: React Router
- State/async: React Query + local hooks
- Backend: Firebase (Firestore + Functions)
- Hosting: static output (`dist/static`) + SPA rewrites

## Rendering Strategy

- Prerender/SSR output is generated during build via:
  - `vite build --ssr` (`src/entry-server.tsx`)
  - `prerender.js`
- Client mount path is controlled in `src/main.tsx` with hydration fallback.

## Data Flow (Lead Capture)

1. UI form components collect input.
2. `use-contact-form` validates input and calls `api.contact.submit`.
3. Firestore write to `contact_requests` / `audit_requests`.
4. Firebase Functions trigger email workflows.

## Security Controls (Current)

- Firestore deny-by-default with constrained public create rules.
- CSP and security headers in `vercel.json`.
- Rate-limit endpoint with origin checks.

## Known Improvement Tracks

- Consolidate env validation into a single typed config module.
- Strengthen function idempotency state transitions.
- Add CI quality gates and emulator-backed integration tests.
