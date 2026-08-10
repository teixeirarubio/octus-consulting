import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import { CtaLink } from "./CtaButton";
import DarkHeroAtmosphere from "./DarkHeroAtmosphere";

type Cta = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "on-dark" | "on-dark-secondary";
  /** Quiet text link instead of a second equal button. */
  quiet?: boolean;
  ctaLocation?: string;
  octusEvent?: string;
};

export default function PageHero({
  eyebrow,
  title,
  titleSecondLine,
  description,
  primaryCta,
  secondaryCta,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  titleSecondLine?: ReactNode;
  description?: ReactNode;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  compact?: boolean;
}) {
  return (
    <section
      className={`octus-dark-hero surface-dark relative flex flex-col justify-center overflow-hidden pt-28 pb-16 ${
        compact ? "min-h-[52vh] md:min-h-[58vh]" : "min-h-[70vh] md:min-h-[80vh] md:pt-32 md:pb-24"
      }`}
    >
      <DarkHeroAtmosphere />
      <div className="octus-hero-copy relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="font-heading max-w-[56rem] text-[1.85rem] font-semibold leading-[1.18] tracking-[-0.005em] text-[color:var(--text-primary-on-dark)] text-balance sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
          {title}
          {titleSecondLine != null && (
            <>
              <br />
              <span className="text-[color:var(--text-secondary-on-dark)]">{titleSecondLine}</span>
            </>
          )}
        </h1>
        {description != null && (
          <div className="mt-6 max-w-[40rem] text-pretty text-base leading-[1.7] text-[color:var(--text-secondary-on-dark)] sm:text-lg">
            {description}
          </div>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {primaryCta && (
              <CtaLink
                href={primaryCta.href}
                variant={primaryCta.variant || "on-dark"}
                data-cta-location={primaryCta.ctaLocation || "page_hero_primary"}
                data-cta-label={primaryCta.label}
                {...(primaryCta.octusEvent
                  ? { "data-octus-event": primaryCta.octusEvent }
                  : {})}
                {...(primaryCta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {primaryCta.label}
              </CtaLink>
            )}
            {secondaryCta &&
              (secondaryCta.quiet ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex min-h-11 items-center font-sans text-sm text-white/65 no-underline transition-colors hover:text-white"
                  data-cta-location={secondaryCta.ctaLocation || "page_hero_secondary"}
                  data-cta-label={secondaryCta.label}
                  {...(secondaryCta.octusEvent
                    ? { "data-octus-event": secondaryCta.octusEvent }
                    : {})}
                  {...(secondaryCta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {secondaryCta.label} →
                </a>
              ) : (
                <CtaLink
                  href={secondaryCta.href}
                  variant={secondaryCta.variant || "on-dark-secondary"}
                  data-cta-location={secondaryCta.ctaLocation || "page_hero_secondary"}
                  data-cta-label={secondaryCta.label}
                  {...(secondaryCta.octusEvent
                    ? { "data-octus-event": secondaryCta.octusEvent }
                    : {})}
                  {...(secondaryCta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {secondaryCta.label}
                </CtaLink>
              ))}
          </div>
        )}
      </div>
      <div className="octus-dark-hero__seam" aria-hidden="true" />
    </section>
  );
}
