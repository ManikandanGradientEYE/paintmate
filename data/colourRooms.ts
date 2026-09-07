// Seed data only — loaded into the database once by prisma/seed.ts.
// Live data is edited from /admin/colour after that.
//
// Rooms and swatches come from the Figma "Get the experience of colour" section.
// Each room needs ONE transparent-background PNG (wall cut out); the selected swatch
// colour is painted behind it. Seeded with the opaque handoff photo as a placeholder
// until real transparent PNGs are uploaded from /admin/colour.
export const colourRooms = [
  {
    name: "Living Room",
    swatches: ["#CFBCC3", "#FF7D7D", "#DFDD93", "#C1AB00", "#F5E9CC"],
  },
  {
    name: "Kitchen",
    swatches: ["#FF994C", "#F5E9CC", "#DFDD93", "#CFBCC3", "#C1AB00"],
  },
  {
    name: "Kids Room",
    swatches: ["#FF994C", "#F49BB4", "#CF9DDB", "#FFDB79", "#DFDD93"],
  },
  {
    name: "Bed Room",
    swatches: ["#FFDB79", "#F5E9CC", "#CFBCC3", "#DFDD93", "#8A938F"],
  },
];

export const DEFAULT_ROOM_IMAGE = "/assets/room.jpg";
