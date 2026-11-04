/**
 * Turns what someone typed as their website into a full URL, or null if it can't be one.
 * People usually type a bare domain such as "acme.com", so https:// is added when missing.
 */
export function normalizeWebsiteUrl(input: string): string | null {
    const value = input.trim();
    if (!value || /\s/.test(value)) return null;

    const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;

    let url: URL;
    try {
        url = new URL(withScheme);
    } catch {
        return null;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    // An email address parses as a URL with a username, so reject it here.
    if (url.username || url.password) return null;
    // A real public address has a dot and a top-level domain of at least two characters.
    if (!/\.[^.\d][^.]+$/.test(url.hostname)) return null;

    return url.href;
}
