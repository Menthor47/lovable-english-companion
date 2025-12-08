import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

const testimonialKeys = ["t1", "t2", "t3", "t4"] as const;

export function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = testimonialKeys.map((key) => ({
    company: t(`testimonials.items.${key}.company`),
    role: t(`testimonials.items.${key}.role`),
    quote: t(`testimonials.items.${key}.quote`),
    date: t(`testimonials.items.${key}.date`),
  }));

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {t("nav.testimonials")}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center z-20"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Quote className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Testimonial Card */}
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 ml-6 overflow-hidden relative min-h-[300px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="mb-8">
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {testimonials[currentIndex].company}
                    </h3>
                    <p className="text-sm text-primary">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>

                  <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-8">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].date}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? "bg-primary"
                    : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                  animate={{ width: index === currentIndex ? 32 : 8 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
