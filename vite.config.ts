import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "path";

type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  path: string;
  changefreq: SitemapChangeFrequency;
  priority: number;
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
  }
  return unique;
}

function getMatches(source: string, regex: RegExp): string[] {
  const values: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source)) !== null) {
    values.push(match[1]);
  }
  return values;
}

function getSiteBaseUrl(projectRoot: string): string {
  const siteMetadataPath = path.resolve(projectRoot, "src", "lib", "siteMetadata.ts");
  const siteMetadataSource = fs.readFileSync(siteMetadataPath, "utf-8");
  const match = siteMetadataSource.match(
    /export const SITE_BASE_URL = ["']([^"']+)["']/
  );
  return match?.[1] ?? "https://agseo.pro";
}

function getAbsoluteUrl(baseUrl: string, routePath: string): string {
  if (routePath.startsWith("http://") || routePath.startsWith("https://")) return routePath;
  if (routePath === "/") return `${baseUrl}/`;
  if (!routePath.startsWith("/")) return `${baseUrl}/${routePath}`;
  return `${baseUrl}${routePath}`;
}

function renderUrlEntries(baseUrl: string, entries: SitemapEntry[]): string[] {
  return entries.flatMap((entry) => {
    const url = getAbsoluteUrl(baseUrl, entry.path);
    const priority = entry.priority.toFixed(1);
    const lines: string[] = [
      "  <url>",
      `    <loc>${url}</loc>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ];
    return lines;
  });
}

function generateSitemapXml(projectRoot: string): string {
  const baseUrl = getSiteBaseUrl(projectRoot);

  const dataDir = path.resolve(projectRoot, "src", "data");

  const authorsSource = fs.readFileSync(path.resolve(dataDir, "authors.ts"), "utf-8");
  const authorIds = uniqueStrings(getMatches(authorsSource, /id:\s*"([^"]+)"/g));

  const blogPostsSource = fs.readFileSync(path.resolve(dataDir, "blogPosts.ts"), "utf-8");
  const blogSlugs = uniqueStrings(getMatches(blogPostsSource, /slug:\s*"([^"]+)"/g));

  const comparisonsSource = fs.readFileSync(path.resolve(dataDir, "comparisons.ts"), "utf-8");
  const comparisonSlugs = uniqueStrings(getMatches(comparisonsSource, /slug:\s*"([^"]+)"/g));

  const industriesSource = fs.readFileSync(path.resolve(dataDir, "industries.ts"), "utf-8");
  const industrySlugs = uniqueStrings(getMatches(industriesSource, /slug:\s*"([^"]+)"/g));

  const caseStudiesSource = fs.readFileSync(path.resolve(dataDir, "caseStudies.ts"), "utf-8");
  const caseStudyIds = uniqueStrings(getMatches(caseStudiesSource, /id:\s*"([^"]+)"/g));

  const industryEntries: SitemapEntry[] = industrySlugs.map((slug) => ({
    path: `/industries/${slug}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  const authorEntries: SitemapEntry[] = authorIds.map((id) => ({
    path: `/authors/${id}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  const caseStudyEntries: SitemapEntry[] = caseStudyIds.map((id) => ({
    path: `/case-studies/${id}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  const comparisonEntries: SitemapEntry[] = comparisonSlugs.map((slug) => ({
    path: `/compare/${slug}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  const blogPostEntries: SitemapEntry[] = blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: 0.7,
  }));

  const lines: string[] = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    "  <!-- Homepage -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/", changefreq: "weekly", priority: 1.0 },
    ]),
    "  ",
    "  <!-- Services Hub -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/services", changefreq: "weekly", priority: 0.9 },
    ]),
    "  ",
    "  <!-- Services -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/services/content", changefreq: "weekly", priority: 0.8 },
      { path: "/geo-optimization", changefreq: "weekly", priority: 0.8 },
    ]),
    "",
    ...renderUrlEntries(baseUrl, industryEntries),
    "  ",
    "  <!-- About -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/about", changefreq: "monthly", priority: 0.7 },
      ...authorEntries,
    ]),
    "  ",
    "  <!-- Pricing -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/pricing", changefreq: "weekly", priority: 0.9 },
      { path: "/pricing/starter", changefreq: "weekly", priority: 0.8 },
      { path: "/pricing/business", changefreq: "weekly", priority: 0.8 },
      { path: "/pricing/pro-business", changefreq: "weekly", priority: 0.8 },
    ]),
    "  ",
    "  <!-- Tools -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/tools", changefreq: "monthly", priority: 0.7 },
      { path: "/tools/audit", changefreq: "monthly", priority: 0.7 },
      { path: "/tools/roi-calculator", changefreq: "monthly", priority: 0.7 },
      { path: "/tools/serp-simulator", changefreq: "monthly", priority: 0.6 },
      { path: "/tools/keyword-mixer", changefreq: "monthly", priority: 0.6 },
      { path: "/tools/schema-generator", changefreq: "monthly", priority: 0.6 },
    ]),
    "  ",
    "  <!-- Resources -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/case-studies", changefreq: "monthly", priority: 0.7 },
      ...caseStudyEntries,
      { path: "/resources/glossary", changefreq: "monthly", priority: 0.6 },
      { path: "/compare", changefreq: "monthly", priority: 0.7 },
      ...comparisonEntries,
    ]),
    "  ",
    "  <!-- Blog -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/blog", changefreq: "weekly", priority: 0.8 },
      ...blogPostEntries,
    ]),
    "  ",
    "  <!-- Contact -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/contact", changefreq: "monthly", priority: 0.8 },
    ]),
    "  ",
    "  <!-- Legal -->",
    ...renderUrlEntries(baseUrl, [
      { path: "/privacy", changefreq: "monthly", priority: 0.5 },
      { path: "/terms", changefreq: "monthly", priority: 0.5 },
      { path: "/cookies", changefreq: "monthly", priority: 0.5 },
    ]),
    "</urlset>",
    "",
  ];

  return lines.join("\n");
}

function generateSitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    buildStart() {
      const projectRoot = process.cwd();
      const sitemapXml = generateSitemapXml(projectRoot);
      const sitemapPath = path.resolve(projectRoot, "public", "sitemap.xml");
      fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
      fs.writeFileSync(sitemapPath, sitemapXml);
    },
  };
}
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    generateSitemapPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'AGSEO - AI SEO Agency',
        short_name: 'AGSEO',
        description: 'AI-powered SEO agency transforming how businesses rank online.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
}));
