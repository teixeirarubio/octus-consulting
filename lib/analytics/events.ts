/**
 * Single reusable tracking layer — no scattered raw gtag calls.
 * Events only fire when: production host + GTM configured + analytics consent granted.
 * Returns whether the event was actually enqueued to dataLayer.
 */

import { analyticsConfigured } from "./config";
import {
  preferencesToConsentMode,
  readConsentPreferences,
  type ConsentPreferences,
} from "./consent";
import { shouldEnableTracking } from "./hostGate";

export type OctusEventName =
  | "whatsapp_click"
  | "email_click"
  | "diagnostic_click"
  | "services_view"
  | "industry_view"
  | "jurisdiction_view"
  | "insight_view";

export type OctusEventParams = {
  page_path?: string;
  page_title?: string;
  cta_location?: string;
  cta_label?: string;
  destination?: string;
  content_type?: string;
  content_slug?: string;
  consent_state?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hostname(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.hostname;
}

function consentAllowsAnalytics(prefs?: ConsentPreferences | null): boolean {
  const p = prefs ?? readConsentPreferences();
  return !!p?.analytics;
}

export function canTrack(prefs?: ConsentPreferences | null): boolean {
  return (
    shouldEnableTracking(hostname()) &&
    analyticsConfigured() &&
    consentAllowsAnalytics(prefs)
  );
}

export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Consent Mode v2 default (denied analytics) — call before any GTM load. */
export function applyDefaultConsentMode(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
  }
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

export function updateConsentMode(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  const mode = preferencesToConsentMode(prefs);
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
  }
  window.gtag("consent", "update", mode);
}

/**
 * @returns true when the event was enqueued to dataLayer (all gates passed).
 */
export function trackEvent(
  name: OctusEventName,
  params: OctusEventParams = {},
  prefs?: ConsentPreferences | null
): boolean {
  if (!canTrack(prefs)) return false;

  const consent = preferencesToConsentMode(prefs ?? readConsentPreferences());
  const page_path =
    params.page_path ||
    (typeof window !== "undefined" ? window.location.pathname : undefined);
  const page_title =
    params.page_title ||
    (typeof document !== "undefined" ? document.title : undefined);

  const payload: Record<string, unknown> = {
    event: name,
    page_path,
    page_title,
    consent_state: consent.analytics_storage,
    ...params,
  };

  pushDataLayer(payload);
  return true;
}

/** Classify view event from pathname. */
export function viewEventForPath(pathname: string): OctusEventName | null {
  if (pathname === "/solutions" || pathname.startsWith("/solutions/")) {
    return "services_view";
  }
  if (pathname === "/markets" || pathname.startsWith("/markets/")) {
    return "industry_view";
  }
  if (
    pathname === "/jurisdictions" ||
    pathname.startsWith("/jurisdictions/") ||
    pathname === "/brazil"
  ) {
    return "jurisdiction_view";
  }
  if (pathname === "/insights" || pathname.startsWith("/insights/")) {
    return "insight_view";
  }
  return null;
}

export function contentMetaForPath(pathname: string): {
  content_type?: string;
  content_slug?: string;
} {
  if (pathname.startsWith("/insights/") && pathname !== "/insights/") {
    return {
      content_type: "insight",
      content_slug: pathname.replace(/^\/insights\//, "").replace(/\/$/, ""),
    };
  }
  if (pathname.startsWith("/solutions/")) {
    return {
      content_type: "service",
      content_slug: pathname.replace(/^\/solutions\//, "").replace(/\/$/, ""),
    };
  }
  if (pathname.startsWith("/markets/")) {
    return {
      content_type: "industry",
      content_slug: pathname.replace(/^\/markets\//, "").replace(/\/$/, ""),
    };
  }
  if (pathname.startsWith("/jurisdictions/")) {
    return {
      content_type: "jurisdiction",
      content_slug: pathname
        .replace(/^\/jurisdictions\//, "")
        .replace(/\/$/, ""),
    };
  }
  if (pathname === "/brazil") {
    return { content_type: "jurisdiction", content_slug: "brazil" };
  }
  return {};
}
