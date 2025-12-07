import { useEffect, useState } from "react";
import seoDashboard from "@/assets/seo-dashboard.jpg";

const stats = [
  { value: 500000, suffix: "+", label: "Keywords Analyzed with AI" },
  { value: 98, suffix: "%", label: "Clients with Improved Visibility" },
  { value: 25000, suffix: "+", label: "Products Optimized with SEO" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
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
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Proven Results
              </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Data That Proves Our{" "}
              <span className="gradient-text">Effectiveness</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12">
              Our data-driven, AI-powered approach allows us to achieve
              superior, measurable results. The metrics speak for themselves:
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={seoDashboard}
                alt="SEO Analytics Dashboard showing performance metrics"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/30 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
