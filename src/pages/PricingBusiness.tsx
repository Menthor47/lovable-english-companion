import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, ArrowLeft, Target, FileText, Wrench, PenTool, Link2, MapPin, BarChart3, Settings, TrendingUp } from "lucide-react";
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
        title: "Strategy & Research",
        items: [
            "Quarterly strategy review call (1x per quarter)",
            "Keyword research: 40-60 target keywords (expanded)",
            "Competitive analysis: Top 5-7 competitors (deep dive)",
            "Quarterly market opportunity report",
            "Audience/buyer persona research"
        ]
    },
    {
        icon: FileText,
        title: "On-Page Optimization",
        items: [
            "4-6 pages optimized per month",
            "Advanced schema markup (Review, FAQ, BreadcrumbList, Video, Article)",
            "Internal linking optimization (pillar-cluster model, 2-3 clusters)",
            "Page experience optimization (user signals focus)"
        ]
    },
    {
        icon: Wrench,
        title: "Technical SEO",
        items: [
            "Quarterly technical audits (comprehensive, 100+ factors)",
            "Site speed optimization (image compression, caching, CDN)",
            "Mobile-first indexing verification",
            "Core Web Vitals optimization (LCP, FID, CLS improvements)",
            "Advanced crawl analysis (orphan pages, duplicate content)",
            "Structured data troubleshooting via Google Rich Results Test"
        ]
    },
    {
        icon: PenTool,
        title: "Content Production",
        items: [
            "3 blog articles per month (1,500-2,000 words, high-intent)",
            "Long-form content strategy (pillar pages, comprehensive guides)",
            "Content cluster mapping (topical authority building)",
            "SEO content brief creation (detailed, data-driven)"
        ]
    },
    {
        icon: Link2,
        title: "Link Building & Off-Page",
        items: [
            "7-10 press releases per month",
            "Guest posting/blogger outreach (3-5 guest posts per month)",
            "Digital PR outreach (media mentions, publications)",
            "Listings on 4-5 business directories (Yellow Pages style)",
            "Backlink profile analysis & toxic link removal",
            "Brand mention monitoring & citation building"
        ]
    },
    {
        icon: MapPin,
        title: "Local SEO",
        items: [
            "Multi-location SEO strategy (if applicable)",
            "Google Business Profile advanced optimization (posts, Q&A, reviews)",
            "Local review generation strategy",
            "15-20 local citations (niche-specific + tier-2)",
            "Local link building (partnerships, sponsorships, local press)"
        ]
    },
    {
        icon: TrendingUp,
        title: "Paid Traffic Integration (Optional)",
        items: [
            "Keyword insights from Google Ads data",
            "PPC-SEO alignment strategy",
            "Organic traffic opportunity identification from paid search"
        ]
    },
    {
        icon: BarChart3,
        title: "Reporting & Analytics",
        items: [
            "Bi-weekly performance summary emails",
            "Monthly comprehensive report (12-15 pages, branded)",
            "Quarterly strategy call with insights + recommendations",
            "Real-time reporting dashboard (limited metrics)",
            "Competitor ranking tracking (5-7 competitors)",
            "Traffic source analysis (organic, direct, referral attribution)"
        ]
    },
    {
        icon: Settings,
        title: "Tools & Software Included",
        items: [
            "Full reporting dashboard access",
            "Google Search Console, GA4 integration",
            "Rank tracking (40-60 keywords)",
            "Competitor rank tracking (daily updates)",
            "Keyword research tool access",
            "Content brief generation tool",
            "Monthly email + quarterly call support"
        ]
    }
];

const notIncluded = [
    "Paid advertising management (PPC, Facebook Ads)",
    "Video SEO services",
    "Full CRO/conversion optimization",
    "Dedicated full-time account manager",
    "Weekly/bi-weekly calls",
    "E-commerce specific features (product schema at scale)",
    "Custom AI agents"
];

export default function PricingBusiness() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Business SEO Package - AGSEO | $1,500-$4,200/month</title>
                <meta name="description" content="Professional SEO Growth for Competitive Markets. For growing SMEs, established e-commerce, and regional services. 40-60 keywords, quarterly audits, guest posting, and advanced link building." />
                <link rel="canonical" href="https://agseo.pro/pricing/business" />
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
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="font-heading text-4xl md:text-5xl font-bold">Business</h1>
                                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                                </div>
                                <p className="text-muted-foreground">Professional SEO Growth for Competitive Markets</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="bg-card border border-primary/30 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Monthly Investment</p>
                                <p className="text-3xl font-bold font-heading text-primary">$1,500 - $4,200</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Contract Minimum</p>
                                <p className="text-xl font-semibold">6 months (12-month discount)</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Target Client</p>
                                <p className="text-xl font-semibold">Growing SMEs, established e-commerce</p>
                            </div>
                        </div>

                        <Button variant="hero" size="lg" asChild>
                            <Link to="/contact">Get Started with Business Plan</Link>
                        </Button>
                    </div>

                    {/* Includes Everything from Starter */}
                    <div className="max-w-6xl mx-auto mb-8">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-3">
                            <Check className="w-5 h-5 text-blue-400" />
                            <p className="text-sm"><span className="font-semibold">Includes everything from Starter tier</span>, plus the enhanced services below.</p>
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

                        {/* Not Included */}
                        <div className="mb-16">
                            <div className="bg-card/50 border border-border/30 rounded-2xl p-8">
                                <h3 className="font-heading text-xl font-semibold mb-6 text-center">Not Included in Business</h3>
                                <p className="text-muted-foreground text-center mb-6">
                                    These enterprise features are available in our Pro Business tier.
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {notIncluded.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                                            <span className="text-sm text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <h3 className="font-heading text-2xl font-bold mb-4">Ready to Scale Your Business?</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Get a free consultation to discuss how our Business plan can accelerate your growth in competitive markets.
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
