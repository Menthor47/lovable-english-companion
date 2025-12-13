import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Users, Eye, MousePointer, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ContentKanban } from "@/components/dashboard/ContentKanban";
import { ProjectTimeline } from "@/components/dashboard/ProjectTimeline";
import { DeliverableVault } from "@/components/dashboard/DeliverableVault";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";

const data = [
    { name: "Jan", traffic: 4000, keywords: 240 },
    { name: "Feb", traffic: 5500, keywords: 320 },
    { name: "Mar", traffic: 7000, keywords: 450 },
    { name: "Apr", traffic: 9200, keywords: 580 },
    { name: "May", traffic: 12500, keywords: 790 },
    { name: "Jun", traffic: 16800, keywords: 1100 },
];

type StatCardProps = {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    delay: number;
};

const StatCard = ({ title, value, change, icon: Icon, delay }: StatCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-card border border-border/50 rounded-xl p-6"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Icon className="w-6 h-6" />
            </div>
            <div className={`text-sm font-medium ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {change}
            </div>
        </div>
        <div className="text-3xl font-bold font-heading mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
    </motion.div>
);

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("6M");
    const pageUrl = getAbsoluteUrl("/dashboard");

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Client Dashboard Demo | AGSEO</title>
                <meta name="description" content="Preview the AGSEO client dashboard demo. Data shown is illustrative sample data (not live client metrics)." />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content="Client Dashboard Demo | AGSEO" />
                <meta property="og:description" content="Preview the AGSEO client dashboard demo. Data shown is illustrative sample data (not live client metrics)." />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
            </Helmet>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-500/10 text-blue-500 mb-2 border border-blue-500/20">
                                Demo Mode
                            </div>
                            <h1 className="font-heading text-3xl font-bold">Client Dashboard<span className="text-primary"> Demo</span></h1>
                            <p className="text-muted-foreground">Illustrative sample data for feature preview (not live client reporting).</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export Sample Report
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Traffic (Sample)" value="16,800" change="+34%" icon={Users} delay={0.1} />
                        <StatCard title="Keywords Ranked (Sample)" value="1,100" change="+12%" icon={TrendingUp} delay={0.2} />
                        <StatCard title="Impressions (Sample)" value="245k" change="+28%" icon={Eye} delay={0.3} />
                        <StatCard title="CTR (Sample)" value="6.8%" change="+1.2%" icon={MousePointer} delay={0.4} />
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid lg:grid-cols-12 gap-8 mb-8">
                        {/* Left Column: Charts & Kanban (8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Traffic Chart */}
                            <AnimatedSection className="bg-card border border-border/50 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-heading text-xl font-bold">Traffic & Growth</h3>
                                    <div className="flex gap-2 bg-background/50 p-1 rounded-lg border border-border">
                                        {["1M", "3M", "6M", "1Y"].map((range) => (
                                            <button
                                                key={range}
                                                onClick={() => setTimeRange(range)}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === range
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2BB6A8" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#2BB6A8" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value}`}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: "#1e1e1e", borderColor: "#333", borderRadius: "8px" }}
                                                itemStyle={{ color: "#fff" }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="traffic"
                                                stroke="#2BB6A8"
                                                fillOpacity={1}
                                                fill="url(#colorTraffic)"
                                                strokeWidth={3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </AnimatedSection>

                            {/* Kanban Board */}
                            <AnimatedSection className="bg-card border border-border/50 rounded-xl p-6" delay={0.2}>
                                <ContentKanban />
                            </AnimatedSection>
                        </div>

                        {/* Right Column: Timeline & Vault (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            <AnimatedSection className="bg-card border border-border/50 rounded-xl p-6" delay={0.3}>
                                <ProjectTimeline />
                            </AnimatedSection>

                            <AnimatedSection className="bg-card border border-border/50 rounded-xl p-6" delay={0.4}>
                                <DeliverableVault />
                            </AnimatedSection>

                            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-primary/20 p-6 text-center">
                                <h4 className="font-bold mb-2">Ready for the real thing?</h4>
                                <p className="text-sm text-muted-foreground mb-4">Get your own custom dashboard setup today.</p>
                                <Button className="w-full">Start Onboarding</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
