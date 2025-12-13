export const SITE_BASE_URL = "https://agseo.pro" as const;

export const SITE_NAME = "AGSEO" as const;
export const SITE_ALTERNATE_NAME = "AG SEO" as const;

export const SITE_LOGO_URL = `${SITE_BASE_URL}/logo.webp` as const;
export const SITE_OG_IMAGE_URL = `${SITE_BASE_URL}/og-image.png` as const;

export const WEBSITE_ID = `${SITE_BASE_URL}/#website` as const;
export const ORGANIZATION_ID = `${SITE_BASE_URL}/#organization` as const;
export const TEAM_ID = `${SITE_BASE_URL}/#agseo-team` as const;

export function getAbsoluteUrl(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (!path.startsWith("/")) return `${SITE_BASE_URL}/${path}`;
    return `${SITE_BASE_URL}${path}`;
}

export function parseDateToIso(dateString: string): string | undefined {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return undefined;
    return date.toISOString();
}
