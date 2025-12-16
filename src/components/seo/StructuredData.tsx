import { Helmet } from 'react-helmet-async';
import { config } from '@/lib/config';

export function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "AGSEO",
        "image": `${config.contact.siteUrl}/og-image.png`,
        "description": "AGSEO combines AI with proven SEO strategies to multiply your visibility and conversions.",
        "url": config.contact.siteUrl,
        "telephone": config.contact.phone,
        "email": config.contact.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": config.contact.address.street,
            "addressLocality": config.contact.address.city,
            "addressCountry": config.contact.address.country
        },
        "priceRange": "$$$",
        "sameAs": [
            config.social.twitter,
            config.social.linkedin
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
