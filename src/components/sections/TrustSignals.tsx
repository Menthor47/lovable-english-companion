import { AnimatedSection } from "@/components/ui/animated-section";
import { ShieldCheck, Users, Zap, Award } from "lucide-react";

const stats = [
    {
        label: "Tools Integrated",
        value: "50+",
        icon: Zap,
    },
    {
        label: "Data Points Analyzed",
        value: "10k+",
        icon: Users,
    },
    {
        label: "Transparent Reporting",
        value: "100%",
        icon: ShieldCheck,
    },
    {
        label: "Certifications Held",
        value: "15+",
        icon: Award,
    },
];

const logos = [
    "Google Ads", "GA4", "Semrush", "Ahrefs", "Screaming Frog", "Looker Studio"
];

export function TrustSignals() {
    return (
        <section className="py-20 border-t border-border/50 bg-background/50">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                        Built on Industry-Leading Standards
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We combine proprietary AI with the same tools trusted by enterprise SEO teams worldwide.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={200} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-border/50 pb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="font-heading text-3xl md:text-4xl font-bold mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </AnimatedSection>

                <AnimatedSection delay={400} className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
                        Tools We Work With
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {logos.map((logo) => (
                            <div key={logo} className="text-xl md:text-2xl font-bold font-heading">
                                {logo}
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
