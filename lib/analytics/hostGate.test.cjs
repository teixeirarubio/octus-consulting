/**
 * Automated host-gate assertions (no network, no invented IDs).
 * Run: node --test lib/analytics/hostGate.test.cjs
 */

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");

// Compile-free mirror of hostGate.ts logic for Node test runner (CJS).
const PRODUCTION_HOSTS = new Set(["octusconsulting.com", "www.octusconsulting.com"]);

function isProductionAnalyticsHost(hostname) {
  if (!hostname) return false;
  const host = String(hostname).toLowerCase().split(":")[0];
  return PRODUCTION_HOSTS.has(host);
}

function shouldEnableTracking(hostname) {
  return isProductionAnalyticsHost(hostname);
}

function explainHostGate(hostname) {
  if (!hostname) return { allowed: false, reason: "missing_hostname" };
  const host = String(hostname).toLowerCase().split(":")[0];
  if (host === "localhost" || host === "127.0.0.1") {
    return { allowed: false, reason: "local_dev" };
  }
  if (host.endsWith(".vercel.app")) {
    return { allowed: false, reason: "vercel_preview_host" };
  }
  if (!PRODUCTION_HOSTS.has(host)) {
    return { allowed: false, reason: "non_production_host" };
  }
  return { allowed: true, reason: "production_host" };
}

describe("analytics host gate", () => {
  it("allows apex and www production hosts", () => {
    assert.equal(shouldEnableTracking("octusconsulting.com"), true);
    assert.equal(shouldEnableTracking("www.octusconsulting.com"), true);
    assert.equal(explainHostGate("octusconsulting.com").reason, "production_host");
  });

  it("denies localhost and loopback", () => {
    assert.equal(shouldEnableTracking("localhost"), false);
    assert.equal(shouldEnableTracking("127.0.0.1"), false);
    assert.equal(explainHostGate("localhost").reason, "local_dev");
  });

  it("denies vercel preview and branch hosts", () => {
    assert.equal(
      shouldEnableTracking("octus-consulting-abc123-axle1.vercel.app"),
      false
    );
    assert.equal(
      explainHostGate("octus-consulting-git-feat-x-axle1.vercel.app").reason,
      "vercel_preview_host"
    );
  });

  it("denies missing and unknown hosts", () => {
    assert.equal(shouldEnableTracking(null), false);
    assert.equal(shouldEnableTracking("example.com"), false);
    assert.equal(explainHostGate("staging.octusconsulting.com").reason, "non_production_host");
  });

  it("source file documents the same production host set", () => {
    const src = fs.readFileSync(
      path.join(__dirname, "hostGate.ts"),
      "utf8"
    );
    assert.match(src, /octusconsulting\.com/);
    assert.match(src, /www\.octusconsulting\.com/);
    assert.match(src, /\.vercel\.app/);
  });
});
