import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { caseStudies } from "@/data/caseStudies";
import {
  ORGANIZATION_ID,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_OG_IMAGE_URL,
  TEAM_ID,
  WEBSITE_ID,
  getAbsoluteUrl
} from "@/lib/siteMetadata";

export default function CaseStudy() {
  const { id } = useParams();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return <Navigate to="/404" replace />;
  }

  const pageUrl = getAbsoluteUrl(`/case-studies/${study.id}`);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: study.title, href: `/case-studies/${study.id}` }
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl
    },
    image: SITE_OG_IMAGE_URL,
    articleSection: study.category,
    author: {
      "@type": "Organization",
      "@id": TEAM_ID,
      name: "AGSEO Team"
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO_URL
      }
    },
    isPartOf: {
      "@id": WEBSITE_ID
    }
  };

  return (
    <div ref={topRef} className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{study.title} | Case Study | AGSEO</title>
        <meta name="description" content={study.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${study.title} | Case Study | AGSEO`} />
        <meta property="og:description" content={study.description} />
        <meta property="og:image" content={SITE_OG_IMAGE_URL} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs items={breadcrumbItems} />
                </div>

                <section className="pt-8 pb-16">
                    <div className="container mx-auto px-4">
                        <AnimatedSection className="max-w-4xl mx-auto">
                            <Link
                                to="/case-studies"
                                className="inline-flex items-center text-primary hover:underline font-medium"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Case Studies
                            </Link>

                            <div className="mt-6 space-y-5">
                                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${study.color} ${study.bgColor}`}>
                                    {study.category}
                                </div>

                                <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                                    {study.title}
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground">
                                    {study.description}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Results are illustrative and may vary. Client details may be anonymized to protect privacy.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1} className="max-w-4xl mx-auto mt-10">
                            <div className="grid sm:grid-cols-3 gap-4">
                                {study.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-card border border-border/50 rounded-2xl p-6 text-center"
                                    >
                                        <div className="text-3xl font-bold font-heading mb-1 text-foreground">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 text-xs text-muted-foreground">
                                Example metrics shown for illustrative purposes.
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto mt-12">
                            <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10">
                                <div className="space-y-10">
                                    <section>
                                        <h2 className="text-2xl font-bold font-heading mb-3 text-primary">The Challenge</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {study.content.challenge}
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-bold font-heading mb-3 text-primary">The Strategy</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {study.content.strategy}
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-2xl font-bold font-heading mb-3 text-primary">The Results</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {study.content.results}
                                        </p>
                                    </section>
                                </div>

                                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between">
                                    <Button variant="outline" asChild>
                                        <Link to="/case-studies">All Case Studies</Link>
                                    </Button>

                                    <Button variant="hero" asChild>
                                        <Link to="/#contact">Get a Free Audit</Link>
                                    </Button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
