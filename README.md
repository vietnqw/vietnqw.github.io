# Viet Portfolio (Next.js)

A personal portfolio built with Next.js 14, React 18, and Tailwind CSS 4. Includes sections for Hero, About, Skills, Projects, and Contact, plus dark theme and basic analytics.

## Prerequisites
- Node.js 18+ (or 20+ recommended)
- pnpm (Corepack recommended)

## Getting Started

1. Install dependencies:
```bash
corepack enable
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```
Open http://localhost:3000 in your browser.

## Available Scripts
- `pnpm dev`: Start Next.js in development mode
- `pnpm build`: Build the production bundle
- `pnpm start`: Start the production server (after build)
- `pnpm lint`: Run Next.js lint (build ignores are enabled in `next.config.mjs`)

## Tech Stack
- Next.js 14, React 18
- Tailwind CSS 4
- Radix UI + shadcn-inspired components
- Vercel Analytics (optional)

## Project Structure
- `app/`: App Router pages and layout
- `components/`: UI components and sections
- `public/`: Static assets
- `styles/`: Global styles

## Environment Variables
No mandatory env vars for local dev.

## Deployment
The app is ready for Vercel:
- Push to GitHub and import on Vercel
- Or build and run locally:
```bash
pnpm build
pnpm start
```

## License
MIT
