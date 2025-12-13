import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Network, MessageSquareText, Search, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function GEO() {
    const pageUrl = getAbsoluteUrl("/geo-optimization");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Generative Engine Optimization (GEO) | AGSEO</title>
                <meta name="description" content="Future-proof your rankings with Generative Engine Optimization. Optimize for AI answers from ChatGPT, Gemini, Claude and Perplexity." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="Generative Engine Optimization (GEO) | AGSEO" />
                <meta property="og:description" content="Future-proof your rankings with Generative Engine Optimization. Optimize for AI answers from ChatGPT, Gemini, Claude and Perplexity." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">

                    {/* Manifesto Hero */}
                    <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Brain className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-500 tracking-wide">
                                The New Standard
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Generative Engine Optimization <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">(GEO)</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 text-balance">
                            SEO is dead. Long live GEO. <br />
                            We don't just optimizing for 10 blue links. We optimize for the single answer given by ChatGPT, Gemini, Claude and Perplexity.
                        </p>
                    </AnimatedSection>

                    {/* Old vs New Table */}
                    <AnimatedSection className="max-w-5xl mx-auto mb-20">
                        <div className="bg-card border border-border/50 rounded-3xl overflow-hidden">
                            <div className="grid md:grid-cols-2">
                                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50 bg-background/50">
                                    <h3 className="text-2xl font-bold font-heading mb-6 text-muted-foreground">Traditional SEO</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-muted-foreground"><Search className="w-5 h-5 opacity-50" /> Keyword stuffing</li>
                                        <li className="flex items-center gap-3 text-muted-foreground"><Search className="w-5 h-5 opacity-50" /> Backlink quantity</li>
                                        <li className="flex items-center gap-3 text-muted-foreground"><Search className="w-5 h-5 opacity-50" /> "10 Blue Links" visibility</li>
                                        <li className="flex items-center gap-3 text-muted-foreground"><Search className="w-5 h-5 opacity-50" /> Click-through focus</li>
                                    </ul>
                                </div>
                                <div className="p-8 md:p-12 bg-primary/5">
                                    <h3 className="text-2xl font-bold font-heading mb-6 text-primary">AGSEO GEO</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-foreground"><Zap className="w-5 h-5 text-primary" /> Entity & Topic Authority</li>
                                        <li className="flex items-center gap-3 text-foreground"><Zap className="w-5 h-5 text-primary" /> Brand Mentions (Citations)</li>
                                        <li className="flex items-center gap-3 text-foreground"><Zap className="w-5 h-5 text-primary" /> "Direct Answer" placement</li>
                                        <li className="flex items-center gap-3 text-foreground"><Zap className="w-5 h-5 text-primary" /> Brand Trust focus</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* 4 Pillars */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                        {[
                            { icon: Network, title: "Entity Graph", desc: "We structure your brand data so AI understands WHO you are." },
                            { icon: MessageSquareText, title: "Citations", desc: "We get your brand mentioned in sources that LLMs trust." },
                            { icon: Brain, title: "Context", desc: "We create content that directly answers complex user queries." },
                            { icon: Zap, title: "Velocity", desc: "We publish at the speed of AI to signal freshness." }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="bg-card border border-border/50 p-6 rounded-2xl h-full hover:border-blue-500/50 transition-colors">
                                    <item.icon className="w-10 h-10 text-blue-500 mb-4" />
                                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center">
                        <h2 className="text-3xl font-bold font-heading mb-8">Ready to Future-Proof Your Rankings?</h2>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/#contact">Start GEO Optimization</Link>
                        </Button>
                    </AnimatedSection>

                </div>
            </main>
            <Footer />
        </div>
    );
}
