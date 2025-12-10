import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { pricingData } from "@/data/pricing";

export default function Pricing() {
    const { t } = useTranslation();

    const planKeys = ["starter", "business", "pro"] as const;

    const plans = planKeys.map((key) => {
        const data = pricingData[key];
        const translationKey = key === "pro" ? "proBusiness" : key;
        return {
            id: data.id,
            icon: data.icon,
            popular: data.isPopular ?? false,
            gradient: key === "starter" ? "from-blue-500/20 to-cyan-500/20" : key === "business" ? "from-primary/20 to-accent/20" : "from-purple-500/20 to-pink-500/20",
            border: key === "starter" ? "border-blue-500/20" : key === "business" ? "border-primary/50" : "border-purple-500/20",
            detailLink: key === "pro" ? "/pricing/pro-business" : `/pricing/${key}`,
            isCustom: key === "pro",
            name: t(`pricing.plans.${translationKey}.name`),
            description: t(`pricing.plans.${translationKey}.description`),
            price: data.price,
            period: t(`pricing.plans.${translationKey}.period`),
            features: t(`pricing.plans.${translationKey}.features`, { returnObjects: true }) as string[],
            cta: t(`pricing.plans.${translationKey}.cta`),
            popularLabel: t(`pricing.plans.${translationKey}.popularLabel`),
        };
    });


    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Pricing Plans - AGSEO | AI-Driven SEO Packages</title>
                <meta name="description" content="Transparent pricing for AI SEO services. From local growth to enterprise dominance, find the perfect plan for your business scale." />
                <link rel="canonical" href="https://agseo.pro/pricing" />
                <meta property="og:url" content="https://agseo.pro/pricing" />
                <meta property="og:title" content="Pricing Plans - AGSEO | AI-Driven SEO Packages" />
                <meta property="og:description" content="Transparent pricing for AI SEO services. From local growth to enterprise dominance, find the perfect plan for your business scale." />
            </Helmet>
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                {t("pricing.badge")}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t("pricing.title")}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {t("pricing.subtitle")}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/dashboard">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {t("pricing.viewDemoCta")}
                            </Link>
                        </Button>
                    </AnimatedSection>

                    {/* Pricing Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <div key={index} className="h-full">
                                <div
                                    className={`relative h-full p-8 rounded-3xl bg-card border ${plan.border} backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 group overflow-hidden flex flex-col`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                                                {plan.popularLabel}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-2xl bg-background/50 border border-white/10 flex items-center justify-center mb-6">
                                            <plan.icon className="w-6 h-6 text-foreground" />
                                        </div>

                                        {/* Header */}
                                        <h3 className="font-heading text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                                        {/* Price */}
                                        <div className="mb-8">
                                            {plan.isCustom ? (
                                                <span className="text-3xl font-bold font-heading">{plan.price}</span>
                                            ) : (
                                                <>
                                                    <span className="text-3xl font-bold font-heading">{plan.price}</span>
                                                    <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-4 mb-8 flex-grow">
                                            {plan.features.slice(0, 8).map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground/80">{feature}</span>
                                                </div>
                                            ))}
                                            <div className="pt-2">
                                                <span className="text-xs text-muted-foreground italic">...plus full service breakdown</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-auto space-y-4">
                                            <Button
                                                variant={plan.popular ? "hero" : "outline"}
                                                size="lg"
                                                className="w-full"
                                                asChild
                                            >
                                                <Link to="/contact">
                                                    {plan.cta}
                                                </Link>
                                            </Button>
                                            <Link
                                                to={plan.detailLink}
                                                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                                            >
                                                View Full Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Teaser */}
                    <AnimatedSection className="mt-24 text-center">
                        <p className="text-muted-foreground mb-4">{t("pricing.faqTeaser")}</p>
                        <Link to="/contact" className="text-primary hover:underline font-medium">
                            {t("pricing.faqCta")}
                        </Link>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
