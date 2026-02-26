import { useParams, Link, Navigate } from "react-router-dom";
import { industries } from "@/data/industries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function IndustryTemplate() {
    const { slug } = useParams();
    const industry = industries.find((i) => i.id === slug || i.slug === slug);

    if (!industry) {
        return <Navigate to="/404" replace />;
    }

    const HeroIcon = industry.icon;
    const pageUrl = getAbsoluteUrl(`/industries/${industry.slug}`);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{industry.hero.title} | {industry.name} SEO Agency | AGSEO</title>
                <meta name="description" content={industry.hero.subtitle} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${industry.hero.title} - AGSEO`} />
                <meta property="og:description" content={industry.hero.subtitle} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": industry.hero.title,
                        "description": industry.hero.subtitle,
                        "provider": {
                            "@type": "Organization",
                            "name": "AGSEO",
                            "url": "https://agseo.pro"
                        },
                        "areaServed": "Worldwide",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": `${industry.name} SEO Services`,
                            "itemListElement": industry.solution.features.map((feature) => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": feature
                                }
                            }))
                        }
                    })}
                </script>
            </Helmet>

            <Header />
            <main id="main" className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <HeroIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                {industry.name}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {industry.hero.title}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {industry.hero.subtitle}
                        </p>
                        <Button variant="hero" size="lg" asChild>
                            <Link to="/#contact">
                                Get Started
                            </Link>
                        </Button>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <AnimatedSection delay={0.1}>
                            <h2 className="font-heading text-3xl font-bold mb-6">Why Traditional SEO Fails for {industry.name}</h2>
                            <ul className="space-y-4">
                                {industry.challenges.map((challenge, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="mt-1 p-1 rounded-full bg-red-500/10 text-red-500">
                                            <Zap className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <span className="font-medium">{challenge.title}</span>
                                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2} className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="font-bold text-xl mb-4">{industry.solution.title}</h3>
                            <p className="text-muted-foreground mb-6">{industry.solution.description}</p>
                            <ul className="space-y-3">
                                {industry.solution.features.map((feature, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="mt-1 p-1 rounded-full bg-green-500/10 text-green-500">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection className="grid md:grid-cols-3 gap-6 mb-24 text-center">
                        {industry.metrics.map((metric, i) => (
                            <div key={i} className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                                <div className="text-sm font-medium mb-1">{metric.label}</div>
                                <div className="text-xs text-muted-foreground">{metric.description}</div>
                            </div>
                        ))}
                    </AnimatedSection>

                    <AnimatedSection className="text-center bg-gradient-to-br from-primary/10 via-background to-background rounded-3xl p-12 border border-primary/20">
                        <h2 className="font-heading text-3xl font-bold mb-6">Ready to dominate the {industry.name} market?</h2>
                        <Button variant="hero" size="lg" asChild>
                            <Link to="/#contact">
                                Book Your {industry.name} Strategy Call
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}