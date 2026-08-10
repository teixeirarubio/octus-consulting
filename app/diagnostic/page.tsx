import Link from "next/link";
import {
  CTA_ASSESS_LABEL,
  CTA_DISCUSS_LABEL,
  MAILTO_INFO,
  WHATSAPP_ASSESS_URL,
  WHATSAPP_DISCUSS_URL,
} from "../../lib/cta";
import PageHero from "../../components/system/PageHero";
import { pageSocialMeta } from "../../lib/pageMeta";

export const metadata = pageSocialMeta({
  title: "Diagnostic",
  description:
    
    "Start with a diagnostic conversation on WhatsApp to assess regulatory fit, structural readiness and operational pressure points before committing.",
  path: "/diagnostic",
});

const situations = [
  "Licensing delayed, deferred or stalling",
  "Banking rejection or payment instability",
  "Compliance gaps under audit or banking scrutiny",
  "Audit or certification readiness problems",
  "Blocked market entry",
  "Regulatory exposure the team cannot sequence alone",
];

export default function DiagnosticPage() {
  return (
    <main>
      <PageHero
        eyebrow="Diagnostic assessment"
        title="Assess the failure mode."
        titleSecondLine="Then sequence remediation."
        description={
          <>
            Already facing a licensing, banking, compliance or operational blockage? Start with a
            diagnostic assessment. We begin with a structured conversation about exposure and
            readiness, then sequence remediation through{" "}
            <Link
              href="/solutions/remediation-readiness"
              className="text-white underline underline-offset-4"
            >
              Remediation &amp; Readiness
            </Link>
            .
          </>
        }
        primaryCta={{
          href: WHATSAPP_ASSESS_URL,
          label: CTA_ASSESS_LABEL,
          external: true,
          ctaLocation: "diagnostic_primary",
          octusEvent: "diagnostic_click",
        }}
        secondaryCta={{
          href: WHATSAPP_DISCUSS_URL,
          label: CTA_DISCUSS_LABEL,
          external: true,
          ctaLocation: "diagnostic_secondary",
        }}
      />

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4 block">When this path fits</p>
          <h2 className="heading-section mb-8">Situations we help operators recognize</h2>
          <ul className="mb-12 space-y-4">
            {situations.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-border pb-4 font-sans text-base text-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="body-large mb-6">
            Prefer the full remediation hub?{" "}
            <Link
              href="/solutions/remediation-readiness"
              className="text-primary underline-offset-4 hover:underline"
            >
              Operational Remediation &amp; Readiness
            </Link>
            .
          </p>
          <p className="body-large mb-8">
            Prefer email? Write to{" "}
            <a href={MAILTO_INFO} className="text-primary underline-offset-4 hover:underline"
              data-cta-location="diagnostic_email"
              data-cta-label="info@octusconsulting.com"
            >
              info@octusconsulting.com
            </a>
            .
          </p>
          <div className="rounded-sm border border-border bg-secondary/20 p-5">
            <p className="section-label mb-2 block">Privacy and sensitive information</p>
            <p className="body-text text-muted-foreground">
              Diagnostic intake starts as a structured conversation by WhatsApp or email. Do not send
              passwords, full identity documents, full account credentials or other highly sensitive
              material in the first message. Share only what is needed to describe the blockage and
              operating context. Octus does not run a mass lead-capture form on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
