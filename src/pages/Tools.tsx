import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Sparkles, MessageSquare, Zap, DollarSign, LayoutDashboard, type LucideIcon } from "lucide-react";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

type ToolCard = {
    icon: LucideIcon;
    title: string;
    description: string;
    link: string;
    action: string;
    isReady: boolean;
};

const tools: ToolCard[] = [
    {
        icon: Search,
        title: "Instant AI Audit",
        description: "See how your site appears to AI engines like ChatGPT and Gemini. Get a free score and actionable tips.",
        link: "/tools/audit",
        action: "Scan Now",
        isReady: true,
    },
    {
        icon: DollarSign,
        title: "ROI Calculator",
        description: "Project your potential revenue growth with AI-driven SEO.",
        link: "/tools/roi-calculator",
        action: "Calculate Revenue",
        isReady: true,
    },
    {
        icon: LayoutDashboard,
        title: "Visibility Dashboard Demo",
        description: "Preview a clean client dashboard view for rankings, traffic, and next steps — with illustrative sample data.",
        link: "/dashboard",
        action: "Open Dashboard",
        isReady: true,
    },
    {
        icon: Sparkles,
        title: "Keyword Mixer",
        description: "Combine seed keywords to find long-tail opportunities that competitors miss.",
        link: "/tools/keyword-mixer",
        action: "Launch Tool",
        isReady: true,
    },
    {
        icon: MessageSquare,
        title: "Schema Generator",
        description: "Generate JSON-LD markup for FAQs and Articles to win rich results.",
        link: "/tools/schema-generator",
        action: "Launch Tool",
        isReady: true,
    },
    {
        icon: Zap,
        title: "SERP Simulator",
        description: "Preview how your pages will look in Google Search and AI Overview citations.",
        link: "/tools/serp-simulator",
        action: "Launch Tool",
        isReady: true,
    },
];

export default function Tools() {
    const pageUrl = getAbsoluteUrl("/tools");
    const FeaturedIcon = tools[0].icon;

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Free AI SEO Tools | AGSEO</title>
                <meta name="description" content="Powerful free SEO tools including AI Audit, ROI Calculator, and more. Supercharge your SEO with AI power." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="Free AI SEO Tools | AGSEO" />
                <meta property="og:description" content="Powerful free SEO tools including AI Audit, ROI Calculator, and more. Supercharge your SEO with AI power." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main id="main" className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                Free AI SEO Tools
                            </span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Supercharge your SEO with <span className="text-primary">AI Power</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Powerful tools to help you dominate both traditional search and the new wave of AI engines.
                        </p>
                    </AnimatedSection>

                    {/* Featured Tool */}
                    <AnimatedSection className="mb-16">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card to-background border border-primary/20 shadow-2xl hover:shadow-primary/10 transition-shadow duration-500 group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
                                        <FeaturedIcon className="w-10 h-10" />
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                                        {tools[0].title}
                                    </h2>
                                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                                        {tools[0].description}
                                    </p>

                                    <Button variant="hero" size="lg" className="h-14 px-10 text-lg w-full sm:w-auto" asChild>
                                        <Link to={tools[0].link}>
                                            <Sparkles className="mr-2 w-5 h-5" />
                                            {tools[0].action}
                                        </Link>
                                    </Button>

                                    <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-border border-2 border-background" />
                                            ))}
                                        </div>
                                        <span>Join 1,000+ marketers optimizing with AI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Remaining Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {tools.slice(1).map((tool, index) => (
                            <AnimatedSection key={index} delay={index * 0.1} className="h-full">
                                <div className="h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <tool.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold font-heading mb-3">{tool.title}</h3>
                                    <p className="text-muted-foreground mb-8 flex-grow">
                                        {tool.description}
                                    </p>

                                    {tool.isReady ? (
                                        <Button variant="hero" size="lg" className="w-full" asChild>
                                            <Link to={tool.link}>
                                                {tool.action}
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="lg" className="w-full opacity-50 cursor-not-allowed" disabled>
                                            {tool.action}
                                        </Button>
                                    )}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
