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
                href: "/geo-optimization"
            },
            {
                title: "technical",
                href: "/#services"
            },
            {
                title: "paid",
                href: "/#services"
            },
            {
                title: "content",
                href: "/services/content"
            }
        ]
    },
    {
        title: "products",
        href: "#products",
        items: [
            {
                title: "toolsHub",
                href: "/tools"
            },
            {
                title: "aiAudit",
                href: "/tools/audit"
            },
            {
                title: "roi",
                href: "/tools/roi-calculator"
            },
            {
                title: "portal",
                href: "/dashboard"
            }
        ]
    },
    {
        title: "resources",
        href: "#resources",
        items: [
            {
                title: "caseStudies",
                href: "/case-studies"
            },
            {
                title: "comparisons",
                href: "/compare"
            },
            {
                title: "glossary",
                href: "/resources/glossary"
            },
            {
                title: "blog",
                href: "/blog"
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
            { label: "footer.links.contentProgrammatic", href: "/services/content" },
            { label: "footer.links.geoOptimization", href: "/geo-optimization" },
            { label: "footer.links.localSeo", href: "/#services" },
            { label: "footer.links.ecommerceSeo", href: "/#services" },
        ]
    },
    company: {
        titleKey: "footer.company",
        links: [
            { label: "footer.links.aboutUs", href: "/about" },
            { label: "footer.links.pricing", href: "/pricing" },
            { label: "footer.links.caseStudies", href: "/case-studies" },
            { label: "footer.links.blog", href: "/blog" },
        ]
    },
    resources: {
        titleKey: "footer.resources",
        links: [
            { label: "footer.links.freeAudit", href: "/tools/audit" },
            { label: "footer.links.roiCalculator", href: "/tools/roi-calculator" },
            { label: "footer.links.contactUs", href: "/contact" },
        ]
    },
    legal: {
        titleKey: "footer.legal",
        links: [
            { label: "footer.links.privacyPolicy", href: "/privacy" },
            { label: "footer.links.termsOfService", href: "/terms" },
            { label: "footer.links.cookiePolicy", href: "/cookies" },
        ]
    }
};
