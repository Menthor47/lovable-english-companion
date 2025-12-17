/**
 * RSS Feed Generator
 * 
 * Run with: npx tsx scripts/generate-rss.ts
 * Output: public/rss.xml
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
}

// Import blog posts (hardcoded for build-time generation)
const blogPosts: BlogPost[] = [
    {
        slug: "ai-business-success",
        title: "Leverage AI: Key to Business Success Today",
        excerpt: "Artificial intelligence isn't a future technology anymore—it's happening right now.",
        date: "May 10, 2025",
        author: "AGSEO Team",
        category: "Artificial Intelligence"
    },
    {
        slug: "react-seo-optimization",
        title: "React Website SEO: Keys to Effective Optimization",
        excerpt: "React presents unique challenges for SEO that traditional websites don't face.",
        date: "May 3, 2025",
        author: "AGSEO Team",
        category: "Technical SEO"
    },
    {
        slug: "smart-seo-ai",
        title: "Smart SEO: How AI Accelerates Your Google Ranking",
        excerpt: "Artificial intelligence is fundamentally changing how SEO works.",
        date: "April 26, 2025",
        author: "AGSEO Team",
        category: "Smart SEO"
    },
    {
        slug: "ecommerce-product-pages",
        title: "Perfect Product Pages: The SEO Secret of Successful E-commerce",
        excerpt: "Your product pages are where the rubber meets the road—where customers decide.",
        date: "April 22, 2025",
        author: "AGSEO Team",
        category: "E-commerce SEO"
    }
];

const SITE_URL = "https://agseo.pro";
const SITE_NAME = "AGSEO";
const SITE_DESCRIPTION = "AI-Powered SEO Insights and Strategies";

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function parseDate(dateStr: string): Date {
    // Handle "May 10, 2025" format
    return new Date(dateStr);
}

function generateRss(): string {
    const items = blogPosts
        .map(post => {
            const pubDate = parseDate(post.date).toUTCString();
            const link = `${SITE_URL}/blog/${post.slug}`;

            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>team@agseo.pro (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.webp</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;
}

// Generate and write RSS feed
const rssContent = generateRss();
const outputPath = resolve(process.cwd(), "public", "rss.xml");

writeFileSync(outputPath, rssContent, "utf-8");
console.log(`✅ RSS feed generated: ${outputPath}`);
console.log(`   ${blogPosts.length} posts included`);
