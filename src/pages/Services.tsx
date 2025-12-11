import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
    Bot,
    Sparkles,
    FileText,
    Search,
    MapPin,
    ShoppingCart,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

interface ServiceCard {
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
    features: string[];
    popular?: boolean;
}

const services: ServiceCard[] = [
    {
        icon: Sparkles,
        title: "GEO Optimization",
        description: "Get your brand featured in AI-generated answers from ChatGPT, Gemini, Perplexity, and voice assistants.",
        href: "/geo-optimization",
        features: [
            "AI answer optimization",
            "Voice search visibility",
            "Featured snippet targeting",
            "Knowledge panel optimization"
        ],
        popular: true
    },
    {
        icon: FileText,
        title: "Content & Programmatic SEO",
        description: "Scale your organic presence with AI-assisted content strategies that rank and convert.",
        href: "/services/content",
        features: [
            "Programmatic page generation",
            "Topic cluster strategy",
            "Content optimization",
            "Keyword targeting"
        ],
        popular: true
    },
    {
        icon: Bot,
        title: "Answer Engine Optimization (AEO)",
        description: "Optimize your content structure to be the definitive answer for user queries.",
        href: "/geo-optimization",
        features: [
            "FAQ schema implementation",
            "Question-answer formatting",
            "Direct answer optimization",
            "Intent matching"
        ]
    },
    {
        icon: Search,
        title: "Technical SEO",
        description: "Build a solid technical foundation that search engines love to crawl and index.",
        href: "/tools/audit",
        features: [
            "Site architecture audit",
            "Core Web Vitals optimization",
            "Crawlability improvements",
            "Structured data implementation"
        ]
    },
    {
        icon: MapPin,
        title: "Local SEO",
        description: "Dominate local search results and attract customers in your service area.",
        href: "/contact",
        features: [
            "Google Business Profile optimization",
            "Local citation building",
            "Review management",
            "Local content strategy"
        ]
    },
    {
        icon: ShoppingCart,
        title: "E-commerce SEO",
        description: "Drive qualified traffic to your product pages and increase conversions.",
        href: "/contact",
        features: [
            "Product page optimization",
            "Category structure",
            "Schema markup",
            "Shopping feed optimization"
        ]
    }
];

export default function Services() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Our Services | AGSEO - AI-Powered SEO Solutions</title>
                <meta
                    name="description"
                    content="Explore AGSEO's full suite of AI-powered SEO services: GEO optimization, content strategy, technical SEO, local SEO, and e-commerce solutions."
                />
                <link rel="canonical" href="https://agseo.pro/services" />
                <meta property="og:url" content="https://agseo.pro/services" />
                <meta property="og:title" content="Our Services | AGSEO - AI-Powered SEO Solutions" />
                <meta property="og:description" content="Explore AGSEO's full suite of AI-powered SEO services for modern search visibility." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Header />

            <main>
                {/* Breadcrumbs */}
                <div className="container mx-auto px-4 pt-24">
                    <Breadcrumbs />
                </div>

                {/* Hero Section */}
                <section className="pt-8 pb-16">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                                    Our Services
                                </span>
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                AI-Powered SEO{" "}
                                <span className="text-gradient">Solutions</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                                From traditional search optimization to cutting-edge AI answer engines,
                                we help your business get discovered wherever your customers are searching.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 bg-card/30">
                    <div className="container mx-auto px-4">
                        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                            {services.map((service, index) => (
                                <StaggerItem key={index}>
                                    <div className={`h-full p-8 rounded-2xl bg-card/60 backdrop-blur-sm border ${service.popular ? 'border-primary/50' : 'border-border'} hover:border-primary/50 transition-all group`}>
                                        {service.popular && (
                                            <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                                                Most Popular
                                            </div>
                                        )}

                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <service.icon className="w-7 h-7 text-primary" />
                                        </div>

                                        <h2 className="font-heading text-2xl font-bold mb-3">
                                            {service.title}
                                        </h2>

                                        <p className="text-muted-foreground mb-6">
                                            {service.description}
                                        </p>

                                        <ul className="space-y-3 mb-8">
                                            {service.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-2 text-sm text-foreground/80">
                                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link to={service.href}>
                                            <Button className="w-full group/btn">
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
                    <div className="container mx-auto px-4">
                        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Not Sure Which Service You Need?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Get a free comprehensive audit. We'll analyze your current visibility
                                and recommend the best strategy for your goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/tools/audit">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Get Free AI Audit
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Talk to an Expert
                                    </Button>
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
