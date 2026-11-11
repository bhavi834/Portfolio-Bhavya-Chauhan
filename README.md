# Bhavya Chauhan | Portfolio

An accessible, responsive Next.js App Router portfolio with TypeScript, lightweight Framer Motion interactions, local technology assets and a server-side Resend contact endpoint. The existing project used plain CSS, not Tailwind; that setup is retained.

## Run locally

Use Node.js 22 LTS and npm. On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` to configure email. Do not commit `.env.local` or any private resume.

## Email and Vercel setup

1. Create a Resend API key with sending permission. Add and verify a domain you control in Resend using its required DNS records.
2. Set `RESEND_API_KEY` in Vercel project environment variables. It is server-only; never use a `NEXT_PUBLIC_` prefix.
3. Set `RESEND_FROM_EMAIL` to a verified sender, such as `Bhavya Portfolio <hello@your-domain.com>`.
4. Set `SITE_URL` to your final HTTPS origin without a trailing slash. For local development, use `http://localhost:3000`. The metadata also supports Vercel's production URL when `SITE_URL` is unset.
5. Import this project into Vercel with the Next.js preset and Node.js 22. Build command: `npm run build`. Leave the output directory at the preset default.
6. Redeploy after setting or changing environment variables. The static page's email-setup status is calculated at build time.
7. Submit one real enquiry after deployment, confirm it in Resend's delivery logs and check the destination inbox. Automated tests mock Resend; they do not establish real inbox delivery.

Enquiries always go to `bhavyachauhan3112@gmail.com`. The visitor's validated address is only used as Reply-To. Email content is plain text. Missing configuration produces a clear setup notice and HTTP 503; provider failure never returns success. Success requires Resend to return a message ID (provider acceptance, not a guarantee of inbox placement).

The endpoint validates field types, lengths and email format; checks browser origins; limits the actual body to 16 KiB; uses a honeypot and minimum form completion time; and limits attempts to five per ten minutes per trusted Vercel client IP. IPs are hashed and retained only in instance memory. This basic limit resets on cold starts and is not shared between serverless instances. For stronger production abuse protection, add a Vercel Firewall rate-limit rule for `POST /api/contact`. No database is needed.

Resend documentation: https://resend.com/docs/dashboard/domains/introduction and https://resend.com/docs/api-reference/emails/send-email

## Content and assets

- `app/data.ts`: verified project links and categorized skills.
- `app/page.tsx`: resume-backed experience, education, achievements and leadership.
- `app/globals.css`: responsive layout, focus styles, hover interactions and reduced-motion rules.
- `public/logos`: locally stored Devicon assets with license and source attribution, plus authentic ONGC, Grid Apps, Manipal University Jaipur and IAESTE logos from their official sites. Organization images are optimized WebP files with preserved proportions and original colors.
- `public/Bhavya-Chauhan-Resume.pdf`: newly generated public-safe resume. The source generator contains only approved professional content. The original is retained locally under ignored `tmp/private/`, outside the public directory. Never deploy or commit that folder.
- `scripts/create-public-resume.py`: regenerate the one-page resume using ReportLab and PyMuPDF; the preview is written under ignored `tmp/pdfs/`.

Paw Patrol's public repository was checked against its README. The resume's `pawpatrolrescue.com` URL belongs to a Houston animal rescue and is intentionally not presented as this project's demo. AlertLens's resume-linked Vercel demo was verified to return the AlertLens title. No project screenshots were found in the checkout or the checked project repositories; the project visuals are explicitly labeled workflow illustrations and do not depict measured results. No unverified PPE repository or demo is claimed.

The portfolio reference was used for general polish, with a distinct editorial layout. Fonts use Google Fonts with local system fallbacks; all logos and the public resume are served locally.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

The six contact tests cover missing setup, malformed and oversized input, cross-origin requests, validation, spam, throttling, provider acceptance and provider failures. They make no real email requests.

Final automated verification passed: lint with zero warnings, TypeScript, all six contact tests, and the production build. Checks against the running production server verified SEO metadata, one primary heading, internal navigation targets, all 22 rendered image responses (including optimized organization marks), local SVG assets, the resume PDF, and the expected HTTP 503 when email credentials are absent. The production page has 147 KB of first-load JavaScript.

Responsive rules, semantic controls, focus styles and reduced-motion behavior were reviewed in source. Phone/tablet visual checks and interactive accessibility QA remain incomplete: the portfolio Chrome window was unavailable, and automatic approval review blocked selecting an unrelated window. Do not treat those checks as passed. Before release, review the navigation, project cards and contact form at 320, 375, 768 and 1280 pixel widths, including keyboard navigation and reduced motion.

The earlier logo-download blocker has been resolved. All four official organization marks are served locally, with their source URLs documented in `public/logos/SOURCES.md`.

Next.js is pinned to the patched 15.5.28 maintenance release. PostCSS and the nested ESLint `minimatch` dependency are overridden to patched releases. `npm audit` reports zero vulnerabilities.
