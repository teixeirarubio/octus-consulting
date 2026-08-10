"use client";

import { useEffect, useRef, useState } from "react";
import { analyticsConfigured, GTM_ID, hasGtmId } from "../../lib/analytics/config";
import {
  type ConsentPreferences,
  readConsentPreferences,
} from "../../lib/analytics/consent";
import {
  applyDefaultConsentMode,
  updateConsentMode,
} from "../../lib/analytics/events";
import { shouldEnableTracking } from "../../lib/analytics/hostGate";

/**
 * Loads GTM only on production hosts, when GTM ID is configured,
 * and only after the user has granted analytics consent.
 * No direct GA4 gtag install — GA4 is expected to load through GTM.
 * noscript GTM iframe intentionally omitted: tags require consent via this UI.
 */
export default function GtmBootstrap() {
  const [prefs, setPrefs] = useState<ConsentPreferences | null>(null);
  const injected = useRef(false);

  useEffect(() => {
    setPrefs(readConsentPreferences());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "octus-consent-v2" || e.key === null) {
        setPrefs(readConsentPreferences());
      }
    };
    const onConsent = () => setPrefs(readConsentPreferences());
    window.addEventListener("storage", onStorage);
    window.addEventListener("octus:consent-updated", onConsent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("octus:consent-updated", onConsent);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldEnableTracking(window.location.hostname)) return;
    if (!analyticsConfigured() || !hasGtmId()) return;

    applyDefaultConsentMode();

    if (!prefs?.analytics) return;

    updateConsentMode(prefs);

    if (injected.current) return;
    if (document.getElementById("octus-gtm")) {
      injected.current = true;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = "octus-gtm";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
    injected.current = true;
  }, [prefs]);

  return null;
}
