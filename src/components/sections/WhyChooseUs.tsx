import { Shield, Target, Award, Zap } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Exclusive Territories",
    description: "We guarantee your direct competitors won't be able to hire our services in your area.",
  },
  {
    icon: Target,
    title: "AI-First Approach",
    description: "First agency combining traditional SEO with advanced AI for superior results.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Measurable improvements from month one with transparent reporting.",
  },
  {
    icon: Zap,
    title: "Sustainable Advantage",
    description: "Long-term competitive edge through cutting-edge technology and strategy.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            💡 Why Choose{" "}
            <span className="gradient-text">EvolveSEO</span>{" "}
            for Your Web Ranking?
          </h2>
          <p className="text-lg text-muted-foreground">
            We are the{" "}
            <span className="text-primary font-medium">
              first agency
            </span>{" "}
            that combines traditional SEO with advanced AI and{" "}
            <span className="text-primary font-medium">
              exclusive territorial zones
            </span>
            . This means your direct competition won't be able to hire our
            services in your area, guaranteeing you a{" "}
            <span className="text-primary font-medium">
              sustainable competitive advantage
            </span>{" "}
            and measurable results from month one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
