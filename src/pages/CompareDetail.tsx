import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { comparisons } from "@/data/comparisons";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import {
    ORGANIZATION_ID,
    SITE_LOGO_URL,
    SITE_NAME,
    TEAM_ID,
    WEBSITE_ID,
    getAbsoluteUrl
} from "@/lib/siteMetadata";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { useTranslation } from "react-i18next";

export default function CompareDetail() {
    const { slug } = useParams();
    const { t } = useTranslation();
    const comp = comparisons.find((c) => c.slug === slug);

    const translatedComp = useMemo(() => {
        if (!comp) return null;
        const items = t("comparisons.items", { returnObjects: true }) as Record<string, any>;
        const tComp = items[comp.slug];
        if (!tComp) return comp;

        return {
            ...comp,
            category: tComp.category || comp.category,
            toolA: {
                ...comp.toolA,
                description: tComp.toolA?.description || comp.toolA.description,
                pros: tComp.toolA?.pros || comp.toolA.pros,
                cons: tComp.toolA?.cons || comp.toolA.cons,
            },
            toolB: {
                ...comp.toolB,
                description: tComp.toolB?.description || comp.toolB.description,
                pros: tComp.toolB?.pros || comp.toolB.pros,
                cons: tComp.toolB?.cons || comp.toolB.cons,
            },
            verdict: {
                ...comp.verdict,
                summary: tComp.verdict?.summary || comp.verdict.summary,
                bestFor: tComp.verdict?.bestFor || comp.verdict.bestFor,
            },
            article: tComp.article || comp.article
        };
    }, [t, comp]);

    if (!translatedComp) {
        return <Navigate to="/404" replace />;
    }

    const pageUrl = getAbsoluteUrl(`/compare/${translatedComp.slug}`);

    const breadcrumbItems = [
        { label: t("common.home") || "Home", href: "/" },
        { label: t("nav.resources.comparisons") || t("nav.mobile.comparisons") || "Comparisons", href: "/compare" },
        { label: `${translatedComp.toolA.name} vs ${translatedComp.toolB.name}`, href: `/compare/${translatedComp.slug}` }
    ];

    const articleSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${translatedComp.toolA.name} vs ${translatedComp.toolB.name} (2025 Review)`,
        description: `Head-to-head comparison: ${translatedComp.toolA.name} vs ${translatedComp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`,
        url: pageUrl,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl
        },
        image: getAbsoluteUrl("/og-image.png"),
        author: {
            "@type": "Organization",
            "@id": TEAM_ID,
            name: "AGSEO Team"
        },
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: SITE_LOGO_URL
            }
        },
        isPartOf: {
            "@id": WEBSITE_ID
        },
        ...(translatedComp.article ? { articleBody: translatedComp.article } : {})
    }), [translatedComp, pageUrl]);

    const winnerDisplay = useMemo(() => {
        const { winner } = translatedComp.verdict;
        if (winner === 'Tie') return t("comparisons.detail.tie");
        const winnerName = winner === 'ToolA' ? translatedComp.toolA.name : translatedComp.toolB.name;
        return `${winnerName} ${t("comparisons.detail.wins")}`;
    }, [t, translatedComp]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{translatedComp.toolA.name} vs {translatedComp.toolB.name} (2025 Review) - AGSEO</title>
                <meta name="description" content={`Head-to-head comparison: ${translatedComp.toolA.name} vs ${translatedComp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${translatedComp.toolA.name} vs ${translatedComp.toolB.name} (2025 Review) - AGSEO`} />
                <meta property="og:description" content={`Head-to-head comparison: ${translatedComp.toolA.name} vs ${translatedComp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`} />
                <meta property="og:image" content={getAbsoluteUrl("/og-image.png")} />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16 flex-1">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Breadcrumbs items={breadcrumbItems} className="mb-6" />
                    <Link to="/compare" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t("comparisons.detail.back")}
                    </Link>

                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary/10 text-primary mb-6">
                            {translatedComp.category}
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">
                            {translatedComp.toolA.name} <span className="text-muted-foreground">vs</span> {translatedComp.toolB.name}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t("comparisons.detail.questionPrefix")} {translatedComp.category.toLowerCase()} {t("comparisons.detail.questionSuffix")}
                        </p>
                    </AnimatedSection>

                    {/* Head to Head Table */}
                    <AnimatedSection className="mb-20">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tool A Card */}
                            <div className="bg-card border border-border rounded-3xl p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-bold font-heading">{translatedComp.toolA.name}</h2>
                                    <div className="text-xl font-bold text-primary">{translatedComp.toolA.rating}</div>
                                </div>
                                <p className="text-muted-foreground mb-6 h-20">{translatedComp.toolA.description}</p>
                                <div className="text-2xl font-bold mb-8">{translatedComp.toolA.price}</div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wide">{t("comparisons.detail.pros")}</h4>
                                    {translatedComp.toolA.pros.map((pro: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {pro}
                                        </div>
                                    ))}

                                    <h4 className="font-bold text-sm uppercase tracking-wide mt-6">{t("comparisons.detail.cons")}</h4>
                                    {translatedComp.toolA.cons.map((con: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            {con}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tool B Card */}
                            <div className="bg-card border border-border rounded-3xl p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-bold font-heading">{translatedComp.toolB.name}</h2>
                                    <div className="text-xl font-bold text-primary">{translatedComp.toolB.rating}</div>
                                </div>
                                <p className="text-muted-foreground mb-6 h-20">{translatedComp.toolB.description}</p>
                                <div className="text-2xl font-bold mb-8">{translatedComp.toolB.price}</div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wide">{t("comparisons.detail.pros")}</h4>
                                    {translatedComp.toolB.pros.map((pro: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {pro}
                                        </div>
                                    ))}

                                    <h4 className="font-bold text-sm uppercase tracking-wide mt-6">{t("comparisons.detail.cons")}</h4>
                                    {translatedComp.toolB.cons.map((con: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            {con}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Verdict */}
                    <AnimatedSection className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl p-8 md:p-12 border border-primary/20 text-center">
                        <Trophy className="w-12 h-12 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                            {t("comparisons.detail.verdict")} <span className="text-primary">{winnerDisplay}</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                            {translatedComp.verdict.summary}
                        </p>
                        <div className="inline-block bg-background/50 border border-primary/20 rounded-xl px-6 py-4">
                            <span className="block text-xs font-bold uppercase tracking-wide text-primary mb-1">{t("comparisons.detail.bestFor")}</span>
                            <span className="font-bold text-lg">{translatedComp.verdict.bestFor}</span>
                        </div>
                    </AnimatedSection>

                    {translatedComp.article ? (
                        <AnimatedSection className="mt-20">
                            <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12">
                                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                                    {t("comparisons.detail.fullComparison")}
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            p: ({ ...props }) => <p className="leading-relaxed text-muted-foreground mb-6" {...props} />,
                                            h2: ({ ...props }) => <h2 className="font-heading text-2xl font-bold mt-10 mb-4" {...props} />,
                                            h3: ({ ...props }) => <h3 className="font-heading text-xl font-bold mt-8 mb-3" {...props} />,
                                            ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
                                            li: ({ ...props }) => <li className="pl-1" {...props} />,
                                            strong: ({ ...props }) => <strong className="font-bold text-foreground" {...props} />,
                                        }}
                                    >
                                        {translatedComp.article}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </AnimatedSection>
                    ) : null}

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <Button size="lg" variant="hero" asChild>
                            <Link to="/#contact">{t("comparisons.detail.cta")}</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <TrustSignals />
            <Footer />
        </div >
    );
}
