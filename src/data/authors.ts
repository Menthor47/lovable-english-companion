// Author profiles for E-E-A-T signals
import { config } from "@/lib/config";

export interface Author {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    credentials: string[];
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

export const authors: Author[] = [
    {
        id: "agseo-team",
        
        name: "AGSEO Editorial",
        role: "Research & Strategy Team",
        bio: "Our editorial team combines hands-on SEO practitioners, AI engineers, and content strategists. Every piece we publish is reviewed for accuracy and aligned with current best practices.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
        credentials: [
            "Google Analytics & Ads Certified",
            "Semrush Academy Certified",
            "Active practitioners across e-commerce, SaaS, and local SEO"
        ],
        socialLinks: {
            linkedin: config.social.linkedin,
            twitter: config.social.twitter
        }
    }
];

export function getAuthorById(id: string): Author | undefined {
    return authors.find(author => author.id === id);
}

export function getAuthorByName(name: string): Author | undefined {
    return authors.find(author => author.name.toLowerCase() === name.toLowerCase());
}
