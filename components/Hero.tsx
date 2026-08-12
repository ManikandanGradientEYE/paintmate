const BADGES = [
  { label: "Same / 2-day delivery in Ludhiana", className: "bg-tan text-ink" },
  {
    label: "Custom shade matching usually ready in approx. 2 days",
    className: "bg-rose text-ink",
  },
  { label: "GST billing", className: "bg-sky text-ink" },
];

export default function Hero() {
  return (
    <section>
      <h1 className="text-3xl font-extrabold leading-tight text-forest md:text-4xl">
        Your one-stop paint shop
      </h1>
      <p className="mt-2 text-ink-muted">
        Paints, primers, putty, tools and painters — all in one place.
      </p>
      <p className="mt-4 max-w-2xl text-ink">
        Paint Mate helps you <span className="font-semibold">plan, price and order</span>{" "}
        everything needed for a paint job — paints, primers, putty, tools and painter
        support. Featuring trusted products from{" "}
        <span className="font-semibold">Jiwan Paints</span>.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {BADGES.map((badge) => (
          <span
            key={badge.label}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}
