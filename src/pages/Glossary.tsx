import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Brain, Bot, Network, Sparkles, MessageSquare, BookOpen, Link2, Gauge } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type GlossaryTerm = {
    term: string;
    definition: string;
    icon: typeof Search;
};

const terms: GlossaryTerm[] = [
    {
        term: "Answer Engine Optimization (AEO)",
        definition: "Optimizing your pages to be the direct answer in AI chat interfaces, voice assistants, and zero-click results. The goal is clarity, structure, and credibility so engines cite you.",
        icon: MessageSquare,
    },
    {
        term: "Generative Engine Optimization (GEO)",
        definition: "The process of optimizing content not just for search engines like Google, but for AI answer engines like ChatGPT, Claude, and Gemini. It focuses on citation authority and answerability.",
        icon: Sparkles,
    },
    {
        term: "Retrieval-Augmented Generation (RAG)",
        definition: "A technique used by AI models to fetch relevant data from an external knowledge base (like your website) before generating an answer. Optimizing for RAG is key to appearing in AI citations.",
        icon: Search,
    },
    {
        term: "Agentic Workflow",
        definition: "A system where autonomous AI agents perform complex tasks—like keyword research, content drafting, and internal linking—without human intervention, often chaining steps together.",
        icon: Bot,
    },
    {
        term: "LLM Hallucination",
        definition: "When a Large Language Model generates incorrect or nonsensical information. Modern SEO involves grounding models with high-quality, authoritative content to reduce misinformation about your brand.",
        icon: Brain,
    },
    {
        term: "Knowledge Graph",
        definition: "A network of real-world entities (people, places, things) and their relationships. AI engines rely heavily on structured data and consistent entity signals to understand your brand authority.",
        icon: Network,
    },
    {
        term: "Zero-Click Search",
        definition: "A search result where the answer is displayed directly at the top of the SERP (or in an AI chat), meaning the user never clicks through to a website. GEO aims to win these 'position zero' spots.",
        icon: Search,
    },
    {
        term: "AI Overviews (AIO)",
        definition: "Google's AI-generated snapshots that appear at the very top of search results, synthesizing information from multiple sources. Ranking here requires concise, answer-focused content structure.",
        icon: Sparkles,
    },
    {
        term: "Perplexity AI",
        definition: "A conversational answer engine that provides sourced answers to user queries. Optimizing for Perplexity involves citation management and high domain authority.",
        icon: Search,
    },
    {
        term: "Semantic Search",
        definition: "Search technologies that interpret the meaning and context of user queries (intent) rather than just matching keywords literally.",
        icon: Brain,
    },
    {
        term: "Vector Embeddings",
        definition: "Numerical representations of text that allow AI to understand the semantic relationship between words. Used by search engines to match relevant content to queries.",
        icon: Network,
    },
    {
        term: "Token Context Window",
        definition: "The amount of text (tokens) an AI model can process at once. In SEO, this relates to how much of your page content an LLM can 'read' and retain for answering questions.",
        icon: Bot,
    },
    {
        term: "E-E-A-T",
        definition: "Experience, Expertise, Authoritativeness, and Trustworthiness. Google's quality rater guidelines which are critical for AI grounding and ranking in sensitive topics.",
        icon: Sparkles,
    },
    {
        term: "Structured Data",
        definition: "Standardized code (Schema markup) added to webpages to help search engines and AI agents understand the content and context of the page more easily.",
        icon: Network,
    },
    {
        term: "Conversational Keywords",
        definition: "Long-tail keywords phrased as natural language questions (e.g., 'How do I fix X?') that align with how users speak to voice assistants and AI chatbots.",
        icon: MessageSquare,
    },
    {
        term: "Entity SEO",
        definition: "Optimizing around real-world entities (brands, products, people, locations) rather than only keywords. Entities help search engines and LLMs connect facts and trust signals.",
        icon: Network,
    },
    {
        term: "Brand Mention (Citation)",
        definition: "When an AI engine or a webpage references your brand as a source. In GEO, mentions often matter as much as links because they shape how models learn and cite authority.",
        icon: Link2,
    },
    {
        term: "Core Web Vitals",
        definition: "Google’s user-experience metrics (LCP, INP, CLS) that reflect real page speed and stability. Better CWV improves conversion and reduces ranking friction.",
        icon: Gauge,
    },
    {
        term: "Crawl Budget",
        definition: "The amount of crawling and indexing attention a search engine allocates to your site. Technical SEO helps make sure important pages get discovered and updated quickly.",
        icon: Search,
    },
    {
        term: "Topical Authority",
        definition: `Topical authority is the credibility you build by covering a subject deeply, consistently, and usefully over time. It’s not a single metric you can “turn on.” It’s an outcome: search engines and AI systems see your site as a reliable source for a defined topic area, so they rank you more easily and cite you more often.

In traditional SEO, topical authority shows up as stronger rankings across a cluster of related keywords, not just one page. In modern AI-first search (AI Overviews, answer engines, and RAG systems), it also shows up as citations and brand mentions when models look for sources that explain a topic clearly and accurately. If your content is thin, scattered, or inconsistent, you can still get traffic occasionally, but you won’t become the default reference.

How you build it is boring on purpose. First, define the topic boundaries: what you cover and what you don’t. “SEO” is too broad; “AI SEO for B2B SaaS” is a real boundary. Then map the subtopics and intent layers that matter. A good topical map includes beginner definitions, tactical how-to content, decision pages (comparisons, pricing, best tools), and proof content (case studies, examples, data).

Next, structure your site like a knowledge base instead of a random blog. Create a pillar page that explains the core concept, then create supporting pages that go deeper into each subtopic. Internal linking is not optional here; it’s the mechanism that tells crawlers and models how your knowledge is organized. Every supporting page should link back to the pillar (and relevant siblings) with descriptive anchors. Orphan pages are topical authority killers.

Quality matters more than volume. A topical cluster of ten excellent pages beats fifty rewritten summaries. The winning content includes clear definitions, step-by-step processes, examples, edge cases, and honest tradeoffs. If you’re only paraphrasing what already exists in the top results, you’re not building authority—you’re blending in. Add information gain: original frameworks, checklists, screenshots, benchmarks, templates, and real-world “what went wrong” lessons.

Technical SEO supports authority by removing friction. Make sure your important pages are indexable, fast, and internally discoverable. Use structured data where it genuinely clarifies entities (Organization, Article, FAQPage when appropriate). Keep canonicalization clean. If Google can’t crawl and index the cluster reliably, your authority will stall.

Measure topical authority by looking for cluster lift: more keywords ranking, more impressions across related queries, higher average position stability, and more internal links pointing toward your pillar pages. In AI search, watch for citations and mentions: are answer engines referencing your brand when the topic comes up? If not, the fix is rarely “more content.” It’s usually clearer structure, stronger evidence, and tighter topic focus.

Common mistakes are predictable: publishing unrelated posts, targeting the same keyword on multiple pages (cannibalization), obsessing over word count instead of usefulness, and forgetting to update older content. Topical authority is maintenance. If your cluster is stale, the SERP and the models will treat you as stale.

If you want a simple rule: build fewer topic clusters, but build them to completion. Then keep them current. That’s how you become the source instead of just another result.`,
        icon: Network,
    },
    {
        term: "Search Intent (SERP Intent Alignment)",
        definition: `Search intent is the “why” behind a query: what the user actually wants to accomplish. SERP intent alignment means your page matches the dominant intent Google is rewarding for that query, not just the keywords. This is one of the fastest ways to stop wasting content effort.

Intent usually falls into a few buckets: informational (learn), commercial investigation (compare), transactional (buy/convert), navigational (find a specific brand/page), and local (find nearby). The mistake is thinking intent is a label you assign once. Intent is visible in the SERP. If the top results are tutorials, a product page won’t rank. If the top results are category pages, a long blog post usually won’t rank.

The modern twist is that intent now includes “answer intent.” Many users are satisfied without clicking because the answer is shown in AI Overviews or an answer engine. That doesn’t mean SEO is dead; it means the content format has to be clearer. Pages that win in 2025 tend to have clean structure, direct answers, and strong supporting evidence (examples, references, author credibility). If your page buries the answer, AI systems are less likely to cite it.

Intent alignment starts with SERP inspection, not brainstorming. Look at the result types: are they guides, tools, product pages, listicles, or templates? Look at SERP features: People Also Ask, videos, local packs, AI Overviews. These are signals of what users expect. Then design your page to fit the expectation while still being better than what’s there.

For example, if you target “best AI SEO tools,” users want a comparison list with clear categories, pricing, pros/cons, and a recommendation framework. If you publish a vague opinion piece, you’ll lose. If you target “how to fix index bloat,” users want a step-by-step diagnostic and a prioritized fix list, not a definition.

Intent also affects CTAs and conversion design. Informational pages should earn trust first and then offer the next step (audit, checklist, consultation). Commercial investigation pages can be more direct and include decision support. Transactional pages should remove friction and answer objections (pricing, timelines, proof).

Misalignment shows up in data quickly: high impressions but low clicks, high clicks but terrible time-on-page, rankings that never stabilize, or traffic that doesn’t convert. The fix is often structural: change the page type, rewrite the intro to match the promise of the query, add the missing comparison elements, or split one confused page into two pages that each match a clear intent.

In practice, intent alignment is a discipline: every keyword you target should map to a page type and a user outcome. When you do that consistently, rankings become easier, content becomes more predictable to produce, and AI engines have a cleaner “answer path” to cite.

Another overlooked point: intent shifts by device, location, and freshness. On mobile, Google often rewards shorter answers and interactive SERP features (maps, videos, “People also ask”). In local markets, the same query might trigger local packs and location pages. For fast-moving topics (AI tools, pricing, “best” lists), freshness becomes part of intent and the SERP will tilt toward newer dates and updated screenshots.

A quick intent-alignment checklist before you write: 1) identify the dominant page type, 2) match the dominant angle, 3) replicate the dominant format (checklist, template, comparison table), and 4) exceed the proof level of competitors (examples, data, quotes). If you can’t answer those four points, you’re guessing.

For AI-first search, treat the “answer block” as mandatory: put the direct answer or recommendation within the first 100–150 words, then support it with structure (clear headings) and evidence. That’s the difference between being indexed and being cited.`,
        icon: Brain,
    },
    {
        term: "Indexability (Crawl vs Index)",
        definition: `Indexability is whether a search engine can include a page in its index and show it in results. Crawlability is whether the engine can fetch the page at all. People confuse these constantly, then wonder why “Google isn’t ranking my page.” The truth is harsher: if a page isn’t reliably indexable, you don’t have an SEO problem—you have a technical publishing problem.

Crawling is influenced by internal links, sitemaps, server reliability, and crawl budget. Indexing is influenced by content quality, duplication, canonical signals, and directives like noindex. A page can be crawled but not indexed, and that’s common on sites with thin pages, near-duplicates, and parameter chaos.

The biggest indexability killers are duplication and ambiguity. If Google sees five URLs with the same content (HTTP vs HTTPS, trailing slashes, query parameters, filtered category pages, printer versions), it has to pick a canonical. If your canonical signals are inconsistent—or you accidentally canonical everything to the wrong page—Google will ignore what you want and do what it thinks is best. That’s how you get “Discovered — currently not indexed” or “Duplicate without user-selected canonical.”

Control starts with clean URL strategy. Use redirects for real moves (301), canonicals for consolidating duplicates, and noindex for pages that shouldn’t be in search at all (internal search results, thin filter combinations, login pages). Robots.txt is not an indexing tool; it’s a crawling tool. Blocking a URL in robots.txt can prevent Google from seeing a noindex tag, which means the URL might stay indexed longer. That’s why technical SEO needs intent, not random rules.

Index bloat is the long-term consequence of ignoring indexability. When thousands of low-value URLs get indexed (facets, tags, thin location pages, duplicate parameters), the site becomes noisy. Crawlers spend time on junk. Important pages get crawled less often. Rankings become harder because the site’s overall quality signals get diluted.

In AI-first search, indexability still matters because retrieval is downstream of discovery. If the page isn’t indexed or isn’t consistently accessible, it’s less likely to be retrieved, summarized, or cited—whether by Google’s systems or by third-party answer engines. This is especially important for brand queries and “definition-style” queries where AI engines want stable sources.

How to improve indexability:

1) Fix status codes: important pages should return 200, moved pages should 301, dead pages should 404/410.

2) Consolidate duplicates with canonical tags and redirects.

3) Use noindex intentionally for low-value pages.

4) Improve internal linking so crawlers can reach important pages quickly.

5) Keep sitemaps accurate and only include index-worthy URLs.

 If you do those five things well, most “mystery” SEO issues stop being mysterious.

One more practical warning: “soft 404s” are real. If a URL returns 200 but the rendered HTML is effectively empty (common with SPAs that ship only a JS shell, broken SSR, or aggressive rewrites), Google may label it as a soft 404 and drop it. You’ll see this in Search Console as indexing issues even though “the page loads fine” in your browser.

A simple indexability debug loop: run URL Inspection in Search Console, compare the rendered HTML to what users see, verify the canonical is correct, confirm the server returns 404/410 for non-existent routes, and make sure only index-worthy URLs are in the sitemap. If any one of those is wrong, indexing becomes inconsistent.`,
        icon: Search,
    },
    {
        term: "Information Gain",
        definition: `Information gain is the idea that content wins when it adds something meaningfully new compared to what already exists. In plain terms: if you rewrite the top 10 results using different words, you didn’t create value—you created a duplicate. Search engines and AI systems are getting better at detecting that.

In 2025, information gain matters because ranking is not just about matching keywords; it’s about being the best source. AI Overviews and answer engines synthesize across multiple pages. If your page contains no unique insight, the model has no reason to cite you. It might still use your text as background, but you won’t get attribution, and you won’t build authority.

Information gain can come from many sources, and it doesn’t require a PhD. The strongest forms are:

Original data (benchmarks, surveys, experiments),

First-hand experience (what you did, what happened, what you learned),

Expert input (quotes, interviews, reviewed-by signals),

Specific examples (screenshots, templates, calculations),

Clear decision frameworks (when to choose A vs B, constraints, tradeoffs).

This is why “AI-generated SEO content at scale” fails for most sites. Models are excellent at producing plausible summaries. They are terrible at creating real-world evidence unless you give it to them. If you publish 200 summaries that add no new information, you might get a short-term index spike, but you won’t earn durable rankings, links, or citations.

The practical way to build information gain is to design your content like a product. Ask: what question is the user trying to solve, and what would make the answer unquestionably better? Then add one or two differentiators that competitors don’t have. For an audit guide, include a step-by-step checklist plus a prioritization rubric. For a tool comparison, include a decision tree by team size, workflow, and budget. For a technical SEO article, include a “symptom → diagnosis → fix” table.

Information gain also comes from precision. Many pages fail because they try to cover everything and end up saying nothing. A narrow, well-argued article that addresses a specific scenario (e.g., “index bloat caused by faceted navigation on ecommerce”) can beat a generic 3,000-word guide.

How to validate information gain:

1) Compare your draft to the top results and list what you offer that they don’t.

2) Add proof (screenshots, sources, examples) wherever you make a claim.

3) Remove filler paragraphs that restate obvious points.

4) Ensure the page has a clear answer near the top for AI summarization.

 If you treat information gain as a requirement, you stop publishing content that looks good but doesn’t move rankings. And that’s the difference between “content marketing” and actual SEO performance.

Information gain is especially important for comparison content. A generic feature list won’t win. What wins is decision support: “If you’re an agency with 3 writers, choose X. If you’re in-house and need approvals, choose Y.” Include constraints (budget, team size, publishing velocity) and call out what each tool is bad at. That specificity is what earns links and citations.

If you can’t produce original data, produce original structure. Build a scoring rubric, a “what to do next” checklist, or a template readers can copy. Search engines can summarize a definition; they can’t replace a useful workflow.

A final test: if your draft could be generated by anyone with a generic prompt and no access to real experience, it probably has low information gain. Add one piece of proof or one real-world example and you immediately become harder to replicate.`,
        icon: Sparkles,
    },
    {
        term: "Entity Disambiguation",
        definition: `Entity disambiguation is the process of making it crystal clear to search engines and AI systems exactly who you are, what you do, and how you connect to the broader web of entities (people, companies, products, locations). If your brand name is similar to other brands, or your identity signals are inconsistent, you’ll lose visibility even if your content is good.

Search engines don’t just index pages; they model entities and relationships. Knowledge graphs are essentially structured maps of entities. AI systems rely on those same kinds of signals, plus training data and citations, to decide which “version” of a name is the correct one. If the system can’t disambiguate you, it won’t trust you.

This becomes obvious with ambiguous brand names, common personal names, or businesses that operate in multiple locations. If your About page is thin, your contact details vary across pages, and third-party profiles have mismatched information, you create ambiguity. In AI answers, ambiguity turns into hallucination: the model may attribute someone else’s facts to you, or it may confidently say something false about your offerings.

Disambiguation is built from consistent identity layers:

On-site: a strong About page, consistent naming, clear service descriptions, staff/author bios, and a visible address/phone when relevant.

Structured data: Organization schema (and LocalBusiness where relevant), sameAs links to authoritative profiles, and consistent URLs.

Off-site: consistent citations (directories, LinkedIn, Crunchbase, G2, GitHub, etc.), brand mentions, and press coverage that ties your name to the right attributes.

The goal is repetition with consistency. It’s not glamorous, but it works. When engines see the same entity description across multiple trusted sources, the knowledge graph stabilizes. Once it stabilizes, your content has a higher chance of being treated as authoritative because the system knows which entity is publishing it.

In practice, disambiguation work includes: Organization schema with sameAs, clean Open Graph metadata, consistent author pages, and cleaning up top citations (LinkedIn, Crunchbase, G2, major directories). It’s not glamorous, but it prevents the worst-case scenario: AI confidently describing someone else when the user asked about you.

The fastest win is to create an “entity fact sheet” and make every major page consistent with it: official name, what you do in one sentence, logo, primary URL, contact details, and the exact set of “sameAs” profiles you want engines to trust. Then replicate those facts across your About page, footer, author bios, and structured data.

For local or service businesses, NAP consistency still matters: Name, Address, Phone. If your website says one thing and directories say another, you’re feeding ambiguity into the graph. For companies without a physical address, consistency still applies to brand name, domain, and social handles.

To measure whether disambiguation is working, look for stability: your brand SERP should consistently show the same homepage, About page, and primary social profiles; your authors should resolve to the right bios; and AI answers should stop mixing you with similarly named companies. Practically, test this by searching your brand name plus your service category and by asking answer engines “What does this company do?” then checking whether the facts match your site.

A final warning: don’t add random sameAs links just to have more. Weak directories and low-trust profiles can dilute signals. Pick a small set of authoritative profiles (LinkedIn, Crunchbase, GitHub, major review sites) and keep them consistent. Entity disambiguation is about clarity, not volume.`,
        icon: Link2,
    },
];

export default function Glossary() {
    const pageUrl = getAbsoluteUrl("/resources/glossary");

    const [query, setQuery] = useState("");

    const filteredTerms = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return terms;

        return terms.filter((item) => {
            const haystack = `${item.term} ${item.definition}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [query]);

    const definedTermSetSchema = {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#definedtermset`,
        url: pageUrl,
        name: "AI SEO Dictionary",
        description: "Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms.",
        hasDefinedTerm: terms.map((item) => ({
            "@type": "DefinedTerm",
            name: item.term,
            description: item.definition
        }))
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>AI SEO Glossary | AGSEO</title>
                <meta name="description" content="Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="AI SEO Glossary | AGSEO" />
                <meta property="og:description" content="Definitions for GEO, RAG, agentic workflows, knowledge graphs, and other AI SEO terms." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(definedTermSetSchema)}</script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                Glossary
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            The AI SEO <span className="text-primary">Dictionary</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Speak the language of the future. Master the terminology that defines the new era of Generative Search.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-10">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">Start with GEO</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Learn what it takes to show up in AI answers and citations.
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/geo-optimization">GEO Optimization</Link>
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">Run a quick audit</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    See how your site looks to AI engines like ChatGPT and Gemini.
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/tools/audit">Free AI Audit</Link>
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">Compare your stack</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Read tool battles to choose what fits your workflow.
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/compare">Tool Comparisons</Link>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-8">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                            <div>
                                <h2 className="font-heading text-2xl md:text-3xl font-bold">Browse terms</h2>
                                <p className="text-muted-foreground mt-1">
                                    Search by acronym (GEO, RAG) or by concept (entities, citations, structured data).
                                </p>
                            </div>

                            <div className="w-full md:w-[360px]">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <Input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search the glossary…"
                                        className="pl-9"
                                        aria-label="Search glossary"
                                    />
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    Showing {filteredTerms.length} of {terms.length} terms
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {filteredTerms.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 100}>
                                <div className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                                                {item.term}
                                            </h3>
                                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                                {item.definition.split("\n\n").map((paragraph, paragraphIndex) => {
                                                    const trimmed = paragraph.trim();
                                                    if (!trimmed.length) return null;
                                                    return (
                                                        <p key={paragraphIndex}>
                                                            {trimmed}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="max-w-5xl mx-auto mt-16">
                        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
                            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
                                Ready to turn definitions into rankings?
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
                                Knowing the words is step one. Execution is what gets you cited by AI engines and visible on page one.
                                If you want a plan, we’ll map the fastest path from your current site to measurable visibility.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/tools/audit">Start with a Free AI Audit</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link to="/contact">Contact AGSEO</Link>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
