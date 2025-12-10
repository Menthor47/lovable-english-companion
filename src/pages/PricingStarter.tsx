import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, ArrowLeft, Target, FileText, Wrench, PenTool, Link2, MapPin, BarChart3, Settings } from "lucide-react";
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
            "Initial SEO strategy session (1x onboarding call)",
            "Keyword research: 15-20 target keywords",
            "Basic competitor analysis (top 3 competitors)",
            "Niche/market positioning document"
        ]
    },
    {
        icon: FileText,
        title: "On-Page Optimization",
        items: [
            "2-3 pages optimized per month (meta titles, descriptions, H1/H2 tags, alt text)",
            "Internal linking strategy for optimized pages",
            "Basic schema markup (Organization, LocalBusiness, Product)",
            "Content optimization guidance (word count, keyword density, readability)"
        ]
    },
    {
        icon: Wrench,
        title: "Technical SEO",
        items: [
            "One-time technical audit (initial month)",
            "Basic crawl analysis (broken links, redirects, XML sitemap)",
            "Mobile responsiveness check",
            "Core Web Vitals monitoring (basic)",
            "SSL/HTTPS verification",
            "robots.txt & sitemap optimization"
        ]
    },
    {
        icon: PenTool,
        title: "Content Production",
        items: [
            "1 blog article per month (800-1,200 words, keyword-optimized)",
            "Content calendar planning (monthly)",
            "Basic copywriting for service/product pages"
        ]
    },
    {
        icon: Link2,
        title: "Link Building & Off-Page",
        items: [
            "2-3 press releases per month",
            "Basic local citations (5-7 directories: Google Business, Yelp, Facebook)",
            "NAP (Name, Address, Phone) consistency audit",
            "Social media optimization basics"
        ]
    },
    {
        icon: MapPin,
        title: "Local SEO",
        items: [
            "Google Business Profile setup/optimization",
            "5-7 local directory listings",
            "Local review monitoring (basic)",
            "Local keyword targeting (city/region level)"
        ]
    },
    {
        icon: BarChart3,
        title: "Reporting & Analytics",
        items: [
            "Monthly performance report (PDF, 5-8 pages)",
            "Key metrics: rankings, organic traffic, clicks, impressions, CTR",
            "Google Search Console & Analytics setup/access",
            "Basic month-over-month comparison"
        ]
    },
    {
        icon: Settings,
        title: "Tools & Software Included",
        items: [
            "Access to shared reporting dashboard",
            "Google Search Console access",
            "Basic rank tracking (limited keywords)",
            "Monthly email support"
        ]
    }
];

const notIncluded = [
    "Link building campaigns (active outreach)",
    "PPC management",
    "Video SEO",
    "CRO/conversion optimization",
    "Dedicated account manager",
    "Weekly calls",
    "Advanced technical SEO (Core Web Vitals optimization, JS rendering)",
    "AI agent development"
];

export default function PricingStarter() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Starter SEO Package - AGSEO | $470-$1,200/month</title>
                <meta name="description" content="SEO Foundation for Growing Businesses. Perfect for local businesses, startups, and solopreneurs. 15-20 keywords, technical audit, content creation, and local SEO." />
                <link rel="canonical" href="https://agseo.pro/pricing/starter" />
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
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                <Shield className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <h1 className="font-heading text-4xl md:text-5xl font-bold">Starter</h1>
                                <p className="text-muted-foreground">SEO Foundation for Growing Businesses</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Monthly Investment</p>
                                <p className="text-3xl font-bold font-heading text-primary">$470 - $1,200</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Contract Minimum</p>
                                <p className="text-xl font-semibold">3-6 months</p>
                            </div>
                            <div className="bg-card border border-border/50 rounded-xl px-6 py-4">
                                <p className="text-sm text-muted-foreground mb-1">Target Client</p>
                                <p className="text-xl font-semibold">Local businesses, startups, solopreneurs</p>
                            </div>
                        </div>

                        <Button variant="hero" size="lg" asChild>
                            <Link to="/contact">Get Started with Starter Plan</Link>
                        </Button>
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
                        <div className="bg-card/50 border border-border/30 rounded-2xl p-8 mb-16">
                            <h3 className="font-heading text-xl font-semibold mb-6 text-center">Not Included in Starter</h3>
                            <p className="text-muted-foreground text-center mb-6">
                                These advanced features are available in our Business and Pro Business tiers.
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

                        {/* CTA */}
                        <div className="mt-16 text-center">
                            <h3 className="font-heading text-2xl font-bold mb-4">Ready to Start Growing?</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Get a free consultation to discuss how our Starter plan can help your business establish a strong SEO foundation.
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
