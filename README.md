# Recoup Admin

Admin dashboard for the Recoup platform, built with [Next.js](https://nextjs.org) 16 and the App Router.

## Getting Started

### Prerequisites

- Node.js v22+
- pnpm v10+

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```text
admin/
├── app/              # Next.js App Router pages and layouts
│   ├── globals.css   # Global styles (Tailwind CSS)
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # Shared React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and shared logic
├── types/            # TypeScript type definitions
├── public/           # Static assets
├── next.config.ts    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration (v4 via PostCSS)
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **React:** 19
- **Auth:** [Privy](https://privy.io) (Bearer token)
- **Data Fetching:** TanStack React Query
- **Linting:** ESLint 9 with next/core-web-vitals

## API Calls

All API calls are authenticated with a Privy Bearer token (`Authorization: Bearer <accessToken>`).

The base URL is resolved from `lib/consts.ts`:
- **Production:** `https://recoup-api.vercel.app`
- **Test:** `https://test-recoup-api.vercel.app`

| Method | Endpoint | Purpose | Docs |
|--------|----------|---------|------|
| `GET` | `/api/admins` | Check if the authenticated account is an admin | [Check Admin Status](https://developers.recoupable.com/api-reference/admins/check) |
| `GET` | `/api/admins/emails?account_id=<id>` | List all Resend emails sent to an account (for Pulse email preview) | [List Account Emails](https://developers.recoupable.com/api-reference/admins/emails) |
| `GET` | `/api/admins/sandboxes` | Fetch sandbox statistics per account | [List Sandboxes](https://developers.recoupable.com/api-reference/admins/sandboxes) |
| `GET` | `/api/admins/sandboxes/orgs` | Fetch org repo commit statistics | [List Sandbox Orgs](https://developers.recoupable.com/api-reference/admins/sandboxes-orgs) |
| `GET` | `/api/tasks/runs?account_id=<id>&limit=<n>` | Fetch recent Trigger.dev task runs for an account | [Get Task Runs](https://developers.recoupable.com/api-reference/tasks/runs) |

### Where each call is made

- **`/api/admins`** — `hooks/useIsAdmin.ts` — guards the entire dashboard; redirects non-admins
- **`/api/admins/emails`** — `lib/recoup/fetchAccountPulseEmails.ts` + `lib/recoup/fetchPulseEmailById.ts` — powers the `PulseEmailModal` on `/accounts/[account_id]`
- **`/api/admins/sandboxes`** — `lib/fetchAdminSandboxes.ts` — populates the main sandboxes data table
- **`/api/admins/sandboxes/orgs`** — `lib/recoup/fetchAdminSandboxOrgs.ts` — populates the `/sandboxes/orgs` org repos table
- **`/api/tasks/runs`** — `lib/recoup/fetchAccountTaskRuns.ts` — shows recent Pulse task runs on the `/accounts/[account_id]` detail page (auto-polls every 10 s)

Full API reference: [developers.recoupable.com](https://developers.recoupable.com)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Recoup API Docs](https://developers.recoupable.com)
