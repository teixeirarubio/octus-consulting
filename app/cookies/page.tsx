import { pageSocialMeta } from "../../lib/pageMeta";
import CookiePreferencesButton from "../../components/CookiePreferencesButton";

export const metadata = pageSocialMeta({
  title: "Cookie Policy",
  description:
    "Cookie and browser storage practices for the Octus Consulting website, including necessary cookies and optional analytics consent.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <main>
      <section className="surface-dark relative flex min-h-[70vh] flex-col justify-center pt-24 pb-16 md:min-h-[80vh] md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: "760px" }}>
          <span className="mb-5 block text-xs font-medium uppercase tracking-[0.12em] text-white/65">Legal</span>
          <h1 className="font-heading text-[1.85rem] font-semibold leading-[1.18] tracking-[-0.005em] text-[color:var(--text-primary-on-dark)] sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.12] sp-headline">Cookie Policy</h1>
          <p className="text-lg leading-relaxed text-white/75 max-w-2xl">Last updated: August 2026</p>
        </div>
      </section>
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: "760px" }}>
          {[
            {
              title: "What are cookies",
              body: "Cookies are small text files stored on your device when you visit a website. Similar browser storage (such as localStorage) may also be used for essential site functions and to remember your cookie preferences.",
            },
            {
              title: "Necessary cookies and storage",
              body: "Necessary storage is always enabled. It supports basic site operation and remembers your cookie preference decision (Accept all, Reject non-essential, or a custom choice). This preference is stored in first-party localStorage under octus-consent-v2.",
            },
            {
              title: "Optional analytics",
              body: "Analytics are disabled by default. When Octus has configured production measurement IDs (Google Tag Manager, with GA4 loaded through GTM) and you grant analytics consent, aggregate traffic measurement may run only on octusconsulting.com and www.octusconsulting.com. Analytics do not load on localhost, preview hosts, or *.vercel.app. If measurement IDs are absent, analytics tags are not active even if you select Accept all — the preference is stored for when IDs are later provided.",
            },
            {
              title: "What we do not use",
              body: "We do not load Meta Pixel, LinkedIn Insight Tag, or other advertising / personalization tags on this site. Consent Mode keeps ad_storage, ad_user_data and ad_personalization denied.",
            },
            {
              title: "Managing preferences",
              body: "Use Accept all, Reject non-essential, or Manage preferences on the cookie banner. You can reopen preferences from the site footer (“Cookie preferences”) or via the control on this page. You can also clear site data in your browser; clearing storage may show the banner again.",
            },
            {
              title: "Contact",
              body: "For cookie-related enquiries: info@octusconsulting.com",
            },
          ].map((s) => (
            <div key={s.title} style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid var(--border-solid)" }}>
              <h2 className="heading-sm" style={{ marginBottom: "12px" }}>{s.title}</h2>
              <p className="body-text">{s.body}</p>
            </div>
          ))}
          <p className="body-text" style={{ marginTop: "8px" }}>
            <CookiePreferencesButton className="cookie-prefs-btn text-primary" />
          </p>
        </div>
      </section>
    </main>
  );
}
