import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Share2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { terms } from "@/data/glossary";
import { getAbsoluteUrl, SITE_OG_IMAGE_URL } from "@/lib/siteMetadata";
import { TrustSignals } from "@/components/sections/TrustSignals";
import ReactMarkdown from "react-markdown";

export default function GlossaryDetail() {
    const { slug } = useParams();
    const term = terms.find((t) => t.slug === slug);

    if (!term) {
        return (
            <div className="min-h-screen bg-background flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4">Term Not Found</h1>
                <Button asChild>
                    <Link to="/resources/glossary">Back to Glossary</Link>
                </Button>
            </div>
        );
    }

    const pageUrl = getAbsoluteUrl(`/resources/glossary/${term.slug}`);
    const ogImage = term.image ? getAbsoluteUrl(term.image) : SITE_OG_IMAGE_URL;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{`${term.term} - AI SEO Glossary | AGSEO`}</title>
                <meta name="description" content={term.definition} />
                <link rel="canonical" href={pageUrl} />

                {/* FaceBook / Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${term.term} - AI SEO Glossary`} />
                <meta property="og:description" content={term.definition} />
                <meta property="og:image" content={ogImage} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${term.term} - AI SEO Glossary`} />
                <meta name="twitter:description" content={term.definition} />
                <meta name="twitter:image" content={ogImage} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "DefinedTerm",
                        "name": term.term,
                        "description": term.definition,
                        "inDefinedTermSet": {
                            "@type": "DefinedTermSet",
                            "name": "AGSEO AI SEO Glossary",
                            "url": getAbsoluteUrl("/resources/glossary")
                        }
                    })}
                </script>
            </Helmet>

            <Header />

            <main className="flex-1 pt-24 pb-16">
                <div className="container px-4 mx-auto max-w-4xl">
                    <AnimatedSection>
                        <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                            <Link to="/resources/glossary">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Glossary
                            </Link>
                        </Button>

                        <div className="mb-12">
                            <Badge variant="secondary" className="mb-4">
                                Glossary Term
                            </Badge>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                {term.term}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {term.definition}
                            </p>
                        </div>

                        {term.image && (
                            <div className="mb-12 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                                <img
                                    src={term.image}
                                    alt={`Illustration for ${term.term}`}
                                    className="w-full h-auto object-cover aspect-video"
                                />
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-lg prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
                            {term.article ? (
                                <ReactMarkdown>
                                    {term.article}
                                </ReactMarkdown>
                            ) : (
                                <div className="p-8 border border-dashed border-border rounded-xl text-center text-muted-foreground">
                                    Detailed article coming soon.
                                </div>
                            )}
                        </div>

                        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                Share this definition
                            </div>
                            <Button variant="outline" onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                // Optional: Add toast notification here
                            }}>
                                <Share2 className="w-4 h-4 mr-2" /> Copy Link
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </main>

            <TrustSignals />
            <Footer />
        </div>
    );
}
