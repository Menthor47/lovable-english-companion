// Author profiles for E-E-A-T signals
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
        id: "alex-turner",
        name: "Alex Turner",
        role: "Head of Content & SEO",
        bio: "Alex is a seasoned SEO strategist with over 10 years of experience in digital marketing. Specializing in AI-powered content optimization and technical SEO, Alex has helped numerous businesses achieve top rankings across search engines and AI platforms.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        credentials: [
            "Google Analytics Certified",
            "Google Ads Certified",
            "HubSpot Content Marketing Certified",
            "10+ years in SEO & Content Strategy"
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/in/alexturner",
            twitter: "https://twitter.com/alexturner"
        }
    },
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
            linkedin: "https://linkedin.com/company/agseo",
            twitter: "https://twitter.com/agseopro"
        }
    }
];

export function getAuthorById(id: string): Author | undefined {
    return authors.find(author => author.id === id);
}

export function getAuthorByName(name: string): Author | undefined {
    return authors.find(author => author.name.toLowerCase() === name.toLowerCase());
}
