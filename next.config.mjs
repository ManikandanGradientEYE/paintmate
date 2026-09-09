/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // A production `next build` writes into the same .next folder the dev server is
  // serving from, which corrupts a running `npm run dev` ("Cannot find module
  // './276.js'"). Setting NEXT_DIST_DIR sends a build somewhere else instead, so a
  // verification build can run while dev stays up. Unset — as on Vercel and for a
  // plain `npm run build` — this stays exactly as Next.js defaults it.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
