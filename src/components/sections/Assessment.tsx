import { ArrowRight, Check } from "lucide-react";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { Reveal } from "@/components/site/Reveal";
import { AssessmentPreview } from "@/components/showcase/AssessmentPreview";
import { GlassDeviceFrame } from "@/components/showcase/GlassDeviceFrame";

const features = [
  "Mobility Analysis",
  "Pain Severity",
  "Posture Assessment",
  "Flexibility Tracking",
] as const;

export function Assessment() {
  return (
    <section id="assessment" className="showcase-section relative overflow-x-clip overflow-y-visible">
      <div className="section-shell relative z-[1]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-14 xl:gap-20">
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
                PhysioFlex measures recovery with the same clinical indicators your physiotherapist
                uses — pain severity, mobility, posture, and flexibility — so every session is
                grounded in objective data, not guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
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

            <Reveal delay={0.2}>
              <LeavingHomeLink
                to="/assessment/start"
                className="btn-mint type-button group mt-10 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-center font-semibold"
              >
                Explore Assessment
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </LeavingHomeLink>
            </Reveal>
          </div>

          {/* App preview */}
          <div className="order-2 min-w-0 lg:order-none">
            <GlassDeviceFrame tilt="right">
              <AssessmentPreview />
            </GlassDeviceFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
