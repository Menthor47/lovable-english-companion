import { describe, expect, it } from "vitest";
import { normalizeWebsiteUrl } from "./normalizeWebsiteUrl";

describe("normalizeWebsiteUrl", () => {
    it.each([
        ["acme.com", "https://acme.com/"],
        ["  acme.com  ", "https://acme.com/"],
        ["www.acme.ro", "https://www.acme.ro/"],
        ["acme.com/pricing?x=1", "https://acme.com/pricing?x=1"],
        ["http://acme.com", "http://acme.com/"],
        ["HTTPS://ACME.COM", "https://acme.com/"],
        ["shop.acme.co.uk", "https://shop.acme.co.uk/"],
        ["măgură.ro", "https://xn--mgur-0sad.ro/"],
    ])("accepts %s", (input, expected) => {
        expect(normalizeWebsiteUrl(input)).toBe(expected);
    });

    it.each([
        "",
        "   ",
        "acme",
        "https://acme",
        "acme .com",
        "me@acme.com",
        "ftp://acme.com",
        "javascript:alert(1)",
        "127.0.0.1",
        "localhost",
        "acme.c",
    ])("rejects %j", (input) => {
        expect(normalizeWebsiteUrl(input)).toBeNull();
    });
});
