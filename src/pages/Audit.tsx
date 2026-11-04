import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, BarChart3, Globe, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { normalizeWebsiteUrl } from "@/lib/normalizeWebsiteUrl";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { GlassCard } from "@/components/ui/glass-card";

// A Firestore write never settles while offline, so give up rather than spin forever.
const SUBMIT_TIMEOUT_MS = 15000;

class SubmitTimeoutError extends Error {}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new SubmitTimeoutError("Request timed out")), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export default function Audit() {
    const [step, setStep] = useState<"form" | "results">("form");
    const [formData, setFormData] = useState({ url: "", email: "", phone: "", website2: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitLock = useRef(false);
    const { toast, dismiss } = useToast();
    const { t } = useTranslation();

    const pageUrl = getAbsoluteUrl("/tools/audit");

    const toStringArray = (value: unknown): string[] => {
        if (!Array.isArray(value)) return [];

        const array = value as unknown[];
        if (!array.every((item) => typeof item === "string")) return [];

        return array as string[];
    };

    const nextSteps = toStringArray(
        t("auditTool.results.nextSteps", { returnObjects: true }) as unknown,
    );

    const showInvalid = (description: string) => {
        toast({
            title: t("auditTool.toast.invalidTitle"),
            description,
            variant: "destructive",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // State updates aren't immediate, so a ref stops a second submit in the same tick.
        if (submitLock.current) return;

        const website = normalizeWebsiteUrl(formData.url);
        if (!website) {
            showInvalid(t("auditTool.toast.invalidUrl"));
            return;
        }

        const email = formData.email.trim();
        if (!z.string().email().safeParse(email).success) {
            showInvalid(t("auditTool.toast.invalidEmail"));
            return;
        }

        submitLock.current = true;
        setIsSubmitting(true);
        dismiss();

        try {
            const phone = formData.phone.trim();
            const result = await withTimeout(
                api.contact.submit({
                    email,
                    phone: phone.length ? phone : undefined,
                    website,
                    source: "audit",
                    website2: formData.website2 || undefined,
                }),
                SUBMIT_TIMEOUT_MS,
            );

            if (!result.success) {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Audit submission failed:", error);
            // A timed-out write can still succeed later, so don't call it a failure.
            const timedOut = error instanceof SubmitTimeoutError;
            toast({
                title: t(timedOut ? "auditTool.toast.timeoutTitle" : "auditTool.toast.errorTitle"),
                description: t(timedOut ? "auditTool.toast.timeoutDescription" : "auditTool.toast.errorDescription"),
                variant: "destructive",
            });
            return;
        } finally {
            submitLock.current = false;
            setIsSubmitting(false);
        }

        setStep("results");
    };

    return (
        <PageLayout
            title={t("auditTool.metaTitle")}
            description={t("auditTool.metaDescription")}
            canonicalUrl={pageUrl}
            ogImage={SITE_OG_IMAGE_URL}
            className="pt-32 pb-16 flex items-center justify-center relative overflow-hidden"
        >
            {/* Visual Flair Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {step === "form" && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="text-center mb-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4"
                                    >
                                        <Sparkles className="w-8 h-8" />
                                    </motion.div>
                                    <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                                        {t("auditTool.title")}
                                    </h1>
                                    <p className="text-xl text-muted-foreground">
                                        {t("auditTool.subtitle")}
                                    </p>
                                </div>

                                <GlassCard className="p-8 shadow-2xl overflow-visible border-primary/20" gradient>
                                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                                            <Label htmlFor="url" className="text-foreground/80">{t("auditTool.form.urlLabel")}</Label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <Input
                                                    id="url"
                                                    readOnly={isSubmitting}
                                                    inputMode="url"
                                                    autoComplete="url"
                                                    autoCapitalize="none"
                                                    spellCheck={false}
                                                    placeholder={t("auditTool.form.urlPlaceholder")}
                                                    value={formData.url}
                                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                    className="h-14 pl-11 bg-black/40 border-white/10 focus:border-primary/50 transition-all text-lg"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-foreground/80">{t("auditTool.form.emailLabel")}</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    readOnly={isSubmitting}
                                                    autoComplete="email"
                                                    placeholder={t("auditTool.form.emailPlaceholder")}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="h-12 bg-black/40 border-white/10 text-base"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-foreground/80">{t("auditTool.form.phoneLabel")}</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    readOnly={isSubmitting}
                                                    autoComplete="tel"
                                                    placeholder={t("auditTool.form.phonePlaceholder")}
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="h-12 bg-black/40 border-white/10 text-base"
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full text-xl h-16 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
                                            {isSubmitting ? (
                                                <Loader2 className="w-6 h-6 mr-3 animate-spin" aria-hidden="true" />
                                            ) : (
                                                <Search className="w-6 h-6 mr-3" aria-hidden="true" />
                                            )}
                                            {isSubmitting ? t("auditTool.form.submitting") : t("auditTool.form.submitCta")}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground font-medium opacity-60">
                                            {t("auditTool.form.note")}
                                        </p>
                                    </form>
                                </GlassCard>
                            </motion.div>
                        )}

                        {step === "results" && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="w-full"
                            >
                                <GlassCard className="p-10 border-green-500/30 text-center relative overflow-visible" gradient>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl animate-pulse" />
                                    </motion.div>

                                    <h2 className="text-4xl font-bold mb-4 font-heading">{t("auditTool.results.title")}</h2>
                                    <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                                        {t("auditTool.results.receivedPrefix")} <span className="text-foreground font-semibold underline decoration-primary/30 decoration-2 underline-offset-4 [overflow-wrap:anywhere]">{formData.url.trim()}</span>. {t("auditTool.results.confirmationPrefix")} <span className="text-foreground font-semibold [overflow-wrap:anywhere]">{formData.email.trim()}</span>, {t("auditTool.results.confirmationSuffix")}
                                    </p>

                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-10 text-left border border-white/10 shadow-inner group">
                                        <h4 className="font-heading text-lg font-bold mb-6 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-primary" />
                                            {t("auditTool.results.nextTitle")}
                                        </h4>
                                        <ul className="space-y-4">
                                            {nextSteps.map((text, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-muted-foreground leading-snug">{text}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <Button variant="hero" size="lg" className="px-10" asChild>
                                            <Link to="/contact">{t("services.cta")}</Link>
                                        </Button>
                                        <Button variant="ghost" size="lg" onClick={() => {
                                            setStep("form");
                                            setFormData({ url: "", email: "", phone: "", website2: "" });
                                        }}>
                                            {t("auditTool.results.requestAnotherCta")}
                                        </Button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageLayout>
    );
}
