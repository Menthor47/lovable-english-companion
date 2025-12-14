import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/animated-background";
import heroImage from "@/assets/hero-ai-seo.webp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { OptimizedImage } from "@/components/ui/optimized-image";

const stats = [
  { value: "AI", label: "Strategy" },
  { value: "GEO", label: "LLM Visibility" },
  { value: "SEO", label: "Technical + Content" },
];

const features = [
  { icon: Sparkles, label: "Advanced AI" },
  { icon: Zap, label: "Clear Roadmap" },
  { icon: TrendingUp, label: "Measurable Reporting" },
];

export function Hero() {
  const { t } = useTranslation();
  usePrefersReducedMotion();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <Helmet>
        <link rel="preload" as="image" href={heroImage} />
      </Helmet>
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(43,182,168,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary tracking-wide">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
              >
                <span className="text-foreground drop-shadow-xl">{t("hero.title")}</span>
              </motion.h1>
              {/* Glow effect behind text */}
              <div className="absolute -inset-10 bg-primary/5 blur-3xl -z-10 rounded-full" />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground/90 max-w-xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="xl" className="group relative overflow-hidden" asChild>
                <Link to="/#contact">
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.cta.primary")}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" className="backdrop-blur-sm hover:bg-white/5" asChild>
                <a href="#services">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("hero.cta.secondary")}
                </a>
              </Button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/40 border border-white/5 backdrop-blur-md hover:border-primary/30 transition-colors"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground/80">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - 3D/Glass Card Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:perspective-[1000px] lg:transform-style-3d"
          >
            {/* Main Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-transparent p-1">
              <div className="relative rounded-xl overflow-hidden bg-background/50">
                <OptimizedImage
                  src={heroImage}
                  alt="AI-Powered SEO Dashboard"
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  priority={true}
                  width={1200}
                  height={675}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                {/* Floating Stats Cards */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="text-center p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/60 transition-colors"
                      >
                        <div className="text-xl md:text-2xl font-bold text-primary font-heading tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements behind the card */}
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px] -z-10"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
