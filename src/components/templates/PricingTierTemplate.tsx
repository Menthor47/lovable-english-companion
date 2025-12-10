import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PricingTierData } from "@/data/pricing";

interface PricingTierTemplateProps {
    data: PricingTierData;
}

export function PricingTierTemplate({ data }: PricingTierTemplateProps) {
    const Icon = data.icon;

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{data.metaTitle}</title>
                <meta name="description" content={data.metaDescription} />
                <link rel="canonical" href={data.canonicalUrl} />
            </Helmet>
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    {/* Back Link */}
                    <Link to="/pricing" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pricing
                    </Link>

                    {/* Header */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl ${data.iconBgClass} border ${data.iconBorderClass} flex items-center justify-center`}>
                                <Icon className={`w-8 h-8 ${data.iconColorClass}`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="font-heading text-4xl md:text-5xl font-bold">{data.name}</h1>
                                    {data.isPopular && (
                                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                                    )}
                                </div>
                                <p className="text-muted-foreground">{data.subtitle}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className={`bg-card border ${data.isPopular ? 'border-primary/30' : 'border-border/50'} rounded-xl px-6 py-4`}>
                                <p className="text-sm text-muted-foreground mb-1">Monthly Investment</p>
                                <p className="text-3xl font-bold font-heading text-primary">{data.price}</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Contract Minimum</p>
                                <p className="text-xl font-semibold">{data.contract}</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Target Client</p>
                                <p className="text-xl font-semibold">{data.targetClient}</p>
                            </div>
                        </div>

                        <Button variant="hero" size="lg" asChild>
                            <Link to="/contact">{data.ctaText}</Link>
                        </Button>
                    </div>

                    {/* Includes Previous Tier */}
                    {data.includesText && (
                        <div className="max-w-6xl mx-auto mb-8">
                            <div className={`${data.iconBgClass} border ${data.iconBorderClass} rounded-xl p-4 flex items-center gap-3`}>
                                <Check className={`w-5 h-5 ${data.iconColorClass}`} />
                                <p className="text-sm"><span className="font-semibold">{data.includesText}</span>, plus the enhanced services below.</p>
                            </div>
                        </div>
                    )}

                    {/* Service Categories */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-heading text-2xl font-bold mb-8 text-center">What's Included</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            {data.serviceCategories.map((category, index) => (
                                <div key={index} className="bg-card border border-border/50 rounded-2xl p-6 h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <category.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold">{category.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground/80">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Not Included */}
                        {data.notIncluded && (
                            <div className="mb-16">
                                <div className="bg-card/50 border border-border/30 rounded-2xl p-8">
                                    <h3 className="font-heading text-xl font-semibold mb-6 text-center">Not Included in {data.name}</h3>
                                    {data.notIncludedText && (
                                        <p className="text-muted-foreground text-center mb-6">
                                            {data.notIncludedText}
                                        </p>
                                    )}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {data.notIncluded.map((item, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                                                <span className="text-sm text-muted-foreground">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add-ons */}
                        {data.addOns && (
                            <div className="mb-16">
                                <div className="bg-card/50 border border-border/30 rounded-2xl p-8">
                                    <h3 className="font-heading text-xl font-semibold mb-6 text-center">Available Add-Ons</h3>
                                    <p className="text-muted-foreground text-center mb-6">
                                        Customize your package further with these optional modules.
                                    </p>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                                        {data.addOns.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-background/50 p-3 rounded-lg border border-border/50">
                                                <Plus className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <h3 className="font-heading text-2xl font-bold mb-4">{data.summaryTitle}</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                {data.summaryText}
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/contact">Get Free Consultation</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link to="/pricing">Compare All Plans</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
