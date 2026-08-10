/**
 * Analytics configuration — env-gated, no invented IDs.
 * Absent vars → site works; tracking stays inert.
 *
 * Runtime SoT for tagging:
 *   NEXT_PUBLIC_GTM_ID — required to load GTM
 * GA4 Measurement ID is configured inside the GTM container (not an app env var).
 * NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION — optional HTML meta for URL-prefix GSC only;
 * Domain Property verification uses DNS TXT (manual; not required as app env).
 */

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID || "").trim();
export const GOOGLE_SITE_VERIFICATION = (
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
).trim();

export function hasGtmId(): boolean {
  return /^GTM-[A-Z0-9]+$/i.test(GTM_ID);
}

export function hasSiteVerification(): boolean {
  return GOOGLE_SITE_VERIFICATION.length > 0;
}

/** True only when GTM orchestration ID is configured. */
export function analyticsConfigured(): boolean {
  return hasGtmId();
}
