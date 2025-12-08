import { Shield, Target, Award, Zap, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

const reasonIcons = [Shield, Target, Award, Zap];
const reasonKeys = ["exclusive", "aiFirst", "proven", "sustainable"] as const;

export function WhyChooseUs() {
  const { t } = useTranslation();

  const reasons = reasonKeys.map((key, index) => ({
    icon: reasonIcons[index],
    title: t(`whyChooseUs.reasons.${key}.title`),
    description: t(`whyChooseUs.reasons.${key}.description`),
  }));

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("whyChooseUs.subtitle")}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {reasons.map((reason, index) => (
            <StaggerItem key={index}>
              <ScaleOnHover>
                <div className="group p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Technology Partners Trust Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
            Powered by Next-Gen AI Infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text-based logos for simplicity & performance */}
            <div className="text-xl font-bold font-heading flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground rounded-full"></div> OpenAI
            </div>
            <div className="text-xl font-bold font-heading flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-foreground rounded-md"></div> Anthropic
            </div>
            <div className="text-xl font-bold font-heading flex items-center gap-2">
              <div className="w-6 h-0 border-t-8 border-l-4 border-r-4 border-transparent border-t-foreground rotate-180"></div> Vercel
            </div>
            <div className="text-xl font-bold font-heading flex items-center gap-2">
              <span className="text-2xl font-bold">G</span> Google Cloud
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
