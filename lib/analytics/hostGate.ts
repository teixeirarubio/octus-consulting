/**
 * Production-host gate for analytics.
 * Tracking must never run on localhost, preview, or *.vercel.app.
 */

const PRODUCTION_HOSTS = new Set(["octusconsulting.com", "www.octusconsulting.com"]);

export function isProductionAnalyticsHost(hostname?: string | null): boolean {
  if (!hostname) return false;
  const host = hostname.toLowerCase().split(":")[0];
  return PRODUCTION_HOSTS.has(host);
}

export function shouldEnableTracking(hostname?: string | null): boolean {
  return isProductionAnalyticsHost(hostname);
}

export function explainHostGate(hostname?: string | null): {
  allowed: boolean;
  reason: string;
} {
  if (!hostname) {
    return { allowed: false, reason: "missing_hostname" };
  }
  const host = hostname.toLowerCase().split(":")[0];
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
