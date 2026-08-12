# Paint Mate — quotation calculator + admin

Next.js + TypeScript + Tailwind + Prisma/PostgreSQL build of the Paint Mate quote page
(Jiwan Group Venture), backed by a database and a staff admin panel at `/admin`.
Hosted on **Vercel** with a **Neon** Postgres database.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in ADMIN_PASSWORD and ADMIN_SESSION_SECRET
# then edit .env directly with your Neon DATABASE_URL / DIRECT_URL (see below)
npm run db:migrate           # applies the schema to your Neon database
npm run db:seed              # loads data/*.ts into it
npm run dev
```

Open http://localhost:3000 for the customer site, http://localhost:3000/admin/login
for staff (password from `ADMIN_PASSWORD` in `.env.local`).

Local dev and production point at the **same Neon database** by design (no local
Postgres to install, and only one schema to keep in sync) — see the deployment guide
below for creating it.

## Database

PostgreSQL, hosted on Neon (free tier). Vercel's serverless functions have no
persistent disk, so this can't be SQLite — every request may run on a fresh instance
with an empty filesystem. Neon gives two connection strings: `DATABASE_URL` (pooled,
via PgBouncer — used for normal queries so many concurrent serverless invocations don't
exhaust Postgres's connection limit) and `DIRECT_URL` (unpooled — used only for running
migrations). Both go in `prisma/schema.prisma`'s datasource block already.

## Deploying (Vercel + Neon)

**1. Create the Neon database**
- Sign up at [neon.tech](https://neon.tech) (free tier is enough for this).
- Create a project. Neon gives you a default database immediately.
- Open **Connection Details** — copy the **pooled** connection string (host contains
  `-pooler`) and the **direct** connection string (no `-pooler`).

**2. Configure this repo locally**
- `cp .env.example .env.local`, then set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`
  to real values (not the placeholders).
- Edit `.env` directly (Prisma's CLI reads this file, not `.env.local`) and paste in
  `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) from Neon. Both files are
  gitignored — nothing here gets committed.
- Run `npm run db:migrate` — this creates the tables in Neon and writes a fresh
  migration under `prisma/migrations/` (there's no migration history yet since this
  project switched from SQLite).
- Run `npm run db:seed` to load the starting products/shades/pricing.
- Commit the new `prisma/migrations/` folder — migrations are code and belong in git,
  unlike `.env`.

**3. Push to GitHub**

This project currently isn't its own git repository — set one up:
```bash
git init
git add .
git commit -m "Initial commit"
```
Then create a new (empty) repository on GitHub and push to it — either via the GitHub
website ("New repository") or `gh repo create` if you have the GitHub CLI. Don't reuse
an existing unrelated repo for this.

**4. Import into Vercel**
- Sign up / log in at [vercel.com](https://vercel.com) with your GitHub account.
- "Add New Project" → import the `paintmate` repo.
- Framework preset auto-detects Next.js — leave build settings as default.
- Before deploying, add **Environment Variables** (Project Settings → Environment
  Variables), same four as your `.env`/`.env.local`: `DATABASE_URL`, `DIRECT_URL`,
  `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. Use a different, strong `ADMIN_PASSWORD`
  from any local testing value.
- Deploy. Vercel runs `npm install` (which triggers `prisma generate` via the
  `postinstall` script) then `next build`.

**5. Verify**
- Visit the Vercel-assigned URL — the storefront should load with your seeded data.
- Visit `/admin/login` and sign in with the production `ADMIN_PASSWORD`.
- Submit a test quote on the storefront, confirm it shows up in `/admin/leads`.

**6. Custom domain (optional)**
- Project Settings → Domains → add yours, and update DNS at your registrar as Vercel
  instructs (usually a CNAME or A record). HTTPS is automatic.

**Ongoing changes**: whenever you change `prisma/schema.prisma`, run
`npm run db:migrate` locally (against the same Neon database) to create and apply the
migration, commit the migration folder, then push — Vercel redeploys automatically on
every push to the connected branch. There's no separate "deploy migration" step because
local dev and production share one database.

## What's configurable from /admin

Everything that used to be hardcoded now lives in the database and is editable without
a code change: home sizes, paints (Jiwan + other brands), shades, add-ons, the "More
from Jiwan Paints" catalog, and the pricing engine's own constants (coverage rates,
GST, delivery fee, putty pricing) — see `/admin/pricing`. `data/*.ts` still exists, but
only as the one-time seed source for `prisma/seed.ts`; editing those files after the
first seed has no effect on the running site.

## Leads

Every "Get quote on WhatsApp" submission is saved as a `Lead` (name, phone, job
details, computed estimate) and recomputed server-side in `app/api/leads/route.ts`
(never trusts client-sent totals). Staff review leads at `/admin/leads`, with
click-to-call and click-to-WhatsApp links, a status dropdown (new → contacted → quoted
→ won/lost), and free-text notes.

## Structure

- `prisma/schema.prisma` — all models (HomeSize, Paint, Shade, AddOn, CatalogProduct,
  PricingSetting, Lead). `prisma/seed.ts` loads `data/*.ts` into it once.
- `lib/pricing.ts` — the estimate engine, now driven by `PricingSettings` fetched from
  the DB instead of hardcoded constants. Coverage rates were reverse-engineered to
  match the reference numbers in the original design (1,000 sq ft, 2 coats, SuperFinish
  → ₹6,287 total) — verified end-to-end against a running instance.
- `lib/auth.ts` + `middleware.ts` — single shared admin password, HMAC-signed session
  cookie (Web Crypto, so it works in both Edge middleware and Node API routes).
- `context/QuoteContext.tsx` — single source of truth for all calculator selections,
  seeded from DB data fetched server-side in `app/page.tsx`.
- `app/api/` — `leads` (public) and `admin/*` (password-protected) route handlers.
- `app/admin/` — `/admin/login` (public) and the `(dashboard)` route group (nav +
  leads/paints/shades/home-sizes/add-ons/catalog/pricing editors).
- `components/` — one folder per page section on the storefront; `components/admin/`
  for the editor UIs.

## Known placeholders

- "Get quote on WhatsApp" saves the lead to the database but doesn't yet open an actual
  `wa.me` chat — no business WhatsApp number was provided. Wiring it up is a small
  addition once you have one (build the link from the lead's phone + a prefilled
  message in `LocationSection.tsx`).
- Language switcher (English/Hindi/Punjabi) toggles state but content isn't translated.
- Shade grid ships a representative sample per category, not a full 229-shade catalog
  (add more via `/admin/shades`).
- Admin auth is a single shared password for all staff, by design (see conversation) —
  upgrade to individual logins later if you need per-staff accountability.
