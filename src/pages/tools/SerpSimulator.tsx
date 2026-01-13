import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Monitor, Smartphone, MoreVertical } from "lucide-react";

export default function SerpSimulator() {
    const { t } = useTranslation();
    const [title, setTitle] = useState(t("serpSimulator.editor.pageTitle.default"));
    const [description, setDescription] = useState(t("serpSimulator.editor.metaDescription.default"));
    const [url, setUrl] = useState(t("serpSimulator.editor.url.default"));
    const [isMobile, setIsMobile] = useState(false);

    // Approximate pixel width calculation (simplified)
    const titleWidth = title.length * 9;
    const descWidth = description.length * 7;

    // Limits
    const MAX_TITLE_WIDTH = 580;
    const MAX_DESC_WIDTH = 920;

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("serpSimulator.metaTitle")}</title>
                <meta name="description" content={t("serpSimulator.metaDescription")} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <Link to="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t("serpSimulator.backToTools")}
                            </Link>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                {t("serpSimulator.title")}
                            </h1>
                            <p className="text-muted-foreground">
                                {t("serpSimulator.subtitle")}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Editor */}
                            <AnimatedSection className="space-y-6">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                                    <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                                        <Search className="w-5 h-5 text-primary" />
                                        {t("serpSimulator.editor.title")}
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t("serpSimulator.editor.pageTitle.label")}</label>
                                            <Input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder={t("serpSimulator.editor.pageTitle.placeholder")}
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>{title.length} chars</span>
                                                <span className={titleWidth > MAX_TITLE_WIDTH ? "text-destructive" : "text-green-500"}>
                                                    ~{titleWidth}px / {MAX_TITLE_WIDTH}px
                                                </span>
                                            </div>
                                            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${titleWidth > MAX_TITLE_WIDTH ? "bg-destructive" : "bg-primary"}`}
                                                    style={{ width: `${Math.min((titleWidth / MAX_TITLE_WIDTH) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t("serpSimulator.editor.metaDescription.label")}</label>
                                            <Textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder={t("serpSimulator.editor.metaDescription.placeholder")}
                                                className="h-24 resize-none"
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>{description.length} chars</span>
                                                <span className={descWidth > MAX_DESC_WIDTH ? "text-destructive" : "text-green-500"}>
                                                    ~{descWidth}px / {MAX_DESC_WIDTH}px
                                                </span>
                                            </div>
                                            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${descWidth > MAX_DESC_WIDTH ? "bg-destructive" : "bg-primary"}`}
                                                    style={{ width: `${Math.min((descWidth / MAX_DESC_WIDTH) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t("serpSimulator.editor.url.label")}</label>
                                            <Input
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder={t("serpSimulator.editor.url.placeholder")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Preview */}
                            <AnimatedSection delay={200}>
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm h-full">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-bold text-xl flex items-center gap-2">
                                            {t("serpSimulator.preview.title")}
                                            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t("serpSimulator.preview.live")}</span>
                                        </h2>
                                        <div className="flex bg-secondary p-1 rounded-lg">
                                            <button
                                                onClick={() => setIsMobile(false)}
                                                className={`p-1.5 rounded-md transition-all ${!isMobile ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                                title={t("serpSimulator.preview.desktopStart")}
                                            >
                                                <Monitor className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setIsMobile(true)}
                                                className={`p-1.5 rounded-md transition-all ${isMobile ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                                                title={t("serpSimulator.preview.mobileStart")}
                                            >
                                                <Smartphone className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Google SERP Container */}
                                    <div className="bg-white p-4 rounded-xl shadow-inner min-h-[300px] overflow-x-auto">
                                        <div className={`mx-auto ${isMobile ? "max-w-[375px]" : "w-full"}`}>
                                            <div className="font-sans text-left">
                                                {/* URL Row */}
                                                <div className="flex items-center gap-2 mb-1 group cursor-pointer">
                                                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                                                        <OptimizedImage
                                                            src={`https://www.google.com/s2/favicons?domain=${url.startsWith('http') ? new URL(url).hostname : url}`}
                                                            alt="Favicon"
                                                            className="w-4 h-4 opacity-60"
                                                            onError={(e: any) => {
                                                                // Fallback to generic icon if favicon fails
                                                                e.target.src = "https://www.google.com/s2/favicons?domain=google.com";
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col leading-tight">
                                                        <span className="text-sm text-[#202124]">{new URL(url.startsWith('http') ? url : `https://${url}`).hostname}</span>
                                                        <span className="text-xs text-[#5f6368] truncate max-w-[200px]">{url}</span>
                                                    </div>
                                                    <MoreVertical className="w-4 h-4 text-[#5f6368] ml-auto opacity-0 group-hover:opacity-100" />
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate mb-1 leading-snug font-medium">
                                                    {title || "Example Title"}
                                                </h3>

                                                {/* Description */}
                                                <div className="text-sm text-[#4d5156] leading-normal break-words">
                                                    {description || "Example description text..."}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                        <h4 className="font-bold text-sm mb-2 text-primary">{t("serpSimulator.preview.optimizationTips.title")}</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                            {(t("serpSimulator.preview.optimizationTips.items", { returnObjects: true }) as string[]).map((tip, index) => (
                                                <li key={index}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
