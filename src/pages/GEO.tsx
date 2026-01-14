import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Network, MessageSquareText, Search, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

import { useTranslation } from "react-i18next";

export default function GEO() {
    const { t } = useTranslation();
    const pageUrl = getAbsoluteUrl("/geo-optimization");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("geo.metaTitle")}</title>
                <meta name="description" content={t("geo.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("geo.metaTitle")} />
                <meta property="og:description" content={t("geo.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <script type="application/ld+json">
                    {JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": t("geo.faq.q1"),
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": t("geo.faq.a1")
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": t("geo.faq.q2"),
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": t("geo.faq.a2")
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": t("geo.faq.q3"),
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": t("geo.faq.a3")
                                    }
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": t("geo.metaTitle"),
                            "description": t("geo.metaDescription"),
                            "provider": {
                                "@id": "https://agseo.pro/#organization"
                            }
                        }
                    ])}
                </script>
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">

                    {/* Manifesto Hero */}
                    <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Brain className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-500 tracking-wide">
                                {t("geo.hero.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {t("geo.hero.title")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">(GEO)</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                            {t("geo.hero.subtitle")}
                        </p>
                    </AnimatedSection>

                    {/* Old vs New Table */}
                    <AnimatedSection className="max-w-5xl mx-auto mb-20">
                        <div className="bg-card border border-border/50 rounded-3xl overflow-hidden">
                            <div className="grid md:grid-cols-2">
                                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50 bg-background/50">
                                    <h3 className="text-2xl font-bold font-heading mb-6 text-muted-foreground">{t("geo.comparison.traditional.title")}</h3>
                                    <ul className="space-y-4">
                                        {(t("geo.comparison.traditional.items", { returnObjects: true }) as string[]).map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-muted-foreground"><Search className="w-5 h-5 opacity-50" /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 md:p-12 bg-primary/5">
                                    <h3 className="text-2xl font-bold font-heading mb-6 text-primary">{t("geo.comparison.agseo.title")}</h3>
                                    <ul className="space-y-4">
                                        {(t("geo.comparison.agseo.items", { returnObjects: true }) as string[]).map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-foreground"><Zap className="w-5 h-5 text-primary" /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* 4 Pillars */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                        {[
                            { icon: Network, title: t("geo.pillars.graph.title"), desc: t("geo.pillars.graph.desc") },
                            { icon: MessageSquareText, title: t("geo.pillars.citations.title"), desc: t("geo.pillars.citations.desc") },
                            { icon: Brain, title: t("geo.pillars.context.title"), desc: t("geo.pillars.context.desc") },
                            { icon: Zap, title: t("geo.pillars.velocity.title"), desc: t("geo.pillars.velocity.desc") }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="bg-card border border-border/50 p-6 rounded-2xl h-full hover:border-blue-500/50 transition-colors">
                                    <item.icon className="w-10 h-10 text-blue-500 mb-4" />
                                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center">
                        <h2 className="text-3xl font-bold font-heading mb-8">{t("geo.cta.title")}</h2>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/#contact">{t("geo.cta.button")}</Link>
                        </Button>
                    </AnimatedSection>

                </div>
            </main>
            <Footer />
        </div>
    );
}
