import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Database, FileText, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function ContentService() {
    const pageUrl = getAbsoluteUrl("/services/content");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>AI Content & Programmatic SEO | AGSEO</title>
                <meta name="description" content="Scale your content 10x faster with AI-powered programmatic SEO. Automated gap analysis, topic clustering, and human-verified content at scale." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="AI Content & Programmatic SEO | AGSEO" />
                <meta property="og:description" content="Scale your content 10x faster with AI-powered programmatic SEO. Automated gap analysis, topic clustering, and human-verified content at scale." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Bot className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                AI + Human Hybrid
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Scale Your Content <span className="text-primary">10x Faster</span> With Programmatic SEO
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                            Stop writing one blog post at a time. We use autonomous agents to identify thousands of keywords, cluster them into topics, and generate high-authority content at scale—verified by human experts.
                        </p>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/#contact">Start Your Campaign</Link>
                        </Button>
                    </AnimatedSection>

                    {/* Process Steps */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                        <AnimatedSection delay={0.1}>
                            <div className="bg-card border border-border/50 rounded-2xl p-8 h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Database className="w-24 h-24" />
                                </div>
                                <div className="text-4xl font-bold text-primary/20 mb-4">01</div>
                                <h3 className="text-xl font-bold font-heading mb-4">Automated Gap Analysis</h3>
                                <p className="text-muted-foreground">
                                    Our agents scan your competitors and the entire SERP landscape to find every single keyword opportunity you are missing. We don't guess; we calculate.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="bg-card border border-border/50 rounded-2xl p-8 h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap className="w-24 h-24" />
                                </div>
                                <div className="text-4xl font-bold text-primary/20 mb-4">02</div>
                                <h3 className="text-xl font-bold font-heading mb-4">Programmatic Clustering</h3>
                                <p className="text-muted-foreground">
                                    We group thousands of keywords into "Topic Clusters" to build massive topical authority. This signals to Google (and AI engines) that you are the expert.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="bg-card border border-border/50 rounded-2xl p-8 h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText className="w-24 h-24" />
                                </div>
                                <div className="text-4xl font-bold text-primary/20 mb-4">03</div>
                                <h3 className="text-xl font-bold font-heading mb-4">AI Gen + Human Review</h3>
                                <p className="text-muted-foreground">
                                    Our customized LLMs draft the content based on your brand voice. Then, our human editors verify facts, tone, and flow before publishing.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Comparison Table */}
                    <AnimatedSection className="max-w-4xl mx-auto bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold font-heading text-center mb-10">Why Programmatic vs Traditional?</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-muted-foreground mb-6 text-center">Traditional Agency</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-muted-foreground">
                                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 font-bold text-xs">✕</span>
                                            Slow (4-8 posts/month)
                                        </li>
                                        <li className="flex items-center gap-3 text-muted-foreground">
                                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 font-bold text-xs">✕</span>
                                            Expensive ($$$ per word)
                                        </li>
                                        <li className="flex items-center gap-3 text-muted-foreground">
                                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 font-bold text-xs">✕</span>
                                            Hit-or-miss keyword targeting
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-4 relative">
                                    {/* Divider for desktop */}
                                    <div className="hidden md:block absolute left-[-1rem] top-0 bottom-0 w-px bg-border"></div>

                                    <h3 className="text-xl font-bold text-primary mb-6 text-center">AGSEO AI Engine</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="font-medium">Massive Scale (100+ posts/month)</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="font-medium">Cost Efficient (Flat retainer)</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="font-medium">Mathematically Precise Targeting</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary/5 p-6 text-center border-t border-border">
                            <p className="text-sm text-muted-foreground mb-4">Ready to dominate your niche?</p>
                            <Button variant="outline" asChild>
                                <Link to="/tools/audit">Audit Your Content Gap Free</Link>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
