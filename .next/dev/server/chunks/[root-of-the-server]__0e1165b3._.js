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
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/api/waitlist/leaderboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
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
async function GET() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from("waitlist_entries").select("name, referral_code, referrals_count, created_at").order("referrals_count", {
            ascending: false
        }).order("created_at", {
            ascending: true
        }).limit(10);
        if (error) {
            throw error;
        }
        const leaderboard = (data ?? []).map((entry, index)=>({
                rank: index + 1,
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$waitlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maskName"])(entry.name),
                referralCode: entry.referral_code,
                referralsCount: entry.referrals_count ?? 0
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            leaderboard
        });
    } catch (error) {
        console.error("waitlist leaderboard error", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            leaderboard: []
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e1165b3._.js.map