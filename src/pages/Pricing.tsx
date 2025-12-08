import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const plans = [
    {
        name: "Starter",
        description: "Perfect for local businesses and startups ready to grow.",
        price: "$1,500",
        period: "/month",
        icon: Shield,
        features: [
            "Local SEO Optimization",
            "5 Core Service Pages",
            "Google Business Profile Management",
            "Basic Analytics Dashboard",
            "Monthly Performance Report",
            "AI Content Generation (4 articles/mo)",
        ],
        cta: "Start Growing",
        popular: false,
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/20",
    },
    {
        name: "Growth",
        description: "For established brands scaling nationally or internationally.",
        price: "$3,500",
        period: "/month",
        icon: Zap,
        features: [
            "National SEO Strategy",
            "Technical SEO Audits (Weekly)",
            "Programmatic Content (20 pages/mo)",
            "High-Authority Link Building",
            "CRO Recommendations",
            "Bi-Weekly Strategy Calls",
            "Priority Support",
        ],
        cta: "Scale Now",
        popular: true,
        gradient: "from-primary/20 to-accent/20",
        border: "border-primary/50",
    },
    {
        name: "Dominance",
        description: "Enterprise-grade AI SEO for maximum market share.",
        price: "Custom",
        period: "",
        icon: Globe,
        features: [
            "Global GEO Strategy (ChatGPT/Gemini)",
            "Unlimited Programmatic Assessment",
            "Custom AI Agent Development",
            "Competitor Entity Graph Analysis",
            "Dedicated Account Manager",
            "24/7 Slack Access",
            "White-label Reporting (Agencies)",
        ],
        cta: "Contact Sales",
        popular: false,
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/20",
    },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Pricing Plans - AGSEO | AI-Driven SEO Packages</title>
                <meta name="description" content="Transparent pricing for AI SEO services. From local growth to enterprise dominance, find the perfect plan for your business scale." />
            </Helmet>
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                Simple, Transparent Pricing
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Invest in <span className="text-primary">Growth</span>, Not Guesswork
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Choose the AI-powered plan that fits your scale. No hidden fees, just results.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/dashboard">
                                <Sparkles className="w-4 h-4 mr-2" />
                                View Client Portal Demo
                            </Link>
                        </Button>
                    </AnimatedSection>

                    {/* Pricing Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <AnimatedSection key={index} delay={index * 100}>
                                <div
                                    className={`relative h-full p-8 rounded-3xl bg-card border ${plan.border} backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 group overflow-hidden`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                                                MOST POPULAR
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
                                            <span className="text-4xl font-bold font-heading">{plan.price}</span>
                                            <span className="text-muted-foreground">{plan.period}</span>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-4 mb-8 flex-grow">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground/80">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            variant={plan.popular ? "hero" : "outline"}
                                            size="lg"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link to="/#contact">
                                                {plan.cta}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* FAQ Teaser */}
                    <AnimatedSection className="mt-24 text-center">
                        <p className="text-muted-foreground mb-4">Need a custom enterprise solution?</p>
                        <Link to="/#contact" className="text-primary hover:underline font-medium">
                            Book a consultation with our sales team
                        </Link>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
