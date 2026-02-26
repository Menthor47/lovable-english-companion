import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
}

export function PageLayout({
  children,
  className,
  title,
  description,
  canonicalUrl,
  ogImage,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogUrl,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex = false,
}: PageLayoutProps) {
  // Use ogTitle/twitterTitle as fallback for title if not provided
  const pageTitle = title || ogTitle || twitterTitle;
  const pageDescription = description || ogDescription || twitterDescription;
  const pageImage = ogImage || twitterImage;

  return (
    <>
      {pageTitle && (
        <Helmet>
          <title>{pageTitle}</title>
          {pageDescription && <meta name="description" content={pageDescription} />}
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          {noIndex && <meta name="robots" content="noindex, nofollow" />}
          
          {/* Open Graph */}
          {ogTitle && <meta property="og:title" content={ogTitle} />}
          {ogDescription && <meta property="og:description" content={ogDescription} />}
          {ogImage && <meta property="og:image" content={ogImage} />}
          {ogType && <meta property="og:type" content={ogType} />}
          {(ogUrl || canonicalUrl) && <meta property="og:url" content={ogUrl || canonicalUrl} />}
          
          {/* Twitter Card */}
          <meta name="twitter:card" content={twitterCard} />
          {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
          {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
          {twitterImage && <meta name="twitter:image" content={twitterImage} />}
        </Helmet>
      )}
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main id="main" className={cn("flex-1", className)}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
