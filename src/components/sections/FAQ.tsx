import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";

// FAQ keys - content comes from translation files
const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FAQ() {
  const { t } = useTranslation();

  // Build FAQs from translation keys
  const faqs = faqKeys.map((key) => ({
    question: t(`faq.items.${key}.question`, { defaultValue: "" }),
    answer: t(`faq.items.${key}.answer`, { defaultValue: "" }),
  })).filter(faq => faq.question); // Filter out empty ones

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {t("nav.faq")}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
