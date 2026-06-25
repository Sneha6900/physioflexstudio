import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { GlassDeviceFrame } from "@/components/showcase/GlassDeviceFrame";
import { ProgressPreview } from "@/components/showcase/ProgressPreview";
import { useCountUp } from "@/components/showcase/useCountUp";

const stats = [
  { label: "Pain Reduced", value: 64, prefix: "−", suffix: "%", up: false },
  { label: "Mobility Increased", value: 38, prefix: "+", suffix: "%", up: true },
  { label: "Recovery Progress", value: 88, prefix: "", suffix: "%", up: true },
  { label: "Posture Improved", value: 45, prefix: "+", suffix: "%", up: true },
] as const;

const testimonials = [
  {
    name: "Latha M.",
    age: "58",
    focus: "Lower back recovery",
    rating: 5,
    quote:
      "After weeks of stiffness, I can bend and walk without dreading the pain. The team made me feel safe at every step.",
  },
  {
    name: "Deepak N.",
    age: "52",
    focus: "Post-surgery rehab",
    rating: 5,
    quote:
      "My knee replacement recovery was smoother than I expected. Clear milestones and compassionate physiotherapists throughout.",
  },
  {
    name: "Sanjana R.",
    age: "46",
    focus: "Neck & shoulder mobility",
    rating: 5,
    quote:
      "Desk pain that lingered for years finally eased. I understand my body better and move with far more confidence.",
  },
];

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="showcase-stat-card group rounded-2xl border border-border/80 bg-card/80 p-[var(--space-card-pad)] shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_40px_-16px_rgba(145,221,207,0.35)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="type-stat text-foreground">
          {stat.prefix}
          {count}
          {stat.suffix}
        </span>
        {stat.up ? (
          <ArrowUpRight className="size-4 shrink-0 text-forest transition-transform group-hover:scale-110" />
        ) : (
          <ArrowDownRight className="size-4 shrink-0 text-forest transition-transform group-hover:scale-110" />
        )}
      </div>
      <div className="mt-0.5 type-caption text-muted-foreground">{stat.label}</div>
      <div
        className="mt-3 h-px w-full bg-gradient-to-r from-accent/50 via-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
    </motion.div>
  );
}

export function Progress() {
  return (
    <section id="progress" className="showcase-section showcase-section-alt relative overflow-x-clip overflow-y-visible">
      <div className="section-shell relative z-[1]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-14 xl:gap-20">
          {/* App preview — left on desktop */}
          <div className="order-2 min-w-0 lg:order-none">
            <GlassDeviceFrame tilt="left">
              <ProgressPreview />
            </GlassDeviceFrame>
          </div>

          {/* Copy — right on desktop */}
          <div className="order-1 min-w-0 lg:order-none">
            <Reveal>
              <span className="type-label font-semibold uppercase tracking-[0.2em] text-forest">
                Progress Tracking
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="showcase-heading mt-[var(--space-heading-gap)] text-balance text-foreground">
                See every gain,
                <br />
                week after week.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="showcase-body mt-[var(--space-stack-sm)] max-w-md text-muted-foreground">
                Watch recovery trends unfold in real time — weekly improvements, pain reduction,
                session history, and mobility growth — all in one living dashboard that proves your
                plan is working.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Client stories */}
        <div id="testimonials" className="mt-20 lg:mt-28">
          <Reveal>
            <div className="mb-8 text-center">
              <span className="type-label font-semibold uppercase tracking-[0.16em] text-forest">
                Client stories
              </span>
              <h3 className="showcase-heading mt-[var(--space-heading-gap)] text-foreground">Real recovery, real results</h3>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <article className="card-premium flex h-full flex-col p-[var(--space-card-pad)] sm:p-5">
                  <Quote className="size-5 text-accent/60" />
                  <p className="type-body mt-2 flex-1 text-pretty text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-3 border-t border-border pt-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="size-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="type-caption mt-1.5 font-semibold text-foreground">{t.name}</p>
                    <p className="type-label text-muted-foreground">
                      Age {t.age} · {t.focus}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
