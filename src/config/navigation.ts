export interface NavItem {
    title: string;
    href: string;
    description?: string;
    items?: NavItem[];
}

export const navigationConfig: NavItem[] = [
    {
        title: "solutions",
        href: "#services",
        items: [
            {
                title: "aeoGeo",
                href: "/geo-optimization",
                description: "Dominate Voice Search & AI Answers"
            },
            {
                title: "technical",
                href: "/#services",
                description: "Future-Proof Your Site Structure"
            },
            {
                title: "paid",
                href: "/#services",
                description: "Maximize ROI with Smart Ads"
            },
            {
                title: "content",
                href: "/services/content",
                description: "Authority-Building Content Strategy"
            }
        ]
    },
    {
        title: "products",
        href: "#products",
        items: [
            {
                title: "toolsHub",
                href: "/tools",
                description: "Free AI utilities to boost your workflow."
            },
            {
                title: "aiAudit",
                href: "/tools/audit",
                description: "Get a comprehensive site analysis in seconds."
            },
            {
                title: "roi",
                href: "/tools/roi-calculator",
                description: "Project your potential revenue growth."
            },
            {
                title: "portal",
                href: "/dashboard",
                description: "Live analytics and project tracking demo."
            }
        ]
    },
    {
        title: "resources",
        href: "#resources",
        items: [
            {
                title: "caseStudies",
                href: "/case-studies",
                description: "See how we drove 300% growth for clients."
            },
            {
                title: "comparisons",
                href: "/compare",
                description: "Unbiased battles between top AI tools."
            },
            {
                title: "glossary",
                href: "/resources/glossary",
                description: "Master the terminology of modern search."
            },
            {
                title: "blog",
                href: "/blog",
                description: "Latest insights and industry updates."
            }
        ]
    },
    {
        title: "pricing",
        href: "/pricing"
    },
    {
        title: "contact",
        href: "/contact"
    }
];
