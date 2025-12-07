import { ArrowRight, Sparkles, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ai-seo.jpg";

const stats = [
  { value: "300%", label: "Traffic Increase" },
  { value: "150+", label: "Active Clients" },
  { value: "99%", label: "Satisfaction" },
];

const features = [
  { icon: Sparkles, label: "Advanced AI" },
  { icon: Zap, label: "Fast Results" },
  { icon: TrendingUp, label: "Guaranteed ROI" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Powered by Advanced AI
              </span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-up">
              <span className="gradient-text">AI-Powered SEO Agency:</span>{" "}
              <span className="text-foreground">
                The Future of Web Ranking
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-slide-in-up" style={{ animationDelay: "100ms" }}>
              We combine the precision of{" "}
              <span className="text-primary font-medium">
                Artificial Intelligence
              </span>{" "}
              with cutting-edge{" "}
              <span className="text-primary font-medium">SEO strategies</span>{" "}
              to multiply your visibility and conversions online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
              <Button variant="hero" size="xl" className="group">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                Get SEO Strategy
              </Button>
              <Button variant="hero-outline" size="xl">
                <Sparkles className="w-5 h-5" />
                View Services
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: "300ms" }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image with Stats */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "400ms" }}>
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
              <img
                src={heroImage}
                alt="AI-Powered SEO Technology Dashboard"
                className="w-full h-auto object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-primary/20"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary font-heading">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-2xl blur-2xl float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/30 rounded-full blur-xl float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
