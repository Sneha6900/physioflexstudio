import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Activity, History, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const stats = [
  { label: "Pain Reduction", value: "−64%", up: false },
  { label: "Flexibility", value: "+27%", up: true },
  { label: "Recovery Progress", value: "88%", up: true },
  { label: "Mobility Growth", value: "+38%", up: true },
  { label: "Posture", value: "+45%", up: true },
];

const history = [
  { date: "Jun 21", label: "Spinal Mobility Flow", tag: "Assisted" },
  { date: "Jun 18", label: "Assisted session · Dr. Karan", tag: "Assisted" },
  { date: "Jun 15", label: "Hip Flexor Release", tag: "Assisted" },
];

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

const points = [30, 38, 35, 48, 52, 60, 58, 70, 78, 88];

function Sparkline() {
  const w = 520;
  const h = 160;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / (max - min)) * (h - 20) - 10]);
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="prog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#prog)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Progress() {
  return (
    <section id="progress" className="bg-secondary/40">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Progress tracking"
          title="See every gain, week after week"
          description="A living dashboard that proves your recovery is working."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Recovery Progress</div>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">88%</div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-[#91ddcf]/15 px-2.5 py-1 text-xs font-semibold text-[#5ba99a]">
                <ArrowUpRight className="size-3.5" /> On track
              </span>
            </div>
            <div className="mt-5">
              <Sparkline />
            </div>
            <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
              <span>Week 1</span>
              <span>Week 10</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <History className="size-4 text-[#5ba99a]" /> Session history
            </div>
            <ul className="mt-4 space-y-2">
              {history.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary text-[#5ba99a]">
                    <Activity className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{h.label}</div>
                    <div className="text-xs text-muted-foreground">{h.date}</div>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                    {h.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">{s.value}</span>
                {s.up ? (
                  <ArrowUpRight className="size-3.5 text-[#5ba99a]" />
                ) : (
                  <ArrowDownRight className="size-3.5 text-[#5ba99a]" />
                )}
              </div>
              <div className="mt-0.5 text-[0.65rem] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Client stories / testimonials */}
        <div id="testimonials" className="mt-12">
          <Reveal>
            <div className="mb-6 text-center">
              <span className="type-label font-semibold uppercase tracking-[0.16em] text-[#5ba99a]">
                Client stories
              </span>
              <h3 className="type-section mt-2 text-foreground">Real recovery, real results</h3>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:p-6">
                  <Quote className="size-5 text-[#91ddcf]/60" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="size-3.5 fill-[#91ddcf] text-[#91ddcf]" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
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
