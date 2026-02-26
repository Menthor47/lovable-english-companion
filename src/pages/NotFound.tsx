import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SITE_OG_IMAGE_URL, getAbsoluteUrl } from "@/lib/siteMetadata";
import { Home, Search, ArrowRight, BookOpen, Mail, Sparkles } from "lucide-react";

const popularLinks = [
  { label: "Free AI Audit", href: "/tools/audit", icon: Sparkles },
  { label: "Our Services", href: "/services", icon: Search },
  { label: "SEO Glossary", href: "/resources/glossary", icon: BookOpen },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

const NotFound = () => {
  const location = useLocation();
  const pageUrl = getAbsoluteUrl("/404");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Page Not Found | AGSEO</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Page Not Found | AGSEO" />
        <meta property="og:description" content="The page you're looking for doesn't exist." />
        <meta property="og:image" content={SITE_OG_IMAGE_URL} />
      </Helmet>

      <Header />

      <main id="main" className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            {/* Large 404 */}
            <div className="relative mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold font-heading text-primary/10 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold">
                    Page Not Found
                  </h2>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Get Help
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground mb-6">
                Or try one of these popular pages:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                  >
                    <link.icon className="w-6 h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
