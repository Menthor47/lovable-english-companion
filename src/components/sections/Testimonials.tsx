import { useTranslation } from "react-i18next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const { t } = useTranslation();
  const testimonialKeys = ["t1", "t2", "t3", "t4"] as const;

  return (
    <section className="py-24 bg-gradient-to-br from-background via-card/50 to-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">
              Client Success Stories
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" staggerDelay={0.1}>
          {testimonialKeys.map((key, index) => (
            <StaggerItem key={key}>
              <div className="h-full bg-card border border-border/50 p-8 rounded-3xl relative hover:border-primary/30 transition-colors group">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>

                <blockquote className="text-lg text-foreground/90 font-medium leading-relaxed mb-8">
                  "{t(`testimonials.items.${key}.quote`)}"
                </blockquote>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {t(`testimonials.items.${key}.company`).charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">
                      {t(`testimonials.items.${key}.company`)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t(`testimonials.items.${key}.role`)}
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground/60 border-l border-border/50 pl-4">
                    {t(`testimonials.items.${key}.date`)}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
