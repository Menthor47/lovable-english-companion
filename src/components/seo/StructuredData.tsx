import { Helmet } from "react-helmet-async";
import { config } from "@/lib/config";

const DEFAULT_PHONE = "+15550123456";
const DEFAULT_STREET = "123 SEO Street";
const DEFAULT_CITY = "Tech City";

function isPlaceholderPhone(phone: string): boolean {
    return phone === DEFAULT_PHONE || phone.includes("555");
}

function isPlaceholderAddress(street: string, city: string): boolean {
    return street === DEFAULT_STREET || city === DEFAULT_CITY;
}

export function StructuredData() {
    const sameAs = [config.social.twitter, config.social.linkedin].filter(Boolean);

    const hasValidPhone = !isPlaceholderPhone(config.contact.phone);
    const hasValidAddress = !isPlaceholderAddress(
        config.contact.address.street,
        config.contact.address.city,
    );

    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": hasValidAddress ? "LocalBusiness" : "ProfessionalService",
        "name": "AGSEO",
        "description": "AGSEO combines AI with proven SEO strategies to multiply your visibility and conversions.",
        "url": config.contact.siteUrl,
        "image": `${config.contact.siteUrl}/og-image.png`,
    };

    if (hasValidPhone) {
        schema.telephone = config.contact.phone;
    }

    if (config.contact.email) {
        schema.email = config.contact.email;
    }

    if (hasValidAddress) {
        schema.address = {
            "@type": "PostalAddress",
            streetAddress: config.contact.address.street,
            addressLocality: config.contact.address.city,
            addressCountry: config.contact.address.country,
        };
    }

    if (sameAs.length) {
        schema.sameAs = sameAs;
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
