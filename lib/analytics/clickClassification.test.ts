/**
 * Behavioral classification tests — not string-presence only.
 * Run: node --test --experimental-strip-types lib/analytics/clickClassification.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { classifyCtaClick } from "./clickClassification.ts";

const WA_DISCUSS =
  "https://wa.me/5511974273000?text=Hello%20Octus%20team%2C%20I%20would%20like%20to%20discuss%20my%20operation";
const WA_ASSESS =
  "https://wa.me/5511974273000?text=Hello%20Octus%20team%2C%20I%20would%20like%20to%20assess%20my%20regulated";
const WA_PARTNERSHIP =
  "https://wa.me/5511974273000?text=Hello%20Octus%20team.%20I%20would%20like%20to%20discuss%20a%20potential%20partnership";

function attrs(map: Record<string, string | undefined>) {
  return (name: string) => map[name] ?? null;
}

describe("WhatsApp click classification", () => {
  it("discuss URL → whatsapp_click only", () => {
    const c = classifyCtaClick({
      href: WA_DISCUSS,
      getAttribute: attrs({ "data-cta-location": "contact_primary" }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
    assert.equal(c.email_click, false);
  });

  it("floating URL → whatsapp_click only", () => {
    const c = classifyCtaClick({
      href: WA_DISCUSS,
      getAttribute: attrs({ "data-cta-location": "floating_whatsapp" }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
  });

  it("footer URL → whatsapp_click only", () => {
    const c = classifyCtaClick({
      href: WA_DISCUSS,
      getAttribute: attrs({ "data-cta-location": "footer" }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
  });

  it("partnership URL → whatsapp_click only", () => {
    const c = classifyCtaClick({
      href: WA_PARTNERSHIP,
      getAttribute: attrs({ "data-cta-location": "partners" }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
  });

  it("explicit diagnostic primary → whatsapp_click + diagnostic_click", () => {
    const c = classifyCtaClick({
      href: WA_ASSESS,
      getAttribute: attrs({
        "data-cta-location": "diagnostic_primary",
        "data-octus-event": "diagnostic_click",
      }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, true);
  });

  it("diagnostic secondary discuss CTA → whatsapp_click only", () => {
    const c = classifyCtaClick({
      href: WA_DISCUSS,
      getAttribute: attrs({
        "data-cta-location": "diagnostic_secondary",
        // no data-octus-event
      }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
  });

  it("shared wa.me base on /diagnostic path context does not imply diagnostic without marker", () => {
    // Classification API has no pathname — intentional: path must not be used.
    const c = classifyCtaClick({
      href: WA_ASSESS,
      getAttribute: attrs({ "data-cta-location": "page_body" }),
    });
    assert.equal(c.whatsapp_click, true);
    assert.equal(c.diagnostic_click, false);
  });

  it("mailto → email_click only", () => {
    const c = classifyCtaClick({
      href: "mailto:info@octusconsulting.com",
      getAttribute: attrs({}),
    });
    assert.equal(c.email_click, true);
    assert.equal(c.whatsapp_click, false);
    assert.equal(c.diagnostic_click, false);
  });
});
