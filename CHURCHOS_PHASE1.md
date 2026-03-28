# ChurchOS Phase 1 (Project Setup + Auth + Organization)

This repository now has the foundational pieces for Phase 1 of ChurchOS:

## Stack Baseline
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres)

## Folder Structure Highlights
- `app/(app)/*`: authenticated application routes (dashboard, onboarding, members, billing, etc.)
- `app/auth/*`: authentication UI routes
- `components/dashboard/*`: dashboard shell and widgets
- `lib/supabase/*`: browser/server/admin Supabase clients + organization context helpers
- `services/*`: domain services for billing, analytics, team, check-ins, etc.
- `supabase/migrations/*`: schema and RLS migrations

## Phase 1 Deliverables Implemented
1. **Authentication flow**
   - Email/password sign-up and login pages integrated with Supabase Auth.
   - Login redirects based on whether the user already belongs to an org.

2. **Organization (tenant) context layer**
   - `getOrgContext()` for reading current user's organization membership.
   - `requireOrgContextOrRedirect()` to protect tenant-dependent screens.

3. **Onboarding workspace creation**
   - New onboarding server action creates an `organizations` record.
   - Creates `organization_members` owner membership for the current user.
   - Handles duplicate slug and setup failures with user-facing errors.

4. **Dashboard tenant guard**
   - Dashboard route now requires an organization and redirects to onboarding when missing.

This completes the Phase 1 foundation for multi-tenant ChurchOS setup. Phase 2 can now layer billing plans and module gating on top of this baseline.
