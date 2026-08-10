/**
 * Consent Mode v2 preference model (first-party localStorage).
 * Analytics denied until the user explicitly grants analytics.
 */

export const CONSENT_STORAGE_KEY = "octus-consent-v2";
export const CONSENT_VERSION = "2026-08-05";

/** Legacy essential-only key — migrated to reject non-essential if present alone. */
export const LEGACY_COOKIE_KEY = "octus-cookies-accepted";

export type ConsentPreferences = {
  version: string;
  necessary: true;
  analytics: boolean;
  decidedAt: string;
  decision: "accept_all" | "reject_non_essential" | "custom";
};

export type ConsentModeState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  security_storage: "granted" | "denied";
};

export const DEFAULT_CONSENT_MODE: ConsentModeState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
};

export function preferencesToConsentMode(
  prefs: ConsentPreferences | null
): ConsentModeState {
  const analyticsGranted = !!prefs?.analytics;
  return {
    ...DEFAULT_CONSENT_MODE,
    analytics_storage: analyticsGranted ? "granted" : "denied",
    // Advertising tags are out of scope — always denied.
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ConsentPreferences;
      if (parsed?.version && typeof parsed.analytics === "boolean") {
        return { ...parsed, necessary: true };
      }
    }
    // Migrate legacy dismiss → treat as reject non-essential (analytics off).
    if (localStorage.getItem(LEGACY_COOKIE_KEY) === "true") {
      const migrated: ConsentPreferences = {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: false,
        decidedAt: new Date().toISOString(),
        decision: "reject_non_essential",
      };
      writeConsentPreferences(migrated);
      return migrated;
    }
  } catch {
    return null;
  }
  return null;
}

export function writeConsentPreferences(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
  // Keep legacy key for older diagnostics; value is presence of a decision.
  localStorage.setItem(LEGACY_COOKIE_KEY, "true");
}

export function buildAcceptAll(): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: true,
    decidedAt: new Date().toISOString(),
    decision: "accept_all",
  };
}

export function buildRejectNonEssential(): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    decidedAt: new Date().toISOString(),
    decision: "reject_non_essential",
  };
}

export function buildCustom(analytics: boolean): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
    decision: "custom",
  };
}

export const CONSENT_REOPEN_EVENT = "octus:consent-reopen";

export function requestConsentReopen(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
}
