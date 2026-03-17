module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase/clients.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseAdminClient",
    ()=>createSupabaseAdminClient,
    "createSupabaseServerClient",
    ()=>createSupabaseServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://nsjrbuycahexdqibofiw.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zanJidXljYWhleGRxaWJvZml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDE0NzQsImV4cCI6MjA4ODgxNzQ3NH0.t5g-QmJg5YEJoQmDw706mqDiqjIw-ySKXzHZr5jDGL0");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
async function createSupabaseServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(supabaseUrl, supabaseAnonKey, {
        cookies: {
            get (name) {
                return cookieStore.get(name)?.value;
            },
            set (name, value, options) {
                cookieStore.set(name, value, options);
            },
            remove (name, options) {
                cookieStore.set(name, "", {
                    ...options,
                    maxAge: 0
                });
            }
        }
    });
}
function createSupabaseAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/services/risk/risk.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "caregiverRiskSummary",
    ()=>caregiverRiskSummary,
    "computeRiskLevel",
    ()=>computeRiskLevel,
    "computeTrendDirection",
    ()=>computeTrendDirection,
    "fetchLatestRiskSnapshot",
    ()=>fetchLatestRiskSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase/clients.ts [app-rsc] (ecmascript)");
;
function computeRiskLevel(score) {
    if (score <= 19) return "stable";
    if (score <= 39) return "caution";
    if (score <= 64) return "elevated";
    return "high";
}
function computeTrendDirection(current, baseline) {
    if (current >= baseline + 8) return "worsening";
    if (current <= baseline - 8) return "improving";
    return "stable";
}
async function fetchLatestRiskSnapshot(monitoredPersonId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data } = await supabase.from("risk_snapshots").select("*").eq("monitored_person_id", monitoredPersonId).order("snapshot_date", {
        ascending: false
    }).limit(1).maybeSingle();
    return data;
}
async function caregiverRiskSummary(monitoredPersonId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data: current } = await supabase.from("risk_snapshots").select("*").eq("monitored_person_id", monitoredPersonId).order("snapshot_date", {
        ascending: false
    }).limit(1).maybeSingle();
    const { data: trailing } = await supabase.from("risk_snapshots").select("risk_score").eq("monitored_person_id", monitoredPersonId).order("snapshot_date", {
        ascending: false
    }).range(1, 7);
    const baseline = trailing && trailing.length > 0 ? Math.round(trailing.reduce((acc, row)=>acc + (row.risk_score ?? 0), 0) / trailing.length) : current?.risk_score ?? 0;
    const trend = current ? computeTrendDirection(current.risk_score, baseline) : "stable";
    const factors = current?.score_factors && typeof current.score_factors === "object" ? current.score_factors : {};
    const topReasons = Object.entries(factors).sort((a, b)=>Number(b[1]) - Number(a[1])).slice(0, 3).map(([key, value])=>`${key}: +${value}`);
    return {
        snapshot: current,
        baselineScore: baseline,
        trend,
        topReasons
    };
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/services/dashboard/dashboard.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "agencyDashboardData",
    ()=>agencyDashboardData,
    "caregiverDashboardData",
    ()=>caregiverDashboardData,
    "seniorDashboardData",
    ()=>seniorDashboardData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase/clients.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$services$2f$risk$2f$risk$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/services/risk/risk.service.ts [app-rsc] (ecmascript)");
;
;
async function seniorDashboardData(profileId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data: monitored } = await supabase.from("monitored_people").select("id, preferred_name").eq("profile_id", profileId).single();
    if (!monitored) {
        return null;
    }
    const [{ data: latestCheckins }, { data: guardians }, { data: risk }] = await Promise.all([
        supabase.from("checkins").select("id, expected_at, status, responded_at").eq("monitored_person_id", monitored.id).order("expected_at", {
            ascending: false
        }).limit(7),
        supabase.from("guardian_network").select("priority_order, relationship, guardian_profile_id").eq("monitored_person_id", monitored.id).eq("active", true).order("priority_order", {
            ascending: true
        }),
        supabase.from("risk_snapshots").select("risk_level, explanation, trend_direction").eq("monitored_person_id", monitored.id).order("snapshot_date", {
            ascending: false
        }).limit(1).maybeSingle()
    ]);
    return {
        monitored,
        latestCheckins: latestCheckins ?? [],
        guardians: guardians ?? [],
        routineConsistency: risk ? {
            level: risk.risk_level,
            trend: risk.trend_direction,
            message: risk.explanation
        } : null
    };
}
async function caregiverDashboardData(profileId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data: linked } = await supabase.from("guardian_network").select("monitored_person_id").eq("guardian_profile_id", profileId).eq("active", true);
    const monitoredIds = (linked ?? []).map((x)=>x.monitored_person_id);
    const cards = [];
    for (const monitoredPersonId of monitoredIds){
        const [{ data: monitored }, { data: checkin }, riskSummary] = await Promise.all([
            supabase.from("monitored_people").select("id, preferred_name").eq("id", monitoredPersonId).single(),
            supabase.from("checkins").select("status, expected_at, responded_at").eq("monitored_person_id", monitoredPersonId).order("expected_at", {
                ascending: false
            }).limit(1).maybeSingle(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$services$2f$risk$2f$risk$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["caregiverRiskSummary"])(monitoredPersonId)
        ]);
        cards.push({
            monitoredPersonId,
            name: monitored?.preferred_name ?? "Monitored person",
            latestCheckinStatus: checkin?.status ?? "none",
            latestCheckinAt: checkin?.expected_at ?? null,
            riskLevel: riskSummary.snapshot?.risk_level ?? "stable",
            trend: riskSummary.trend,
            topReasons: riskSummary.topReasons,
            explanation: riskSummary.snapshot?.explanation ?? "No risk explanation available yet."
        });
    }
    return {
        cards
    };
}
async function agencyDashboardData(profileId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
    const { data: membership } = await supabase.from("agency_members").select("agency_id").eq("profile_id", profileId).limit(1).maybeSingle();
    if (!membership) return {
        agency: null,
        highConcernQueue: [],
        elevatedQueue: [],
        newlyIncreased24h: []
    };
    const { data: agency } = await supabase.from("agencies").select("id, name").eq("id", membership.agency_id).single();
    const { data: residents } = await supabase.from("monitored_people").select("id, preferred_name").eq("agency_id", membership.agency_id).eq("is_active", true).limit(300);
    const residentIds = (residents ?? []).map((r)=>r.id);
    const { data: snapshots } = await supabase.from("risk_snapshots").select("monitored_person_id, risk_score, risk_level, trend_direction, explanation, snapshot_date").in("monitored_person_id", residentIds.length ? residentIds : [
        "00000000-0000-0000-0000-000000000000"
    ]).order("snapshot_date", {
        ascending: false
    });
    const latestByResident = new Map();
    for (const snap of snapshots ?? []){
        if (!latestByResident.has(snap.monitored_person_id)) latestByResident.set(snap.monitored_person_id, snap);
    }
    const rows = (residents ?? []).map((r)=>{
        const snap = latestByResident.get(r.id);
        return {
            monitoredPersonId: r.id,
            name: r.preferred_name ?? "Resident",
            riskLevel: snap?.risk_level ?? "stable",
            trend: snap?.trend_direction ?? "stable",
            explanation: snap?.explanation ?? "No snapshot yet",
            score: snap?.risk_score ?? 0
        };
    });
    const highConcernQueue = rows.filter((r)=>r.riskLevel === "high");
    const elevatedQueue = rows.filter((r)=>r.riskLevel === "elevated");
    const newlyIncreased24h = rows.filter((r)=>r.trend === "worsening");
    return {
        agency,
        highConcernQueue,
        elevatedQueue,
        newlyIncreased24h
    };
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgencyDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/lib/supabase/clients.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$services$2f$dashboard$2f$dashboard$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/services/dashboard/dashboard.service.ts [app-rsc] (ecmascript)");
;
;
;
function Queue({ title, rows }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold text-slate-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-2",
                children: rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-lg bg-slate-50 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-slate-900",
                                children: row.name
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                                lineNumber: 11,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-slate-600",
                                children: [
                                    row.riskLevel,
                                    " • ",
                                    row.trend
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                                lineNumber: 12,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-lg text-slate-700",
                                children: row.explanation
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                                lineNumber: 15,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `${row.name}-${row.riskLevel}`, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
async function AgencyDashboardPage() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$lib$2f$supabase$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServerClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto max-w-4xl p-6",
            children: "Please sign in to view your agency dashboard."
        }, void 0, false, {
            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
            lineNumber: 30,
            columnNumber: 12
        }, this);
    }
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$services$2f$dashboard$2f$dashboard$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["agencyDashboardData"])(user.id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-7xl p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold text-slate-900",
                children: [
                    data.agency?.name ?? "Agency",
                    " operations"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-slate-600",
                children: "High concern and elevated routine instability queues for staff triage."
            }, void 0, false, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Queue, {
                        title: "High concern",
                        rows: data.highConcernQueue
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Queue, {
                        title: "Elevated concern",
                        rows: data.elevatedQueue
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Queue, {
                        title: "Newly increased in last 24h",
                        rows: data.newlyIncreased24h
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/agency/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b217cf4f._.js.map