import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

import { useTranslation } from "react-i18next";

export default function CaseStudies() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState("All");

    const pageUrl = getAbsoluteUrl("/case-studies");

    const translatedStudies = useMemo(() => {
        const rawItems = t("caseStudies.items", { returnObjects: true });
        // Ensure rawItems is an object before casting to Record<string, ...>
        const items = (rawItems && typeof rawItems === 'object' && !Array.isArray(rawItems))
            ? rawItems as Record<string, {
                category: string;
                title: string;
                description: string;
                stats: Array<{ label: string; value: string }>;
                content: string[];
            }>
            : {};
        return caseStudies.map(study => {
            const translatedItem = items[study.id];
            if (!translatedItem) return study;
            return {
                ...study,
                category: translatedItem.category,
                title: translatedItem.title,
                description: translatedItem.description,
                stats: translatedItem.stats,
                content: translatedItem.content
            };
        });
    }, [t]);

    const filteredStudies = filter === "All"
        ? translatedStudies
        : translatedStudies.filter(study => {
            // Find parent original study to check original category
            const originalStudy = caseStudies.find(s => s.id === study.id);
            return originalStudy?.category === filter;
        });

    const categoryLabels: Record<string, string> = {
        "All": t("caseStudies.allCategories"),
        "E-commerce": "E-commerce",
        "SaaS": "SaaS",
        "Local Service": t("caseStudies.items.legal-firm-local.category"),
        "Enterprise": "Enterprise"
    };

    const categories = ["All", "E-commerce", "SaaS", "Local Service", "Enterprise"];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("caseStudies.metaTitle")}</title>
                <meta name="description" content={t("caseStudies.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("caseStudies.metaTitle")} />
                <meta property="og:description" content={t("caseStudies.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <Breadcrumbs className="mb-8" />
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <span className="text-sm font-medium text-primary tracking-wide">
                                {t("caseStudies.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            {t("caseStudies.titlePrefix")} <span className="text-primary">{t("caseStudies.titleSuffix")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {t("caseStudies.subtitle")}
                        </p>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "bg-card border border-border hover:border-primary/50 text-muted-foreground"
                                        }`}
                                >
                                    {categoryLabels[cat] || cat}
                                </button>
                            ))}
                        </div>
                    </AnimatedSection>

                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study) => (
                                <AnimatedSection key={study.id} className="group">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                                    >
                                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 p-8 md:p-12 items-center">
                                            <div className="lg:col-span-3 space-y-6">
                                                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${study.color} ${study.bgColor}`}>
                                                    {study.category}
                                                </div>
                                                <h2 className="font-heading text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                                                    {study.title}
                                                </h2>
                                                <p className="text-lg text-muted-foreground">
                                                    {study.description}
                                                </p>
                                                <Button
                                                    variant="hero"
                                                    size="lg"
                                                    className="group/btn"
                                                    asChild
                                                >
                                                    <Link to={`/case-studies/${study.id}`}>
                                                        {t("nav.readMore")} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                                    </Link>
                                                </Button>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {study.stats.map((stat, i) => (
                                                        <div key={i} className={`bg-background/50 rounded-2xl p-6 text-center border border-border/50 ${i === 2 ? 'col-span-2' : ''}`}>
                                                            <div className="text-3xl font-bold font-heading mb-1 text-foreground">
                                                                {stat.value}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                                {stat.label}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </AnimatePresence>
                    </div>

                    <AnimatedSection className="mt-20 text-center bg-primary/5 rounded-3xl p-12 border border-primary/20">
                        <h2 className="text-3xl font-bold font-heading mb-4">{t("caseStudies.cta.title")}</h2>
                        <p className="text-muted-foreground mb-8 text-lg">{t("caseStudies.cta.desc")}</p>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/#contact">{t("caseStudies.cta.button")}</Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
