import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Audit() {
    const [step, setStep] = useState<"form" | "scanning" | "results">("form");
    const [formData, setFormData] = useState({ url: "", email: "" });
    const { toast } = useToast();

    // The simulation steps
    const simulationSteps = [
        "Analyzing Technical Architecture...",
        "Scanning for Schema Markup...",
        "Evaluating Entity Graph Connections...",
        "Checking LLM Citation Sources...",
        "Generating AI Readability Score...",
    ];

    const [currentSimulationStep, setCurrentSimulationStep] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.url || !formData.email) {
            toast({
                title: "Missing Information",
                description: "Please enter both a website URL and your email address.",
                variant: "destructive",
            });
            return;
        }

        setStep("scanning");
        setCurrentSimulationStep(0);

        // Simulate scanning process
        let stepCount = 0;
        const interval = setInterval(() => {
            stepCount++;
            if (stepCount < simulationSteps.length) {
                setCurrentSimulationStep(stepCount);
            } else {
                clearInterval(interval);
                setStep("results");
            }
        }, 800); // Change step every 800ms
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {step === "form" && (
                            <AnimatedSection>
                                <div className="text-center mb-10">
                                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                                        Instant AI SEO Audit
                                    </h1>
                                    <p className="text-xl text-muted-foreground">
                                        Discover how visible your brand is on Google, ChatGPT, and Gemini.
                                    </p>
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="url">Website URL</Label>
                                            <Input
                                                id="url"
                                                placeholder="https://example.com"
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="h-12 bg-background/50"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-12 bg-background/50"
                                            />
                                        </div>

                                        <Button type="submit" variant="hero" size="xl" className="w-full text-lg">
                                            <Search className="w-5 h-5 mr-2" />
                                            Scan My Website
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            We'll email you a comprehensive report within 5 minutes.
                                        </p>
                                    </form>
                                </div>
                            </AnimatedSection>
                        )}

                        {step === "scanning" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-8">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    <Search className="absolute inset-0 m-auto text-primary w-8 h-8 animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Analyzing {formData.url}...</h2>
                                <p className="text-muted-foreground text-lg animate-pulse">
                                    {simulationSteps[currentSimulationStep]}
                                </p>
                            </motion.div>
                        )}

                        {step === "results" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card border border-green-500/30 rounded-2xl p-8 shadow-xl text-center"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>

                                <h2 className="text-3xl font-bold mb-4 font-heading">Audit Queued!</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Your website <strong>{formData.url}</strong> is currently being analyzed by our AI agents. The full report will be sent to <strong>{formData.email}</strong> shortly.
                                </p>

                                <div className="bg-background/50 rounded-xl p-6 mb-8 text-left border border-border">
                                    <h4 className="font-semibold mb-2">What happens next?</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">1.</span> We scan your top 100 pages.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">2.</span> We evaluate Entity Graph connections.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary">3.</span> You get a PDF report with score & strategy.
                                        </li>
                                    </ul>
                                </div>

                                <Button variant="outline" size="lg" onClick={() => {
                                    setStep("form");
                                    setFormData({ url: "", email: "" });
                                }}>
                                    Scan Another Website
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
