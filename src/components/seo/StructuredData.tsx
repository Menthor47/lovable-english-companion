import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "@/lib/constants";

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
    const sameAs = [SITE_CONFIG.social.twitter, SITE_CONFIG.social.linkedin].filter(Boolean);

    const hasValidPhone = !isPlaceholderPhone(SITE_CONFIG.contact.phone);
    const hasValidAddress = !isPlaceholderAddress(
        SITE_CONFIG.contact.address.street,
        SITE_CONFIG.contact.address.city,
    );

    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": hasValidAddress ? "LocalBusiness" : "ProfessionalService",
        "name": "AGSEO",
        "description": "AGSEO combines AI with proven SEO strategies to multiply your visibility and conversions.",
        "url": SITE_CONFIG.baseUrl,
        "image": `${SITE_CONFIG.baseUrl}/og-image.png`,
    };

    if (hasValidPhone) {
        schema.telephone = SITE_CONFIG.contact.phone;
    }

    if (SITE_CONFIG.contact.email) {
        schema.email = SITE_CONFIG.contact.email;
    }

    if (hasValidAddress) {
        schema.address = {
            "@type": "PostalAddress",
            streetAddress: SITE_CONFIG.contact.address.street,
            addressLocality: SITE_CONFIG.contact.address.city,
            addressCountry: SITE_CONFIG.contact.address.country,
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
