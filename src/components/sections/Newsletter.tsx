import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Mail, CheckCircle2, Loader2, AlertCircle, Sparkles } from "lucide-react";

interface NewsletterProps {
    className?: string;
    variant?: "inline" | "card";
}

export function Newsletter({ className = "", variant = "card" }: NewsletterProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("loading");

        try {
            const { supabase } = await import("@/lib/supabase");

            if (!supabase) {
                console.warn("[AGSEO] Supabase not configured. Demo mode.");
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStatus("success");
                setMessage("Thanks for subscribing! (Demo Mode)");
                setEmail("");
                return;
            }

            const { data, error } = await supabase.functions.invoke('contact', {
                body: {
                    email,
                    source: 'newsletter'
                }
            });

            if (error) throw error;
            if (data && !data.success) throw new Error(data.error || "Subscription failed");

            setStatus("success");
            setMessage("Thanks for subscribing!");
            setEmail("");
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    if (variant === "inline") {
        return (
            <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="flex-1"
                    aria-label="Email address for newsletter"
                />
                <Button type="submit" disabled={status === "loading" || status === "success"}>
                    {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {status === "success" ? "Subscribed!" : "Subscribe"}
                </Button>
            </form>
        );
    }

    return (
        <AnimatedSection className={className}>
            <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/5 p-8 md:p-12 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Stay Updated</span>
                    </div>

                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                        Get AI SEO Insights Weekly
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Join 2,000+ marketers receiving actionable tips on ranking in AI search engines,
                        GEO strategies, and the future of SEO.
                    </p>

                    {status === "success" ? (
                        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">{message}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === "error") setStatus("idle");
                                    }}
                                    disabled={status === "loading"}
                                    className="pl-10"
                                    aria-label="Email address for newsletter"
                                />
                            </div>
                            <Button type="submit" variant="hero" disabled={status === "loading"}>
                                {status === "loading" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    "Subscribe"
                                )}
                            </Button>
                        </form>
                    )}

                    {status === "error" && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{message}</span>
                        </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-6">
                        No spam, unsubscribe anytime. Read our{" "}
                        <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </AnimatedSection>
    );
}
