import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Globe, ArrowLeft, Target, FileText, Wrench, PenTool, Link2, MapPin, BarChart3, Briefcase, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface ServiceCategory {
    icon: React.ElementType;
    title: string;
    items: string[];
}

const serviceCategories: ServiceCategory[] = [
    {
        icon: Target,
        title: "Strategic Consulting",
        items: [
            "Dedicated account manager (primary contact)",
            "Bi-weekly strategy calls (30-45 min)",
            "Monthly board-level reporting call",
            "Quarterly business review (QBR) with recommendations",
            "Annual SEO audit + market opportunity assessment",
            "Competitive intelligence reports (monthly)"
        ]
    },
    {
        icon: FileText,
        title: "On-Page Optimization",
        items: [
            "8-12+ pages optimized per month",
            "Custom content strategy aligned to business goals (revenue attribution)",
            "Advanced UX signals optimization (dwell time, click-through)",
            "Conversion-focused page optimization (CRO elements)",
            "A/B testing framework for landing pages"
        ]
    },
    {
        icon: Wrench,
        title: "Technical SEO (Advanced)",
        items: [
            "Monthly technical audits (enterprise-scale, 200+ factors)",
            "Site speed optimization at scale",
            "JavaScript/React rendering optimization",
            "Crawl budget optimization",
            "International/hreflang strategy (if applicable)",
            "Site architecture redesign recommendations",
            "Server migration/relocation strategy"
        ]
    },
    {
        icon: PenTool,
        title: "Content Production & Strategy",
        items: [
            "5-8 blog articles per month (2,000-3,500 words, high-authority)",
            "Pillar page creation (comprehensive topic hubs)",
            "Content cluster strategy (large-scale topical authority)",
            "Guest posting on premium publications (high DA 50+)",
            "Original research/data-driven content",
            "Video content strategy & optimization"
        ]
    },
    {
        icon: Link2,
        title: "Advanced Link Building",
        items: [
            "15-20+ press releases per month",
            "8-12+ guest posts per month (premium publications)",
            "Broken link reclamation campaigns",
            "Resource page link placement",
            "Podcast/interview placements",
            "Sponsorship & partnership link strategy",
            "Digital PR in major publications"
        ]
    },
    {
        icon: MapPin,
        title: "Local & Multi-Location",
        items: [
            "50+ local citations (all relevant directories)",
            "Multi-location SEO framework",
            "Location page strategy & optimization",
            "Local review generation at scale (automated)",
            "Territory-based content strategy"
        ]
    },
    {
        icon: Briefcase,
        title: "E-Commerce SEO (if applicable)",
        items: [
            "Product page optimization at scale",
            "Category page strategy",
            "Product review schema optimization",
            "Inventory-driven keyword targeting",
            "Shopping feed optimization"
        ]
    },
    {
        icon: BarChart3,
        title: "Reporting & Analytics (Enterprise)",
        items: [
            "Real-time executive dashboard (custom metrics)",
            "Weekly performance snapshots",
            "Monthly comprehensive report (20+ pages, branded)",
            "Custom metric tracking (revenue, leads, conversions)",
            "Industry trend analysis & forecasting"
        ]
    }
];

const addOns = [
    "AI Agents/Automation: Custom AI workflows",
    "White-Label Delivery: Full rebranding for agencies",
    "International SEO: Multi-language expansion",
    "Advanced PPC Integration",
    "Video SEO & Podcast SEO"
];

export default function PricingProBusiness() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Enterprise SEO Package - AGSEO | Custom Solutions</title>
                <meta name="description" content="Enterprise SEO: Revenue-Focused, Scalable Growth. For large enterprises and multi-location brands. Custom strategy, dedicated account manager, advanced technical SEO, and full CRO." />
                <link rel="canonical" href="https://agseo.pro/pricing/pro-business" />
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
                            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                                <Globe className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <h1 className="font-heading text-4xl md:text-5xl font-bold">Pro Business</h1>
                                <p className="text-muted-foreground">Enterprise SEO: Revenue-Focused, Scalable Growth</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="bg-card border border-purple-500/30 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Monthly Investment</p>
                                <p className="text-3xl font-bold font-heading text-primary">Custom Quote</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Contract Minimum</p>
                                <p className="text-xl font-semibold">12+ months</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Target Client</p>
                                <p className="text-xl font-semibold">Large enterprises, multi-location brands</p>
                            </div>
                        </div>

                        <Button variant="hero" size="lg" asChild>
                            <Link to="/contact">Let's Talk - Contact Sales</Link>
                        </Button>
                    </div>

                    {/* Includes Everything from Business */}
                    <div className="max-w-6xl mx-auto mb-8">
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-3">
                            <Check className="w-5 h-5 text-purple-400" />
                            <p className="text-sm"><span className="font-semibold">Includes everything from Business tier</span>, plus the enterprise-grade services below.</p>
                        </div>
                    </div>

                    {/* Service Categories */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-heading text-2xl font-bold mb-8 text-center">What's Included</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            {serviceCategories.map((category, index) => (
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

                        {/* Add-ons */}
                        <div>
                            <div className="bg-card/50 border border-border/30 rounded-2xl p-8">
                                <h3 className="font-heading text-xl font-semibold mb-6 text-center">Available Add-Ons</h3>
                                <p className="text-muted-foreground text-center mb-6">
                                    Customize your package further with these optional modules.
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                                    {addOns.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-background/50 p-3 rounded-lg border border-border/50">
                                            <Plus className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <h3 className="font-heading text-2xl font-bold mb-4">Build Your Custom Solution</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Contact our sales team to design an SEO strategy that aligns perfectly with your enterprise goals.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Button variant="hero" size="lg" asChild>
                                    <Link to="/contact">Book Strategy Call</Link>
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
