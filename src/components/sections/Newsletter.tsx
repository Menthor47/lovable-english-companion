import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Mail, CheckCircle2, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsletterProps {
    className?: string;
    variant?: "inline" | "card";
}

export function Newsletter({ className = "", variant = "card" }: NewsletterProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage(t("newsletter.errorInvalid"));
            return;
        }

        setStatus("loading");

        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            if (!supabaseUrl || !supabaseAnonKey) {
                console.warn("[AGSEO] Supabase not configured. Demo mode.");
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStatus("success");
                setMessage(t("newsletter.success"));
                setEmail("");
                return;
            }

            const response = await fetch(`${supabaseUrl}/functions/v1/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseAnonKey}`,
                    'apikey': supabaseAnonKey
                },
                body: JSON.stringify({
                    email,
                    source: 'newsletter'
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const serverError = errorData.error || "";

                // Handle already subscribed (409 Conflict)
                if (response.status === 409 || serverError.toLowerCase().includes("duplicate key")) {
                    throw new Error("ALREADY_SUBSCRIBED");
                }

                throw new Error(serverError || `HTTP error! status: ${response.status}`);
            }

            setStatus("success");
            setMessage(t("newsletter.success"));
            setEmail("");
        } catch (error: unknown) {
            setStatus("error");
            if (error instanceof Error) {
                if (error.message === "ALREADY_SUBSCRIBED") {
                    setMessage(t("newsletter.errorAlreadySubscribed"));
                } else {
                    setMessage(error.message);
                }
            } else {
                setMessage(t("newsletter.errorGeneral"));
            }
        }
    };

    if (variant === "inline") {
        return (
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
                <div className="flex gap-2">
                    <Input
                        type="email"
                        placeholder={t("newsletter.placeholder")}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                        }}
                        disabled={status === "loading" || status === "success"}
                        className="flex-1 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                        aria-label={t("newsletter.placeholder")}
                    />
                    <Button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="whitespace-nowrap"
                    >
                        {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {status === "success" ? t("newsletter.subscribed") : t("newsletter.button")}
                    </Button>
                </div>
                {status === "error" && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {message}
                    </p>
                )}
            </form>
        );
    }

    return (
        <AnimatedSection className={className}>
            <div className="relative rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-white/10">
                {/* Background decoration */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 group hover:bg-primary/20 transition-colors">
                        <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-primary uppercase tracking-wider">
                            {t("newsletter.badge")}
                        </span>
                    </div>

                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                        {t("newsletter.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 text-balance">
                        {t("newsletter.subtitle")}
                    </p>

                    {status === "success" ? (
                        <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 animate-in zoom-in duration-300">
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-lg font-medium">{message}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative group">
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="email"
                                    placeholder={t("newsletter.placeholder")}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === "error") setStatus("idle");
                                    }}
                                    disabled={status === "loading"}
                                    className="pl-12 py-6 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 text-lg rounded-xl shadow-inner transition-all sm:min-w-[300px]"
                                    aria-label={t("newsletter.placeholder")}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="hero"
                                size="lg"
                                disabled={status === "loading"}
                                className="py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold min-w-[140px]"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    t("newsletter.button")
                                )}
                            </Button>
                        </form>
                    )}

                    {status === "error" && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-red-500 text-sm animate-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{message}</span>
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-8 opacity-70">
                        {t("newsletter.privacyPrefix")}
                        <Link to="/privacy" className="underline hover:text-primary transition-colors decoration-primary/30 underline-offset-4">
                            {t("newsletter.privacyLink")}
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </AnimatedSection>
    );
}
