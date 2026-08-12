// Seed data only — loaded into the database once by prisma/seed.ts.
// Live data is edited from /admin/home-sizes after that.
export const homeSizes = [
  { id: "1bhk", label: "1 BHK", sublabel: "approx. 1,600 sq ft", sqft: 1600 },
  { id: "2bhk", label: "2 BHK", sublabel: "approx. 2,900 sq ft", sqft: 2900 },
  { id: "3bhk", label: "3 BHK", sublabel: "approx. 4,200 sq ft", sqft: 4200 },
  { id: "villa", label: "Kothi / Villa", sublabel: "approx. 6,000 sq ft", sqft: 6000 },
];
