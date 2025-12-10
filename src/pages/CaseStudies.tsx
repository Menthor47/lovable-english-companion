import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies, CaseStudy } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseStudies() {
    const [filter, setFilter] = useState("All");
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    const filteredStudies = filter === "All"
        ? caseStudies
        : caseStudies.filter(study => study.category === filter);

    const categories = ["All", "E-commerce", "SaaS", "Local Service", "Enterprise"];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Case Studies | AGSEO - AI SEO Success Stories</title>
                <meta name="description" content="See how AGSEO has transformed businesses across industries with our AI-powered SEO methodologies. Real results, measurable growth." />
                <link rel="canonical" href="https://agseo.pro/case-studies" />
                <meta property="og:url" content="https://agseo.pro/case-studies" />
                <meta property="og:title" content="Case Studies | AGSEO - AI SEO Success Stories" />
                <meta property="og:description" content="See how AGSEO has transformed businesses across industries with our AI-powered SEO methodologies. Real results, measurable growth." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            Real Results, <span className="text-primary">Powered by AI</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            See how AGSEO has transformed businesses across industries with our proprietary AI methodologies.
                        </p>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "bg-card border border-border hover:border-primary/50 text-muted-foreground"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </AnimatedSection>

                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study) => (
                                <AnimatedSection key={study.id} className="group">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                                    >
                                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 p-8 md:p-12 items-center">
                                            <div className="lg:col-span-3 space-y-6">
                                                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${study.color} ${study.bgColor}`}>
                                                    {study.category}
                                                </div>
                                                <h2 className="font-heading text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                                                    {study.title}
                                                </h2>
                                                <p className="text-lg text-muted-foreground">
                                                    {study.description}
                                                </p>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-primary h-auto text-lg group-hover:translate-x-2 transition-transform"
                                                    onClick={() => setSelectedStudy(study)}
                                                >
                                                    Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {study.stats.map((stat, i) => (
                                                        <div key={i} className={`bg-background/50 rounded-2xl p-6 text-center border border-border/50 ${i === 2 ? 'col-span-2' : ''}`}>
                                                            <div className="text-3xl font-bold font-heading mb-1 text-foreground">
                                                                {stat.value}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                                {stat.label}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </AnimatePresence>
                    </div>

                    <AnimatedSection className="mt-20 text-center bg-primary/5 rounded-3xl p-12 border border-primary/20">
                        <h2 className="text-3xl font-bold font-heading mb-4">Ready to be our next success story?</h2>
                        <p className="text-muted-foreground mb-8 text-lg">Join the hundreds of businesses growing with AGSEO.</p>
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/#contact">Get Your Free Audit</Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />

            {/* Modal */}
            <AnimatePresence>
                {selectedStudy && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedStudy(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-10"
                        >
                            <button
                                onClick={() => setSelectedStudy(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 ${selectedStudy.color} ${selectedStudy.bgColor}`}>
                                {selectedStudy.category}
                            </div>

                            <h2 className="font-heading text-3xl font-bold mb-6">
                                {selectedStudy.title}
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-primary">The Challenge</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedStudy.content.challenge}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-primary"> The AI Strategy</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedStudy.content.strategy}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-primary">The Results</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedStudy.content.results}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
                                    {selectedStudy.stats.map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-2xl font-bold font-heading text-foreground">
                                                {stat.value}
                                            </div>
                                            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full" size="lg" asChild>
                                    <Link to="/#contact" onClick={() => setSelectedStudy(null)}>
                                        Get Similar Results
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
