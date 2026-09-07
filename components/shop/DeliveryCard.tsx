"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import { useLanguage } from "@/context/LanguageContext";

export default function DeliveryCard() {
  const { state, dispatch, isInLudhiana, submitLead } = useQuote();
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: { name?: string; phone?: string } = {};
    if (state.contact.name.trim().length < 2) nextErrors.name = t.locationNameError;
    if (!/^[0-9+()\-\s]{7,20}$/.test(state.contact.phone.trim()))
      nextErrors.phone = t.locationPhoneError;
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
      <section className="pm-card" id="contact">
        <h2 className="display text-[21px] lg:text-[26px]">
          {t.locationThanksName(state.contact.name)}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed lg:text-[17px]">
          {t.locationWillReachOut(state.contact.phone)}
        </p>
      </section>
    );
  }

  const fieldClass =
    "mt-3.5 w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-3.5 text-[15.5px] font-bold text-ink outline-none placeholder:text-[#A6A6A6] focus:border-lime lg:px-5 lg:py-[17px] lg:text-[17px]";

  return (
    <section className="pm-card" id="contact">
      <h2 className="display mb-[18px] text-[21px] lg:mb-[22px] lg:text-[26px]">
        {t.deliveryTitle}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          value={state.contact.name}
          onChange={(e) =>
            dispatch({ type: "SET_CONTACT", field: "name", value: e.target.value })
          }
          placeholder={t.locationNamePlaceholder}
          className={`${fieldClass} mt-0`}
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-semibold text-[#C2410C]">{errors.name}</p>
        )}

        <input
          type="tel"
          value={state.contact.phone}
          onChange={(e) =>
            dispatch({ type: "SET_CONTACT", field: "phone", value: e.target.value })
          }
          placeholder={t.locationPhonePlaceholder}
          className={fieldClass}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs font-semibold text-[#C2410C]">{errors.phone}</p>
        )}

        <input
          type="text"
          value={state.locality}
          onChange={(e) => dispatch({ type: "SET_LOCALITY", value: e.target.value })}
          placeholder={t.locationLocalityPlaceholder}
          className={fieldClass}
        />
        {!isInLudhiana && (
          <p className="mt-3.5 text-[13px] leading-[1.5] text-ink-muted">
            {t.locationOutsideLudhiana}
          </p>
        )}

        {status === "error" && serverError && (
          <p className="mt-3.5 text-sm font-semibold text-[#C2410C]">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-5 block w-full rounded-xl bg-lime py-4 text-center text-[17px] font-extrabold text-forest transition hover:brightness-105 disabled:opacity-60 lg:py-[18px] lg:text-[19px]"
        >
          {status === "submitting" ? t.locationSending : t.locationGetQuoteButton}
        </button>

        <p className="mt-3.5 text-[13px] leading-[1.5] text-ink-muted">
          {t.locationRoughEstimate} {t.estimateDiscountNote}
        </p>
      </form>
    </section>
  );
}
