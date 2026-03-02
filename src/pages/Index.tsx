import { PageLayout } from "@/components/layout/PageLayout";
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
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const pageUrl = getAbsoluteUrl("/");

  return (
    <PageLayout
      title={t("hero.metaTitle")}
      description={t("hero.metaDescription")}
      canonicalUrl={pageUrl}
      ogImage={SITE_OG_IMAGE_URL}
    >
      <StructuredData />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md transition-all"
      >
        Skip to main content
      </a>
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
    </PageLayout>
  );
};

export default Index;
