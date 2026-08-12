import { CatalogProduct } from "@/types";

export default function MoreProducts({ products }: { products: CatalogProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-forest">More from Jiwan Paints</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Featuring trusted products from Jiwan Paints — manufactured in Ludhiana since
        1966.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="h-24 w-full" style={{ backgroundColor: product.swatch }} />
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                {product.categoryLabel}
              </p>
              <p className="mt-1 text-sm font-bold text-ink">{product.name}</p>
              <p className="mt-1 text-xs text-ink-muted">{product.description}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-tan py-2 text-xs font-bold text-ink"
              >
                {product.cta === "add" ? "Add to quote" : "Ask on WhatsApp"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
