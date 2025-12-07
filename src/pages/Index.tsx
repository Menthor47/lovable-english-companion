import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { AIAdvantage } from "@/components/sections/AIAdvantage";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { AdvancedServices } from "@/components/sections/AdvancedServices";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Partners />
        <WhyChooseUs />
        <Services />
        <Process />
        <AIAdvantage />
        <Testimonials />
        <Stats />
        <AdvancedServices />
        <BlogPreview />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
