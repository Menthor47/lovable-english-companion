import { Helmet } from "react-helmet-async";

export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://agseo.pro/#organization",
        name: "AGSEO",
        description: "AI-Powered SEO Agency specializing in local and e-commerce SEO",
        url: "https://agseo.pro",
        image: "https://agseo.pro/og-image.png",
        telephone: "+44-7455-401962",
        email: "hello@agseo.pro",
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

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "SEO Services",
        provider: {
            "@type": "LocalBusiness",
            name: "AGSEO",
            url: "https://agseo.pro"
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
                        description: "Optimize for direct answers on AI platforms like ChatGPT, Perplexity, and voice search."
                    }
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Generative Engine Optimization (GEO)",
                        description: "Future-proof your content for generative search experiences and AI-driven results."
                    }
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Advanced Technical SEO",
                        description: "Holistic search engine optimization including Local, Ecommerce, and Enterprise solutions."
                    }
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "AI-Driven Content Engine",
                        description: "Scale high-quality, authoritative content production that ranks and converts."
                    }
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Authority & Link Building",
                        description: "Secure high-quality backlinks from relevant, authoritative domains to boost credibility."
                    }
                }
            ]
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How does AI improve SEO results?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our AI analyzes millions of data points including search patterns, competitor strategies, and user behavior to make data-driven decisions. It identifies opportunities faster than traditional methods, optimizes content in real-time, and predicts algorithm changes before they impact your rankings."
                }
            },
            {
                "@type": "Question",
                name: "What makes your exclusive territory model unique?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We guarantee that your direct competitors in your geographic area cannot hire our services. This means you get an unfair advantage - we work exclusively for you in your market, ensuring all our AI insights and strategies benefit only your business."
                }
            },
            {
                "@type": "Question",
                name: "How quickly can I expect to see results?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most clients see initial improvements within the first 30 days, with significant ranking improvements typically occurring between 60-90 days. Our AI continuously optimizes your strategy, so results compound over time."
                }
            },
            {
                "@type": "Question",
                name: "Do you work with businesses of all sizes?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Our AI-powered approach is scalable for businesses of all sizes - from local startups to enterprise-level corporations. We customize our strategies based on your specific goals, budget, and market."
                }
            },
            {
                "@type": "Question",
                name: "What's included in the free SEO audit?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our free audit includes a comprehensive analysis of your website's technical SEO health, content optimization opportunities, backlink profile, competitor analysis, and keyword ranking potential."
                }
            },
            {
                "@type": "Question",
                name: "How do you measure and report on progress?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We provide detailed monthly reports covering keyword rankings, organic traffic growth, conversion rates, and ROI. Our AI dashboard gives you real-time visibility into your SEO performance."
                }
            },
            {
                "@type": "Question",
                name: "What industries do you specialize in?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "While our AI adapts to any industry, we have particular expertise in e-commerce, SaaS, professional services, healthcare, real estate, and local businesses."
                }
            },
            {
                "@type": "Question",
                name: "Can you help with international SEO?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely! Our AI supports multi-language and multi-region SEO strategies. We can optimize your content for different markets, handle hreflang implementation, and develop location-specific keyword strategies."
                }
            }
        ]
    };

    // Review schema for testimonials - helps with rich snippets
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://agseo.pro/#reviews",
        name: "AGSEO",
        review: [
            {
                "@type": "Review",
                author: {
                    "@type": "Organization",
                    name: "Bot Trade Pro"
                },
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                },
                reviewBody: "Thanks to AGSEO, we have dramatically improved our online visibility. Their AI-based approach has allowed us to surpass competitors who have been in the market for years.",
                datePublished: "2023-03-15"
            },
            {
                "@type": "Review",
                author: {
                    "@type": "Person",
                    name: "Joel Garcia"
                },
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                },
                reviewBody: "I struggled with my website ranking for years until I found AGSEO. Their methodology combined with AI is simply revolutionary. In less than 3 months, my organic visits increased by 215%.",
                datePublished: "2023-01-20"
            },
            {
                "@type": "Review",
                author: {
                    "@type": "Person",
                    name: "Hugo Diaz"
                },
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                },
                reviewBody: "What I value most about AGSEO is their approach based on real data and their ability to adapt strategies. The AI they use allows them to optimize resources and maximize results.",
                datePublished: "2023-02-10"
            },
            {
                "@type": "Review",
                author: {
                    "@type": "Person",
                    name: "Sergio Roldan"
                },
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                },
                reviewBody: "My online store has experienced exponential growth since working with AGSEO. The combination of traditional SEO with AI-powered analysis has been a game changer for our business.",
                datePublished: "2023-04-05"
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(serviceSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(reviewSchema)}
            </script>
        </Helmet>
    );
}
