import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://agseo.pro';
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DATA_DIR = path.join(SRC_DIR, 'data');

// Helper to extract slugs using regex (since we are reading TS files as text)
function extractSlugs(filePath, pattern) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const slugs = [];
        let match;
        const regex = new RegExp(pattern, 'g');
        while ((match = regex.exec(content)) !== null) {
            if (match[1]) slugs.push(match[1]);
        }
        return [...new Set(slugs)];
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
        return [];
    }
}

// Static routes from AnimatedRoutes.tsx (manual list for better control)
const staticRoutes = [
    '',
    '/privacy',
    '/terms',
    '/tools',
    '/tools/audit',
    '/dashboard',
    '/case-studies',
    '/resources/glossary',
    '/services',
    '/services/content',
    '/tools/roi-calculator',
    '/tools/serp-simulator',
    '/tools/keyword-mixer',
    '/tools/schema-generator',
    '/pricing',
    '/pricing/starter',
    '/pricing/business',
    '/pricing/pro-business',
    '/geo-optimization',
    '/cookies',
    '/blog',
    '/compare',
    '/contact',
    '/about',
];

async function generateSitemap() {
    console.log('Generating sitemap...');

    const urls = [...staticRoutes];

    // Extract dynamic routes
    const blogSlugs = extractSlugs(path.join(DATA_DIR, 'blogPosts.ts'), /slug:\s*["']([^"']+)["']/);
    blogSlugs.forEach(slug => urls.push(`/blog/${slug}`));

    const industrySlugs = extractSlugs(path.join(DATA_DIR, 'industries.ts'), /slug:\s*["']([^"']+)["']/);
    industrySlugs.forEach(slug => urls.push(`/industries/${slug}`));

    const caseStudyIds = extractSlugs(path.join(DATA_DIR, 'caseStudies.ts'), /id:\s*["']([^"']+)["']/);
    caseStudyIds.forEach(id => urls.push(`/case-studies/${id}`));

    const comparisonSlugs = extractSlugs(path.join(DATA_DIR, 'comparisons.ts'), /slug:\s*["']([^"']+)["']/);
    comparisonSlugs.forEach(slug => urls.push(`/compare/${slug}`));

    const authorIds = extractSlugs(path.join(DATA_DIR, 'authors.ts'), /id:\s*["']([^"']+)["']/);
    authorIds.forEach(id => urls.push(`/authors/${id}`));

    const date = new Date().toISOString().split('T')[0];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent);
    console.log(`Sitemap generated successfully in ${path.join(PUBLIC_DIR, 'sitemap.xml')}`);
    console.log(`Total URLs: ${urls.length}`);
}

generateSitemap().catch(console.error);
