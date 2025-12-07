import { MapPin, Globe, ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: MapPin,
    title: "Local SEO with AI",
    description: "Make your business stand out in local searches with AI-powered strategies.",
    features: [
      "Google Business Profile Optimization",
      "Local Competition Analysis",
      "Geolocalized Keyword Strategy",
      "Local Citations & Directories",
    ],
    popular: false,
  },
  {
    icon: Globe,
    title: "Web SEO with AI",
    description: "Improve your website's organic ranking with advanced, intelligent SEO strategies.",
    features: [
      "Complete Technical Audit",
      "On-Page & Off-Page Optimization",
      "SEO Content Strategy",
      "Core Web Vitals Improvement",
    ],
    popular: true,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce SEO with AI",
    description: "Increase your online store sales with SEO strategies specific to e-commerce.",
    features: [
      "Product Page Optimization",
      "SEO-Friendly Category Structure",
      "Conversion-Focused UX",
      "Purchase Intent Keywords",
    ],
    popular: false,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              EvolveSEO + AI Services
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            AI-Powered <span className="gradient-text">SEO Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visibility, ranking, and real results with AI. Discover how we can
            transform your online presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              variant={service.popular ? "glow" : "glass"}
              className="relative group hover:-translate-y-2 transition-all duration-300"
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-primary-foreground text-xs font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
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
                
                <Button
                  variant={service.popular ? "hero" : "outline"}
                  className="w-full mt-4 group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="xl">
            Request Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
