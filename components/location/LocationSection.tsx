"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { useQuote } from "@/context/QuoteContext";

export default function LocationSection() {
  const { state, dispatch, isInLudhiana, submitLead } = useQuote();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: { name?: string; phone?: string } = {};
    if (state.contact.name.trim().length < 2) {
      nextErrors.name = "Enter your full name";
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(state.contact.phone.trim())) {
      nextErrors.phone = "Enter a valid contact number";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);
    const result = await submitLead();
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  }

  if (status === "success") {
    return (
      <Card id="contact">
        <p className="text-base font-bold text-forest">Thanks, {state.contact.name}!</p>
        <p className="mt-1 text-sm text-ink-muted">
          Our team will reach out on {state.contact.phone} shortly to confirm your
          quote and shade.
        </p>
      </Card>
    );
  }

  return (
    <Card id="contact">
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <input
              type="text"
              value={state.contact.name}
              onChange={(e) =>
                dispatch({ type: "SET_CONTACT", field: "name", value: e.target.value })
              }
              placeholder="Your name"
              className="w-full rounded-xl border border-line px-4 py-3 text-sm text-ink outline-none focus:border-forest"
            />
            {errors.name && <p className="mt-1 text-xs text-brand-pink">{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              value={state.contact.phone}
              onChange={(e) =>
                dispatch({ type: "SET_CONTACT", field: "phone", value: e.target.value })
              }
              placeholder="Contact number"
              className="w-full rounded-xl border border-line px-4 py-3 text-sm text-ink outline-none focus:border-forest"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-brand-pink">{errors.phone}</p>
            )}
          </div>
        </div>

        <input
          type="text"
          value={state.locality}
          onChange={(e) => dispatch({ type: "SET_LOCALITY", value: e.target.value })}
          placeholder="Enter area/locality in Ludhiana..."
          className="mt-3 w-full rounded-xl border border-line px-4 py-3 text-sm text-ink outline-none focus:border-forest"
        />
        {!isInLudhiana && (
          <p className="mt-1.5 text-xs text-ink-faint">
            Outside Ludhiana? Delivery charge confirmed on WhatsApp.
          </p>
        )}

        {status === "error" && serverError && (
          <p className="mt-3 text-sm font-semibold text-brand-pink">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 w-full rounded-full bg-brand-pink py-3.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Get quote on WhatsApp"}
        </button>

        <p className="mt-2 text-center text-xs text-ink-faint">
          Rough estimate only. Final quote confirmed on WhatsApp.
        </p>
        <p className="mt-1 text-center text-xs font-bold text-ink">
          First order: 5% off. Second order: 10% off. Discount confirmed on final
          WhatsApp quote.
        </p>
      </form>
    </Card>
  );
}
