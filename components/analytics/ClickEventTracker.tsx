"use client";

import { useEffect } from "react";
import { trackEvent } from "../../lib/analytics/events";
import { readConsentPreferences } from "../../lib/analytics/consent";
import {
  classifyCtaClick,
  isMailtoHref,
  isWhatsAppHref,
} from "../../lib/analytics/clickClassification";

function closestAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest("a");
}

function inferCtaLocation(anchor: HTMLAnchorElement): string {
  const explicit = anchor.getAttribute("data-cta-location");
  if (explicit) return explicit;
  if (anchor.classList.contains("wa-float")) return "floating_whatsapp";
  if (anchor.closest("nav") || anchor.closest("[data-site-nav]")) return "navigation";
  if (anchor.closest("footer") || anchor.closest(".site-footer")) return "footer";
  if (anchor.closest("main")) return "page_body";
  return "unknown";
}

/**
 * Document-level CTA capture — single layer for wa.me / mailto.
 * diagnostic_click fires only with data-octus-event="diagnostic_click"
 * (see EVENT_DICTIONARY.md). Pathname / shared wa.me base never imply it.
 */
export default function ClickEventTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = closestAnchor(e.target);
      if (!anchor) return;
      const href = anchor.href || anchor.getAttribute("href") || "";
      if (!href) return;

      const prefs = readConsentPreferences();
      const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
      const label =
        anchor.getAttribute("data-cta-label") ||
        (anchor.textContent || "").trim().slice(0, 120) ||
        anchor.getAttribute("aria-label") ||
        undefined;
      const location = inferCtaLocation(anchor);
      const destination = href.split("?")[0];

      const classified = classifyCtaClick({
        href,
        getAttribute: (name) => anchor.getAttribute(name),
      });

      if (classified.whatsapp_click && isWhatsAppHref(href)) {
        trackEvent(
          "whatsapp_click",
          {
            cta_location: location,
            cta_label: label,
            destination,
            page_path: pathname,
          },
          prefs
        );

        if (classified.diagnostic_click) {
          trackEvent(
            "diagnostic_click",
            {
              cta_location: location,
              cta_label: label,
              destination,
              page_path: pathname,
            },
            prefs
          );
        }
      } else if (classified.email_click && isMailtoHref(href)) {
        const mailbox = href.replace(/^mailto:/i, "").split("?")[0];
        trackEvent(
          "email_click",
          {
            cta_location: location,
            cta_label: label,
            destination: `mailto:${mailbox}`,
            page_path: pathname,
          },
          prefs
        );
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
