# ChurchOS Phase 2 (Billing + Plan Logic + Module Gating)

## Delivered

- Added canonical ChurchOS plan/add-on/module catalog:
  - Plans: `core`, `growth`, `care`
  - Add-ons: `giving`, `sms`
  - Module catalog + plan-to-module mapping
  - `hasAccess()` utility for feature gating

- Added organization feature access layer:
  - Reads org subscription (`plan`, `addons`) + explicit `organization_modules`
  - Exposes `orgHasModuleAccess()` for route and UI-level locking

- Added billing simulation flow in app billing workspace:
  - Billing page now loads current subscription and active modules
  - Plan/add-on selector form posts to server action
  - Server action upserts `subscriptions`, updates organization plan, and syncs `organization_modules`

- Added locked UI states:
  - Locked module card component
  - Module-gated pages (`/analytics`, `/checkins`, `/incidents`) now render upgrade prompts when inaccessible
  - Dashboard navigation now marks locked modules and routes to billing upgrade

- Added Stripe webhook enhancement for plan/add-on persistence:
  - Persists `plan` and `addons` into subscriptions
  - Updates organization plan and enabled modules on checkout completion

- Added Supabase migration for Phase 2 billing/module schema:
  - `subscriptions.plan`, `subscriptions.addons`
  - unique index for one subscription per org
  - `module_catalog` and `plan_module_mapping` tables with seeded rows

This establishes the Phase 2 platform backbone so Phase 3 can focus on `/builder` module selection UX and dynamic dashboard rendering.
