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
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang="en" />
        <title>AGSEO - AI-Powered SEO Agency | Future of Web Ranking</title>
        <meta name="description" content="AGSEO combines AI with SEO strategies to multiply your visibility and conversions. Get 300% traffic increase with our proven methodology." />
        <link rel="canonical" href="https://agseo.pro/" />
      </Helmet>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md transition-all"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
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
