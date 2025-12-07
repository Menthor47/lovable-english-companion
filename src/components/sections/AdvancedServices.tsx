import { Link2, Target, BarChart3, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const advancedServices = [
  {
    icon: Link2,
    title: "Intelligent Link Building",
    description:
      "We build quality links that boost your website's authority using AI algorithms to identify the best opportunities.",
    features: [
      "Competitor link profile analysis",
      "Sector-specific strategies",
      "High-quality contextual links",
      "Result monitoring & measurement",
    ],
    cta: "Request Link Building",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "AI-Powered SEM Advertising",
    description:
      "Maximize your advertising ROI with AI-managed SEM campaigns that optimize in real-time for best results.",
    features: [
      "Advanced keyword research",
      "AI-optimized ad creation",
      "Automatic bid adjustment",
      "Detailed performance reports",
    ],
    cta: "Request SEM with AI",
    gradient: "from-primary to-blue-600",
  },
];

export function AdvancedServices() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Advanced Services
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Link Building & SEM with{" "}
            <span className="gradient-text">AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complement your SEO strategy with advanced services that maximize
            your online presence
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid lg:grid-cols-2 gap-8">
          {advancedServices.map((service, index) => (
            <StaggerItem key={index}>
              <div className="group relative h-full p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <Button variant="hero" className="group/btn">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
