import { useParams, Link, Navigate } from "react-router-dom";
import { comparisons } from "@/data/comparisons";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
    ORGANIZATION_ID,
    SITE_LOGO_URL,
    SITE_NAME,
    SITE_OG_IMAGE_URL,
    TEAM_ID,
    WEBSITE_ID,
    getAbsoluteUrl
} from "@/lib/siteMetadata";

export default function CompareDetail() {
    const { slug } = useParams();
    const comp = comparisons.find((c) => c.slug === slug);

    if (!comp) {
        return <Navigate to="/404" replace />;
    }

    const pageUrl = getAbsoluteUrl(`/compare/${comp.slug}`);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Comparisons", href: "/compare" },
        { label: `${comp.toolA.name} vs ${comp.toolB.name}`, href: `/compare/${comp.slug}` }
    ];

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${comp.toolA.name} vs ${comp.toolB.name} (2025 Review)`,
        description: `Head-to-head comparison: ${comp.toolA.name} vs ${comp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`,
        url: pageUrl,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl
        },
        image: SITE_OG_IMAGE_URL,
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
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{comp.toolA.name} vs {comp.toolB.name} (2025 Review) - AGSEO</title>
                <meta name="description" content={`Head-to-head comparison: ${comp.toolA.name} vs ${comp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${comp.toolA.name} vs ${comp.toolB.name} (2025 Review) - AGSEO`} />
                <meta property="og:description" content={`Head-to-head comparison: ${comp.toolA.name} vs ${comp.toolB.name}. See features, pricing, and our expert verdict on which AI tool wins.`} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Breadcrumbs items={breadcrumbItems} className="mb-6" />
                    <Link to="/compare" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Comparisons
                    </Link>

                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary/10 text-primary mb-6">
                            {comp.category}
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-8">
                            {comp.toolA.name} <span className="text-muted-foreground">vs</span> {comp.toolB.name}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Which tool wins the battle for {comp.category.toLowerCase()} supremacy?
                        </p>
                    </AnimatedSection>

                    {/* Head to Head Table */}
                    <AnimatedSection className="mb-20">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tool A Card */}
                            <div className="bg-card border border-border rounded-3xl p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-bold font-heading">{comp.toolA.name}</h2>
                                    <div className="text-xl font-bold text-primary">{comp.toolA.rating}</div>
                                </div>
                                <p className="text-muted-foreground mb-6 h-20">{comp.toolA.description}</p>
                                <div className="text-2xl font-bold mb-8">{comp.toolA.price}</div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wide">Pros</h4>
                                    {comp.toolA.pros.map((pro, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {pro}
                                        </div>
                                    ))}

                                    <h4 className="font-bold text-sm uppercase tracking-wide mt-6">Cons</h4>
                                    {comp.toolA.cons.map((con, i) => (
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
                                    <h2 className="text-3xl font-bold font-heading">{comp.toolB.name}</h2>
                                    <div className="text-xl font-bold text-primary">{comp.toolB.rating}</div>
                                </div>
                                <p className="text-muted-foreground mb-6 h-20">{comp.toolB.description}</p>
                                <div className="text-2xl font-bold mb-8">{comp.toolB.price}</div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wide">Pros</h4>
                                    {comp.toolB.pros.map((pro, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {pro}
                                        </div>
                                    ))}

                                    <h4 className="font-bold text-sm uppercase tracking-wide mt-6">Cons</h4>
                                    {comp.toolB.cons.map((con, i) => (
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
                            The Verdict: <span className="text-primary">{comp.verdict.winner === 'Tie' ? "It's a Tie!" : `${comp.verdict.winner === 'ToolA' ? comp.toolA.name : comp.toolB.name} Wins`}</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                            {comp.verdict.summary}
                        </p>
                        <div className="inline-block bg-background/50 border border-primary/20 rounded-xl px-6 py-4">
                            <span className="block text-xs font-bold uppercase tracking-wide text-primary mb-1">Best For</span>
                            <span className="font-bold text-lg">{comp.verdict.bestFor}</span>
                        </div>
                    </AnimatedSection>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <Button size="lg" variant="hero" asChild>
                            <Link to="/#contact">Get Help Choosing Your Stack</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
