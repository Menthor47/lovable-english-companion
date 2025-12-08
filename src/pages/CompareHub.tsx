import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { comparisons } from "@/data/comparisons";
import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function CompareHub() {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>AI SEO Tool Comparisons - AGSEO</title>
                <meta name="description" content="Use AGSEO's unbiased comparison battles to find the best AI tools (Jasper, Copy.ai, Surfer) for your stack." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <Scale className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                Tool Comparisons
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            Unbiased <span className="text-primary">AI Tool Battles</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            We test every AI SEO tool so you don't have to. Find the perfect stack for your growth.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {comparisons.map((comp, index) => (
                            <AnimatedSection key={index} delay={index * 100} className="group">
                                <Link to={`/compare/${comp.slug}`} className="block h-full">
                                    <div className="h-full bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                            {comp.category}
                                        </div>

                                        <div className="flex items-center justify-between gap-4 mb-6">
                                            <div className="text-xl font-bold font-heading">{comp.toolA.name}</div>
                                            <div className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">VS</div>
                                            <div className="text-xl font-bold font-heading">{comp.toolB.name}</div>
                                        </div>

                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                            {comp.verdict.summary}
                                        </p>

                                        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            Read Comparison <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
