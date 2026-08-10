/**
 * Lead-path static validation — destinations, encoding, markers.
 * Classification behavior is covered by clickClassification.test.ts.
 */

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

const cta = read("lib/cta.ts");
const layout = read("app/layout.tsx");
const contact = read("app/contact/page.tsx");
const diagnostic = read("app/diagnostic/page.tsx");
const careers = read("app/careers/page.tsx");
const compliance = read("app/compliance-channel/page.tsx");
const clickTracker = read("components/analytics/ClickEventTracker.tsx");
const clickClass = read("lib/analytics/clickClassification.ts");

const E164 = "5511974273000";

describe("lead path matrix", () => {
  it("defines WhatsApp discuss and assess URLs with encoding", () => {
    assert.match(cta, new RegExp(`wa\\.me/\\$\\{OCTUS_WHATSAPP_E164\\}`));
    assert.match(cta, /encodeURIComponent\(WA_DISCUSS_OPERATION_TEXT\)/);
    assert.match(cta, /encodeURIComponent\(WA_ASSESS_SITUATION_TEXT\)/);
    assert.match(cta, new RegExp(E164));
    assert.match(cta, /mailto:\$\{OCTUS_EMAIL\}/);
    assert.doesNotMatch(cta, /password|ssn|cpf|document/i);
  });

  it("contact page exposes WhatsApp + email without forms", () => {
    assert.match(contact, /WHATSAPP_DISCUSS_URL/);
    assert.match(contact, /MAILTO_DISCUSS/);
    assert.doesNotMatch(contact, /<form[\s>]/i);
    assert.match(contact, /data-cta-location="contact_primary"/);
    assert.match(contact, /data-cta-location="contact_email"/);
  });

  it("diagnostic primary alone carries explicit diagnostic_click marker", () => {
    assert.match(diagnostic, /WHATSAPP_ASSESS_URL/);
    assert.match(diagnostic, /WHATSAPP_DISCUSS_URL/);
    assert.match(diagnostic, /MAILTO_INFO/);
    assert.doesNotMatch(diagnostic, /<form[\s>]/i);
    assert.match(diagnostic, /octusEvent: "diagnostic_click"/);
    // Secondary discuss CTA must not carry the diagnostic marker in the same object literal.
    const primaryBlock = diagnostic.match(
      /primaryCta=\{\{[\s\S]*?\}\}/
    )?.[0];
    const secondaryBlock = diagnostic.match(
      /secondaryCta=\{\{[\s\S]*?\}\}/
    )?.[0];
    assert.ok(primaryBlock);
    assert.ok(secondaryBlock);
    assert.match(primaryBlock, /octusEvent:\s*"diagnostic_click"/);
    assert.doesNotMatch(secondaryBlock, /octusEvent/);
  });

  it("global float and footer CTAs use safe external attributes", () => {
    assert.match(layout, /className="wa-float"/);
    assert.match(layout, /rel="noopener noreferrer"/);
    assert.match(layout, /data-cta-location="floating_whatsapp"/);
    assert.match(layout, /data-cta-location="footer"/);
  });

  it("careers and compliance retain email contact paths", () => {
    assert.match(careers, /mailto:/i);
    assert.match(compliance, /mailto:|@octusconsulting\.com/i);
  });

  it("click tracker uses explicit marker classification only", () => {
    assert.match(clickTracker, /classifyCtaClick/);
    assert.doesNotMatch(clickTracker, /isDiagnosticWhatsApp/);
    assert.match(clickClass, /hasExplicitDiagnosticMarker/);
    assert.doesNotMatch(clickClass, /pathname\s*===\s*["']\/diagnostic["']/);
  });
});
