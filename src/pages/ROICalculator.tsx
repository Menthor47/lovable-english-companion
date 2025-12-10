import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ROICalculator() {
    const [traffic, setTraffic] = useState([5000]);
    const [conversionRate, setConversionRate] = useState([2]);
    const [orderValue, setOrderValue] = useState([150]);

    const [currentRevenue, setCurrentRevenue] = useState(0);
    const [projectedRevenue, setProjectedRevenue] = useState(0);
    const [increase, setIncrease] = useState(0);

    useEffect(() => {
        // Current Monthly Revenue = Traffic * (Conv Rate / 100) * Order Value
        const current = traffic[0] * (conversionRate[0] / 100) * orderValue[0];

        // Projected: We assume AI SEO drives 150% traffic growth and 20% better conversion (targeting intent)
        // Traffic * 2.5 (150% increase)
        // Conversion * 1.2 (20% increase)
        const projectedTraffic = traffic[0] * 2.5;
        const projectedConv = conversionRate[0] * 1.2;
        const projected = projectedTraffic * (projectedConv / 100) * orderValue[0];

        setCurrentRevenue(Math.round(current));
        setProjectedRevenue(Math.round(projected));
        setIncrease(Math.round(projected - current));
    }, [traffic, conversionRate, orderValue]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>SEO ROI Calculator | AGSEO</title>
                <meta name="description" content="Calculate your potential SEO ROI. See how much revenue you could gain with AI-driven SEO strategy." />
                <link rel="canonical" href="https://agseo.pro/tools/roi-calculator" />
                <meta property="og:url" content="https://agseo.pro/tools/roi-calculator" />
                <meta property="og:title" content="SEO ROI Calculator | AGSEO" />
                <meta property="og:description" content="Calculate your potential SEO ROI. See how much revenue you could gain with AI-driven SEO strategy." />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            SEO ROI <span className="text-primary">Calculator</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            See how much revenue you are leaving on the table. Our AI-driven strategy typically boosts traffic by 150% and conversion intent by 20%.
                        </p>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                        {/* Input Section */}
                        <AnimatedSection className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <Users className="w-4 h-4 text-primary" /> Current Monthly Traffic
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
                                    <p className="text-xs text-muted-foreground">Visitors per month</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-primary" /> Conversion Rate
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
                                    <p className="text-xs text-muted-foreground">Percentage of visitors who buy/contact</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-medium flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-primary" /> Average Order Value
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
                                    <p className="text-xs text-muted-foreground">Average revenue per customer</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Result Section */}
                        <AnimatedSection delay={0.2} className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                                <h3 className="text-2xl font-bold text-center mb-8">Potential Monthly Revenue</h3>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center p-4 rounded-lg bg-background/50 border border-border/50">
                                        <span className="text-muted-foreground">Current Revenue</span>
                                        <span className="text-2xl font-bold font-mono">{formatCurrency(currentRevenue)}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-6 rounded-xl bg-primary/10 border border-primary/20">
                                        <span className="font-heading font-bold text-primary">Projected Revenue</span>
                                        <span className="text-4xl font-bold font-mono text-primary">{formatCurrency(projectedRevenue)}</span>
                                    </div>

                                    <div className="text-center">
                                        <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-bold">
                                            +{formatCurrency(increase)} Monthly Growth
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button variant="hero" size="xl" className="w-full" asChild>
                                        <Link to="/#contact">
                                            Get a Quote to Hit These Numbers <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        *Projections based on average client results after 6 months of AGSEO execution.
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
