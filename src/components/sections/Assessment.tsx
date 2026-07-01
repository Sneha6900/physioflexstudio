import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { AssessmentPreview } from "@/components/showcase/AssessmentPreview";

const features = [
  "Mobility Analysis",
  "Intensity",
  "Posture Assessment",
  "Flexibility Tracking",
] as const;

export function Assessment() {
  return (
    <section id="assessment" className="showcase-section relative overflow-x-clip overflow-y-visible">
      <div className="section-shell relative z-[1]">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-14 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] xl:gap-20">
          {/* Copy */}
          <div className="order-1 min-w-0 lg:order-none">
            <Reveal>
              <span className="type-label font-semibold uppercase tracking-[0.2em] text-forest">
                Clinical Assessment
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="showcase-heading mt-[var(--space-heading-gap)] text-balance text-foreground">
                Your condition,
                <br />
                measured clinically.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="showcase-body mt-[var(--space-stack-sm)] max-w-md text-muted-foreground">
                PhysioFlex measures progress with the same clinical indicators your physiotherapist
                uses — intensity, mobility, posture, and flexibility — so every session is
                grounded in objective data, not guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-5 xs:mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="showcase-pill glass-card type-caption inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-1.5 font-medium text-foreground"
                  >
                    <Check className="size-3.5 shrink-0 text-forest" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* App preview */}
          <div className="order-2 min-w-0 lg:order-none glass-card rounded-[2rem] border border-border bg-card/40 dark:bg-card shadow-[var(--shadow-card)] backdrop-blur-md overflow-hidden">
            <AssessmentPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
