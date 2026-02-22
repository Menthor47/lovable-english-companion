import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Brain, Bot, Network, Sparkles, MessageSquare, BookOpen, Link2, Gauge, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const TERM_ICONS: Record<string, typeof Search> = {
    aeo: MessageSquare,
    geo: Sparkles,
    rag: Search,
    agentic: Bot,
    hallucination: Brain,
    knowledgeGraph: Network,
    zeroClick: Search,
    aio: Sparkles,
    perplexity: Search,
    semanticSearch: Brain,
    vectorEmbeddings: Network,
    tokenContext: Bot,
    eeat: Sparkles,
    structuredData: Network,
    conversationalKeywords: MessageSquare,
    entitySeo: Network,
    brandMention: Link2,
    cwv: Gauge,
    ymyl: ShieldCheck,
    topicalAuthority: Network,
    searchIntent: Brain,
    indexability: Search,
    informationGain: Sparkles,
    entityDisambiguation: Link2,
    pSeo: Network,
    semanticHtml: Bot,
    canonicalization: Link2,
    logFileAnalysis: Gauge,
    schemaMarkup: Network,
    coreUpdates: Sparkles,
    crawlBudget: Search,
};


export default function Glossary() {
    const { t } = useTranslation();
    const pageUrl = getAbsoluteUrl("/resources/glossary");

    const [query, setQuery] = useState("");

    const terms = useMemo(() => {
        const rawItems = t("glossary.terms", { returnObjects: true });
        const termsObj = (rawItems && typeof rawItems === 'object' && !Array.isArray(rawItems))
            ? rawItems as Record<string, { term: string; definition: string }>
            : {};
        return Object.entries(termsObj).map(([key, value]) => ({
            ...value,
            icon: TERM_ICONS[key] || Search,
        }));
    }, [t]);

    const filteredTerms = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return terms;

        return terms.filter((item) => {
            const haystack = `${item.term} ${item.definition}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [query, terms]);

    const definedTermSetSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#definedtermset`,
        url: pageUrl,
        name: t("glossary.metaTitle"),
        description: t("glossary.metaDescription"),
        hasDefinedTerm: terms.map((item) => ({
            "@type": "DefinedTerm",
            name: item.term,
            description: item.definition
        }))
    }), [pageUrl, terms, t]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{t("glossary.metaTitle")}</title>
                <meta name="description" content={t("glossary.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("glossary.metaTitle")} />
                <meta property="og:description" content={t("glossary.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(definedTermSetSchema)}</script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16 flex-1">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                {t("glossary.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t("glossary.titlePrefix")} <span className="text-primary">{t("glossary.titleSuffix")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {t("glossary.subtitle")}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-10">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">{t("glossary.cards.geo.title")}</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {t("glossary.cards.geo.desc")}
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/geo-optimization">{t("glossary.cards.geo.cta")}</Link>
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">{t("glossary.cards.audit.title")}</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {t("glossary.cards.audit.desc")}
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/tools/audit">{t("glossary.cards.audit.cta")}</Link>
                                </Button>
                            </div>

                            <div className="rounded-2xl border border-border/50 bg-card p-6">
                                <h2 className="font-heading text-lg font-bold mb-2">{t("glossary.cards.compare.title")}</h2>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {t("glossary.cards.compare.desc")}
                                </p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/compare">{t("glossary.cards.compare.cta")}</Link>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-8">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                            <div>
                                <h2 className="font-heading text-2xl md:text-3xl font-bold">{t("glossary.browseTitle")}</h2>
                                <p className="text-muted-foreground mt-1">
                                    {t("glossary.browseSubtitle")}
                                </p>
                            </div>

                            <div className="w-full md:w-[360px]">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                    <Input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={t("glossary.searchPlaceholder")}
                                        className="pl-9"
                                        aria-label={t("glossary.searchPlaceholder")}
                                    />
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    {t("glossary.resultsText", { count: filteredTerms.length, total: terms.length })}
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <Accordion type="multiple" className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                        {filteredTerms.map((item, index) => {
                            const Icon = item.icon;
                            // Truncate definition for preview (first ~100 chars)
                            const previewText = item.definition.length > 120
                                ? item.definition.substring(0, 120).trim() + "…"
                                : item.definition;

                            return (
                                <AnimatedSection key={item.term} delay={Math.min(index * 0.03, 0.3)}>
                                    <AccordionItem
                                        value={item.term}
                                        className="bg-card border border-border/50 rounded-2xl hover:border-primary/50 transition-colors overflow-hidden"
                                    >
                                        <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]>div>.preview]:hidden">
                                            <div className="flex items-start gap-4 text-left w-full">
                                                <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                                                        {item.term}
                                                    </h3>
                                                    <p className="preview text-sm text-muted-foreground mt-1 line-clamp-2">
                                                        {previewText}
                                                    </p>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6">
                                            <div className="pl-[60px] space-y-3 text-muted-foreground leading-relaxed">
                                                {item.definition.split("\n\n").map((paragraph, pIdx) => {
                                                    const trimmed = paragraph.trim();
                                                    if (!trimmed.length) return null;
                                                    return (
                                                        <p key={pIdx} className="text-sm">
                                                            {trimmed}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </AnimatedSection>
                            );
                        })}
                    </Accordion>

                    <AnimatedSection className="max-w-5xl mx-auto mt-16">
                        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
                            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
                                {t("glossary.cta.title")}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
                                {t("glossary.cta.desc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/tools/audit">{t("glossary.cta.auditCta")}</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link to="/contact">{t("glossary.cta.contactCta")}</Link>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <TrustSignals />
            <Footer />
        </div >
    );
}
