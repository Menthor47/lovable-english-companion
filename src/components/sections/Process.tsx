import { Search, Lightbulb, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Intelligent Diagnosis",
    description:
      "We thoroughly analyze your current situation, competition, and opportunities using AI algorithms to establish a precise baseline.",
  },
  {
    number: "2",
    icon: Lightbulb,
    title: "Custom Strategy",
    description:
      "We design a tailor-made SEO strategy based on collected data, aligned with your business goals and optimized by AI.",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Optimization & Execution",
    description:
      "We implement technical, content, and authority improvements needed to boost your organic ranking.",
  },
  {
    number: "4",
    icon: LineChart,
    title: "Tracking & Evolution",
    description:
      "We constantly monitor results, adjusting strategy in real-time to maximize SEO performance.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">
              Our Methodology
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Work Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to take your SEO strategy to the next level
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-heading font-bold text-2xl text-primary z-10">
                  {step.number}
                </div>
                
                {/* Content Card */}
                <div
                  className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
