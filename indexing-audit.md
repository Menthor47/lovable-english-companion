# Indexing Audit (agseo.pro)

## VERDICT
Bad: **your pages are technically crawlable, but your canonical/redirect setup is messy (duplicate hosts + redirect chains)** and you likely haven’t forced discovery/priority via **Google Search Console**. That combination frequently leads to *slow or partial indexing*, especially for a new/low-authority domain.

---

## What I Checked (Repo + Live Site)

### Live crawlability checks (from this workspace)
- **robots.txt**: `200 OK`, allows crawling.
- **sitemap.xml**: `200 OK`, valid XML, contains key URLs.
- **Homepage**: `200 OK`, returns HTML (not blocked).
- **Nonexistent URL**: returns **`404 Not Found`** (good: not a soft-404).
- **Pages return real content**: your prerendered output (`dist/static/.../index.html`) contains full HTML content + SEO tags (not a blank SPA shell).

### Repo checks
- **Robots meta** defaults to index/follow in `index.html`.
- **Prerender**: `prerender.js` injects React Helmet output into static HTML pages.
- **Only intentional noindex**:
  - `/dashboard` includes `noindex, nofollow` (fine).
  - `/404` includes `noindex` (fine).

---

## CRITICAL ISSUES (these can suppress indexing or slow it down)

- **[Duplicate host problem]** `https://agseo.pro/` and `https://www.agseo.pro/` both return `200 OK`.
  - This creates *two versions of the same site*.
  - Google will often pick one, but discovery/indexing gets slower and signals split.

- **[Redirect chains + HTTPS downgrade hop]** Several URLs do a 2-step redirect:
  - Example observed pattern:
    - `https://agseo.pro/services` → `http://agseo.pro/services/` → `https://agseo.pro/services/` → `200`
  - That **https → http → https** hop is sloppy and can:
    - Waste crawl budget
    - Trigger “redirect error” / “page with redirect” noise in Search Console
    - Slow down canonical consolidation

- **[Trailing slash mismatch]** Your site *serves* many pages on trailing-slash URLs, but your **sitemap + canonical tags often use non-trailing-slash** URLs.
  - Example:
    - Sitemap lists `https://agseo.pro/services`
    - Server ends at `https://agseo.pro/services/`
  - Google can handle this, but it’s unnecessary friction.

- **[Discovery likely not forced]** Even with perfect technical SEO, Google often won’t index a low-authority site quickly unless you:
  - Verify in Search Console
  - Submit sitemap
  - Request indexing for priority URLs
  - Acquire a few real links

---

## What Is *NOT* Blocking You (based on evidence)

- **[Robots disallow]** Not present.
- **[Global noindex]** Not present.
- **[Soft 404 everywhere]** Not happening.
- **[JS-only SPA shell]** Not the case; prerender output contains full HTML.

---

## ACTIONABLE FIXES (in priority order)

### 1) Force indexing via Google Search Console (do this first)
1. Add a **Domain property** in Search Console: `agseo.pro` (covers all protocols + subdomains).
2. Verify via **DNS TXT record**.
3. Submit sitemap: `https://agseo.pro/sitemap.xml`.
4. Use **URL Inspection** on:
   - `https://agseo.pro/`
   - `https://agseo.pro/services/`
   - 1 blog post
   - 1 comparison page
5. Click **Request Indexing** for those pages.

**Success criteria**:
- **Sitemaps** report shows “Success” and discovered URLs > 0.
- **Pages** report starts showing “Indexed” URLs.

### 2) Pick ONE canonical site version and enforce it with 301 redirects
You need a single consistent identity:
- **Scheme**: `https`
- **Host**: choose **non-www** (recommended since your constants are `https://agseo.pro`)
- **Path format**: choose either:
  - **Trailing slash everywhere** (recommended if your server already behaves that way), or
  - **No trailing slash everywhere**

**Required outcome**:
- `http://agseo.pro/*` → `https://agseo.pro/*` in **one hop**
- `https://www.agseo.pro/*` → `https://agseo.pro/*` in **one hop**
- `/services` should not do `https→http→https`. That’s a server config bug.

### 3) Make sitemap URLs match the final canonical URLs
Right now many sitemap URLs are the *pre-redirect* versions.

**Required outcome**:
- Every URL in `sitemap.xml` should:
  - return **200 OK**
  - not redirect
  - match the canonical tag on the page

Also consider adding `<lastmod>` for major pages (helps recrawl scheduling).

### 4) Reduce duplicate/low-signal pages being crawled first
Your site has many similar “template” pages (comparisons, industries, glossary). If Google sees those before it trusts the domain, you can get “Discovered/Crawled – currently not indexed”.

Practical steps:
1. Make sure top navigation + footer links point to your **money pages** first:
   - Home
   - Services
   - Pricing
   - Case studies
   - Contact
2. Make sure every important page has strong internal links from at least 2-3 other pages.

### 5) Get real links (this is the boring part that actually works)
If you have near-zero backlinks, indexing is often slow.

Minimum viable link plan:
1. Add your business to reputable listings (not spam PBNs).
2. Publish 2-4 strong blog posts and promote them.
3. Get 3-10 real links from:
   - partners
   - suppliers
   - local orgs
   - niche communities

**Success criteria**:
- Google starts crawling deeper URLs regularly.

---

## Search Console “Why not indexed?” diagnosis map

Use: **Search Console → Pages** and click the exact reason.

- **[Discovered – currently not indexed]**
  - Means: Google found the URL but didn’t crawl it yet.
  - Usually caused by: low authority, too many similar URLs, weak internal linking.
  - Fix: internal links + a few backlinks + request indexing for priority pages.

- **[Crawled – currently not indexed]**
  - Means: Google crawled but decided not to index.
  - Usually caused by: thin/duplicate content, unclear canonical, redirect/canonical mismatch.
  - Fix: canonical/redirect cleanup + improve content uniqueness.

- **[Duplicate, Google chose different canonical]**
  - Likely here because of **www vs non-www** and **slash vs no-slash**.
  - Fix: enforce one version with 301 + align sitemap + align canonicals.

- **[Page with redirect]**
  - Your sitemap currently includes redirecting URLs (non-trailing slash).
  - Fix: update sitemap to final URLs and minimize hops.

---

## Quick Reality Check
- If the domain is new or recently relaunched: **indexing can take days to weeks** even when everything is correct.
- Right now you’re not “blocked”; you’re just **not making Google’s job easy** and likely not using Search Console to force discovery.

---

## Next info I need from you (to be 100% certain)
Reply with screenshots or copied text from Search Console:
- **Settings → Ownership verification** (confirmed?)
- **Sitemaps** report status
- **Pages** report reason counts
- **URL Inspection** result for your homepage

---

## Appendix: Evidence (what I observed)
- **`robots.txt`** includes:
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://agseo.pro/sitemap.xml`
- **HTTP status**:
  - `/` returns `200 OK`
  - random nonexistent URL returns `404 Not Found`
- **Host duplication**:
  - `https://www.agseo.pro/` returns `200 OK` (should redirect to the canonical host)
- **Redirect pattern**:
  - Multiple URLs redirect to trailing-slash versions with a strange intermediate `http://` hop.
