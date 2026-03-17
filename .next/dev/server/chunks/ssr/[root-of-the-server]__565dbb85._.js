module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaitlistStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function WaitlistStats() {
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [leaderboard, setLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const formattedCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (count === null) {
            return "—";
        }
        return new Intl.NumberFormat("en-US").format(count);
    }, [
        count
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        async function load() {
            try {
                const [countResponse, leaderboardResponse] = await Promise.all([
                    fetch("/api/waitlist/count", {
                        method: "GET",
                        cache: "no-store"
                    }),
                    fetch("/api/waitlist/leaderboard", {
                        method: "GET",
                        cache: "no-store"
                    })
                ]);
                const countJson = await countResponse.json();
                const leaderboardJson = await leaderboardResponse.json();
                if (!isMounted) {
                    return;
                }
                setCount(typeof countJson.count === "number" ? countJson.count : 0);
                setLeaderboard(Array.isArray(leaderboardJson.leaderboard) ? leaderboardJson.leaderboard : []);
            } catch  {
                if (!isMounted) {
                    return;
                }
                setCount(0);
                setLeaderboard([]);
            } finally{
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        load();
        const interval = window.setInterval(load, 15000);
        return ()=>{
            isMounted = false;
            window.clearInterval(interval);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[28px] border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold uppercase tracking-[0.24em] text-sky-300",
                                        children: "Live waitlist"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-3 text-3xl font-bold text-white",
                                        children: loading ? "Loading..." : formattedCount
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm leading-6 text-slate-300",
                                        children: "People and organizations currently raising their hand for early LifeSignal access."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.20em] text-emerald-200",
                                children: "Live"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid gap-3 sm:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-slate-950/50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.20em] text-slate-400",
                                        children: "Referrals matter"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base font-semibold text-white",
                                        children: "Higher priority"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-slate-950/50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.20em] text-slate-400",
                                        children: "Best shares"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base font-semibold text-white",
                                        children: "Family and caregivers"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-slate-950/50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.20em] text-slate-400",
                                        children: "Refresh rate"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base font-semibold text-white",
                                        children: "Every 15 seconds"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[28px] border border-white/10 bg-white/5 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold uppercase tracking-[0.24em] text-sky-300",
                                    children: "Top referrers"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-3 text-2xl font-bold text-white",
                                    children: "Live leaderboard"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[72px_1fr_120px] gap-3 border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.20em] text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Rank"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: "Invites"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            leaderboard.length > 0 ? leaderboard.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[72px_1fr_120px] gap-3 border-b border-white/10 px-4 py-3 last:border-b-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-semibold text-sky-300",
                                            children: [
                                                "#",
                                                entry.rank
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-white",
                                            children: entry.name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                            lineNumber: 165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right text-sm font-semibold text-white",
                                            children: entry.referralsCount
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `${entry.rank}-${entry.referralCode}`, true, {
                                    fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$fictional$2d$robot$2d$codex$2d$design$2d$and$2d$build$2d$lifesignal$2d$saas$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-6 text-sm text-slate-400",
                                children: "No referrals have been recorded yet. Be the first to climb the board."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/fictional-robot-codex-design-and-build-lifesignal-saas-platform/app/beta/_components/waitlist-stats.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__565dbb85._.js.map