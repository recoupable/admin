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
- **Auth:** [Privy](https://privy.io) (login + access tokens)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query)
- **Linting:** ESLint 9 with next/core-web-vitals

## API Calls

All API calls target the Recoup API (`https://recoup-api.vercel.app` in production, `https://test-recoup-api.vercel.app` in development/test). Every request is authenticated with a Privy access token via `Authorization: Bearer <token>`.

| Endpoint | Method | Description | Docs |
|---|---|---|---|
| `/api/admins` | GET | Check whether the authenticated account is a Recoup admin | [Check Admin Status](https://developers.recoupable.com/api-reference/admins/check) |
| `/api/admins/emails` | GET | Fetch Resend emails for an account (used for pulse email previews) | [Admin Emails](https://developers.recoupable.com/api-reference/admins/emails) |
| `/api/admins/sandboxes` | GET | Fetch per-account sandbox statistics | [Admin Sandboxes](https://developers.recoupable.com/api-reference/admins/sandboxes) |
| `/api/admins/sandboxes/orgs` | GET | Fetch org repo commit statistics ordered by total commits | [Admin Sandbox Orgs](https://developers.recoupable.com/api-reference/admins/sandboxes-orgs) |
| `/api/tasks/runs` | GET | Fetch background task runs for a specific account | [Get Task Runs](https://developers.recoupable.com/api-reference/tasks/runs) |

### Query Parameters

**`GET /api/admins/emails`**
- `account_id` — fetch all emails sent to this account
- `email_id` — fetch a single email by Resend ID

**`GET /api/tasks/runs`**
- `account_id` *(required)* — account whose runs to fetch
- `limit` *(optional, default: 20)* — maximum number of runs to return

### Authentication

Privy issues a short-lived access token after login. The token is retrieved with `getAccessToken()` from the Privy React SDK and sent in every request header:

```
Authorization: Bearer <privy-access-token>
```

The API resolves the token to an `account_id` and enforces admin-only access for `/api/admins/*` endpoints.

See the [Authentication docs](https://developers.recoupable.com/authentication) for the full token flow.

## Learn More

- [Recoup API Docs](https://developers.recoupable.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Privy Docs](https://docs.privy.io)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
