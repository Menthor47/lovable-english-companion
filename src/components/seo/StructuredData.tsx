import { Helmet } from 'react-helmet-async';

export function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "AGSEO",
        "image": "https://agseo.pro/og-image.png",
        "description": "AGSEO combines AI with proven SEO strategies to multiply your visibility and conversions.",
        "url": "https://agseo.pro",
        "telephone": "+1-555-0123",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "priceRange": "$$$",
        "sameAs": [
            "https://twitter.com/AGSEO",
            "https://linkedin.com/company/agseo"
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
