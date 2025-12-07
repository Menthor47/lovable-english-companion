import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    company: "Bot Trade Pro",
    role: "Technology Company",
    quote:
      "Thanks to EvolveSEO, we have dramatically improved our online visibility. Their AI-based approach has allowed us to surpass competitors who have been in the market for years. The increase in qualified traffic has been spectacular.",
    date: "March 2023",
  },
  {
    company: "Joel Garcia",
    role: "Digital Entrepreneur",
    quote:
      "I struggled with my website ranking for years until I found EvolveSEO. Their methodology combined with AI is simply revolutionary. In less than 3 months, my organic visits increased by 215%.",
    date: "January 2023",
  },
  {
    company: "Hugo Diaz",
    role: "Marketing Manager",
    quote:
      "What I value most about EvolveSEO is their approach based on real data and their ability to adapt strategies. The AI they use allows them to optimize resources and maximize results. Totally recommended.",
    date: "February 2023",
  },
  {
    company: "Sergio Roldan",
    role: "E-commerce Manager",
    quote:
      "My online store has experienced exponential growth since working with EvolveSEO. The combination of traditional SEO with AI-powered analysis has been a game changer for our business.",
    date: "April 2023",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Client Testimonials
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Results That <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what our clients say about our AI-powered SEO methodology
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary" />
            </div>

            {/* Testimonial Card */}
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 ml-6">
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

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
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
