"use client";

import { useEffect, useId, useRef, useState } from "react";
import { analyticsConfigured } from "../lib/analytics/config";
import {
  buildAcceptAll,
  buildCustom,
  buildRejectNonEssential,
  CONSENT_REOPEN_EVENT,
  readConsentPreferences,
  writeConsentPreferences,
  type ConsentPreferences,
} from "../lib/analytics/consent";
import { updateConsentMode } from "../lib/analytics/events";

/**
 * Consent preference model (Accept all / Reject non-essential / Manage).
 * Analytics defaults denied. Necessary always on.
 * Body class `cookie-banner-visible` preserves WhatsApp float separation on mobile.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
  const [analyticsAvailable] = useState(() => analyticsConfigured());
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = readConsentPreferences();
    if (!existing) setShow(true);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const current = readConsentPreferences();
      setAnalyticsOptIn(!!current?.analytics);
      setManageOpen(false);
      setShow(true);
    };
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cookie-banner-visible", show);
    return () => {
      document.body.classList.remove("cookie-banner-visible");
    };
  }, [show]);

  useEffect(() => {
    if (!show || !manageOpen) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea"
    );
    first?.focus();
  }, [show, manageOpen]);

  const persist = (prefs: ConsentPreferences) => {
    writeConsentPreferences(prefs);
    updateConsentMode(prefs);
    window.dispatchEvent(new CustomEvent("octus:consent-updated"));
    setShow(false);
    setManageOpen(false);
  };

  const acceptAll = () => {
    // Accept all grants analytics only when GTM is configured; otherwise store
    // preference for when IDs are later provided (still no tags without IDs).
    persist(buildAcceptAll());
  };

  const rejectNonEssential = () => {
    persist(buildRejectNonEssential());
  };

  const saveCustom = () => {
    persist(buildCustom(analyticsAvailable ? analyticsOptIn : false));
  };

  if (!show) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      ref={panelRef}
    >
      <div className="cookie-banner__content">
        <p id={titleId}>
          We use necessary cookies to run this site.{" "}
          {analyticsAvailable
            ? "Optional analytics cookies help us understand traffic when you allow them. Analytics stay off until you accept."
            : "Optional analytics are prepared in the product but are not active until Octus configures measurement IDs in production."}{" "}
          <a href="/cookies">Cookie Policy</a>
        </p>

        {manageOpen && (
          <div className="cookie-banner__manage" role="group" aria-label="Cookie categories">
            <label className="cookie-banner__row">
              <input type="checkbox" checked disabled aria-disabled="true" />
              <span>
                <strong>Necessary</strong> — always on (security and basic site function).
              </span>
            </label>
            <label className="cookie-banner__row">
              <input
                type="checkbox"
                checked={analyticsAvailable && analyticsOptIn}
                disabled={!analyticsAvailable}
                onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                aria-describedby="cookie-analytics-hint"
              />
              <span>
                <strong>Analytics</strong> — aggregate measurement via Google Tag Manager / GA4 when
                configured. Off by default. No advertising tags.
              </span>
            </label>
            <p id="cookie-analytics-hint" className="cookie-banner__hint">
              {analyticsAvailable
                ? "Advertising, ad personalization and ad user-data storage remain denied."
                : "Analytics cannot be enabled yet because measurement IDs are not configured."}
            </p>
          </div>
        )}
      </div>

      <div className="cookie-banner__actions">
        {manageOpen ? (
          <>
            <button type="button" onClick={saveCustom} className="cookie-banner__btn-primary">
              Save preferences
            </button>
            <button type="button" onClick={() => setManageOpen(false)}>
              Back
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={acceptAll}
              className="cookie-banner__btn-primary"
              data-consent-action="accept_all"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              data-consent-action="reject_non_essential"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => setManageOpen(true)}
              data-consent-action="manage"
            >
              Manage preferences
            </button>
          </>
        )}
      </div>
    </div>
  );
}
