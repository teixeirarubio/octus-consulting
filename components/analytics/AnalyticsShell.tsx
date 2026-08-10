"use client";

import { Suspense } from "react";
import GtmBootstrap from "./GtmBootstrap";
import ViewEventTracker from "./ViewEventTracker";
import ClickEventTracker from "./ClickEventTracker";

/** Client analytics shell — safe when env IDs are absent. */
export default function AnalyticsShell() {
  return (
    <>
      <GtmBootstrap />
      <Suspense fallback={null}>
        <ViewEventTracker />
      </Suspense>
      <ClickEventTracker />
    </>
  );
}
