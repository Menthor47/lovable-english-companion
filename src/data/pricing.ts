import { Target, FileText, Wrench, PenTool, Link2, MapPin, BarChart3, Settings, Zap, Globe, Briefcase, TrendingUp } from "lucide-react";

export interface ServiceCategory {
    icon: React.ElementType;
    title: string;
    items: string[];
}

export interface PricingTierData {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    contract: string;
    targetClient: string;
    icon: React.ElementType;
    iconColorClass: string;
    iconBgClass: string;
    iconBorderClass: string;
    isPopular?: boolean;
    ctaText: string;
    includesText?: string;
    serviceCategories: ServiceCategory[];
    notIncluded?: string[];
    notIncludedText?: string;
    addOns?: string[];
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    summaryTitle: string;
    summaryText: string;
}

export const pricingData: Record<string, PricingTierData> = {
    starter: {
        id: "starter",
        name: "Starter",
        subtitle: "SEO Foundation for Growing Businesses",
        price: "€470 - €1,200",
        contract: "3-6 months",
        targetClient: "Local businesses, startups, solopreneurs",
        icon: Shield,
        iconColorClass: "text-blue-400",
        iconBgClass: "bg-blue-500/20",
        iconBorderClass: "border-blue-500/30",
        ctaText: "Get Started with Starter Plan",
        metaTitle: "Starter SEO Package - AGSEO | €470-€1,200/month",
        metaDescription: "SEO Foundation for Growing Businesses. Perfect for local businesses, startups, and solopreneurs. 15-20 keywords, technical audit, content creation, and local SEO.",
        canonicalUrl: "https://agseo.pro/pricing/starter",
        summaryTitle: "Ready to Start Growing?",
        summaryText: "Get a free consultation to discuss how our Starter plan can help your business establish a strong SEO foundation.",
        serviceCategories: [
            {
                icon: Target,
                title: "Strategy & Research",
                items: [
                    "Initial SEO strategy session (1x onboarding call)",
                    "Keyword research: 15-20 target keywords",
                    "Basic competitor analysis (top 3 competitors)",
                    "Niche/market positioning document"
                ]
            },
            {
                icon: FileText,
                title: "On-Page Optimization",
                items: [
                    "2-3 pages optimized per month (meta titles, descriptions, H1/H2 tags, alt text)",
                    "Internal linking strategy for optimized pages",
                    "Basic schema markup (Organization, LocalBusiness, Product)",
                    "Content optimization guidance (word count, keyword density, readability)"
                ]
            },
            {
                icon: Wrench,
                title: "Technical SEO",
                items: [
                    "One-time technical audit (initial month)",
                    "Basic crawl analysis (broken links, redirects, XML sitemap)",
                    "Mobile responsiveness check",
                    "Core Web Vitals monitoring (basic)",
                    "SSL/HTTPS verification",
                    "robots.txt & sitemap optimization"
                ]
            },
            {
                icon: PenTool,
                title: "Content Production",
                items: [
                    "1 blog article per month (800-1,200 words, keyword-optimized)",
                    "Content calendar planning (monthly)",
                    "Basic copywriting for service/product pages"
                ]
            },
            {
                icon: Link2,
                title: "Link Building & Off-Page",
                items: [
                    "2-3 press releases per month",
                    "Basic local citations (5-7 directories: Google Business, Yelp, Facebook)",
                    "NAP (Name, Address, Phone) consistency audit",
                    "Social media optimization basics"
                ]
            },
            {
                icon: MapPin,
                title: "Local SEO",
                items: [
                    "Google Business Profile setup/optimization",
                    "5-7 local directory listings",
                    "Local review monitoring (basic)",
                    "Local keyword targeting (city/region level)"
                ]
            },
            {
                icon: BarChart3,
                title: "Reporting & Analytics",
                items: [
                    "Monthly performance report (PDF, 5-8 pages)",
                    "Key metrics: rankings, organic traffic, clicks, impressions, CTR",
                    "Google Search Console & Analytics setup/access",
                    "Basic month-over-month comparison"
                ]
            },
            {
                icon: Settings,
                title: "Tools & Software Included",
                items: [
                    "Access to shared reporting dashboard",
                    "Google Search Console access",
                    "Basic rank tracking (limited keywords)",
                    "Monthly email support"
                ]
            }
        ],
        notIncluded: [
            "Link building campaigns (active outreach)",
            "PPC management",
            "Video SEO",
            "CRO/conversion optimization",
            "Dedicated account manager",
            "Weekly calls",
            "Advanced technical SEO (Core Web Vitals optimization, JS rendering)",
            "AI agent development"
        ],
        notIncludedText: "These advanced features are available in our Business and Pro Business tiers."
    },
    business: {
        id: "business",
        name: "Business",
        subtitle: "Professional SEO Growth for Competitive Markets",
        price: "$1,500 - $4,200",
        contract: "6 months (12-month discount)",
        targetClient: "Growing SMEs, established e-commerce",
        icon: Zap,
        iconColorClass: "text-primary",
        iconBgClass: "bg-primary/20",
        iconBorderClass: "border-primary/30",
        isPopular: true,
        ctaText: "Get Started with Business Plan",
        includesText: "Includes everything from Starter tier",
        metaTitle: "Business SEO Package - AGSEO | €1,500-€4,200/month",
        metaDescription: "Professional SEO Growth for Competitive Markets. For growing SMEs, established e-commerce, and regional services. 40-60 keywords, quarterly audits, guest posting, and advanced link building.",
        canonicalUrl: "https://agseo.pro/pricing/business",
        summaryTitle: "Ready to Scale Your Business?",
        summaryText: "Get a free consultation to discuss how our Business plan can accelerate your growth in competitive markets.",
        serviceCategories: [
            {
                icon: Target,
                title: "Strategy & Research",
                items: [
                    "Quarterly strategy review call (1x per quarter)",
                    "Keyword research: 40-60 target keywords (expanded)",
                    "Competitive analysis: Top 5-7 competitors (deep dive)",
                    "Quarterly market opportunity report",
                    "Audience/buyer persona research"
                ]
            },
            {
                icon: FileText,
                title: "On-Page Optimization",
                items: [
                    "4-6 pages optimized per month",
                    "Advanced schema markup (Review, FAQ, BreadcrumbList, Video, Article)",
                    "Internal linking optimization (pillar-cluster model, 2-3 clusters)",
                    "Page experience optimization (user signals focus)"
                ]
            },
            {
                icon: Wrench,
                title: "Technical SEO",
                items: [
                    "Quarterly technical audits (comprehensive, 100+ factors)",
                    "Site speed optimization (image compression, caching, CDN)",
                    "Mobile-first indexing verification",
                    "Core Web Vitals optimization (LCP, FID, CLS improvements)",
                    "Advanced crawl analysis (orphan pages, duplicate content)",
                    "Structured data troubleshooting via Google Rich Results Test"
                ]
            },
            {
                icon: PenTool,
                title: "Content Production",
                items: [
                    "3 blog articles per month (1,500-2,000 words, high-intent)",
                    "Long-form content strategy (pillar pages, comprehensive guides)",
                    "Content cluster mapping (topical authority building)",
                    "SEO content brief creation (detailed, data-driven)"
                ]
            },
            {
                icon: Link2,
                title: "Link Building & Off-Page",
                items: [
                    "7-10 press releases per month",
                    "Guest posting/blogger outreach (3-5 guest posts per month)",
                    "Digital PR outreach (media mentions, publications)",
                    "Listings on 4-5 business directories (Yellow Pages style)",
                    "Backlink profile analysis & toxic link removal",
                    "Brand mention monitoring & citation building"
                ]
            },
            {
                icon: MapPin,
                title: "Local SEO",
                items: [
                    "Multi-location SEO strategy (if applicable)",
                    "Google Business Profile advanced optimization (posts, Q&A, reviews)",
                    "Local review generation strategy",
                    "15-20 local citations (niche-specific + tier-2)",
                    "Local link building (partnerships, sponsorships, local press)"
                ]
            },
            {
                icon: TrendingUp,
                title: "Paid Traffic Integration (Optional)",
                items: [
                    "Keyword insights from Google Ads data",
                    "PPC-SEO alignment strategy",
                    "Organic traffic opportunity identification from paid search"
                ]
            },
            {
                icon: BarChart3,
                title: "Reporting & Analytics",
                items: [
                    "Bi-weekly performance summary emails",
                    "Monthly comprehensive report (12-15 pages, branded)",
                    "Quarterly strategy call with insights + recommendations",
                    "Real-time reporting dashboard (limited metrics)",
                    "Competitor ranking tracking (5-7 competitors)",
                    "Traffic source analysis (organic, direct, referral attribution)"
                ]
            },
            {
                icon: Settings,
                title: "Tools & Software Included",
                items: [
                    "Full reporting dashboard access",
                    "Google Search Console, GA4 integration",
                    "Rank tracking (40-60 keywords)",
                    "Competitor rank tracking (daily updates)",
                    "Keyword research tool access",
                    "Content brief generation tool",
                    "Monthly email + quarterly call support"
                ]
            }
        ],
        notIncluded: [
            "Paid advertising management (PPC, Facebook Ads)",
            "Video SEO services",
            "Full CRO/conversion optimization",
            "Dedicated full-time account manager",
            "Weekly/bi-weekly calls",
            "E-commerce specific features (product schema at scale)",
            "Custom AI agents"
        ],
        notIncludedText: "These enterprise features are available in our Pro Business tier."
    },
    pro: {
        id: "pro",
        name: "Pro Business",
        subtitle: "Enterprise SEO: Revenue-Focused, Scalable Growth",
        price: "Custom Quote",
        contract: "12+ months",
        targetClient: "Large enterprises, multi-location brands",
        icon: Globe,
        iconColorClass: "text-purple-400",
        iconBgClass: "bg-purple-500/20",
        iconBorderClass: "border-purple-500/30",
        ctaText: "Let's Talk - Contact Sales",
        includesText: "Includes everything from Business tier",
        metaTitle: "Enterprise SEO Package - AGSEO | Custom Solutions",
        metaDescription: "Enterprise SEO: Revenue-Focused, Scalable Growth. For large enterprises and multi-location brands. Custom strategy, dedicated account manager, advanced technical SEO, and full CRO.",
        canonicalUrl: "https://agseo.pro/pricing/pro-business",
        summaryTitle: "Build Your Custom Solution",
        summaryText: "Contact our sales team to design an SEO strategy that aligns perfectly with your enterprise goals.",
        serviceCategories: [
            {
                icon: Target,
                title: "Strategic Consulting",
                items: [
                    "Dedicated account manager (primary contact)",
                    "Bi-weekly strategy calls (30-45 min)",
                    "Monthly board-level reporting call",
                    "Quarterly business review (QBR) with recommendations",
                    "Annual SEO audit + market opportunity assessment",
                    "Competitive intelligence reports (monthly)"
                ]
            },
            {
                icon: FileText,
                title: "On-Page Optimization",
                items: [
                    "8-12+ pages optimized per month",
                    "Custom content strategy aligned to business goals (revenue attribution)",
                    "Advanced UX signals optimization (dwell time, click-through)",
                    "Conversion-focused page optimization (CRO elements)",
                    "A/B testing framework for landing pages"
                ]
            },
            {
                icon: Wrench,
                title: "Technical SEO (Advanced)",
                items: [
                    "Monthly technical audits (enterprise-scale, 200+ factors)",
                    "Site speed optimization at scale",
                    "JavaScript/React rendering optimization",
                    "Crawl budget optimization",
                    "International/hreflang strategy (if applicable)",
                    "Site architecture redesign recommendations",
                    "Server migration/relocation strategy"
                ]
            },
            {
                icon: PenTool,
                title: "Content Production & Strategy",
                items: [
                    "5-8 blog articles per month (2,000-3,500 words, high-authority)",
                    "Pillar page creation (comprehensive topic hubs)",
                    "Content cluster strategy (large-scale topical authority)",
                    "Guest posting on premium publications (high DA 50+)",
                    "Original research/data-driven content",
                    "Video content strategy & optimization"
                ]
            },
            {
                icon: Link2,
                title: "Advanced Link Building",
                items: [
                    "15-20+ press releases per month",
                    "8-12+ guest posts per month (premium publications)",
                    "Broken link reclamation campaigns",
                    "Resource page link placement",
                    "Podcast/interview placements",
                    "Sponsorship & partnership link strategy",
                    "Digital PR in major publications"
                ]
            },
            {
                icon: MapPin,
                title: "Local & Multi-Location",
                items: [
                    "50+ local citations (all relevant directories)",
                    "Multi-location SEO framework",
                    "Location page strategy & optimization",
                    "Local review generation at scale (automated)",
                    "Territory-based content strategy"
                ]
            },
            {
                icon: Briefcase,
                title: "E-Commerce SEO (if applicable)",
                items: [
                    "Product page optimization at scale",
                    "Category page strategy",
                    "Product review schema optimization",
                    "Inventory-driven keyword targeting",
                    "Shopping feed optimization"
                ]
            },
            {
                icon: BarChart3,
                title: "Reporting & Analytics (Enterprise)",
                items: [
                    "Real-time executive dashboard (custom metrics)",
                    "Weekly performance snapshots",
                    "Monthly comprehensive report (20+ pages, branded)",
                    "Custom metric tracking (revenue, leads, conversions)",
                    "Industry trend analysis & forecasting"
                ]
            }
        ],
        addOns: [
            "AI Agents/Automation: Custom AI workflows",
            "White-Label Delivery: Full rebranding for agencies",
            "International SEO: Multi-language expansion",
            "Advanced PPC Integration",
            "Video SEO & Podcast SEO"
        ]
    }
};

import { Shield } from "lucide-react"; // Import Shield here as it was missed in top import
