import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, List, MapPin, Calendar, X } from "lucide-react";
import { toast } from "sonner";

export default function KeywordMixer() {
    const { t } = useTranslation();
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
        toast.success(t("keywordMixer.controls.copied", { count: combinations.length }));
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("keywordMixer.metaTitle")}</title>
                <meta name="description" content={t("keywordMixer.metaDescription")} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t("keywordMixer.backToTools")}
                            </Link>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                {t("keywordMixer.title")}
                            </h1>
                            <p className="text-muted-foreground max-w-2xl">
                                {t("keywordMixer.subtitle")}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6 mb-8">
                            <AnimatedSection delay={100}>
                                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <List className="w-4 h-4 text-primary" />
                                            {t("keywordMixer.columns.a.label")}
                                        </label>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setColA("")}
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            disabled={!colA}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={colA}
                                        onChange={(e) => setColA(e.target.value)}
                                        placeholder={t("keywordMixer.columns.a.placeholder")}
                                        className="font-mono text-sm min-h-[250px] flex-grow resize-none"
                                    />
                                    <div className="text-xs text-muted-foreground text-right mt-2 pt-2 border-t border-border/50">
                                        {colA.split("\n").filter(x => x.trim()).length} {t("keywordMixer.columns.items")}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={200}>
                                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            {t("keywordMixer.columns.b.label")}
                                        </label>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setColB("")}
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            disabled={!colB}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={colB}
                                        onChange={(e) => setColB(e.target.value)}
                                        placeholder={t("keywordMixer.columns.b.placeholder")}
                                        className="font-mono text-sm min-h-[250px] flex-grow resize-none"
                                    />
                                    <div className="text-xs text-muted-foreground text-right mt-2 pt-2 border-t border-border/50">
                                        {colB.split("\n").filter(x => x.trim()).length} {t("keywordMixer.columns.items")}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={300}>
                                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            {t("keywordMixer.columns.c.label")}
                                        </label>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setColC("")}
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            disabled={!colC}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={colC}
                                        onChange={(e) => setColC(e.target.value)}
                                        placeholder={t("keywordMixer.columns.c.placeholder")}
                                        className="font-mono text-sm min-h-[250px] flex-grow resize-none"
                                    />
                                    <div className="text-xs text-muted-foreground text-right mt-2 pt-2 border-t border-border/50">
                                        {colC.split("\n").filter(x => x.trim()).length} {t("keywordMixer.columns.items")}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Controls & Output */}
                        <AnimatedSection delay={400} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/50 pb-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">{t("keywordMixer.controls.matchType")}</span>
                                    <div className="flex gap-2">
                                        {(["broad", "phrase", "exact"] as const).map((type) => (
                                            <Button
                                                key={type}
                                                variant={matchType === type ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setMatchType(type)}
                                                className="capitalize"
                                            >
                                                {t(`keywordMixer.controls.types.${type}`)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        <span className="font-bold text-primary">{combinations.length}</span> {t("keywordMixer.controls.results")}
                                    </div>
                                    <Button onClick={copyToClipboard} disabled={combinations.length === 0}>
                                        <Copy className="w-4 h-4 mr-2" />
                                        {t("keywordMixer.controls.copy")}
                                    </Button>
                                </div>
                            </div>

                            <Textarea
                                value={combinations.join("\n")}
                                readOnly
                                className="h-48 font-mono text-sm bg-secondary/20"
                                placeholder={t("keywordMixer.controls.placeholder")}
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
