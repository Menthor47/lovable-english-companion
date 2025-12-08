import { LucideIcon, ShoppingBag, Database, MapPin, Stethoscope, Briefcase } from "lucide-react";

export interface IndustryData {
    id: string;
    slug: string;
    name: string;
    icon: LucideIcon;
    hero: {
        title: string;
        subtitle: string;
    };
    challenges: {
        title: string;
        description: string;
    }[];
    solution: {
        title: string;
        description: string;
        features: string[];
    };
    metrics: {
        label: string;
        value: string;
        description: string;
    }[];
}

export const industries: IndustryData[] = [
    {
        id: "saas",
        slug: "saas",
        name: "SaaS",
        icon: Database,
        hero: {
            title: "AI-Powered SEO for SaaS Companies",
            subtitle: "Stop burning cash on paid ads. Dominate high-intent 'VS' and 'Alternative' keywords with our entity-first strategy."
        },
        challenges: [
            {
                title: "High CAC",
                description: "Paid acquisition costs are skyrocketing, making unit economics unsustainable."
            },
            {
                title: "Feature Saturation",
                description: "Competitors are bidding on your brand keywords and creating confusion."
            },
            {
                title: "Long Sales Cycles",
                description: "Buyers need deep education before committing to enterprise contracts."
            }
        ],
        solution: {
            title: "The SaaS Growth Engine",
            description: "We build a defensible organic moat by targeting every stage of the funnel, from 'What is X?' to 'Best X for Enterprise'.",
            features: [
                "Competitor Comparison Pages ('Vs' & 'Alternatives')",
                "Use-Case Landing Pages",
                "Technical Documentation SEO",
                "Glossary & Definition Hubs"
            ]
        },
        metrics: [
            { label: "Pipeline Growth", value: "3.5x", description: "Average increase in qualified demo requests" },
            { label: "CAC Reduction", value: "-40%", description: "Decrease in blended customer acquisition cost" },
            { label: "Page 1 Rankings", value: "150+", description: "For high-intent commercial keywords" }
        ]
    },
    {
        id: "ecommerce",
        slug: "ecommerce",
        name: "E-commerce",
        icon: ShoppingBag,
        hero: {
            title: "Programmatic SEO for E-commerce Brands",
            subtitle: "Scale your organic traffic to thousands of SKUs automatically. Turn product pages into conversion machines."
        },
        challenges: [
            {
                title: "Thin Content",
                description: "Thousands of product pages with duplicate or manufacturer-provided descriptions."
            },
            {
                title: "Crawl Budget",
                description: "Google ignores deep inventory pages due to poor internal linking structures."
            },
            {
                title: "Seasonal Volatility",
                description: "Revenue crashes when Q4 ad costs spike."
            }
        ],
        solution: {
            title: "The E-com Revenue Protocol",
            description: "We use AI to generate unique, rich descriptions for every SKU and structure your site for maximum crawlability.",
            features: [
                "Automated Product Description Generation",
                "Dynamic Collection Page Optimization",
                "Schema Markup for Products & Reviews",
                "Faceted Navigation SEO"
            ]
        },
        metrics: [
            { label: "Revenue Lift", value: "+215%", description: "Increase in non-branded organic revenue" },
            { label: "Indexed Pages", value: "100%", description: "Coverage of your total inventory" },
            { label: "Traffic Value", value: "$45k", description: "Monthly equivalent ad spend saved" }
        ]
    },
    {
        id: "local",
        slug: "local",
        name: "Local Service",
        icon: MapPin,
        hero: {
            title: "Local Domination for Service Businesses",
            subtitle: "Own the Map Pack in your city. Capture high-intent leads searching for services 'near me'."
        },
        challenges: [
            {
                title: "Invisible on Maps",
                description: "Competitors with more reviews are stealing the top 3 spots in Google Maps."
            },
            {
                title: "Weak Citations",
                description: "Inconsistent NAP (Name, Address, Phone) data across directories."
            },
            {
                title: "Low Trust",
                description: "Lack of recent reviews makes customers choose the other guy."
            }
        ],
        solution: {
            title: "The Local Authority Framework",
            description: "We turn your Google Business Profile into a lead magnet and build a fortress of local citations.",
            features: [
                "Google Business Profile Automation",
                "Hyper-local Service Area Pages",
                "Automated Review Generation",
                "Local Link Building"
            ]
        },
        metrics: [
            { label: "Calls Generated", value: "+85%", description: "Increase in inbound phone calls" },
            { label: "Map Rankings", value: "#1", description: "For primary service keywords" },
            { label: "Review Growth", value: "5x", description: "Faster accumulation of 5-star reviews" }
        ]
    },
    {
        id: "healthcare",
        slug: "healthcare",
        name: "Healthcare",
        icon: Stethoscope,
        hero: {
            title: "HIPAA-Compliant SEO for Healthcare",
            subtitle: "Grow your patient volume with medical content that builds trust and ranks."
        },
        challenges: [
            {
                title: "YMYL Scrutiny",
                description: "Google's 'Your Money Your Life' standards require higher authority."
            },
            {
                title: "Compliance",
                description: "Content must be medically accurate and legally safe."
            },
            {
                title: "Patient Trust",
                description: "Patients research extensively before booking appointments."
            }
        ],
        solution: {
            title: "The Medical Authority System",
            description: "We create medically-reviewed content that establishes your practitioners as thought leaders.",
            features: [
                "Medically Reviewed Content Production",
                "Practitioner Entity Optimization",
                "Condition & Treatment Pages",
                "Local Clinic SEO"
            ]
        },
        metrics: [
            { label: "Patient Bookings", value: "+60%", description: "Increase in online appointments" },
            { label: "Authority Score", value: "DA 50+", description: "Growth in domain authority" },
            { label: "Trust Signals", value: "100%", description: "Compliance with E-E-A-T guidelines" }
        ]
    },
    {
        id: "professional",
        slug: "professional-services",
        name: "Professional Services",
        icon: Briefcase,
        hero: {
            title: "Authority SEO for Firms & Agencies",
            subtitle: "Stop relying on referrals. Build a predictable inbound lead engine for your firm."
        },
        challenges: [
            {
                title: "Word of Mouth Limits",
                description: "Referrals are great but unpredictable and hard to scale."
            },
            {
                title: "LinkedIn Fatigue",
                description: "Outbound outreach is getting harder and less effective."
            },
            {
                title: "Expertise Gap",
                description: "Generic content writers can't capture your firm's nuance."
            }
        ],
        solution: {
            title: "The Thought Leader Protocol",
            description: "We translate your experts' knowledge into high-ranking content that attracts qualified clients.",
            features: [
                "Expert Interview Content Series",
                "Whitepaper & Asset Creation",
                "LinkedIn Personal Branding Sync",
                "High-Ticket Keyword Targeting"
            ]
        },
        metrics: [
            { label: "Lead Quality", value: "9/10", description: "Rated by sales teams" },
            { label: "Deal Size", value: "+25%", description: "Increase in average contract value" },
            { label: "Organic Leads", value: "40%", description: "Of total pipeline sourced from SEO" }
        ]
    }
];
