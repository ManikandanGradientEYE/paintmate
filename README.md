# Paint Mate — quotation calculator + admin

Next.js + TypeScript + Tailwind + Prisma/MySQL build of Paint Mate (a Jiwan Group
Venture): a marketing home page at `/`, the Paint Shop estimator at `/shop`, and a staff
admin panel at `/admin`. Hosted on **Hostinger** (Node.js app) with a **Hostinger MySQL**
database.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in ADMIN_PASSWORD and ADMIN_SESSION_SECRET
# then edit .env directly with the Hostinger DATABASE_URL (see below)
npm run dev
```

Open http://localhost:3000 for the customer site, http://localhost:3000/admin/login
for staff (password from `ADMIN_PASSWORD` in `.env.local`).

Local dev and production point at the **same MySQL database** by design (only one
schema to keep in sync) — so anything you do locally, including test leads and admin
edits, happens on the live data.

## Database

MySQL on Hostinger (hPanel → Databases → Management). Prisma's CLI reads
`DATABASE_URL` from `.env` (not `.env.local`); URL-encode special characters in the
password (`@` → `%40`). To connect from your PC, your IP must be allowed under hPanel →
Databases → **Remote MySQL**; the Hostinger-hosted app itself connects without that.

Until October 2026 the data lived in Neon Postgres; it was copied over with
`scripts/neon-to-mysql.ts` (see the comment at its top). `prisma/neon/` and
`NEON_DATABASE_URL` exist only for that transfer and can be deleted once Neon is retired.

## Deploying (Hostinger Node.js app — Business or Cloud plan)

1. Zip the project **without** `node_modules/`, `.next/`, `.git/`, `.env*`, `backup/`
   and `UI_UX_changes/` (e.g. `git archive` of the app folders).
2. hPanel → Websites → Add website → **Node.js Apps** → upload the zip.
3. Framework **Next.js**, Node **20.x**, build `npm run build`, start `npm run start`.
   `npm install` runs `prisma generate` via the `postinstall` script.
4. Environment variables: `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
   On Hostinger, `localhost` also works as the MySQL host in `DATABASE_URL`.
5. Deploy, connect the domain, then verify: storefront loads, `/admin/login` works, a
   test quote shows up in `/admin/leads`.

Admin image uploads are stored in MySQL (`UploadedImage`) and served publicly from
`/api/uploads/<id>`, so they survive redeploys and are part of every database backup.
They used to live on Vercel Blob; `scripts/blob-to-mysql.ts` moved them over.

**Ongoing changes**: whenever you change `prisma/schema.prisma`, run
`npm run db:migrate` locally (against the same MySQL database) to create and apply the
migration, commit the migration folder, then upload the new build. There's no separate
"deploy migration" step because local dev and production share one database.

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

## Figma addition
   https://www.figma.com/design/Q1qMIAeLAaBdrcdwOKgSIe/Paint-Mate?node-id=0-1&p=f&t=0pKNg6drqYvF8r4n-0

## Design system

The UI follows the Figma handoff in `UI_UX_changes/` (both `paint-mate-desktop-html` and
`paint-mate-mobile-html` — the desktop file is the responsive superset and is the one to
diff against). Tokens live in `tailwind.config.ts` and `app/globals.css`:

| Token | Value |
|---|---|
| Cream (page) | `#FFFBF1` |
| Dark green | `#28462E` |
| Lime | `#B3C341` |
| Pale lime | `#E9EAC0` |
| Mint | `#E2EDE9` |
| Sand | `#F0E4D0` |

Headings use **Anton**, body text uses **Figtree** (both SIL OFL, self-hosted from
`public/fonts`). Photography and paint textures live in `public/assets`, copied from the
handoff. Shared classes — `.display`, `.quote-brush`, `.pm-card`, `.hscroll`, `.blob`,
`.pad-x` — are defined in `app/globals.css`.

Anton and Figtree are Latin-only, so Hindi and Punjabi text falls back to the system
Devanagari/Gurmukhi face. That is expected; swap in a matching Indic display font if you
want headings to keep the Anton look in all three languages.

## Pages

- `/` — marketing home: hero, drag-to-compare before/after slider, about + stat chips,
  marquee, why us, our work gallery, colour experience, 4-step journey, reviews.
- `/shop` — the estimator: home size, surface/coats, paint picker, add-ons (including a
  painter counter), shades with an "another brand" request form, and the estimate.
  Desktop keeps the estimate + delivery form in a sticky right column; mobile uses the
  sticky bottom bar with a "Know Details" sheet.
- `/admin` — staff panel, English only, unchanged by the redesign.

## Known placeholders

- "Get quote on WhatsApp" saves the lead to the database but doesn't yet open an actual
  `wa.me` chat — no business WhatsApp number was provided. Wiring it up is a small
  addition once you have one (build the link from the lead's phone + a prefilled
  message in `LocationSection.tsx`).
- Language selection (English/Hindi/Punjabi) resets on a full page reload — it is React
  state, not a cookie. Admin-entered content (paint names, shade codes, catalog copy)
  intentionally stays as typed in every language.
- The old "More from Jiwan Paints" product grid is not part of the new design, so it no
  longer renders on the storefront. The data and its `/admin/catalog` editor are still
  in place, so it can be brought back whenever the design calls for it.
- Home page imagery and copy (our work, reviews, stats) are static from the handoff —
  not yet admin-editable. The colour-experience section is the exception: rooms, their
  transparent-wall PNG and their colour swatches are managed at /admin/colour. Each room
  needs ONE PNG with the wall cut out; the chosen swatch is painted behind it, so one
  image covers every shade. The seeded placeholder is an opaque JPG, so no tint shows
  until a real transparent PNG is added.
- "Still confused! Check out a preview of your shade" and "View Gallery" are styled from
  the design but have no destination yet.
- Shade grid ships a representative sample per category, not a full 229-shade catalog
  (add more via `/admin/shades`).
- Admin auth is a single shared password for all staff, by design (see conversation) —
  upgrade to individual logins later if you need per-staff accountability.
