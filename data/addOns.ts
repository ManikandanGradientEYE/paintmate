// Seed data only — loaded into the database once by prisma/seed.ts.
// Live data is edited from /admin/add-ons after that.
export const addOnDefs = [
  { id: "putty", label: "Wall putty", defaultOn: true, priced: true },
  { id: "primer", label: "Primer", defaultOn: true, priced: true },
  { id: "painter", label: "Add a painter", defaultOn: false, priced: false },
];
