# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are founders and marketing leads at growing SMEs and established e-commerce brands. Romania and international markets have equal priority, served in Romanian and English.

They suspect they're losing visibility in AI answers, and they're evaluating whether to pay an agency to fix it. They need a safe way to judge the work, because they find it hard to tell real expertise from relabeled SEO.

The Starter and Pro Business plans serve smaller and larger clients, but these two roles are the audience to design and write for first.

## Product Purpose

AGSEO is an AI-powered SEO agency. It helps businesses become visible on traditional search and in AI answers, under its formula AG SEO = AEO + GEO + SEO.

Success means a prospect can request an audit easily, see where their brand stands, and become a client whose progress is measured against that starting point.

## Positioning

AGSEO has two commitments:

- **Measured baseline in the contract:** prospects see what AI says about them before they sign, and that record goes into the contract so the work can be judged against it.
- **Exclusive territories:** direct competitors in a client's geographic area can't hire AGSEO.

AGSEO doesn't promise placement in AI answers, because those answers vary between runs. The baseline therefore uses a fixed set of buyer questions, run repeatedly.

## Operating Context

- **Evaluation:** prospects start with the free audit at `/tools/audit` (website, email and optional phone). They then get a confirmation email, and a summary with prioritized next steps follows later. Describe it as an AI audit that a person checks; every summary must actually get that check.
- **Contact:** the contact page and WhatsApp.
- **Clients:** `/dashboard`, behind login at `/login`, is a demo with illustrative data. It isn't evidence of a live client portal.
- **Hosting:** the live site is served by Apache from an uploaded `dist/static` build. Vercel isn't used, and every route needs a prerendered page to open directly.
- **Forms:** requests are stored in Firebase.

## Capabilities and Constraints

Services include AEO, GEO, technical and local SEO, e-commerce SEO, content, link building and digital PR, paid media, consulting and analytics.

Published pricing:

| Plan | Price per month | Notes |
|---|---|---|
| Starter | €590 to €890 | |
| Business | €1,490 to €2,490 | 6-month minimum; growing SMEs and established e-commerce |
| Pro Business | €3,500+ | |

Undecided or not yet in place:

- The contract wording for the baseline, and a named AI visibility deliverable in each plan
- Written definitions of "geographic area" and "direct competitor"
- Named practitioners; the site currently credits only "AGSEO Editorial"

## Brand Commitments

- Name: AGSEO, also written AG SEO
- Formula: AG SEO = AEO + GEO + SEO
- Languages: English and Romanian

## Evidence on Hand

Proof is mixed: the owner says some is real and some isn't, and hasn't yet confirmed it item by item. Treat all of the following as unverified, and don't present any of it as fact until it's confirmed:

- Four anonymous case studies in `src/data/caseStudies.ts`, whose pages label results and metrics as illustrative
- Homepage testimonials, including those attributed by initial or company
- 150+ clients, 2,000+ newsletter subscribers, and the By The Numbers figures in `src/components/sections/Stats.tsx`
- Partner and certification claims; the About page cites only Google Analytics, Google Ads and Semrush Academy certifications
- "First agency" claims, which have no supporting evidence

There are no named client results or independent reviews on hand. Don't invent clients, results, scores, reviews or partnerships, and don't show simulated measurements as real ones.

## Product Principles

1. **Measure before promising.** A claim about results starts from a recorded baseline.
2. **Let buyers verify.** Prices, deliverables and methods stay visible enough for a skeptic to check.
3. **Only real proof.** Anything unconfirmed stays out of persuasive work until it's confirmed.
4. **Honest about uncertainty.** AI answers vary, so the work reports what changed and doesn't guarantee placement.
5. **One client per territory.** Exclusivity is a real constraint on who AGSEO takes on.
