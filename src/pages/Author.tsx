import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAuthorById } from "@/data/authors";
import {
    ORGANIZATION_ID,
    SITE_NAME,
    SITE_OG_IMAGE_URL,
    TEAM_ID,
    WEBSITE_ID,
    getAbsoluteUrl,
    SITE_BASE_URL
} from "@/lib/siteMetadata";

export default function Author() {
    const { id } = useParams();

    if (!id) {
        return <Navigate to="/404" replace />;
    }

    const author = getAuthorById(id);

    if (!author) {
        return <Navigate to="/404" replace />;
    }

    const pagePath = `/authors/${author.id}`;
    const pageUrl = getAbsoluteUrl(pagePath);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: author.name, href: pagePath }
    ];

    const authorSameAs = [
        author.socialLinks.linkedin,
        author.socialLinks.twitter,
        author.socialLinks.website
    ].filter((url): url is string => Boolean(url));

    const authorEntitySchema =
        author.id === "agseo-team"
            ? {
                "@id": TEAM_ID,
            }
            : {
                "@type": "Person",
                "@id": `${SITE_BASE_URL}/#author-${author.id}`,
                name: author.name,
                description: author.bio,
                image: author.image,
                jobTitle: author.role,
                url: pageUrl,
                worksFor: {
                    "@id": ORGANIZATION_ID,
                },
                ...(authorSameAs.length ? { sameAs: authorSameAs } : {}),
            };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: `${author.name} | ${SITE_NAME}`,
        description: author.bio,
        isPartOf: {
            "@id": WEBSITE_ID,
        },
        mainEntity: authorEntitySchema,
        about: authorEntitySchema,
        publisher: {
            "@id": ORGANIZATION_ID,
        },
    };

    const ogType: "profile" | "website" = author.id === "agseo-team" ? "website" : "profile";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Helmet>
                <title>{author.name} | AGSEO</title>
                <meta name="description" content={author.bio} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={`${author.name} | AGSEO`} />
                <meta property="og:description" content={author.bio} />
                <meta property="og:image" content={SITE_OG_IMAGE_URL} />
                <meta property="og:type" content={ogType} />
                <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
            </Helmet>

            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={breadcrumbItems} className="mb-8" />

                    <AnimatedSection className="max-w-4xl mx-auto">
                        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <img
                                    src={author.image}
                                    alt={author.name}
                                    loading="lazy"
                                    className="w-28 h-28 rounded-2xl object-cover border border-border"
                                />

                                <div className="flex-1">
                                    <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                                        {author.name}
                                    </h1>
                                    <p className="text-primary font-medium mb-4">{author.role}</p>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                        {author.bio}
                                    </p>

                                    <div className="grid gap-2">
                                        {author.credentials.map((credential) => (
                                            <div key={credential} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{credential}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {author.socialLinks.linkedin ? (
                                            <a
                                                href={author.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                LinkedIn
                                            </a>
                                        ) : null}
                                        {author.socialLinks.twitter ? (
                                            <a
                                                href={author.socialLinks.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                X (Twitter)
                                            </a>
                                        ) : null}
                                        {author.socialLinks.website ? (
                                            <a
                                                href={author.socialLinks.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                Website
                                            </a>
                                        ) : null}
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                        <Button variant="outline" asChild>
                                            <Link to="/about">Back to About</Link>
                                        </Button>
                                        <Button variant="hero" asChild>
                                            <Link to="/#contact">Work With AGSEO</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </main>

            <Footer />
        </div>
    );
}
