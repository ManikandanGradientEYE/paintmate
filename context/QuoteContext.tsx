"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { calculateEstimate } from "@/lib/pricing";
import { isLudhianaLocality } from "@/lib/format";
import {
  AddOnDef,
  Coats,
  EstimateBreakdown,
  HomeSize,
  Paint,
  PricingSettings,
  Shade,
  ShadeCategory,
  SiteData,
  Surface,
} from "@/types";

type Language = "en" | "hi" | "pa";

interface ContactInfo {
  name: string;
  phone: string;
}

interface QuoteState {
  homeSizeId: string | null;
  areaSqft: number;
  surface: Surface;
  coats: Coats;
  selectedPaintId: string;
  addOns: { putty: boolean; primer: boolean; painter: boolean };
  shadeCategory: ShadeCategory;
  selectedShadeCode: string | null;
  locality: string;
  language: Language;
  contact: ContactInfo;
}

type QuoteAction =
  | { type: "SET_HOME_SIZE"; id: string }
  | { type: "SET_AREA"; sqft: number }
  | { type: "SET_SURFACE"; surface: Surface }
  | { type: "SET_COATS"; coats: Coats }
  | { type: "SET_PAINT"; id: string }
  | { type: "TOGGLE_ADDON"; id: "putty" | "primer" | "painter" }
  | { type: "SET_SHADE_CATEGORY"; category: ShadeCategory }
  | { type: "SET_SHADE"; code: string }
  | { type: "SET_LOCALITY"; value: string }
  | { type: "SET_LANGUAGE"; language: Language }
  | { type: "SET_CONTACT"; field: keyof ContactInfo; value: string };

const DEFAULT_AREA_SQFT = 1000;

function buildInitialState(siteData: SiteData): QuoteState {
  const firstRecommendedInterior = siteData.paints.find(
    (p) => p.recommended && p.surfaces.includes("interior")
  );
  return {
    homeSizeId: null,
    areaSqft: DEFAULT_AREA_SQFT,
    surface: "interior",
    coats: 2,
    selectedPaintId: firstRecommendedInterior?.id ?? siteData.paints[0]?.id ?? "",
    addOns: {
      putty: siteData.addOns.find((a) => a.slug === "putty")?.defaultOn ?? true,
      primer: siteData.addOns.find((a) => a.slug === "primer")?.defaultOn ?? true,
      painter: siteData.addOns.find((a) => a.slug === "painter")?.defaultOn ?? false,
    },
    shadeCategory: "greens",
    selectedShadeCode: null,
    locality: "",
    language: "en",
    contact: { name: "", phone: "" },
  };
}

function firstRecommendedPaintFor(paints: Paint[], surface: Surface): string {
  const match = paints.find((p) => p.recommended && p.surfaces.includes(surface));
  return match ? match.id : (paints[0]?.id ?? "");
}

function reducer(state: QuoteState, action: QuoteAction, siteData: SiteData): QuoteState {
  switch (action.type) {
    case "SET_HOME_SIZE": {
      const size = siteData.homeSizes.find((h) => h.id === action.id);
      if (!size) return state;
      return { ...state, homeSizeId: action.id, areaSqft: size.sqft };
    }
    case "SET_AREA":
      return { ...state, homeSizeId: null, areaSqft: action.sqft };
    case "SET_SURFACE": {
      if (action.surface === state.surface) return state;
      const currentPaint = siteData.paints.find((p) => p.id === state.selectedPaintId);
      const paintStillValid = currentPaint?.surfaces.includes(action.surface);
      return {
        ...state,
        surface: action.surface,
        selectedPaintId: paintStillValid
          ? state.selectedPaintId
          : firstRecommendedPaintFor(siteData.paints, action.surface),
      };
    }
    case "SET_COATS":
      return { ...state, coats: action.coats };
    case "SET_PAINT":
      return { ...state, selectedPaintId: action.id };
    case "TOGGLE_ADDON":
      return {
        ...state,
        addOns: { ...state.addOns, [action.id]: !state.addOns[action.id] },
      };
    case "SET_SHADE_CATEGORY":
      return { ...state, shadeCategory: action.category, selectedShadeCode: null };
    case "SET_SHADE":
      return { ...state, selectedShadeCode: action.code };
    case "SET_LOCALITY":
      return { ...state, locality: action.value };
    case "SET_LANGUAGE":
      return { ...state, language: action.language };
    case "SET_CONTACT":
      return { ...state, contact: { ...state.contact, [action.field]: action.value } };
    default:
      return state;
  }
}

interface QuoteContextValue {
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
  selectedPaint: Paint;
  estimate: EstimateBreakdown;
  isInLudhiana: boolean;
  availablePaints: { recommended: Paint[]; other: Paint[] };
  homeSizes: HomeSize[];
  shades: Shade[];
  addOns: AddOnDef[];
  pricingSettings: PricingSettings;
  submitLead: () => Promise<{ ok: true; leadId: string } | { ok: false; error: string }>;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({
  siteData,
  children,
}: {
  siteData: SiteData;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    (s: QuoteState, a: QuoteAction) => reducer(s, a, siteData),
    siteData,
    buildInitialState
  );

  const value = useMemo<QuoteContextValue>(() => {
    const fallbackPaint: Paint = {
      id: "",
      name: "",
      brand: "",
      pricePerLitre: 0,
      tier: "Value",
      recommended: false,
      isJiwan: false,
      approxPrice: false,
      surfaces: ["interior"],
      whyPick: null,
      imageUrl: null,
      sortOrder: 0,
    };
    const selectedPaint =
      siteData.paints.find((p) => p.id === state.selectedPaintId) ??
      siteData.paints[0] ??
      fallbackPaint;

    const isInLudhiana = isLudhianaLocality(state.locality);

    const estimate = calculateEstimate({
      areaSqft: state.areaSqft,
      coats: state.coats,
      paint: { pricePerLitre: selectedPaint.pricePerLitre },
      surface: state.surface,
      addOns: { putty: state.addOns.putty, primer: state.addOns.primer },
      isInLudhiana,
      settings: siteData.pricingSettings,
    });

    const recommended = siteData.paints.filter(
      (p) => p.isJiwan && p.surfaces.includes(state.surface)
    );
    const other = siteData.paints.filter(
      (p) => !p.isJiwan && p.surfaces.includes(state.surface)
    );

    const homeSizeLabel =
      siteData.homeSizes.find((h) => h.id === state.homeSizeId)?.label ?? null;

    async function submitLead(): Promise<
      { ok: true; leadId: string } | { ok: false; error: string }
    > {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.contact.name,
            phone: state.contact.phone,
            locality: state.locality,
            homeSizeLabel,
            areaSqft: state.areaSqft,
            surface: state.surface,
            coats: state.coats,
            paintId: selectedPaint.id,
            addOns: state.addOns,
            shadeCode: state.selectedShadeCode,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          return { ok: false, error: data?.error ?? "Something went wrong. Please try again." };
        }
        return { ok: true, leadId: data.leadId as string };
      } catch {
        return { ok: false, error: "Network error. Please check your connection and try again." };
      }
    }

    return {
      state,
      dispatch,
      selectedPaint,
      estimate,
      isInLudhiana,
      availablePaints: { recommended, other },
      homeSizes: siteData.homeSizes,
      shades: siteData.shades,
      addOns: siteData.addOns,
      pricingSettings: siteData.pricingSettings,
      submitLead,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, siteData]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
