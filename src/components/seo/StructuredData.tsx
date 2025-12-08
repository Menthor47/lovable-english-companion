
import { Helmet } from "react-helmet-async";

export function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "AGSEO",
        description: "AI-Powered SEO Agency specializing in local and e-commerce SEO",
        url: "https://agseo.pro",
        image: "/og-image.png",
        telephone: "+44-7455-401962",
        address: {
            "@type": "PostalAddress",
            addressCountry: "RO",
            addressLocality: "Bucharest",
            streetAddress: "Amzei Square",
        },
        priceRange: "$$$",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "150",
        },
        sameAs: [
            "https://twitter.com/agseo",
            "https://linkedin.com/company/agseo",
        ],
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
