import { ShoppingCart, Users, TrendingUp, Globe, type LucideIcon } from "lucide-react";

export interface CaseStudy {
    id: string;
    category: "E-commerce" | "SaaS" | "Local Service" | "Enterprise";
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    stats: { label: string; value: string }[];
    content: {
        challenge: string;
        strategy: string;
        results: string;
    };
}

export const caseStudies: CaseStudy[] = [
    {
        id: "fashion-brand-seo",
        category: "E-commerce",
        title: "Scaling Organic Sales by 215% for Fashion Brand",
        description: "How we used AI-driven product descriptions and technical SEO to dominate the fashion niche.",
        icon: ShoppingCart,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        stats: [
            { label: "Revenue Increase", value: "+215%" },
            { label: "Organic Traffic", value: "+450%" },
            { label: "ROI", value: "12x" },
        ],
        content: {
            challenge: "The brand was relying entirely on paid ads (FB/IG) with rising CAC. Organic traffic was stagnant due to thin content on 500+ product pages.",
            strategy: "We deployed our 'Programmatic Content Engine' to generate unique, entity-rich descriptions for all 500 SKUs using GPT-4, validated by human editors. We also implemented schema markup for 'Product' and 'Review' entities.",
            results: "Within 4 months, organic revenue overtook paid revenue. The site now ranks for 3,400+ commercial keywords."
        }
    },
    {
        id: "saas-growth",
        category: "SaaS",
        title: "From 0 to 10k Monthly Visitors in 6 Months",
        description: "A comprehensive GEO strategy to rank for high-intent keywords in the crowded software market.",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        stats: [
            { label: "Monthly Users", value: "10k+" },
            { label: "Signups", value: "+180%" },
            { label: "CAC Reduction", value: "-40%" },
        ],
        content: {
            challenge: "A new HR-tech SaaS had zero domain authority and was competing with unicorns like Gusto and BambooHR.",
            strategy: "Instead of generic 'what is HR tech' blogs, we targeted 'VS' keywords and specific feature comparisons (e.g., 'Gusto alternative for small teams'). We used our Entity Graph tool to map out the semantic gaps in competitor content.",
            results: "The site reached 10k qualified monthly visitors in 6 months, with a conversion rate of 3.5% (web average is 1.5%)."
        }
    },
    {
        id: "legal-firm-local",
        category: "Local Service",
        title: "Dominating Local Search for Legal Firm",
        description: "Leveraging Google Business Profile automation and local citations to capture 60% market share.",
        icon: TrendingUp,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        stats: [
            { label: "Calls Generated", value: "+85%" },
            { label: "Local Pack Rank", value: "#1" },
            { label: "Consultations", value: "+120%" },
        ],
        content: {
            challenge: "A family law firm was invisible in the 'Local Pack' (Map results) and bleeding leads to larger aggregators.",
            strategy: "We implemented an automated review generation system and optimized the GBP with weekly posts and Q&A seeding. We also built 40+ hyper-local citation pages for surrounding suburbs.",
            results: "They now hold the #1 spot for 'Divorce Lawyer [City]' and 'Family Attorney [City]', generating 85% more inbound calls."
        }
    },
    {
        id: "fintech-ai",
        category: "Enterprise",
        title: "AI-Powered Compliance for Fintech Giant",
        description: "Securing 500+ secure keywords for a regulated financial entity using white-hat AI content.",
        icon: Globe,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        stats: [
            { label: "Keywords Ranked", value: "500+" },
            { label: "Compliance Score", value: "100%" },
            { label: "Traffic Value", value: "$45k/mo" },
        ],
        content: {
            challenge: "A fintech company needed content but was paralyzed by compliance bottlenecks. Approvals took weeks.",
            strategy: "We built a custom 'Compliance Agent' in our workflow that pre-checks content against their legal guidelines before human review. This reduced approval time from 14 days to 48 hours.",
            results: "Content velocity increased 10x, resulting in dominant rankings for high-value terms like 'automated invoice processing' and 'enterprise expense management'."
        }
    }
];
