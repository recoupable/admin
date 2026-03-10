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
- **Linting:** ESLint 9 with next/core-web-vitals

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
