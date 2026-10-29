# jaynee.ng

Nigerian fashion atelier. **Style with a Smile, Elegance Redefined.**

Live brand: [jaynee.ng](https://jaynee.ng) · Repo: [github.com/Sheddybata/jaynee](https://github.com/Sheddybata/jaynee)

The site is a lookbook and custom-tailoring desk. Nothing is listed for sale on the site. Visitors tap a look or fill a form, then send the request on WhatsApp.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- Zod validation, Lucide icons
- Optional Supabase, Paystack, and Flutterwave (mock mode without credentials)

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

For local SEO URLs that should not point at production, set:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub

```bash
git init
git remote add origin https://github.com/Sheddybata/jaynee.git
git add .
git commit -m "Initial jaynee.ng storefront"
git branch -M main
git push -u origin main
```

Create the empty GitHub repo first if it does not exist: [github.com/Sheddybata/jaynee](https://github.com/Sheddybata/jaynee).

## Deploy on Vercel

1. Import **Sheddybata/jaynee** in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js**.
3. Set environment variables from `.env.example`. At minimum:

   - `NEXT_PUBLIC_SITE_URL=https://jaynee.ng`
   - `AUTH_SECRET` — a long random string

4. Deploy.
5. In the Vercel project, add the domain **jaynee.ng** (and `www` if you use it), then point DNS at Vercel.

After launch, submit `https://jaynee.ng/sitemap.xml` in [Google Search Console](https://search.google.com/search-console). Paste the verification token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.

`next build` uses Turbopack by default in this Next.js version.

## Search

Titles, descriptions, keywords, Open Graph images, JSON-LD (`Organization` + `WebSite`), `robots.txt`, and `sitemap.xml` are set so searches for **jaynee** and **jaynee.ng** can resolve to this site. Google still has to crawl and index it after the domain is live.

## Brand

Name, tagline, and logo path live in `lib/config.ts`. Colours are in `app/globals.css`. Favicon and Apple icon are generated from `public/logo.jpeg`.

## Mock mode

Enabled whenever Supabase or payment secrets are missing.

| Area | What happens |
| --- | --- |
| Lookbook | Studio photos. Tap a look to open WhatsApp. |
| Tailoring, appointments, measurements, contact, newsletter | Validated, then opened on WhatsApp (`+234 703 666 3581`). The customer must tap Send. |
| Admin | Blocked unless the demo admin credentials match. |

Demo admin (change these in `.env.local`):

- Email: `admin@jaynee.ng`
- Password: `demo-admin-login`

## Project map

- `app/` — pages, metadata, icons, API routes
- `components/` — storefront, account, admin, UI
- `lib/data/` — lookbook and content
- `public/clothes/` — studio photographs
- `public/logo.jpeg` — brand mark
