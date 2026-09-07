// Seed data only — loaded into the database once by prisma/seed.ts.
// Live data is edited from /admin/colour after that.
//
// Rooms and swatches come from the Figma "Get the experience of colour" section.
// Every swatch starts on the one room photo shipped with the handoff; staff replace
// each one with a photo of that room actually painted in that shade.
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
