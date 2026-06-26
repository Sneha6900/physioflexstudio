import { Activity, ArrowRight, BookOpen, ClipboardList, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-physio-clinic.webp";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed Physiotherapists", detail: "Expert-led recovery" },
  { icon: ClipboardList, label: "Personalized Recovery", detail: "Tailored to your needs" },
  { icon: Activity, label: "Joint & Mobility Specialists", detail: "Back, neck & joints" },
  { icon: BookOpen, label: "Evidence-Based Treatment", detail: "Clinically proven care" },
  { icon: Users, label: "Trusted By 5,000+ Clients", detail: "All ages welcome" },
];

function TrustPill({
  icon: Icon,
  label,
  detail,
  compact = false,
  className,
}: {
  icon: typeof ShieldCheck;
  label: string;
  detail: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hero-glass flex shrink-0 items-center gap-2 rounded-xl",
        compact ? "px-2.5 py-2" : "gap-2.5 rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-2.5",
        className,
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-lg bg-white/10 text-accent",
          compact ? "size-7" : "size-8 sm:size-9 rounded-xl",
        )}
      >
        <Icon className={compact ? "size-3" : "size-3.5 sm:size-4"} />
      </span>
      <div className="min-w-0">
        <div className={cn("font-bold leading-tight text-white", compact ? "type-badge" : "type-caption")}>
          {label}
        </div>
        {!compact && <div className="type-caption text-white/55">{detail}</div>}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-x-clip"
    >
      <div className="hero-bg-wrap z-0" aria-hidden>
        <img
          src={heroBg}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-bg-img"
        />
      </div>

      <div className="hero-overlay z-[1]" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_18%_50%,rgba(145,221,207,0.07)_0%,transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-4 pt-[calc(var(--site-nav-height)+0.25rem)] sm:px-6 sm:pb-6 sm:pt-[calc(var(--site-nav-height)+0.5rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,15.5rem)] lg:items-center lg:gap-8 lg:pb-8 lg:pt-[calc(var(--site-nav-height)+0.75rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)]">
        <div className="min-w-0">
          <div className="hero-glass mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:mb-3 sm:gap-2 sm:px-3 sm:py-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="type-label font-semibold uppercase tracking-[0.16em] text-white/90 sm:tracking-[0.2em]">
              Physiotherapy for Everyone
            </span>
          </div>

          <h1 className="type-hero text-white">
            <span className="hero-highlight-teal">Move</span> Better,
            <br />
            <span className="hero-highlight-lilac">Feel</span> Better.
          </h1>

          <p className="type-body mt-[var(--space-heading-gap)] max-w-md text-white/80">
            Professional physiotherapy for neck pain, back pain, joint stiffness, and mobility
            limitations, so you can move confidently again.
          </p>

          <div className="mt-[var(--space-stack-sm)] flex flex-col gap-2 sm:flex-row sm:gap-2.5">
            <button
              type="button"
              aria-disabled="true"
              tabIndex={-1}
              className="btn-mint type-button group inline-flex min-h-11 w-full cursor-default items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-center font-semibold sm:w-auto sm:px-6"
            >
              Book Your Assessment
              <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-4" />
            </button>
            <button
              type="button"
              aria-disabled="true"
              tabIndex={-1}
              className="type-button inline-flex min-h-11 w-full cursor-default items-center justify-center rounded-full border border-white/35 bg-white/5 px-5 py-2.5 text-center font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/55 hover:bg-white/10 sm:w-auto sm:px-6"
            >
              Explore Recovery Programs
            </button>
          </div>
        </div>

        <div className="hidden min-h-0 flex-col gap-2 lg:flex">
          {trustBadges.map((badge) => (
            <TrustPill key={badge.label} {...badge} />
          ))}
        </div>
      </div>

      <div className="relative z-10 shrink-0 px-4 pb-3 sm:px-6 sm:pb-4 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trustBadges.map((badge) => (
            <TrustPill key={badge.label} {...badge} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
