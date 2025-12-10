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

export interface FooterLinkGroup {
    titleKey: string;
    links: { label: string; href: string }[];
}

export const footerLinks: Record<string, FooterLinkGroup> = {
    services: {
        titleKey: "nav.services",
        links: [
            { label: "Content & Programmatic SEO", href: "/services/content" },
            { label: "GEO Optimization", href: "/geo-optimization" },
            { label: "Local SEO", href: "/#services" },
            { label: "E-commerce SEO", href: "/#services" },
        ]
    },
    company: {
        titleKey: "footer.company",
        links: [
            { label: "About Us", href: "/#home" },
            { label: "Pricing", href: "/pricing" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Blog", href: "/blog" },
        ]
    },
    resources: {
        titleKey: "footer.resources",
        links: [
            { label: "Free Audit", href: "/tools/audit" },
            { label: "ROI Calculator", href: "/tools/roi-calculator" },
            { label: "Contact Us", href: "/contact" },
        ]
    },
    legal: {
        titleKey: "footer.legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
        ]
    }
};
