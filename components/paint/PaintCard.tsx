import PaintThumb from "@/components/ui/PaintThumb";
import { formatINR } from "@/lib/format";
import { Paint } from "@/types";

export default function PaintCard({
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
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${
        active ? "border-forest bg-forest/5" : "border-line bg-white hover:border-ink-faint"
      }`}
    >
      <span
        className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
          active ? "border-forest bg-forest" : "border-ink-faint bg-white"
        }`}
      />
      <PaintThumb src={paint.imageUrl} alt={paint.name} size={32} />
      <span className="flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-ink">{paint.name}</span>
          {paint.recommended && (
            <span className="rounded-full bg-olive px-2.5 py-0.5 text-[11px] font-bold text-white">
              Recommended
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-xs text-ink-muted">
          {paint.brand} · {paint.approxPrice ? "~" : ""}
          {formatINR(paint.pricePerLitre)}/L · {paint.tier}
        </span>
      </span>
    </button>
  );
}
