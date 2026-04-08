# Agent Guide For This Project

## Goal
This is a healthcare appointment app built with Next.js App Router and Appwrite.  
As an agent/contributor, prioritize keeping patient registration, appointment booking, and admin scheduling flows stable.

## Tech Stack
- Next.js 14 (`app/` router)
- TypeScript (`strict: true`)
- Tailwind CSS + shadcn/ui primitives in `components/ui/`
- Appwrite (`node-appwrite`) used in server actions
- React Hook Form + Zod for form validation
- Sentry integration (`next.config.mjs`, `sentry.*.config.ts`)

## Local Skill Preference
- For UI/UX or accessibility reviews, use the local skill at `.agents/skills/web-design-guidelines/SKILL.md`.
- Trigger terms include: "review my UI", "check accessibility", "audit design", "review UX", and "check best practices".
- Follow the skill workflow: fetch the latest guideline source before performing the review.

## Local Setup
1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start dev server: `npm run dev`
4. Lint before finalizing changes: `npm run lint`

## Required Environment Variables
Use these keys in `.env`:
- `NEXT_PUBLIC_ENDPOINT`
- `NEXT_PUBLIC_PROJECT_ID`
- `NEXT_PUBLIC_API_SECRET_KEY`
- `NEXT_PUBLIC_DATABASE_KEY`
- `NEXT_PUBLIC_PATIENT_Collection_ID`
- `NEXT_PUBLIC_DOCTOR_Collection_ID`
- `NEXT_PUBLIC_APPOINTMENT_Collection_ID`
- `NEXT_PUBLIC_BUCKET_ID`
- `NEXT_PUBLIC_ADMIN_PASS_CODE`
- `SENTRY_AUTH_TOKEN`

Security note: `NEXT_PUBLIC_API_SECRET_KEY` is sensitive and should be treated like a secret, even though the current key name has a `NEXT_PUBLIC_` prefix.

## High-Level App Flow
1. `/` (`app/page.tsx`): user enters basic info, `createUser` is called.
2. `/patients/[userId]/register`: full patient profile + optional ID document upload.
3. `/patients/[userId]/new-appointment`: patient requests appointment (`status: "pending"`).
4. `/patients/[userId]/new-appointment/success`: success confirmation and summary.
5. `/patients/[userId]/dashboard`: patient sees all appointments.
6. `/admin`: admin dashboard with stats, table, and appointment actions.

## Core Code Map
- `actions/patient.action.ts`: user + patient create/read operations
- `actions/appointment.action.ts`: appointment create/update/query + SMS notifications
- `lib/appwrite.config.ts`: Appwrite client initialization
- `lib/validation.ts`: all Zod schemas
- `middleware.ts`: admin route protection by passcode cookie
- `types/index.d.ts`, `types/appwrite.types.ts`: shared typing contracts

## Data And Status Conventions
- Appointment statuses are: `"pending" | "schedule" | "cancel"`.
- Keep existing field names for compatibility (including legacy typos like `indentification*`).
- Server actions currently normalize response objects via `parseStringify(...)`.

## Change Guidelines For Agents
- Prefer small, surgical edits over broad refactors.
- Keep server logic in `actions/*`; avoid moving Appwrite logic into client components.
- When changing forms, update both schema (`lib/validation.ts`) and form defaults/constants if needed.
- Preserve current route contracts and URL params (`userId`, `appointmentId`) unless a migration is planned.
- If admin behavior changes, verify middleware + passcode modal flow still works.

## Verification Checklist
- `npm run lint` passes
- Patient flow works end-to-end:
  - create user
  - register patient
  - create appointment
  - view success page and dashboard
- Admin flow works:
  - passcode prompt
  - `/admin` access
  - schedule/cancel actions update status correctly

## Known Risk Areas
- Admin passcode uses base64 (`encryptKey`/`decryptKey`) and cookie-based checks; this is obfuscation, not strong security.
- Several types/interfaces are duplicated in `types/index.d.ts`; edit carefully to avoid type drift.
- The codebase intentionally uses `revalidate = 0` on dashboard/admin pages for fresh data.
