import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { comparisons } from "@/data/comparisons";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { ComparisonsMethodology } from "@/components/sections/ComparisonsMethodology";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { useTranslation, Trans } from "react-i18next";

const VALUE_PROP_ICONS: Record<string, LucideIcon> = {
    "Decision-ready verdicts": CheckCircle2,
    "No pay-to-win rankings": ShieldCheck,
    "Built for modern search": Sparkles,
    "Verdicturi gata de decizie": CheckCircle2,
    "Fără clasamente plătite": ShieldCheck,
    "Construit pentru căutarea modernă": Sparkles,
};

export default function CompareHub() {
    const { t } = useTranslation();
    const pageUrl = getAbsoluteUrl("/compare");

    const translatedValueProps = useMemo(() => {
        const rawProps = t("comparisons.valueProps", { returnObjects: true });
        const props = Array.isArray(rawProps) ? rawProps as Array<{
            title: string;
            description: string;
            bullets: string[];
        }> : [];
        return props.map(prop => ({
            ...prop,
            icon: VALUE_PROP_ICONS[prop.title] || CheckCircle2
        }));
    }, [t]);

    const translatedComparisons = useMemo(() => {
        const rawItems = t("comparisons.items", { returnObjects: true });
        const items = (rawItems && typeof rawItems === 'object' && !Array.isArray(rawItems))
            ? rawItems as Record<string, {
                category?: string;
                verdict?: { summary?: string };
            }>
            : {};
        return comparisons.map((comp) => {
            const tComp = items[comp.slug];
            if (!tComp) return comp;
            return {
                ...comp,
                category: tComp.category || comp.category,
                verdict: {
                    ...comp.verdict,
                    summary: tComp.verdict?.summary || comp.verdict.summary
                }
            };
        });
    }, [t]);

    const itemListSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        url: pageUrl,
        name: t("comparisons.metaTitle"),
        itemListElement: translatedComparisons.map((comp, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${comp.toolA.name} vs ${comp.toolB.name}`,
            url: getAbsoluteUrl(`/compare/${comp.slug}`)
        }))
    }), [pageUrl, t, translatedComparisons]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{t("comparisons.metaTitle")}</title>
                <meta name="description" content={t("comparisons.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("comparisons.metaTitle")} />
                <meta property="og:description" content={t("comparisons.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
            </Helmet>
            <Header />
            <main id="main" className="pt-24 pb-16 flex-1">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Scale className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                {t("comparisons.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            {t("comparisons.titlePrefix")} <span className="text-primary">{t("comparisons.titleSuffix")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {t("comparisons.subtitle")}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-16">
                        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10">
                            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                                {t("comparisons.hubTitle")}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                <Trans
                                    i18nKey="comparisons.hubDesc"
                                    components={{
                                        glossaryLink: <Link to="/resources/glossary" className="text-primary underline underline-offset-4" />
                                    }}
                                />
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {translatedValueProps.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="rounded-2xl border border-border/50 bg-background/40 p-6">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{item.description}</p>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {item.bullets.map((bullet: string) => (
                                                    <li key={bullet} className="flex items-center gap-2">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="max-w-5xl mx-auto mb-8">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold">
                            {t("comparisons.latestTitle")}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {t("comparisons.latestSubtitle")}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {translatedComparisons.map((comp, index) => (
                            <AnimatedSection key={index} delay={index * 0.1} className="group">
                                <Link to={`/compare/${comp.slug}`} className="block h-full">
                                    <div className="h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                        {comp.image && (
                                            <div className="aspect-video w-full overflow-hidden">
                                                <OptimizedImage
                                                    src={comp.image}
                                                    alt={`${comp.toolA.name} vs ${comp.toolB.name}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-8">
                                            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                                {comp.category}
                                            </div>

                                            <div className="flex items-center justify-between gap-4 mb-6">
                                                <div className="text-xl font-bold font-heading">{comp.toolA.name}</div>
                                                <div className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">VS</div>
                                                <div className="text-xl font-bold font-heading">{comp.toolB.name}</div>
                                            </div>

                                            <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                                {comp.verdict.summary}
                                            </p>

                                            <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                                {t("comparisons.readComparison")} <ArrowRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="max-w-5xl mx-auto mt-16">
                        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
                            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
                                {t("comparisons.ctaTitle")}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
                                {t("comparisons.ctaDesc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/tools/audit">{t("comparisons.ctaAudit")}</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link to="/#contact">{t("comparisons.ctaTalk")}</Link>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
                <div className="mt-20">
                    <ComparisonsMethodology />
                </div>
            </main>
            <TrustSignals />
            <Footer />
        </div >
    );
}
