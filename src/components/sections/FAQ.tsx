import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const faqs = [
  {
    question: "How does AI improve SEO results?",
    answer:
      "Our AI analyzes millions of data points including search patterns, competitor strategies, and user behavior to make data-driven decisions. It identifies opportunities faster than traditional methods, optimizes content in real-time, and predicts algorithm changes before they impact your rankings. This results in 3x faster improvements compared to conventional SEO approaches.",
  },
  {
    question: "What makes your exclusive territory model unique?",
    answer:
      "We guarantee that your direct competitors in your geographic area cannot hire our services. This means you get an unfair advantage - we work exclusively for you in your market, ensuring all our AI insights and strategies benefit only your business. It's like having a dedicated SEO team that can never work for the competition.",
  },
  {
    question: "How quickly can I expect to see results?",
    answer:
      "Most clients see initial improvements within the first 30 days, with significant ranking improvements typically occurring between 60-90 days. Our AI continuously optimizes your strategy, so results compound over time. We provide transparent monthly reports showing exactly how your visibility and traffic are improving.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "Yes! Our AI-powered approach is scalable for businesses of all sizes - from local startups to enterprise-level corporations. We customize our strategies based on your specific goals, budget, and market. Small businesses benefit from enterprise-level AI capabilities, while larger companies get the personalized attention they need.",
  },
  {
    question: "What's included in the free SEO audit?",
    answer:
      "Our free audit includes a comprehensive analysis of your website's technical SEO health, content optimization opportunities, backlink profile, competitor analysis, and keyword ranking potential. You'll receive actionable insights and a customized strategy recommendation - no strings attached.",
  },
  {
    question: "How do you measure and report on progress?",
    answer:
      "We provide detailed monthly reports covering keyword rankings, organic traffic growth, conversion rates, and ROI. Our AI dashboard gives you real-time visibility into your SEO performance. We also schedule regular strategy calls to discuss results and adjust tactics as needed.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "While our AI adapts to any industry, we have particular expertise in e-commerce, SaaS, professional services, healthcare, real estate, and local businesses. Our AI has been trained on vast datasets across these sectors, allowing it to identify industry-specific opportunities and best practices.",
  },
  {
    question: "Can you help with international SEO?",
    answer:
      "Absolutely! Our AI supports multi-language and multi-region SEO strategies. We can optimize your content for different markets, handle hreflang implementation, and develop location-specific keyword strategies. We've helped businesses expand into new markets across North America, Europe, and Asia.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI-powered SEO services
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
