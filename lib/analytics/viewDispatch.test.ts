/**
 * Post-consent view-event behavioral tests.
 * Run: node --test --experimental-strip-types lib/analytics/viewDispatch.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createViewEventDispatcher } from "./viewDispatch.ts";

function viewEventForPath(pathname: string): string | null {
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

function makeHarness(opts: { analyticsGranted: boolean }) {
  const enqueued: string[] = [];
  let analyticsGranted = opts.analyticsGranted;

  const dispatcher = createViewEventDispatcher({
    viewEventForPath,
    contentMetaForPath: () => ({}),
    getPageTitle: () => "Test",
    trackEvent: (name, params) => {
      if (!analyticsGranted) return false;
      enqueued.push(`${name}:${params.page_path}`);
      return true;
    },
  });

  return {
    enqueued,
    dispatcher,
    setAnalyticsGranted(v: boolean) {
      analyticsGranted = v;
    },
  };
}

describe("post-consent view events", () => {
  it("eligible page + denied consent → no view event", () => {
    const h = makeHarness({ analyticsGranted: false });
    const r = h.dispatcher.evaluate("/solutions");
    assert.equal(r.attempted, true);
    assert.equal(r.enqueued, false);
    assert.equal(h.enqueued.length, 0);
    assert.equal(h.dispatcher.getLastEnqueuedKey(), null);
  });

  it("denied → granted → one current-page view event", () => {
    const h = makeHarness({ analyticsGranted: false });
    h.dispatcher.evaluate("/markets/igaming");
    assert.equal(h.enqueued.length, 0);

    h.setAnalyticsGranted(true);
    const r = h.dispatcher.evaluate("/markets/igaming");
    assert.equal(r.enqueued, true);
    assert.equal(h.enqueued.length, 1);
    assert.equal(h.enqueued[0], "industry_view:/markets/igaming");
  });

  it("repeated consent update → no duplicate", () => {
    const h = makeHarness({ analyticsGranted: true });
    h.dispatcher.evaluate("/jurisdictions");
    assert.equal(h.enqueued.length, 1);

    h.dispatcher.evaluate("/jurisdictions");
    h.dispatcher.evaluate("/jurisdictions");
    assert.equal(h.enqueued.length, 1);
  });

  it("same-path rerender → no duplicate", () => {
    const h = makeHarness({ analyticsGranted: true });
    h.dispatcher.evaluate("/insights");
    h.dispatcher.evaluate("/insights");
    h.dispatcher.evaluate("/insights");
    assert.equal(h.enqueued.length, 1);
  });

  it("new eligible path → one new event", () => {
    const h = makeHarness({ analyticsGranted: true });
    h.dispatcher.evaluate("/solutions");
    h.dispatcher.evaluate("/brazil");
    assert.equal(h.enqueued.length, 2);
    assert.equal(h.enqueued[0], "services_view:/solutions");
    assert.equal(h.enqueued[1], "jurisdiction_view:/brazil");
  });

  it("non-eligible path does not enqueue", () => {
    const h = makeHarness({ analyticsGranted: true });
    const r = h.dispatcher.evaluate("/contact");
    assert.equal(r.attempted, false);
    assert.equal(h.enqueued.length, 0);
  });
});
