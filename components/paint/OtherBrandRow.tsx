import { formatINR } from "@/lib/format";
import { Paint } from "@/types";

export default function OtherBrandRow({
  paint,
  active,
  onSelect,
}: {
  paint: Paint;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
        active ? "border-forest bg-forest/5" : "border-line bg-white hover:border-ink-faint"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-forest" : "bg-sky"}`}
      />
      <span className="flex-1">
        <span className="block text-sm font-bold text-ink">{paint.name}</span>
        <span className="mt-0.5 block text-xs text-ink-muted">
          {paint.brand} · ~{formatINR(paint.pricePerLitre)}/L · {paint.tier}
        </span>
      </span>
    </button>
  );
}
