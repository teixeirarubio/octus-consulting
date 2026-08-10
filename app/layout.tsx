import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Nav from "../components/Nav";
import CookieBanner from "../components/CookieBanner";
import CookiePreferencesButton from "../components/CookiePreferencesButton";
import AnalyticsShell from "../components/analytics/AnalyticsShell";
import BrandLockup from "../components/BrandLockup";
import OrganizationJsonLd from "../components/seo/OrganizationJsonLd";
import { GOOGLE_SITE_VERIFICATION, hasSiteVerification } from "../lib/analytics/config";
import { CTA_DISCUSS_LABEL, MAILTO_INFO, WHATSAPP_DISCUSS_URL } from "../lib/cta";
import "./globals.css";

const unigeo = localFont({
  src: [
    { path: "../public/fonts/Unigeo64-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Unigeo64-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/Unigeo64-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Unigeo64-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Unigeo64-Extrabold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-unigeo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Octus Consulting | Regulatory, Compliance and International Structuring",
    template: "%s | Octus Consulting",
  },
  description:
    "Octus structures regulated operations across licensing, compliance, corporate architecture, remediation and international coordination.",
  metadataBase: new URL("https://octusconsulting.com"),
  icons: {
    icon: [
      { url: "/brand/favicons/octus-favicon-blue.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "Octus Consulting | Regulatory, Compliance and International Structuring",
    description:
      "Octus structures regulated operations across licensing, compliance, corporate architecture, remediation and international coordination.",
    url: "https://octusconsulting.com",
    siteName: "Octus Consulting",
    images: [
      {
        url: "https://octusconsulting.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Octus Consulting",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octus Consulting | Regulatory, Compliance and International Structuring",
    description:
      "Octus structures regulated operations across licensing, compliance, corporate architecture, remediation and international coordination.",
    images: ["https://octusconsulting.com/og-image.png"],
  },
  ...(hasSiteVerification()
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unigeo.variable} ${inter.variable}`}>
      <body>
        <OrganizationJsonLd />
        <AnalyticsShell />
        <Nav />
        {children}

        {/* ─── WHATSAPP FLOATING CTA ─── */}
        <aside aria-label="WhatsApp contact">
          <a
            href={WHATSAPP_DISCUSS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-float"
            aria-label={CTA_DISCUSS_LABEL}
            data-cta-location="floating_whatsapp"
            data-cta-label={CTA_DISCUSS_LABEL}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="wa-float__label">Discuss on WhatsApp</span>
          </a>
        </aside>

        <CookieBanner />
        <footer className="site-footer surface-dark py-10 md:py-20">
          <div className="site-footer__mark" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="site-footer__brand-close">
              <a
                href="/"
                className="site-footer__lockup-link inline-flex max-w-full items-center no-underline"
                aria-label="Octus Consulting"
              >
                <BrandLockup variant="on-dark" surface="footer" />
              </a>
              <p className="site-footer__brand-close__line">
                International structuring and execution for regulated and high-risk operations.
              </p>
              <div className="site-footer__cta-row mt-5 flex flex-wrap items-center gap-3 md:mt-8">
                <a
                  href={WHATSAPP_DISCUSS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-sm bg-primary px-5 font-sans text-[13px] font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
                  data-cta-location="footer"
                  data-cta-label={CTA_DISCUSS_LABEL}
                >
                  {CTA_DISCUSS_LABEL}
                </a>
                <a
                  href={MAILTO_INFO}
                  className="font-sans text-[13px] font-medium text-white/70 no-underline underline-offset-4 transition-colors hover:text-white hover:underline"
                  data-cta-location="footer"
                  data-cta-label="Email Octus"
                >
                  Email Octus
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/octusonsulting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/65 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/octusconsulting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/65 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="site-footer__acc-stack mt-8 space-y-0 lg:hidden">
              {(
                [
                  {
                    label: "Services",
                    links: [
                      { label: "Regulatory Structuring", href: "/solutions/regulatory-structuring" },
                      { label: "Compliance & Risk", href: "/solutions/compliance-risk" },
                      { label: "Legal & Structural Architecture", href: "/solutions/legal-structural-architecture" },
                      { label: "Corporate Structuring", href: "/solutions/corporate-structuring" },
                      { label: "Private Clients", href: "/private-clients" },
                      { label: "Remediation & Readiness", href: "/solutions/remediation-readiness" },
                      { label: "International Hub", href: "/international-hub" },
                    ],
                  },
                  {
                    label: "Industries",
                    links: [
                      { label: "iGaming", href: "/markets/igaming" },
                      { label: "Fintech", href: "/markets/fintech" },
                      { label: "Digital Assets", href: "/markets/crypto" },
                      { label: "Technology", href: "/markets/technology" },
                      { label: "Forex", href: "/markets/forex" },
                      { label: "High-Risk Operations", href: "/markets/high-risk" },
                    ],
                  },
                  {
                    label: "Engage",
                    links: [
                      { label: "How we engage", href: "/how-we-engage" },
                      { label: "Insights", href: "/insights" },
                      { label: "Partners", href: "/partners" },
                      { label: "Diagnostic assessment", href: "/diagnostic" },
                    ],
                  },
                  {
                    label: "Company",
                    links: [
                      { label: "About", href: "/about" },
                      { label: "Team", href: "/team" },
                      { label: "Careers", href: "/careers" },
                      { label: "Jurisdictions", href: "/jurisdictions" },
                      { label: "Contact", href: "/contact" },
                    ],
                  },
                  {
                    label: "Legal",
                    links: [
                      { label: "Privacy Policy", href: "/privacy" },
                      { label: "Terms of Use", href: "/terms" },
                      { label: "Cookie Policy", href: "/cookies" },
                      { label: "Compliance Channel", href: "/compliance-channel" },
                    ],
                  },
                ] as const
              ).map((group) => (
                <details key={group.label} className="site-footer__acc">
                  <summary className="site-footer__acc-summary">{group.label}</summary>
                  <div className="pb-3 pl-1 pt-1">
                    <ul className="flex list-none flex-col gap-2.5">
                      {group.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                      {group.label === "Legal" ? (
                        <li>
                          <CookiePreferencesButton className="site-footer__nav-link cookie-prefs-btn font-sans transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 hidden grid-cols-2 gap-8 lg:grid lg:grid-cols-3 xl:grid-cols-5">
              <div>
                <p className="site-footer__nav-label">Services</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {[
                    { label: "Regulatory Structuring", href: "/solutions/regulatory-structuring" },
                    { label: "Compliance & Risk", href: "/solutions/compliance-risk" },
                    { label: "Legal & Structural Architecture", href: "/solutions/legal-structural-architecture" },
                    { label: "Corporate Structuring", href: "/solutions/corporate-structuring" },
                    { label: "Private Clients", href: "/private-clients" },
                    { label: "Remediation & Readiness", href: "/solutions/remediation-readiness" },
                    { label: "International Hub", href: "/international-hub" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="site-footer__nav-label">Industries</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {[
                    { label: "iGaming", href: "/markets/igaming" },
                    { label: "Fintech", href: "/markets/fintech" },
                    { label: "Digital Assets", href: "/markets/crypto" },
                    { label: "Technology", href: "/markets/technology" },
                    { label: "Forex", href: "/markets/forex" },
                    { label: "High-Risk Operations", href: "/markets/high-risk" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="site-footer__nav-label">Engage</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {[
                    { label: "How we engage", href: "/how-we-engage" },
                    { label: "Insights", href: "/insights" },
                    { label: "Partners", href: "/partners" },
                    { label: "Diagnostic assessment", href: "/diagnostic" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="site-footer__nav-label">Company</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {[
                    { label: "About", href: "/about" },
                    { label: "Team", href: "/team" },
                    { label: "Careers", href: "/careers" },
                    { label: "Jurisdictions", href: "/jurisdictions" },
                    { label: "Contact", href: "/contact" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="site-footer__nav-label">Legal</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {[
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Use", href: "/terms" },
                    { label: "Cookie Policy", href: "/cookies" },
                    { label: "Compliance Channel", href: "/compliance-channel" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="site-footer__nav-link font-sans no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <CookiePreferencesButton className="site-footer__nav-link cookie-prefs-btn font-sans transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
                  </li>
                </ul>
              </div>
            </div>

            <div className="site-footer__bar mt-16 border-t border-white/10 pt-8">
              <div className="font-sans">
                <p className="text-xs text-white/55">© 2026 Octus Consulting. All rights reserved.</p>
                <p className="mt-1 text-xs text-white/55">
                  Octus Technology LLC · 900 Foulk Rd Suite 201 · Wilmington, DE 19803
                </p>
                <p className="mt-2 text-xs">
                  <a
                    href={MAILTO_INFO}
                    className="inline text-white/70 no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    data-cta-location="footer"
                    data-cta-label="info@octusconsulting.com"
                  >
                    info@octusconsulting.com
                  </a>{" "}
                  ·{" "}
                  <a
                    href={WHATSAPP_DISCUSS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline text-white/70 no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    data-cta-location="footer"
                    data-cta-label="WhatsApp"
                  >
                    WhatsApp
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://www.linkedin.com/company/octusonsulting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline text-white/70 no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    LinkedIn
                  </a>{" "}
                  ·{" "}
                  <CookiePreferencesButton className="inline cookie-prefs-btn text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
