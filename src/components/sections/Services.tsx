import { MapPin, Globe, ShoppingCart, ArrowRight, CheckCircle2, Bot, Sparkles, Search, Megaphone, FileText, Link as LinkIcon, BarChart3, Target, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const serviceIcons = [Bot, Sparkles, Search, Megaphone, FileText, LinkIcon, Target, Lightbulb, BarChart3];
const serviceKeys = ["aeo", "geo", "seo", "ads", "content", "links", "campaigns", "consulting", "analytics"] as const;

export function Services() {
  const { t } = useTranslation();

  const services = serviceKeys.map((key, index) => ({
    icon: serviceIcons[index],
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
    features: t(`services.${key}.features`, { returnObjects: true }) as string[],
    popular: key === "geo" || key === "seo",
  }));

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">
              {t("services.badge")}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <div className="h-full">
                <GlassCard
                  className={`relative p-8 h-full flex flex-col group transition-all duration-300 ${service.popular ? "border-primary/30 shadow-[0_0_30px_rgba(43,182,168,0.15)] scale-105 z-10" : "hover:border-primary/20"
                    }`}
                  gradient={service.popular}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                      {t("services.popular")}
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      <service.icon className={`w-7 h-7 ${service.popular ? "text-primary" : "text-foreground"}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {Array.isArray(service.features) && service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <MagneticButton className="w-full" strength={50}>
                    <Button
                      variant={service.popular ? "hero" : "default"}
                      className={`w-full group/btn ${!service.popular && "bg-primary/80 hover:bg-primary"}`}
                      asChild
                    >
                      <a href="#contact" className="text-slate-950 font-bold">
                        {t("services.learnMore")}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 ml-2 text-slate-950" />
                      </a>
                    </Button>
                  </MagneticButton>
                </GlassCard>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-20">
          <MagneticButton>
            <Button variant="glow" size="xl" className="rounded-full px-12" asChild>
              <a href="#contact">
                {t("services.cta")}
              </a>
            </Button>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
