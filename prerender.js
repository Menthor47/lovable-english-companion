
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

console.log(`Prerendering ${routesToPrerender.length} routes...`);

(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const appHtml = render(url);
        const { html: appContent, helmetContext } = appHtml;
        const { helmet } = helmetContext;

        // Inject Helmet head tags
        let headTags = '';
        if (helmet) {
            headTags = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
        `;
        }

        let html = template.replace(`<!--app-html-->`, appContent);

        // Inject head tags before </head>
        html = html.replace('</head>', `${headTags}</head>`);

        // Cleanup any helmet-specific attributes if needed (optional)

        const filePath = `dist/static${url === '/' ? '/index.html' : `${url}/index.html`}`;

        // Ensure directory exists
        const dir = path.dirname(toAbsolute(filePath));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);
    }
})();
