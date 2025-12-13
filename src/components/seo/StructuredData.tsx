import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { config } from "@/lib/config";
import {
    ORGANIZATION_ID,
    SITE_ALTERNATE_NAME,
    SITE_BASE_URL,
    SITE_LOGO_URL,
    SITE_NAME,
    SITE_OG_IMAGE_URL,
    TEAM_ID,
    WEBSITE_ID
} from "@/lib/siteMetadata";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function StructuredData() {
    const { t } = useTranslation();
    const location = useLocation();

    const organizationSameAs = [config.social.twitter, config.social.linkedin].filter(
        (url): url is string => Boolean(url)
    );

    // WebSite schema for sitelinks searchbox
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_BASE_URL,
        name: SITE_NAME,
        description: "AI-Powered SEO Agency - Dominate Search & AI Answers",
        publisher: {
            "@id": ORGANIZATION_ID
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_BASE_URL}/resources/glossary?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        description: "AI-Powered SEO Agency specializing in Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and Traditional SEO for businesses worldwide.",
        url: SITE_BASE_URL,
        logo: SITE_LOGO_URL,
        image: SITE_OG_IMAGE_URL,
        email: config.contact.email,
        sameAs: organizationSameAs,
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: config.contact.email,
            areaServed: "Worldwide"
        }
    };

     const teamSchema = {
         "@context": "https://schema.org",
         "@type": "Organization",
         "@id": TEAM_ID,
         name: "AGSEO Team",
         url: SITE_BASE_URL,
         parentOrganization: {
             "@id": ORGANIZATION_ID
         },
         sameAs: organizationSameAs
     };

    const shouldIncludeServiceSchema =
        location.pathname === "/services" ||
        location.pathname.startsWith("/services/") ||
        location.pathname === "/geo-optimization";

    const serviceSchema = shouldIncludeServiceSchema
        ? {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "SEO Services",
            provider: {
                "@id": ORGANIZATION_ID
            },
            areaServed: {
                "@type": "Place",
                name: "Worldwide"
            },
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "SEO Services",
                itemListElement: [
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "Answer Engine Optimization (AEO)",
                            description: "Optimize for direct answers on AI platforms and voice search."
                        }
                    },
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "Generative Engine Optimization (GEO)",
                            description: "Optimize content for generative search experiences and AI-driven results."
                        }
                    },
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "Technical SEO",
                            description: "Technical audits, indexation, performance, and on-site quality improvements."
                        }
                    },
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "Content Strategy",
                            description: "Content planning and production support for search visibility."
                        }
                    }
                ]
            }
        }
        : null;

    const faqItems = FAQ_KEYS.map((key) => {
        const question = t(`faq.items.${key}.question`, { defaultValue: "" });
        const answer = t(`faq.items.${key}.answer`, { defaultValue: "" });

        return { question, answer };
    }).filter((item) => item.question && item.answer);

    const shouldIncludeFaqSchema = location.pathname === "/" && faqItems.length > 0;

    const faqSchema = shouldIncludeFaqSchema
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                }
            }))
        }
        : null;

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">{JSON.stringify(teamSchema)}</script>
            {serviceSchema ? (
                <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
            ) : null}
            {faqSchema ? (
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            ) : null}
        </Helmet>
    );
}
