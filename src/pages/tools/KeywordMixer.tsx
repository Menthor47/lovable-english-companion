import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function KeywordMixer() {
    const [colA, setColA] = useState("");
    const [colB, setColB] = useState("");
    const [colC, setColC] = useState("");
    const [matchType, setMatchType] = useState<"broad" | "phrase" | "exact">("broad");

    const combinations = useMemo(() => {
        const listA = colA.split("\n").filter(x => x.trim());
        const listB = colB.split("\n").filter(x => x.trim());
        const listC = colC.split("\n").filter(x => x.trim());

        // If lists are empty, just use empty string to allow mixing active columns
        const A = listA.length ? listA : [""];
        const B = listB.length ? listB : [""];
        const C = listC.length ? listC : [""];

        const results: string[] = [];

        A.forEach(a => {
            B.forEach(b => {
                C.forEach(c => {
                    const raw = `${a} ${b} ${c}`.trim().replace(/\s+/g, " ");
                    if (raw) {
                        if (matchType === "exact") results.push(`[${raw}]`);
                        else if (matchType === "phrase") results.push(`"${raw}"`);
                        else results.push(raw);
                    }
                });
            });
        });

        return results;
    }, [colA, colB, colC, matchType]);

    const copyToClipboard = () => {
        if (combinations.length === 0) return;
        navigator.clipboard.writeText(combinations.join("\n"));
        toast.success(`Copied ${combinations.length} keywords`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Free Keyword Mixer | AGSEO</title>
                <meta name="description" content="Combine multiple lists of keywords to discover long-tail opportunities. Perfect for PPC campaigns and programmatic SEO." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Tools
                            </Link>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Keyword Mixer
                            </h1>
                            <p className="text-muted-foreground max-w-2xl">
                                Combine columns of words to generate hundreds of long-tail variations in seconds.
                                Great for "City + Service" or "Action + Product" permutations.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6 mb-8">
                            <AnimatedSection delay={100}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Column A (e.g. Services)</label>
                                    <Textarea
                                        value={colA}
                                        onChange={(e) => setColA(e.target.value)}
                                        placeholder={`SEO Audit\nWeb Design\nContent Writing`}
                                        className="h-64 font-mono text-sm"
                                    />
                                    <div className="text-xs text-muted-foreground text-right">{colA.split("\n").filter(x => x.trim()).length} items</div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={200}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Column B (e.g. Locations / Modifiers)</label>
                                    <Textarea
                                        value={colB}
                                        onChange={(e) => setColB(e.target.value)}
                                        placeholder={`in New York\nAgency\nCompany\nnear me`}
                                        className="h-64 font-mono text-sm"
                                    />
                                    <div className="text-xs text-muted-foreground text-right">{colB.split("\n").filter(x => x.trim()).length} items</div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={300}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Column C (Optional)</label>
                                    <Textarea
                                        value={colC}
                                        onChange={(e) => setColC(e.target.value)}
                                        placeholder={`2025\nBest\nAffordable`}
                                        className="h-64 font-mono text-sm"
                                    />
                                    <div className="text-xs text-muted-foreground text-right">{colC.split("\n").filter(x => x.trim()).length} items</div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Controls & Output */}
                        <AnimatedSection delay={400} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/50 pb-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">Match Type:</span>
                                    <div className="flex gap-2">
                                        {(["broad", "phrase", "exact"] as const).map((type) => (
                                            <Button
                                                key={type}
                                                variant={matchType === type ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setMatchType(type)}
                                                className="capitalize"
                                            >
                                                {type}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        <span className="font-bold text-primary">{combinations.length}</span> results
                                    </div>
                                    <Button onClick={copyToClipboard} disabled={combinations.length === 0}>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy List
                                    </Button>
                                </div>
                            </div>

                            <Textarea
                                value={combinations.join("\n")}
                                readOnly
                                className="h-48 font-mono text-sm bg-secondary/20"
                                placeholder="Generated keywords will appear here..."
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
