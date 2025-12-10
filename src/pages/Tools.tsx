import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Sparkles, MessageSquare, Zap, DollarSign } from "lucide-react";

const tools = [
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
        icon: Sparkles,
        title: "Keyword Mixer",
        description: "Combine seed keywords to find long-tail opportunities that competitors miss.",
        link: "#",
        action: "Coming Soon",
        isReady: false,
    },
    {
        icon: MessageSquare,
        title: "Persona Generator",
        description: "Generate detailed buyer personas based on your target audience using AI analysis.",
        link: "#",
        action: "Coming Soon",
        isReady: false,
    },
    {
        icon: Zap,
        title: "SERP Simulator",
        description: "Preview how your pages will look in Google Search and AI Overview citations.",
        link: "#",
        action: "Coming Soon",
        isReady: false,
    },
];

export default function Tools() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Free AI SEO Tools | AGSEO</title>
                <meta name="description" content="Powerful free SEO tools including AI Audit, ROI Calculator, and more. Supercharge your SEO with AI power." />
                <link rel="canonical" href="https://agseo.pro/tools" />
                <meta property="og:url" content="https://agseo.pro/tools" />
                <meta property="og:title" content="Free AI SEO Tools | AGSEO" />
                <meta property="og:description" content="Powerful free SEO tools including AI Audit, ROI Calculator, and more. Supercharge your SEO with AI power." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {tools.map((tool, index) => (
                            <AnimatedSection key={index} delay={index * 100} className="h-full">
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
