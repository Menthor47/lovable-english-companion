
import { Helmet } from "react-helmet-async";

export function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "AGSEO",
        description: "AI-Powered SEO Agency specializing in local and e-commerce SEO",
        url: "https://agseo.pro",
        image: "/og-image.png",
        telephone: "+1-555-123-4567",
        address: {
            "@type": "PostalAddress",
            addressCountry: "US",
            addressRegion: "CA",
            postalCode: "94105",
            streetAddress: "123 Market St",
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
