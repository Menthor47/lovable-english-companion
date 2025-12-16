import { AnimatedSection } from "@/components/ui/animated-section";
import { Search, Brain, BarChart, FileCheck } from "lucide-react";

export function ComparisonsMethodology() {
    return (
        <section className="py-16 bg-card/30 border-y border-border/50">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                        How we test AI tools
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We don't just read the landing page. We run every tool through a standardized 4-step battle test to see how it handles real SEO workflows.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: Search,
                            title: "1. Keyword Discovery",
                            desc: "We test if the tool finds low-competition, high-value keywords or just generic volume."
                        },
                        {
                            icon: Brain,
                            title: "2. Content Generation",
                            desc: "We generate 10+ articles to test hallucination rates, tone, and formatting quality."
                        },
                        {
                            icon: BarChart,
                            title: "3. Optimization Score",
                            desc: "We verify if '100/100' optimized content actually ranks or if it's keyword stuffed."
                        },
                        {
                            icon: FileCheck,
                            title: "4. Fact Verification",
                            desc: "We check if the tool cites real sources or invents data points."
                        }
                    ].map((step, i) => (
                        <AnimatedSection key={i} delay={i * 0.1} className="relative">
                            <div className="bg-background/50 border border-border/50 rounded-2xl p-6 h-full hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
