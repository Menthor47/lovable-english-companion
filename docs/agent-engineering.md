# Project workflow guide

Scope: this repository, which has one site package and one Firebase Functions package.
Purpose: find the current project authorities and accepted standards. This guide grants no permission to commit, push, merge, deploy, or write to external services.

## Where to look

| Concern | Read when | Source |
|---|---|---|
| Product, users and positioning | Copy, features, or anything making a claim | [PRODUCT.md](../PRODUCT.md) |
| Architecture and data flow | Rendering, routing, lead capture, or backend changes | [Architecture overview](architecture.md) |
| Engineering standards | Any change to behavior or content | [Standards](#standards) in this guide |
| Stack, versions and commands | Before running or changing a check; working directory is the repository root | [package.json](../package.json) `scripts` and `engines`, [.node-version](../.node-version) |
| CI checks | Before publishing | [CI workflow](../.github/workflows/ci.yml) |
| Backend commands | Changes under `functions/`; working directory is `functions/` | [functions/package.json](../functions/package.json) `scripts` |
| Lead storage and access rules | Changes to forms, fields or collections | [firestore.rules](../firestore.rules), [functions/src/index.ts](../functions/src/index.ts), [src/lib/api.ts](../src/lib/api.ts) |
| Environment variables | Setup, or adding a setting | [.env.example](../.env.example), [src/lib/constants.ts](../src/lib/constants.ts) |
| Live routing and cache rules | Route, redirect or asset changes | [public/.htaccess](../public/.htaccess), [prerender.js](../prerender.js) |
| Translations | Any user-facing text | [English](../src/locales/en/translation.json), [Romanian](../src/locales/ro/translation.json) |

These are historical and are not current instructions: `plan.md` (describes Supabase), `plans/`, `audit site.md`, `indexing-audit.md`, `old BIGAUDIT/` and `new audit/`. Treat them as background only.

## Standards

Rules ENG-1 to ENG-4 were accepted by the project owner on 2026-11-04. Keep these IDs stable.

| ID | Rule | Applies to | Known exceptions to resolve |
|---|---|---|---|
| ENG-1 | **Real proof only.** Don't ship invented or simulated results, scores, testimonials, client claims or partnerships. Label illustrative content as illustrative. | Copy, data files, UI states | Items listed under Evidence on Hand in [PRODUCT.md](../PRODUCT.md) stay unverified until the owner confirms them |
| ENG-2 | **Secrets stay out of git.** Never commit server keys. `VITE_` variables reach the browser, so they may hold only browser-safe settings. | `.env*`, config, any new setting | `.env` is tracked despite being in `.gitignore` |
| ENG-3 | **Routes open directly.** Every public route needs a prerendered page. Check direct links with Apache-style serving, because `vite preview` returns the homepage HTML for URLs without a trailing slash. | Routes, `prerender.js`, sitemap | `/resources/glossary/:slug` has no prerendered pages |
| ENG-4 | **English and Romanian.** Every user-facing string goes in both language files. Write Romanian natively rather than translating it word for word. | UI text, error messages | Some strings are still hard-coded, and `contact.phone.title` and `contact.telegram.title` are missing translations |

## Verification

Read the check commands from the sources above. CI runs lint, typecheck and tests on both Node versions in its matrix, and builds on the lower one.

Passing checks don't prove the site works. For a user-visible change, also exercise the real page:

- **Forms:** a form submission against the real Firebase settings creates a real lead and sends real email. Test with `VITE_FIREBASE_API_KEY` set to empty, which puts `src/lib/api.ts` in demo mode, and confirm demo mode before submitting. Send a real submission only with the owner's approval.
- **Direct links:** serve `dist/static` with the rules in `public/.htaccess`: a real file first, then `<path>/index.html`, then `404.html` with a 404 status. The repository has no script for this yet.
- **Live deploys:** after an upload, the owner sends a real audit request from a phone and confirms that it's saved and the confirmation email arrives.

Test-case identity: integration and end-to-end cases need stable behavioral IDs under the shared workflow. The repository has no such cases or ID mechanism yet.

## Work and collaboration

- **Requirements:** each change's requirements and acceptance criteria live in its PR description. Use a GitHub issue only for work too large or not yet ready for a PR.
- **PRs:** changes reach `main` through PRs. `main` has no branch protection, so CI doesn't block a merge.
- **Checks to ignore:** the Vercel check isn't used for this site and has failed on every recent commit.
- **Commits and branches:** no convention is established. See the proposals below.

## Environment and deployment

- **Site:** the live site is the `dist/static` build, uploaded by hand to Apache. Folders must be 755 and files 644, because wrong permissions have broken the site before. Build with the Node version in `.node-version`.
- **Backend:** Firestore and Firebase Functions store leads and send email. Their deployed state isn't recorded here, so check it before relying on it.
- **Unused configuration:** `vercel.json`, the `hosting` section of `firebase.json`, and `public/_redirects` don't apply to the live site.
- **Build side effect:** a build rewrites `public/sitemap.xml` with today's date. Don't commit that change unless the routes changed.
- **Lockfile:** CI installs from `package-lock.json`.

## Vocabulary and decisions

Product terms such as the AG SEO formula, the baseline and exclusive territories are described in [PRODUCT.md](../PRODUCT.md). The repository has no ADRs, and none are invented here. See the proposals below.

## Workflow routing

Agents use the installed agent-engineering skill matching the requested outcome. The requested outcome and its limits set the scope, and skill selection grants no permission to publish.

| Requested outcome | Skill |
|---|---|
| Project setup or refresh | `setup-project` |
| Plan only | `plan-change` |
| Full implementation workflow | `deliver-change` |
| Implement an accepted slice only | `implement-change` |
| Verify only | `verify-change` |
| Analyze a change | `review-change` |
| Review a GitHub PR | `review-pr` |
| Correct review findings | `remediate-findings` |
| Authorized commit, push or draft PR | `publish-change` |

## Adoption record

Approach: Adopt our recommended baseline (selected by the project owner, 2026-11-04).
Workflow selection: Default for matching tasks (selected by the project owner, 2026-11-04).

| Practice | Disposition | Source or decision | Scope and rationale |
|---|---|---|---|
| Real proof only | Accepted | ENG-1 | All copy and data; the positioning depends on honest measurement |
| Secrets out of git | Accepted | ENG-2 | All config; this is a public repository |
| Routes open directly | Accepted | ENG-3 | Public routes; static hosts return 404 for routes without a generated page |
| English and Romanian | Accepted | ENG-4 | User-facing text; both markets have equal priority |
| Requirements in the PR description | Accepted | Owner decision, 2026-11-04 | Changes; avoids new process for one owner |
| Apache upload as the only site deploy | Accepted | Owner decision, 2026-11-04 | Site; Firebase remains the backend |
| Remove the always-on auto-approve agent rule | Accepted | Owner decision, 2026-11-04 | It conflicted with asking before publishing |
| Draft PRs, independent review, verification evidence | Established | Shared workflow contract in the agent-engineering skills | Work done through those skills |
| Stable test-case IDs | Established | Shared workflow contract | Integration and end-to-end cases |
| Test-case ID catalog | Proposed | No adoption decision | Add when the first such cases exist; blocks nothing |
| Apache-style test server script | Proposed | No adoption decision | Makes ENG-3 repeatable |
| Stop tracking `.env` | Proposed | No adoption decision | Resolves the ENG-2 exception |
| Security headers on Apache | Proposed | No adoption decision | The content security policy exists only in `vercel.json`, so it isn't applied live |
| Configure the rate-limit function URL | Proposed | No adoption decision | `checkRateLimit` exists, but the client allows every request when the URL is unset |
| Prerender glossary pages | Proposed | No adoption decision | Resolves the ENG-3 exception; adds pages to search |
| Remove unused files | Proposed | No adoption decision | `agseoofirebase/`, `agseo.zip`, `bun.lockb`, `cmd`, `vercel.json`, `public/_redirects`, `.windsurf/rules/r1.md` |
| Branch protection requiring CI on `main` | Proposed | No adoption decision | Would stop broken builds merging; needs a repository settings change |
| Commit and branch conventions | Proposed | No adoption decision | Recent work uses `fix/` and `docs/` branches and imperative subjects |
| ADRs in `docs/adr/` | Proposed | No adoption decision | Use only for significant tradeoffs worth keeping |
| Run E2E checks against a demo-mode build | Proposed | No adoption decision | Would cover journeys that unit tests can't reach |

## Baseline coverage

| Topic | Coverage |
|---|---|
| Purpose and architecture | Covered by `PRODUCT.md` and `docs/architecture.md` |
| Engineering standards | Covered by this guide |
| Verification | Covered, with gaps: no Apache-style server script, E2E tests or test-case catalog |
| Work and collaboration | Covered, except commit and branch conventions |
| Environment | Covered, with one gap: deployed Firebase state isn't recorded |
| Decisions and vocabulary | Vocabulary covered by `PRODUCT.md`; no decision records yet |
| Workflow selection | Covered by this guide and `AGENTS.md` |
