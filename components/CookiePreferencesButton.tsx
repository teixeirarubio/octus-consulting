"use client";

import type { ReactNode } from "react";
import { requestConsentReopen } from "../lib/analytics/consent";

/** Footer / policy control to reopen the consent preference UI. */
export default function CookiePreferencesButton({
  className,
  children = "Cookie preferences",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => requestConsentReopen()}
      aria-label="Open cookie preferences"
    >
      {children}
    </button>
  );
}
