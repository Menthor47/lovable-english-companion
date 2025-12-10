import { motion } from "framer-motion";
import { CheckCircle2, Users } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import aiRobot from "@/assets/ai-robot.png";

const advantages = [
  "Analyze data in real-time",
  "Optimize content intelligently",
  "Improve user experience",
  "Increase organic traffic without manual effort",
];

export function AIAdvantage() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-transparent to-secondary/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection direction="left" className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">
                Why Choose Us?
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Automated & Effective SEO with{" "}
              <span className="gradient-text">Artificial Intelligence</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Artificial Intelligence has completely transformed web ranking.
              Today, SEO isn't just about keywords: it's about deep data
              analysis, content personalization, and decisions based on real
              user behavior.
            </p>

            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  {advantage}
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  More than 150 satisfied clients
                </p>
                <p className="text-sm text-muted-foreground">
                  Trust our AI-powered solutions
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection direction="right" className="relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={aiRobot}
                alt="AI Robot analyzing SEO dashboard"
                loading="lazy"
                className="w-full h-auto object-cover rounded-2xl"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </motion.div>

            {/* Floating accent */}
            <motion.div
              className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
