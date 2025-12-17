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
        title: "Transforming Organic Revenue for a Fashion E-commerce Brand",
        description: "How AI-driven product descriptions and technical SEO helped a mid-size fashion retailer reduce paid ad dependency.",
        icon: ShoppingCart,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        stats: [
            { label: "Revenue Growth", value: "3x" },
            { label: "Keywords Ranked", value: "3,400+" },
            { label: "Time to Results", value: "4 mo" },
        ],
        content: {
            challenge: "The brand was relying entirely on paid ads (FB/IG) with rising CAC. Organic traffic was stagnant due to thin content on 500+ product pages.",
            strategy: "We deployed our 'Programmatic Content Engine' to generate unique, entity-rich descriptions for all 500 SKUs using GPT-4, validated by human editors. We also implemented schema markup for 'Product' and 'Review' entities.",
            results: "Within 4 months, organic revenue overtook paid revenue. The site now ranks for 3,400+ commercial keywords. *Results specific to this engagement; individual outcomes vary."
        }
    },
    {
        id: "saas-growth",
        category: "SaaS",
        title: "Building Organic Traffic from Zero for HR-Tech SaaS",
        description: "A focused content and GEO strategy to rank for high-intent comparison keywords in a competitive software market.",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        stats: [
            { label: "Monthly Visitors", value: "10k+" },
            { label: "Conversion Rate", value: "3.5%" },
            { label: "Time to Results", value: "6 mo" },
        ],
        content: {
            challenge: "A new HR-tech SaaS had zero domain authority and was competing with established players in a crowded market.",
            strategy: "Instead of generic 'what is HR tech' blogs, we targeted 'VS' keywords and specific feature comparisons. We used our Entity Graph tool to map out the semantic gaps in competitor content.",
            results: "The site reached 10k qualified monthly visitors in 6 months, with above-average conversion rates. *Results specific to this engagement; individual outcomes vary."
        }
    },
    {
        id: "legal-firm-local",
        category: "Local Service",
        title: "Winning the Local Pack for a Family Law Practice",
        description: "How Google Business Profile optimization and local citations transformed lead generation for a regional law firm.",
        icon: TrendingUp,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        stats: [
            { label: "Local Pack Rank", value: "#1" },
            { label: "Inbound Calls", value: "+85%" },
            { label: "Citations Built", value: "40+" },
        ],
        content: {
            challenge: "A family law firm was invisible in the 'Local Pack' (Map results) and bleeding leads to larger aggregators.",
            strategy: "We implemented an automated review generation system and optimized the GBP with weekly posts and Q&A seeding. We also built 40+ hyper-local citation pages for surrounding suburbs.",
            results: "The firm now holds top positions for key local terms, generating significantly more inbound calls. *Results specific to this engagement; individual outcomes vary."
        }
    },
    {
        id: "fintech-ai",
        category: "Enterprise",
        title: "Accelerating Content Velocity for a Regulated Fintech",
        description: "How a custom AI compliance workflow unlocked scalable content production for a financial services company.",
        icon: Globe,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        stats: [
            { label: "Keywords Ranked", value: "500+" },
            { label: "Approval Time", value: "48 hrs" },
            { label: "Content Velocity", value: "10x" },
        ],
        content: {
            challenge: "A fintech company needed content but was paralyzed by compliance bottlenecks. Approvals took weeks.",
            strategy: "We built a custom 'Compliance Agent' in our workflow that pre-checks content against their legal guidelines before human review. This reduced approval time from 14 days to 48 hours.",
            results: "Content velocity increased significantly, resulting in strong rankings for high-value commercial terms. *Results specific to this engagement; individual outcomes vary."
        }
    }
];
