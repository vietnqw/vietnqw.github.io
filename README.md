# My v0 Project

This is a Next.js project bootstrapped with `create-next-app`.

## Getting Started

### Prerequisites

- Node.js 18 or newer (Node 20/22 is fine)
- pnpm available via Corepack (recommended)

Enable pnpm with Corepack (one-time):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Install dependencies:

```bash
pnpm install
```

If you see a message about "Ignored build scripts", approve them once:

```bash
pnpm approve-builds
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Alternatively, you can use npm if you prefer:

```bash
npm install
npm run dev
```

## Deployment

This project is configured to deploy to GitHub Pages. To deploy the site, follow these steps:

1.  Push your changes to the `main` branch.
2.  Go to your repository's **Settings** > **Pages**.
3.  Under **Build and deployment**, select **GitHub Actions** as the source.
4.  The site will be deployed automatically.
