-- Painter labour moves from a per-head charge to a per-square-foot one. The old
-- value (rupees per painter) is not convertible to rupees per sq ft, so the column
-- is replaced rather than renamed and the shop re-enters its rate in /admin/pricing.
ALTER TABLE "PricingSetting" DROP COLUMN "painterRate";
ALTER TABLE "PricingSetting" ADD COLUMN "painterRatePerSqft" DOUBLE PRECISION NOT NULL DEFAULT 7;
