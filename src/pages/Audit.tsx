import { useState } from "react";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function Audit() {
    const [step, setStep] = useState<"form" | "scanning" | "results">("form");
    const [formData, setFormData] = useState({ url: "", email: "", phone: "", website2: "" });
    const { toast } = useToast();
    const { t } = useTranslation();

    const pageUrl = getAbsoluteUrl("/tools/audit");

    // The simulation steps
    const toStringArray = (value: unknown): string[] => {
        if (!Array.isArray(value)) return [];

        const array = value as unknown[];
        if (!array.every((item) => typeof item === "string")) return [];

        return array as string[];
    };

    const simulationSteps = toStringArray(
        t("auditTool.scanning.steps", { returnObjects: true }) as unknown,
    );

    const nextSteps = toStringArray(
        t("auditTool.results.nextSteps", { returnObjects: true }) as unknown,
    );

    const [currentSimulationStep, setCurrentSimulationStep] = useState(0);



    const auditSchema = z.object({
        url: z.string().url({ message: "Please enter a valid URL (e.g. https://example.com)" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        phone: z.string().optional(),
        website2: z.string().optional() // honeypot
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = auditSchema.safeParse(formData);

        if (!result.success) {
            const firstError = result.error.errors[0]?.message || t("auditTool.toast.missingDescription");
            toast({
                title: t("auditTool.toast.missingTitle"),
                description: firstError,
                variant: "destructive",
            });
            return;
        }

        try {
            const phone = formData.phone.trim();
            await api.contact.submit({
                email: formData.email,
                phone: phone.length ? phone : undefined,
                website: formData.url,
                source: "audit",
                website2: formData.website2 || undefined,
            });
        } catch (error) {
            console.error("Audit submission failed:", error);
            toast({
                title: t("auditTool.toast.errorTitle"),
                description: t("auditTool.toast.errorDescription"),
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
            <Helmet>
                <title>{t("auditTool.metaTitle")}</title>
                <meta name="description" content={t("auditTool.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("auditTool.metaTitle")} />
                <meta property="og:description" content={t("auditTool.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="flex-grow pt-32 pb-16 flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {step === "form" && (
                            <AnimatedSection>
                                <div className="text-center mb-10">
                                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                                        {t("auditTool.title")}
                                    </h1>
                                    <p className="text-xl text-muted-foreground">
                                        {t("auditTool.subtitle")}
                                    </p>
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <input
                                            name="website2"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            className="absolute left-[-10000px] top-auto h-1 w-1 overflow-hidden"
                                            value={formData.website2}
                                            onChange={(e) =>
                                                setFormData({ ...formData, website2: e.target.value })
                                            }
                                        />
                                        <div className="space-y-2">
                                            <Label htmlFor="url">{t("auditTool.form.urlLabel")}</Label>
                                            <Input
                                                id="url"
                                                placeholder={t("auditTool.form.urlPlaceholder")}
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="h-12 bg-background/50"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t("auditTool.form.emailLabel")}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder={t("auditTool.form.emailPlaceholder")}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="h-12 bg-background/50"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t("auditTool.form.phoneLabel")}</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder={t("auditTool.form.phonePlaceholder")}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-12 bg-background/50"
                                            />
                                        </div>

                                        <Button type="submit" variant="hero" size="xl" className="w-full text-lg">
                                            <Search className="w-5 h-5 mr-2" />
                                            {t("auditTool.form.submitCta")}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            {t("auditTool.form.note")}
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
                                <h2 className="text-2xl font-bold mb-2">{t("auditTool.scanning.title", { url: formData.url })}</h2>
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

                                <h2 className="text-3xl font-bold mb-4 font-heading">{t("auditTool.results.title")}</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    {t("auditTool.results.receivedPrefix")} <strong>{formData.url}</strong>. {t("auditTool.results.confirmationPrefix")} <strong>{formData.email}</strong>. {t("auditTool.results.confirmationSuffix")}
                                </p>

                                <div className="bg-background/50 rounded-xl p-6 mb-8 text-left border border-border">
                                    <h4 className="font-semibold mb-2">{t("auditTool.results.nextTitle")}</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {nextSteps.map((text, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-primary">{index + 1}.</span> {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button variant="outline" size="lg" onClick={() => {
                                    setStep("form");
                                    setFormData({ url: "", email: "", phone: "", website2: "" });
                                }}>
                                    {t("auditTool.results.scanAnotherCta")}
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
