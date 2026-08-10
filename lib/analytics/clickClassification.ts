/**
 * WhatsApp / mailto click classification.
 * diagnostic_click requires an explicit data-octus-event marker — never base wa.me URL alone.
 */

export const DIAGNOSTIC_EVENT_ATTR = "data-octus-event";
export const DIAGNOSTIC_EVENT_VALUE = "diagnostic_click";

export function isWhatsAppHref(href: string): boolean {
  return /wa\.me\//i.test(href) || /api\.whatsapp\.com/i.test(href);
}

export function isMailtoHref(href: string): boolean {
  return href.toLowerCase().startsWith("mailto:");
}

/** Canonical SoT: only explicit diagnostic marker fires diagnostic_click. */
export function hasExplicitDiagnosticMarker(
  getAttribute: (name: string) => string | null
): boolean {
  return getAttribute(DIAGNOSTIC_EVENT_ATTR) === DIAGNOSTIC_EVENT_VALUE;
}

export type ClickClassification = {
  whatsapp_click: boolean;
  email_click: boolean;
  diagnostic_click: boolean;
};

/**
 * Classify a CTA click. Pathname and wa.me base URL must not imply diagnostic_click.
 */
export function classifyCtaClick(input: {
  href: string;
  getAttribute: (name: string) => string | null;
}): ClickClassification {
  const href = input.href || "";
  const result: ClickClassification = {
    whatsapp_click: false,
    email_click: false,
    diagnostic_click: false,
  };

  if (!href) return result;

  if (isWhatsAppHref(href)) {
    result.whatsapp_click = true;
    result.diagnostic_click = hasExplicitDiagnosticMarker(input.getAttribute);
    return result;
  }

  if (isMailtoHref(href)) {
    result.email_click = true;
  }

  return result;
}
