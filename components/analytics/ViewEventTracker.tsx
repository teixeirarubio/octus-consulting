"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  contentMetaForPath,
  trackEvent,
  viewEventForPath,
  type OctusEventName,
} from "../../lib/analytics/events";
import { readConsentPreferences } from "../../lib/analytics/consent";
import { createViewEventDispatcher } from "../../lib/analytics/viewDispatch";

/**
 * Fires content view events once per path after successful enqueue.
 * Re-evaluates when analytics consent flips denied → granted on the same page.
 */
export default function ViewEventTracker() {
  const pathname = usePathname();
  const dispatcherRef = useRef(
    createViewEventDispatcher({
      viewEventForPath: (p) => viewEventForPath(p),
      trackEvent: (name, params) =>
        trackEvent(name as OctusEventName, params, readConsentPreferences()),
      contentMetaForPath,
      getPageTitle: () =>
        typeof document !== "undefined" ? document.title : undefined,
    })
  );

  useEffect(() => {
    const run = () => {
      dispatcherRef.current.evaluate(pathname);
    };

    run();

    const onConsentUpdated = () => {
      run();
    };
    window.addEventListener("octus:consent-updated", onConsentUpdated);
    return () => {
      window.removeEventListener("octus:consent-updated", onConsentUpdated);
    };
  }, [pathname]);

  return null;
}
