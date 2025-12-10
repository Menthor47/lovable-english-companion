import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/ui/animated-section";
import seoDashboard from "@/assets/seo-dashboard.jpg";

const statKeys = ["keywords", "visibility", "products", "satisfaction"] as const;
const statValues = [
  { value: 500000, suffix: "+" },
  { value: 98, suffix: "%" },
  { value: 25000, suffix: "+" },
  { value: 99, suffix: "%" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span ref={ref}>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useTranslation();

  const stats = statKeys.map((key, index) => ({
    ...statValues[index],
    label: t(`stats.${key}`),
  }));

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {t("stats.badge")}
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              {t("stats.title")}
            </h2>

            <p className="text-lg text-muted-foreground mb-12">
              {t("stats.subtitle")}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection direction="right" className="order-1 lg:order-2 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={seoDashboard}
                alt="SEO Analytics Dashboard showing performance metrics"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/30 rounded-full blur-xl"
              animate={{ scale: [1.3, 1, 1.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
