import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

export default function ROICalculator() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize from URL or defaults
    const [traffic, setTraffic] = useState([parseInt(searchParams.get("traffic") || "5000")]);
    const [conversionRate, setConversionRate] = useState([parseFloat(searchParams.get("conv") || "2")]);
    const [orderValue, setOrderValue] = useState([parseInt(searchParams.get("aov") || "150")]);

    const [currentRevenue, setCurrentRevenue] = useState(0);
    const [projectedRevenue, setProjectedRevenue] = useState(0);
    const [increase, setIncrease] = useState(0);

    // Sync URL with state
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("traffic", traffic[0].toString());
        params.set("conv", conversionRate[0].toString());
        params.set("aov", orderValue[0].toString());
        setSearchParams(params, { replace: true });
    }, [traffic, conversionRate, orderValue, setSearchParams, searchParams]);

    useEffect(() => {
        // Current Monthly Revenue = Traffic * (Conv Rate / 100) * Order Value
        const current = traffic[0] * (conversionRate[0] / 100) * orderValue[0];

        // Projected: Industry benchmark model assuming strong SEO execution
        // Traffic multiplier based on competitive keyword capture potential
        // Conversion improvement from better intent-targeting
        const projectedTraffic = traffic[0] * 2.5;
        const projectedConv = conversionRate[0] * 1.2;
        const projected = projectedTraffic * (projectedConv / 100) * orderValue[0];

        setCurrentRevenue(Math.round(current));
        setProjectedRevenue(Math.round(projected));
        setIncrease(Math.round(projected - current));
    }, [traffic, conversionRate, orderValue]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(val);
    };

    const pageUrl = getAbsoluteUrl("/tools/roi-calculator");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{t("roiCalculator.metaTitle")}</title>
                <meta name="description" content={t("roiCalculator.metaDescription")} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={t("roiCalculator.metaTitle")} />
                <meta property="og:description" content={t("roiCalculator.metaDescription")} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            {t("roiCalculator.titlePrefix")} <span className="text-primary">{t("roiCalculator.titleSuffix")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {t("roiCalculator.subtitle")}
                        </p>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                        {/* Input Section */}
                        <AnimatedSection className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <Users className="w-4 h-4 text-primary" /> {t("roiCalculator.inputs.traffic.label")}
                                        </label>
                                        <span className="font-bold text-lg">{traffic[0].toLocaleString()}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[5000]}
                                        max={100000}
                                        step={500}
                                        value={traffic}
                                        onValueChange={setTraffic}
                                        className="py-4"
                                    />
                                    <p className="text-xs text-muted-foreground">{t("roiCalculator.inputs.traffic.helper")}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-primary" /> {t("roiCalculator.inputs.conversion.label")}
                                        </label>
                                        <span className="font-bold text-lg">{conversionRate[0]}%</span>
                                    </div>
                                    <Slider
                                        defaultValue={[2]}
                                        max={10}
                                        step={0.1}
                                        value={conversionRate}
                                        onValueChange={setConversionRate}
                                        className="py-4"
                                    />
                                    <p className="text-xs text-muted-foreground">{t("roiCalculator.inputs.conversion.helper")}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-primary" /> {t("roiCalculator.inputs.orderValue.label")}
                                        </label>
                                        <span className="font-bold text-lg">${orderValue[0]}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[150]}
                                        max={2000}
                                        step={10}
                                        value={orderValue}
                                        onValueChange={setOrderValue}
                                        className="py-4"
                                    />
                                    <p className="text-xs text-muted-foreground">{t("roiCalculator.inputs.orderValue.helper")}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Result Section */}
                        <AnimatedSection delay={0.2} className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                                <h3 className="text-2xl font-bold text-center mb-8">{t("roiCalculator.results.title")}</h3>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center p-4 rounded-lg bg-background/50 border border-border/50">
                                        <span className="text-muted-foreground">{t("roiCalculator.results.current")}</span>
                                        <span className="text-2xl font-bold font-mono">{formatCurrency(currentRevenue)}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-6 rounded-xl bg-primary/10 border border-primary/20">
                                        <span className="font-heading font-bold text-primary">{t("roiCalculator.results.projected")}</span>
                                        <span className="text-4xl font-bold font-mono text-primary">{formatCurrency(projectedRevenue)}</span>
                                    </div>

                                    <div className="text-center">
                                        <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-bold">
                                            +{formatCurrency(increase)} {t("roiCalculator.results.growth")}
                                        </span>
                                    </div>
                                </div>

                                {/* Chart Visualization */}
                                <div className="h-[250px] w-full mb-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { name: t("roiCalculator.results.chart.now"), revenue: currentRevenue },
                                                { name: t("roiCalculator.results.chart.projected"), revenue: projectedRevenue }
                                            ]}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                            />
                                            <Tooltip
                                                cursor={{ fill: "hsl(var(--primary)/0.1)" }}
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    borderColor: "hsl(var(--border))",
                                                    borderRadius: "8px"
                                                }}
                                                formatter={(value: number) => [formatCurrency(value), t("roiCalculator.results.chart.revenue")]}
                                            />
                                            <Bar
                                                dataKey="revenue"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                                barSize={60}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button variant="hero" size="xl" className="flex-1" asChild>
                                            <Link to="/#contact">
                                                {t("roiCalculator.results.cta")} <ArrowRight className="ml-2 w-5 h-5" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="xl"
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                toast({
                                                    title: t("blog.share.title") || "Link copied!",
                                                    description: t("blog.share.description") || "Calculator state saved in URL.",
                                                });
                                            }}
                                            className="sm:w-auto"
                                        >
                                            <Share2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground">
                                        {t("roiCalculator.results.disclaimer")}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
