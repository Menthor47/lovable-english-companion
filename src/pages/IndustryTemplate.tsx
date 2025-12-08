import { useParams, Link, Navigate } from "react-router-dom";
import { industries } from "@/data/industries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BarChart, Zap, Target } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function IndustryTemplate() {
    const { slug } = useParams();
    const industry = industries.find((i) => i.id === slug);

    if (!industry) {
        return <Navigate to="/404" replace />;
    }

    const HeroIcon = industry.hero.icon;

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>AI SEO for {industry.hero.title} Companies - AGSEO</title>
                <meta name="description" content={`Dominate the ${industry.hero.title} market with specialized AI SEO strategies. See our case studies and solutions for your vertical.`} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                            <HeroIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide">
                                for {industry.hero.title}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {industry.hero.headline}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {industry.hero.subheadline}
                        </p>
                        <Button variant="hero" size="lg" asChild>
                            <Link to="/#contact">
                                {industry.hero.cta}
                            </Link>
                        </Button>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <AnimatedSection delay={0.1}>
                            <h2 className="font-heading text-3xl font-bold mb-6">Why Traditional SEO Fails for {industry.hero.title}</h2>
                            <ul className="space-y-4">
                                {industry.challenges.map((challenge, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="mt-1 p-1 rounded-full bg-red-500/10 text-red-500">
                                            <Zap className="w-3 h-3" />
                                        </div>
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2} className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="font-bold text-xl mb-6">Our AI-Driven Solution</h3>
                            <ul className="space-y-4">
                                {industry.solutions.map((solution, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="mt-1 p-1 rounded-full bg-green-500/10 text-green-500">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>{solution}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection className="grid md:grid-cols-3 gap-6 mb-24 text-center">
                        {Object.entries(industry.metrics).map(([key, value], i) => (
                            <div key={i} className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                                <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                                <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                        ))}
                    </AnimatedSection>

                    <AnimatedSection className="text-center bg-gradient-to-br from-primary/10 via-background to-background rounded-3xl p-12 border border-primary/20">
                        <h2 className="font-heading text-3xl font-bold mb-6">Ready to dominate the {industry.hero.title} market?</h2>
                        <Button variant="hero" size="lg" asChild>
                            <Link to="/#contact">
                                Book Your {industry.hero.title} Strategy Call
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </div>
    );
}
