# HsiehLog

A beginner-friendly static blog built with:
- Next.js (App Router, latest)
- Tailwind CSS + shadcn-style UI components
- Markdown posts stored locally in `/content`
- Google Analytics (optional)
- Contact form with Zoho SMTP (works locally/Node; see Cloudflare note)

> Cloudflare Pages note: SMTP is not supported on the Workers runtime. The contact form works locally and on Node hosts. For Cloudflare production, use a HTTPS-based email API (Zoho Mail API, Resend, Mailgun, etc.).

## Features

- Home page lists posts from `/content`
- Post pages rendered from Markdown (frontmatter via gray-matter, HTML via remark)
- SEO: metadata, `sitemap.xml`, `robots.txt`, canonical and RSS alternates
- RSS feed at `/rss.xml`
- Responsive UI with Tailwind and shadcn-style components
- Contact page with form; server route for email (SMTP locally/Node)
- Google Analytics via `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

## Prerequisites

- Node.js 18+ (recommended 20+)
- npm 9+

## Getting Started

1) Clone and install
```bash
git clone YOUR_REPO_URL HsiehLog
cd HsiehLog
npm install
```

2) Set up environment variables
- Copy `.env.example` to `.env.local`
- Fill in your values (GA optional; SMTP for local email sending)

```bash
cp .env.example .env.local
```

3) Run locally
```bash
npm run dev
```
- Open http://localhost:3000
- Visit `/` to see posts
- Visit `/blog/hello-world` to see a post
- Try `/contact` to send a test email (works locally with Zoho SMTP)

## Project Structure

```
app/                # App Router pages, layout, API routes
components/         # Reusable UI components (Header, Footer, PostCard, inputs)
content/            # Markdown blog posts
lib/                # Helpers for markdown and utilities (GA, cn)
public/             # Static assets (favicon, images)
```

### Content authoring

- Create new posts in `/content` with `.md` extension.
- Include frontmatter at the top:
```md
---
title: "My Title"
description: "Short summary"
date: "2025-10-07"
---
Your markdown content here...
```
- The filename determines the URL at `/blog/<filename>`.

### Styling

- Tailwind is preconfigured; global styles in `app/globals.css`.
- Reusable UI components in `components/ui/*` follow the shadcn style (Button, Input, Textarea).
- Adjust `tailwind.config.ts` to customize design tokens.

### Analytics

- Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` in `.env.local`.
- If not set, analytics script is not injected.

### Contact form and Zoho SMTP

- API route: `app/api/contact/route.ts`
- Uses `nodemailer` with Zoho SMTP environment variables from `.env.local`.
- Works locally and on Node-based hosting.
- On Cloudflare Pages runtime, you will get a friendly 501 response explaining SMTP is unavailable.

Required environment variables:
```
ZOHO_SMTP_USER=your-address@yourdomain.com
ZOHO_SMTP_PASS=your-app-password-or-smtp-password
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
ZOHO_SMTP_SECURE=true
CONTACT_TO=your-address@yourdomain.com
```

### SEO

- `app/sitemap.ts` and `app/robots.ts` generate your sitemap and robots.
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` (no trailing slash) for correct absolute URLs.
- RSS is available at `/rss.xml`.

## Deploy to Cloudflare Pages

Cloudflare supports Next.js via the official adapter.

Option A — Cloudflare adapter scripts (recommended):
1) Push your repo to GitHub.
2) Cloudflare Dashboard → Pages → Create a project → Connect to GitHub.
3) Build settings:
   - Build command: `npm run cf:build`
   - Output directory: leave empty (adapter manages outputs)
   - Node version: 18+ (or Default)
4) Environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (optional)
   - `NEXT_PUBLIC_SITE_URL` (recommended, e.g., `https://your-domain.com`)
   - If you switch to an HTTPS email API, add those creds too.
5) Deploy.

Local Cloudflare preview (optional):
```bash
npm run cf:preview
```

Option B — Cloudflare Next.js preset:
- Use default build command `npm run build`. The preset will detect Next.js and handle output.

Contact form on Cloudflare:
- SMTP is not supported on Pages runtime.
- Replace SMTP with a HTTPS email API (Zoho Mail API with OAuth, Resend, Mailgun, etc.).
- Implement in `app/api/contact/route.ts` using `fetch` to your provider.

## Common Scripts

- `npm run dev`: Start local dev server
- `npm run build`: Build for production
- `npm start`: Start production server (Node host)
- `npm run cf:build`: Build using Cloudflare Next-on-Pages adapter
- `npm run cf:preview`: Serve a local Cloudflare preview

## Troubleshooting

- Posts not showing: ensure `.md` files exist in `/content` and have valid frontmatter.
- Markdown not rendering: check `gray-matter` frontmatter and `remark` pipeline.
- SMTP errors locally: verify `.env.local` values and that your Zoho account allows SMTP with the provided password/app password.

## Learn More

- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui patterns: https://ui.shadcn.com
- Cloudflare Pages + Next.js: https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/
