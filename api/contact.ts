import { z } from "zod";

export const config = { runtime: "edge" };

type LeadSource = "contact" | "audit";

const leadSchema = z.object({
    email: z.preprocess(
        (value) => (typeof value === "string" ? value.trim() : value),
        z.string().email(),
    ),
    website: z.preprocess(
        (value) => {
            if (typeof value !== "string") return value;
            const trimmed = value.trim();
            if (!trimmed.length) return undefined;
            if (/^https?:\/\//i.test(trimmed)) return trimmed;
            return `https://${trimmed}`;
        },
        z.string().url().optional(),
    ),
    message: z.string().max(5000).optional(),
    source: z.union([z.literal("contact"), z.literal("audit")]).optional(),
    website2: z.string().max(200).optional(),
});

type LeadPayload = z.infer<typeof leadSchema>;

type ResendResult =
    | { ok: true }
    | { ok: false; error: string };

type SupabaseResult =
    | { ok: true }
    | { ok: false; error: string };

type RateLimitState = { count: number; resetAt: number };

const rateLimitStore: Map<string, RateLimitState> = new Map();

const HTML_ESCAPE_MAP: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
};

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit): Response {
    const headers = new Headers(init?.headers);
    headers.set("content-type", "application/json; charset=utf-8");
    return new Response(JSON.stringify(body), { ...init, headers });
}

function getStringEnv(name: string): string | null {
    const value = process.env[name];
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
}

function getIntEnv(name: string, fallback: number): number {
    const raw = getStringEnv(name);
    if (!raw) return fallback;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return fallback;
    const intValue = Math.floor(parsed);
    return intValue > 0 ? intValue : fallback;
}

function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        const first = forwardedFor.split(",")[0];
        if (typeof first === "string" && first.trim().length) return first.trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp && realIp.trim().length) return realIp.trim();

    return "unknown";
}

function getRequestOrigin(request: Request): string | null {
    const origin = request.headers.get("origin");
    if (origin && origin.trim().length) return origin.trim();

    const referer = request.headers.get("referer");
    if (!referer) return null;
    try {
        return new URL(referer).origin;
    } catch {
        return null;
    }
}

function parseCsv(value: string): string[] {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length);
}

function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.some((allowed) => allowed === origin);
}

function getCorsDecision(request: Request): {
    requestOrigin: string | null;
    allowedOrigins: string[] | null;
    allowedOrigin: string | null;
} {
    const requestOrigin = getRequestOrigin(request);
    const allowedOriginsRaw = getStringEnv("ALLOWED_ORIGINS");
    if (!allowedOriginsRaw) {
        return { requestOrigin, allowedOrigins: null, allowedOrigin: null };
    }

    const allowedOrigins = parseCsv(allowedOriginsRaw);
    const allowedOrigin =
        requestOrigin && isOriginAllowed(requestOrigin, allowedOrigins) ? requestOrigin : null;
    return { requestOrigin, allowedOrigins, allowedOrigin };
}

function buildCorsHeaders(allowedOrigin: string | null): HeadersInit {
    if (!allowedOrigin) return {};
    return {
        "access-control-allow-origin": allowedOrigin,
        vary: "origin",
    };
}

function buildPreflightHeaders(allowedOrigin: string): HeadersInit {
    return {
        "access-control-allow-origin": allowedOrigin,
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
        "access-control-max-age": "86400",
        vary: "origin",
    };
}

function checkRateLimit(request: Request): { ok: true } | { ok: false; retryAfterSeconds: number } {
    const rateLimitMax = getIntEnv("CONTACT_RATE_LIMIT_MAX", 8);
    const rateLimitWindowSeconds = getIntEnv("CONTACT_RATE_LIMIT_WINDOW_SECONDS", 600);
    const now = Date.now();

    if (rateLimitStore.size > 1000) {
        for (const [key, entry] of rateLimitStore) {
            if (entry.resetAt <= now) rateLimitStore.delete(key);
        }
    }

    const ip = getClientIp(request);
    const existing = rateLimitStore.get(ip);

    if (!existing || existing.resetAt <= now) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowSeconds * 1000 });
        return { ok: true };
    }

    if (existing.count >= rateLimitMax) {
        const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
        return { ok: false, retryAfterSeconds };
    }

    rateLimitStore.set(ip, { count: existing.count + 1, resetAt: existing.resetAt });
    return { ok: true };
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

async function sendResendEmail(params: {
    apiKey: string;
    from: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}): Promise<ResendResult> {
    let response: Response;
    try {
        response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${params.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: params.from,
                to: [params.to],
                subject: params.subject,
                html: params.html,
                ...(params.replyTo ? { reply_to: params.replyTo } : {}),
            }),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Network error";
        return { ok: false, error: message };
    }

    if (response.ok) return { ok: true };

    const text = await response.text();
    return { ok: false, error: text || `Resend error: ${response.status}` };
}

async function insertLeadToSupabase(params: {
    supabaseUrl: string;
    serviceRoleKey: string;
    lead: {
        source: LeadSource;
        email: string;
        website?: string;
        message?: string;
        origin: string | null;
        ip: string;
        userAgent: string;
        referer: string;
    };
}): Promise<SupabaseResult> {
    let response: Response;
    try {
        const endpoint = new URL("/rest/v1/leads", params.supabaseUrl);
        response = await fetch(endpoint.toString(), {
            method: "POST",
            headers: {
                apikey: params.serviceRoleKey,
                Authorization: `Bearer ${params.serviceRoleKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                source: params.lead.source,
                email: params.lead.email,
                website: params.lead.website ?? null,
                message: params.lead.message ?? null,
                origin: params.lead.origin,
                ip: params.lead.ip,
                user_agent: params.lead.userAgent,
                referer: params.lead.referer,
            }),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Network error";
        return { ok: false, error: message };
    }

    if (response.ok) return { ok: true };

    const text = await response.text();
    return { ok: false, error: text || `Supabase error: ${response.status}` };
}

export default async function handler(request: Request): Promise<Response> {
    const { requestOrigin, allowedOrigins, allowedOrigin } = getCorsDecision(request);
    const corsHeaders = buildCorsHeaders(allowedOrigin);

    if (request.method === "OPTIONS") {
        if (!allowedOrigins) return new Response(null, { status: 204 });
        if (!allowedOrigin) return new Response(null, { status: 403 });
        return new Response(null, {
            status: 204,
            headers: buildPreflightHeaders(allowedOrigin),
        });
    }

    if (request.method !== "POST") {
        return jsonResponse(
            { success: false, error: "Method not allowed" },
            { status: 405, headers: corsHeaders },
        );
    }

    if (allowedOrigins && !allowedOrigin) {
        return jsonResponse({ success: false, error: "Forbidden" }, { status: 403, headers: corsHeaders });
    }

    const rateLimit = checkRateLimit(request);
    if (!rateLimit.ok) {
        const headers = new Headers(corsHeaders);
        headers.set("retry-after", String(rateLimit.retryAfterSeconds));
        return jsonResponse({ success: false, error: "Too many requests" }, { status: 429, headers });
    }

    let raw: unknown;
    try {
        raw = await request.json();
    } catch {
        return jsonResponse({ success: false, error: "Invalid JSON" }, { status: 400, headers: corsHeaders });
    }

    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
        return jsonResponse({ success: false, error: "Invalid payload" }, { status: 400, headers: corsHeaders });
    }

    const payload: LeadPayload = parsed.data;
    const source: LeadSource = payload.source ?? "contact";

    if (payload.website2?.trim().length) {
        return jsonResponse({ success: true }, { headers: corsHeaders });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const referer = request.headers.get("referer") ?? "";

    const supabaseUrl = getStringEnv("SUPABASE_URL");
    const supabaseServiceRoleKey = getStringEnv("SUPABASE_SERVICE_ROLE_KEY");

    const resendApiKey = getStringEnv("RESEND_API_KEY");
    const resendFromEmail = getStringEnv("RESEND_FROM_EMAIL");
    const leadsToEmail = getStringEnv("LEADS_TO_EMAIL");

    const hasSupabase = Boolean(supabaseUrl && supabaseServiceRoleKey);
    const canSendInternalEmail = Boolean(resendApiKey && resendFromEmail && leadsToEmail);
    const canSendConfirmationEmail = Boolean(resendApiKey && resendFromEmail);

    if (!hasSupabase && !canSendInternalEmail) {
        return jsonResponse(
            { success: false, error: "Server is not configured for lead capture yet." },
            { status: 500, headers: corsHeaders },
        );
    }

    let storedLead = false;
    if (hasSupabase && supabaseUrl && supabaseServiceRoleKey) {
        const storeResult = await insertLeadToSupabase({
            supabaseUrl,
            serviceRoleKey: supabaseServiceRoleKey,
            lead: {
                source,
                email: payload.email,
                website: payload.website,
                message: payload.message,
                origin: requestOrigin,
                ip: getClientIp(request),
                userAgent,
                referer,
            },
        });

        if (storeResult.ok) {
            storedLead = true;
        } else {
            console.error("Supabase lead insert failed:", storeResult.error);
        }
    }

    const subject =
        source === "audit"
            ? `New AI Audit Request — ${payload.website ?? "No website provided"}`
            : `New Contact Request — ${payload.website ?? "No website provided"}`;

    const websiteHtml = payload.website
        ? `<div><strong>Website:</strong> ${escapeHtml(payload.website)}</div>`
        : `<div><strong>Website:</strong> (none)</div>`;

    const messageHtml = payload.message
        ? `<div><strong>Message:</strong><br/>${escapeHtml(payload.message)}</div>`
        : "";

    const internalHtml = `
<div style="font-family: ui-sans-serif, system-ui; line-height: 1.6;">
  <h2 style="margin: 0 0 12px;">New lead</h2>
  <div><strong>Source:</strong> ${escapeHtml(source)}</div>
  <div><strong>Email:</strong> ${escapeHtml(payload.email)}</div>
  ${websiteHtml}
  ${messageHtml}
  <div><strong>Referer:</strong> ${escapeHtml(referer)}</div>
  <div><strong>User-Agent:</strong> ${escapeHtml(userAgent)}</div>
</div>`;

    let sentInternal = false;
    if (canSendInternalEmail && resendApiKey && resendFromEmail && leadsToEmail) {
        const internalSend = await sendResendEmail({
            apiKey: resendApiKey,
            from: resendFromEmail,
            to: leadsToEmail,
            subject,
            html: internalHtml,
            replyTo: payload.email,
        });

        sentInternal = internalSend.ok;
        if (!internalSend.ok) {
            console.error("Resend internal lead email failed:", internalSend.error);
        }
    }

    if (!storedLead && !sentInternal) {
        return jsonResponse(
            { success: false, error: "Lead capture failed. Please try again later." },
            { status: 502, headers: corsHeaders },
        );
    }

    const confirmationSubject =
        source === "audit"
            ? "We received your AI audit request — AGSEO"
            : "We received your message — AGSEO";

    const confirmationHtml =
        source === "audit"
            ? `
<div style="font-family: ui-sans-serif, system-ui; line-height: 1.6;">
  <p>Hi,</p>
  <p>
    Thanks — we received your AI SEO audit request${payload.website ? ` for <strong>${escapeHtml(payload.website)}</strong>` : ""}.
  </p>
  <p>You’ll receive a follow-up from our team after review.</p>
  <p>AGSEO</p>
</div>`
            : `
<div style="font-family: ui-sans-serif, system-ui; line-height: 1.6;">
  <p>Hi,</p>
  <p>
    Thanks — we received your message${payload.website ? ` regarding <strong>${escapeHtml(payload.website)}</strong>` : ""}.
  </p>
  <p>We’ll get back to you shortly.</p>
  <p>AGSEO</p>
</div>`;

    if (!canSendConfirmationEmail || !resendApiKey || !resendFromEmail) {
        return jsonResponse({ success: true }, { headers: corsHeaders });
    }

    const confirmationSend = await sendResendEmail({
        apiKey: resendApiKey,
        from: resendFromEmail,
        to: payload.email,
        subject: confirmationSubject,
        html: confirmationHtml,
    });

    if (!confirmationSend.ok) {
        console.error("Resend confirmation email failed:", confirmationSend.error);
        return jsonResponse({ success: true, confirmationSent: false }, { headers: corsHeaders });
    }

    return jsonResponse({ success: true }, { headers: corsHeaders });
}
