module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://nsjrbuycahexdqibofiw.supabase.co");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/waitlist.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildReferralLink",
    ()=>buildReferralLink,
    "extractReferralCode",
    ()=>extractReferralCode,
    "maskName",
    ()=>maskName,
    "normalizeEmail",
    ()=>normalizeEmail,
    "normalizeReferralCode",
    ()=>normalizeReferralCode,
    "randomReferralCode",
    ()=>randomReferralCode
]);
function normalizeEmail(value) {
    return value.trim().toLowerCase();
}
function normalizeReferralCode(value) {
    return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function extractReferralCode(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        return "";
    }
    try {
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            const url = new URL(trimmed);
            const fromRef = url.searchParams.get("ref");
            const fromCode = url.searchParams.get("code");
            return normalizeReferralCode(fromRef || fromCode || "");
        }
    } catch  {
        return normalizeReferralCode(trimmed);
    }
    return normalizeReferralCode(trimmed);
}
function randomReferralCode(length = 8) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let output = "";
    for(let i = 0; i < length; i += 1){
        output += chars[Math.floor(Math.random() * chars.length)];
    }
    return output;
}
function buildReferralLink(origin, code) {
    return `${origin}/beta?ref=${encodeURIComponent(code)}`;
}
function maskName(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return "Anonymous";
    }
    if (parts.length === 1) {
        const first = parts[0];
        return first.length <= 1 ? `${first}*` : `${first[0]}${"*".repeat(Math.min(first.length - 1, 5))}`;
    }
    const first = parts[0];
    const last = parts[parts.length - 1];
    return `${first} ${last[0]}.`;
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/api/waitlist/join/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase-admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/waitlist.ts [app-route] (ecmascript)");
;
;
;
const dynamic = "force-dynamic";
async function parseRequest(request) {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const body = await request.json();
        return {
            name: String(body.name ?? ""),
            email: String(body.email ?? ""),
            phone: String(body.phone ?? ""),
            useCase: String(body.useCase ?? ""),
            notes: String(body.notes ?? ""),
            referralCode: String(body.referralCode ?? "")
        };
    }
    const formData = await request.formData();
    return {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        useCase: String(formData.get("useCase") ?? ""),
        notes: String(formData.get("notes") ?? ""),
        referralCode: String(formData.get("referralCode") ?? "")
    };
}
async function generateUniqueReferralCode() {
    for(let attempt = 0; attempt < 10; attempt += 1){
        const code = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["randomReferralCode"])(8);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").select("id").eq("referral_code", code).maybeSingle();
        if (!data) {
            return code;
        }
    }
    throw new Error("Failed to generate a unique referral code");
}
function getOrigin(request) {
    const url = new URL(request.url);
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost = request.headers.get("x-forwarded-host");
    if (forwardedHost) {
        return `${forwardedProto || "https"}://${forwardedHost}`;
    }
    return url.origin;
}
function wantsJson(request) {
    const accept = request.headers.get("accept") || "";
    const contentType = request.headers.get("content-type") || "";
    return accept.includes("application/json") || contentType.includes("application/json");
}
async function incrementReferrer(code) {
    const { data: referrer } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").select("id, referrals_count").eq("referral_code", code).maybeSingle();
    if (!referrer) {
        return false;
    }
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").update({
        referrals_count: (referrer.referrals_count ?? 0) + 1
    }).eq("id", referrer.id);
    if (error) {
        throw error;
    }
    return true;
}
async function POST(request) {
    try {
        const input = await parseRequest(request);
        const name = input.name.trim();
        const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEmail"])(input.email);
        const phone = input.phone.trim();
        const useCase = input.useCase.trim();
        const notes = input.notes.trim();
        const referredByCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractReferralCode"])(input.referralCode);
        const origin = getOrigin(request);
        if (!name || !email) {
            const errorPayload = {
                error: "Name and email are required."
            };
            if (wantsJson(request)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(errorPayload, {
                    status: 400
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/beta?error=missing-required-fields", origin), {
                status: 303
            });
        }
        const { data: existing, error: existingError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").select("*").eq("email", email).maybeSingle();
        if (existingError) {
            throw existingError;
        }
        let row = existing ?? null;
        if (row) {
            if (!row.referred_by_code && referredByCode && referredByCode !== row.referral_code) {
                const referredByApplied = await incrementReferrer(referredByCode);
                if (referredByApplied) {
                    const { data: updatedRow, error: updateExistingError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").update({
                        referred_by_code: referredByCode
                    }).eq("id", row.id).select("*").single();
                    if (updateExistingError) {
                        throw updateExistingError;
                    }
                    row = updatedRow;
                }
            }
        } else {
            const referralCode = await generateUniqueReferralCode();
            let validReferredByCode = null;
            if (referredByCode && referredByCode !== referralCode) {
                const { data: referredByRow } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").select("id").eq("referral_code", referredByCode).maybeSingle();
                if (referredByRow) {
                    validReferredByCode = referredByCode;
                }
            }
            const { data: inserted, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").insert({
                name,
                email,
                phone: phone || null,
                use_case: useCase || null,
                notes: notes || null,
                referral_code: referralCode,
                referred_by_code: validReferredByCode
            }).select("*").single();
            if (insertError) {
                throw insertError;
            }
            row = inserted;
            if (validReferredByCode) {
                await incrementReferrer(validReferredByCode);
            }
        }
        if (!row) {
            throw new Error("Failed to create or retrieve waitlist entry");
        }
        const referralLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildReferralLink"])(origin, row.referral_code);
        const successUrl = new URL("/beta/success", origin);
        successUrl.searchParams.set("code", row.referral_code);
        successUrl.searchParams.set("email", row.email);
        if (wantsJson(request)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                referralCode: row.referral_code,
                referralLink,
                referralsCount: row.referrals_count
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(successUrl, {
            status: 303
        });
    } catch (error) {
        console.error("waitlist join error", error);
        const origin = getOrigin(request);
        if (wantsJson(request)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unable to join the waitlist right now."
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/beta?error=join-failed", origin), {
            status: 303
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c61f2b0._.js.map