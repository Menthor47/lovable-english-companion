import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render, i18n } = await import('./dist/server/entry-server.js');

// Load translations
const enTranslations = JSON.parse(fs.readFileSync(toAbsolute('public/locales/en/translation.json'), 'utf-8'));
i18n.addResourceBundle('en', 'translation', enTranslations);
i18n.changeLanguage('en');

// Helper to extract URLs from sitemap
function getRoutesFromSitemap() {
    try {
        const sitemap = fs.readFileSync(toAbsolute('public/sitemap.xml'), 'utf-8');
        const urls = [];
        const regex = /<loc>(.*?)<\/loc>/g;
        let match;
        while ((match = regex.exec(sitemap)) !== null) {
            try {
                const urlObj = new URL(match[1]);
                urls.push(urlObj.pathname);
            } catch (e) {
                console.warn('Invalid URL in sitemap:', match[1]);
            }
        }
        // Filter duplicates and basic cleanup
        return [...new Set(urls)].filter(url => url);
    } catch (e) {
        console.error('Error reading sitemap:', e);
        return ['/']; // Fallback
    }
}

const routesToPrerender = getRoutesFromSitemap();

// Ensure we have a stable not-found page for internal redirects and static hosts
if (!routesToPrerender.includes('/404')) {
    routesToPrerender.push('/404');
}

console.log(`Prerendering ${routesToPrerender.length} routes...`);

(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const appHtml = render(url);
        const { html: appContent, helmetContext } = appHtml;
        const { helmet } = helmetContext;

        let html = template.replace(`<!--app-html-->`, appContent);

        // Replace placeholder SEO tags with Helmet output (avoids duplicate tags)
        if (helmet) {
            const titleTag = helmet.title.toString();
            const metaTags = helmet.meta.toString();
            const linkTags = helmet.link.toString();
            const scriptTags = helmet.script.toString();

            // Replace title placeholder
            html = html.replace(/<!--seo-title-->.*?<!--\/seo-title-->/s, titleTag);

            // Replace description - extract from helmet meta or remove placeholder markers
            const descMatch = metaTags.match(/<meta[^>]*name="description"[^>]*>/);
            if (descMatch) {
                html = html.replace(/<!--seo-description-->.*?<!--\/seo-description-->/s, descMatch[0]);
            } else {
                // No Helmet description, remove the placeholder markers but keep fallback content
                html = html.replace(/<!--seo-description-->/g, '').replace(/<!--\/seo-description-->/g, '');
            }

            // Replace robots placeholder if Helmet provides one (e.g., noindex pages)
            const robotsMatch = metaTags.match(/<meta[^>]*name="robots"[^>]*>/);
            if (robotsMatch) {
                html = html.replace(/<!--seo-robots-->.*?<!--\/seo-robots-->/s, robotsMatch[0]);
            } else {
                html = html.replace(/<!--seo-robots-->/g, '').replace(/<!--\/seo-robots-->/g, '');
            }

            // Replace meta placeholder with remaining helmet metas (excluding description and robots)
            const metaTagsFiltered = metaTags
                .replace(/<meta[^>]*name="description"[^>]*>/g, '')
                .replace(/<meta[^>]*name="robots"[^>]*>/g, '');
            html = html.replace(/<!--seo-meta-->.*?<!--\/seo-meta-->/s, metaTagsFiltered);

            // Replace link placeholder (canonical, preload, etc.)
            html = html.replace(/<!--seo-link-->.*?<!--\/seo-link-->/s, linkTags);

            // Replace script placeholder (JSON-LD structured data)
            html = html.replace(/<!--seo-script-->.*?<!--\/seo-script-->/s, scriptTags);
        }

        // Cleanup any helmet-specific attributes if needed (optional)

        const filePath = `dist/static${url === '/' ? '/index.html' : `${url}/index.html`}`;

        // Ensure directory exists
        const dir = path.dirname(toAbsolute(filePath));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);

        if (url === '/404') {
            fs.writeFileSync(toAbsolute('dist/static/404.html'), html);
            console.log('pre-rendered: dist/static/404.html');
        }
    }
})();
