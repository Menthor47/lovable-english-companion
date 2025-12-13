import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { getAbsoluteUrl } from "@/lib/siteMetadata";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
    className?: string;
}

// Route to label mapping for automatic breadcrumb generation
const routeLabels: Record<string, string> = {
    "/": "Home",
    "/about": "About Us",
    "/pricing": "Pricing",
    "/pricing/starter": "Starter Plan",
    "/pricing/business": "Business Plan",
    "/pricing/pro-business": "Pro Business",
    "/tools": "Tools",
    "/tools/audit": "AI Audit",
    "/tools/roi-calculator": "ROI Calculator",
    "/case-studies": "Case Studies",
    "/blog": "Blog",
    "/contact": "Contact",
    "/geo-optimization": "GEO Optimization",
    "/services/content": "Content & Programmatic SEO",
    "/compare": "Comparisons",
    "/resources/glossary": "SEO Glossary",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Service",
    "/cookies": "Cookie Policy",
    "/dashboard": "Client Portal",
};

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    for (const segment of segments) {
        currentPath += `/${segment}`;
        const label = routeLabels[currentPath] ||
            segment.split("-").map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(" ");
        breadcrumbs.push({ label, href: currentPath });
    }

    return breadcrumbs;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    const location = useLocation();
    const breadcrumbItems = items || generateBreadcrumbsFromPath(location.pathname);

    // Don't render on homepage
    if (location.pathname === "/") return null;

    // Generate BreadcrumbList schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: getAbsoluteUrl(item.href)
        }))
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>

            <nav
                aria-label="Breadcrumb"
                className={`text-sm ${className}`}
            >
                <ol className="flex items-center gap-1 text-muted-foreground">
                    {breadcrumbItems.map((item, index) => {
                        const isLast = index === breadcrumbItems.length - 1;
                        return (
                            <li key={item.href} className="flex items-center gap-1">
                                {index === 0 ? (
                                    <Link
                                        to={item.href}
                                        className="hover:text-primary transition-colors flex items-center gap-1"
                                        aria-label="Home"
                                    >
                                        <Home className="w-4 h-4" />
                                    </Link>
                                ) : isLast ? (
                                    <span
                                        className="text-foreground font-medium"
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                                {!isLast && (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
