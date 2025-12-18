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
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { StructuredData } from "@/components/seo/StructuredData";

import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const pageUrl = getAbsoluteUrl("/");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang="en" />
        <title>{t("hero.metaTitle")}</title>
        <meta name="description" content={t("hero.metaDescription")} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={t("hero.metaTitle")} />
        <meta property="og:description" content={t("hero.metaDescription")} />
        <meta property="og:image" content={SITE_OG_IMAGE_URL} />
      </Helmet>
      <StructuredData />
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
        <Newsletter className="container mx-auto px-4 py-24" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
