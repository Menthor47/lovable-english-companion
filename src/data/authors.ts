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
        name: "AGSEO Team",
        role: "Editorial Team",
        bio: "The AGSEO editorial team brings together experts in SEO, AI, content marketing, and technical optimization. Our collective experience spans various industries including e-commerce, SaaS, and local businesses.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
        credentials: [
            "Combined 50+ years industry experience",
            "Certified across Google, HubSpot, and Semrush",
            "Published in leading SEO publications"
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
