import Link from "next/link";
import {
  CTA_DISCUSS_LABEL,
  MAILTO_DISCUSS,
  OCTUS_EMAIL,
  WHATSAPP_DISCUSS_URL,
} from "../../lib/cta";
import DarkHeroAtmosphere from "../../components/system/DarkHeroAtmosphere";
import { pageSocialMeta } from "../../lib/pageMeta";

export const metadata = pageSocialMeta({
  title: "Contact",
  description:
    
    "Contact Octus via WhatsApp or email to discuss regulatory structuring, compliance coordination and operational readiness for regulated businesses.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <section className="octus-dark-hero surface-dark relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-28 pb-16 md:min-h-[80vh] md:pt-32 md:pb-24">
        <DarkHeroAtmosphere />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="label">Contact</span>
          <h1 className="font-heading text-[1.85rem] font-semibold leading-[1.18] tracking-[-0.005em] text-[color:var(--text-primary-on-dark)] sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
            Discuss your operation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Octus works with regulated businesses that need direct coordination across licensing,
            compliance, banking, legal and corporate workstreams. WhatsApp is the strategic intake
            channel and reaches the people who scope new mandates.
          </p>
          <div className="mt-12">
            <a
              href={WHATSAPP_DISCUSS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-10 text-base font-medium tracking-wide text-primary transition-colors hover:bg-white/90"
              data-cta-location="contact_primary"
              data-cta-label={CTA_DISCUSS_LABEL}
            >
              {CTA_DISCUSS_LABEL}
            </a>
          </div>
          <p className="mt-6 font-sans text-sm text-white/50">
            Prefer email?{" "}
            <a
              href={MAILTO_DISCUSS}
              className="text-white/75 underline-offset-2 hover:underline"
              data-cta-location="contact_email"
              data-cta-label={OCTUS_EMAIL}
            >
              {OCTUS_EMAIL}
            </a>
          </p>
        </div>
        <div className="octus-dark-hero__seam" aria-hidden="true" />
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4 block">What to include</p>
          <h2 className="heading-section mb-6">Give us enough to answer properly.</h2>
          <p className="body-text mb-8">
            A first message does not need documents. It needs enough context for us to tell you
            whether the situation is structural and where it would start.
          </p>
          <ul className="check-list mb-16">
            {[
              "The operation: what the business does and which markets it serves.",
              "The jurisdictions already in play, or the ones under consideration.",
              "What is blocked or pending: licensing, banking, compliance, corporate structure.",
              "What has already been attempted, and by whom.",
              "The timeline or deadline you are working against.",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="section-label mb-8 block">What happens next</p>
          <ol className="flex list-none flex-col gap-8">
            {[
              {
                n: "01",
                t: "You reach out",
                b: "WhatsApp or email: briefly describe the operation and where it is stuck.",
              },
              {
                n: "02",
                t: "We assess fit",
                b: "If we can help structurally, we schedule a diagnostic conversation.",
              },
              {
                n: "03",
                t: "Scope with clarity",
                b: "If there is a path forward, we define scope, model and timeline without ambiguity.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[48px_1fr] gap-6 border-b border-border pb-8 last:border-0"
              >
                <span className="font-heading text-xs font-bold tracking-widest text-primary">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-2 font-sans text-lg font-semibold text-primary">{s.t}</h3>
                  <p className="body-text">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 border-t border-border pt-10 font-sans text-sm text-muted-foreground">
            Looking to join Octus rather than engage us?{" "}
            <Link href="/careers" className="font-medium text-foreground underline underline-offset-4">
              Explore careers →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
