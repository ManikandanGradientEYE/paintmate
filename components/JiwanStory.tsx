const BADGES = [
  "Backed by Jiwan Group",
  "Trusted paint manufacturing experience",
  "Shade matching support",
  "Local Ludhiana delivery",
  "GST billing & verified supply",
];

export default function JiwanStory() {
  return (
    <section id="jiwan-story" className="mt-10 rounded-2xl bg-forest p-6 md:p-8">
      <h2 className="text-2xl font-extrabold text-white">The Jiwan Group Story</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
        Paint Mate is a Jiwan Group venture, backed by decades of experience in paints,
        coatings and industrial chemicals. Jiwan Paints brings manufacturing knowledge,
        shade matching capability and reliable supply support to the platform.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BADGES.map((badge) => (
          <div
            key={badge}
            className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
