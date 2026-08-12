"use client";

import { Fragment, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { formatINR } from "@/lib/format";
import { Lead, LeadStatus } from "@/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-sky text-ink",
  contacted: "bg-tan text-ink",
  quoted: "bg-rose text-ink",
  won: "bg-olive text-white",
  lost: "bg-line text-ink-muted",
};

function waLink(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
    setSavingId(id);
    const result = await adminFetch<Lead>(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setSavingId(null);
    if (result.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? result.data : l)));
    }
  }

  if (leads.length === 0) {
    return (
      <p className="mt-8 text-sm text-ink-faint">
        No quote requests yet — they will show up here as customers submit the form.
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="border-b border-line bg-cream/60 text-xs font-bold uppercase tracking-wide text-ink-faint">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Job</th>
            <th className="px-4 py-3">Estimate</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Received</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const expanded = expandedId === lead.id;
            return (
              <Fragment key={lead.id}>
                <tr className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-bold text-ink">{lead.name}</p>
                    <div className="mt-0.5 flex gap-2 text-xs">
                      <a href={`tel:${lead.phone}`} className="text-forest">
                        {lead.phone}
                      </a>
                      <span className="text-ink-faint">·</span>
                      <a
                        href={waLink(lead.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-pink"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    <p>
                      {lead.areaSqft} sq ft · {lead.surface} · {lead.coats} coat
                      {lead.coats > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs">
                      {lead.paintName}
                      {lead.shadeCode ? ` · ${lead.shadeCode}` : ""}
                    </p>
                    {lead.locality && <p className="text-xs">{lead.locality}</p>}
                  </td>
                  <td className="px-4 py-3 font-bold text-forest">
                    {formatINR(lead.estimateTotal)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={savingId === lead.id}
                      onChange={(e) =>
                        updateLead(lead.id, { status: e.target.value as LeadStatus })
                      }
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-bold capitalize outline-none ${STATUS_STYLES[lead.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-faint">
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : lead.id)}
                      className="text-xs font-bold text-ink-muted"
                    >
                      {expanded ? "Hide" : "Notes"}
                    </button>
                  </td>
                </tr>
                {expanded && (
                  <tr className="border-b border-line bg-cream/40">
                    <td colSpan={6} className="px-4 py-3">
                      <textarea
                        defaultValue={lead.notes ?? ""}
                        placeholder="Internal notes about this lead..."
                        rows={2}
                        onBlur={(e) => updateLead(lead.id, { notes: e.target.value })}
                        className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-forest"
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
