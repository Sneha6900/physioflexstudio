import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { LeavingHomeLink } from "@/components/site/LeavingHomeLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trustPoints = [
  { label: "Licensed physiotherapists", icon: ShieldCheck },
  { label: "Free reschedule", icon: RefreshCw },
  { label: "Evidence-based care", icon: Sparkles },
] as const;

export function FinalCta() {
  return (
    <section
      id="booking"
      className="relative bg-background"
    >
      <div className="section-shell !pb-12 !pt-4 sm:!pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-accent/25 p-1 sm:rounded-[2.5rem]"
        >
          <div className="final-cta-inner relative overflow-hidden rounded-[1.85rem] px-5 py-10 sm:rounded-[2.35rem] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            {/* Ambient layers */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(145,221,207,0.18),transparent_65%)]" />
            <div className="pointer-events-none absolute -right-20 top-1/2 size-56 -translate-y-1/2 rounded-full bg-brand-lilac/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 size-48 rounded-full bg-accent/12 blur-3xl" />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(91,169,154,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,169,154,0.06) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                maskImage:
                  "radial-gradient(ellipse 90% 80% at 50% 40%, black 15%, transparent 72%)",
              }}
            />

            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="relative mx-auto max-w-2xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="brand-badge type-label inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold uppercase tracking-[0.16em] shadow-[var(--shadow-soft)]"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/40 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Start your recovery
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="type-hero mt-5 font-display font-bold text-foreground"
              >
                Move Better,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-foreground to-foreground bg-clip-text">
                    Feel Better.
                  </span>
                  <svg
                    aria-hidden
                    className="absolute -bottom-1 left-0 z-0 w-full text-accent/50"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 C 40 2, 80 10, 120 6 S 180 4, 198 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="type-body mx-auto mt-4 max-w-lg text-pretty text-muted-foreground"
              >
                Clinical assessment, hands-on assisted stretching, and physiotherapist supervision —
                start with a consultation focused on pain relief and mobility improvement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
              >
                {trustPoints.map(({ label, icon: Icon }, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.24 + i * 0.06 }}
                    className="glass-card type-caption inline-flex items-center gap-2 rounded-full border border-border/70 px-3.5 py-2 font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="brand-icon-surface grid size-7 place-items-center rounded-full">
                      <Icon className="size-3.5" strokeWidth={2.25} />
                    </span>
                    {label}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="mt-10 flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:justify-center"
              >
                <Button
                  variant="hero"
                  size="xl"
                  className="group min-h-12 w-full rounded-full px-7 py-3 shadow-[0_14px_36px_-14px_rgba(145,221,207,0.9)] transition-all duration-300 hover:shadow-[0_18px_40px_-12px_rgba(145,221,207,0.95)] sm:flex-1"
                  asChild
                >
                  <LeavingHomeLink to="/specialists/" homeSection="booking">
                    Talk to a specialist
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </LeavingHomeLink>
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  className={cn(
                    "group min-h-12 w-full rounded-full border-border/70 bg-card px-7 py-3",
                    "shadow-[var(--shadow-soft)] transition-all duration-300",
                    "hover:border-accent/55 hover:bg-elevated hover:shadow-[var(--shadow-card)] sm:flex-1",
                  )}
                  asChild
                >
                  <LeavingHomeLink to="/assessment/start" homeSection="booking">
                    <BadgeCheck className="size-4 text-forest transition-transform duration-300 group-hover:scale-110" />
                    Book assessment
                  </LeavingHomeLink>
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="type-caption mt-6 text-muted-foreground/80"
              >
                No commitment required · Same-week appointments available
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
