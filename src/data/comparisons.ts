import { LucideIcon, PenTool, Search, Zap } from "lucide-react";

export interface ComparisonData {
    id: string;
    slug: string;
    toolA: {
        name: string;
        description: string;
        pros: string[];
        cons: string[];
        price: string;
        rating: string;
    };
    toolB: {
        name: string;
        description: string;
        pros: string[];
        cons: string[];
        price: string;
        rating: string;
    };
    verdict: {
        winner: "ToolA" | "ToolB" | "Tie";
        summary: string;
        bestFor: string;
    };
    category: "AI Writing" | "SEO Analysis" | "Content Optimization";
}

export const comparisons: ComparisonData[] = [
    {
        id: "jasper-vs-copyai",
        slug: "jasper-vs-copyai",
        category: "AI Writing",
        toolA: {
            name: "Jasper AI",
            description: "A robust AI writing assistant built for marketing teams and enterprise scale content operations.",
            pros: ["Powerful Brand Voice features", "50+ Marketing Templates", "SurferSEO Integration"],
            cons: ["Higher starting price", "Can be complex for beginners"],
            price: "$39/mo",
            rating: "4.8/5"
        },
        toolB: {
            name: "Copy.ai",
            description: "A streamlined AI writer focused on social media posts, email copy, and short-form content.",
            pros: ["Free Forever plan available", "Very intuitive interface", "Great for social media"],
            cons: ["Less cohesive long-form editor", "Fewer enterprise features"],
            price: "$36/mo",
            rating: "4.6/5"
        },
        verdict: {
            winner: "ToolA",
            summary: "Jasper wins for long-form SEO content and serious marketing teams due to its workflow integrations. Copy.ai is better for quick social posts.",
            bestFor: "Marketing Agencies & Enterprise"
        }
    },
    {
        id: "surfer-vs-frase",
        slug: "surfer-vs-frase",
        category: "Content Optimization",
        toolA: {
            name: "Surfer SEO",
            description: "The industry standard for NLP-based content optimization, focusing on correlation SEO data.",
            pros: ["Precise keyword density suggestions", "Audit tool for existing pages", "Jasper integration"],
            cons: ["Expensive add-ons", "UI can be cluttered"],
            price: "$89/mo",
            rating: "4.9/5"
        },
        toolB: {
            name: "Frase",
            description: "An all-in-one SEO content workflow tool that combines research, briefing, and writing.",
            pros: ["Excellent research & outline builder", "More affordable", "Integrated AI writer"],
            cons: ["NLP scoring is less granular", "Smaller community"],
            price: "$14.99/mo",
            rating: "4.7/5"
        },
        verdict: {
            winner: "Tie",
            summary: "Surfer is the choice for pure ranking power and optimization score obsessives. Frase is superior for the research and briefing phase of content creation.",
            bestFor: "Content Strategists (Frase) vs SEOs (Surfer)"
        }
    },
    {
        id: "semrush-vs-ahrefs",
        slug: "semrush-vs-ahrefs",
        category: "SEO Analysis",
        toolA: {
            name: "Semrush",
            description: "An all-in-one marketing toolkit covering SEO, PPC, social media, and content marketing.",
            pros: ["Huge keyword database", "Intent analysis features", "Local SEO tools included"],
            cons: ["Steep learning curve", "Interface is dense"],
            price: "$129.95/mo",
            rating: "4.8/5"
        },
        toolB: {
            name: "Ahrefs",
            description: "A powerful SEO toolset best known for its backlink analysis and web crawler capabilities.",
            pros: ["Best-in-class link data", "Clean, fast UI", "Content Explorer is unique"],
            cons: ["Credit-based usage limits", "No social media tools"],
            price: "$99/mo",
            rating: "4.9/5"
        },
        verdict: {
            winner: "Tie",
            summary: "Choose Ahrefs if your primary focus is link building and technical audits. Choose Semrush if you need a broad digital marketing suite including PPC.",
            bestFor: "Link Builders (Ahrefs) vs Generalists (Semrush)"
        }
    }
];
