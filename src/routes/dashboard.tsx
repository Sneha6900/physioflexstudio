import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Gauge,
  HandHeart,
  MapPin,
  PersonStanding,
  TrendingUp,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { computeScores, useAssessment } from "@/lib/assessment-store";
import { getSpecialist, nextDays } from "@/lib/specialists";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress Dashboard — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Track pain reduction, mobility, flexibility and posture improvements, your session history and weekly recovery reports.",
      },
    ],
  }),
  component: DashboardPage,
});

const metrics = [
  { label: "Pain Reduction", value: 64, suffix: "%", icon: TrendingUp },
  { label: "Mobility Improvement", value: 38, suffix: "%", icon: Gauge },
  { label: "Flexibility Improvement", value: 27, suffix: "%", icon: Activity },
  { label: "Posture Improvement", value: 45, suffix: "%", icon: PersonStanding },
];

const timeline = [
  { week: "Week 1", note: "Assessment & baseline established", pain: 8 },
  { week: "Week 2", note: "Mobility drills introduced", pain: 6 },
  { week: "Week 3", note: "Strength & stretching added", pain: 5 },
  { week: "Week 4", note: "Range of motion restored", pain: 3 },
];

function DashboardPage() {
  const data = useAssessment();
  const scores = computeScores(data);
  const specialist = getSpecialist(data.specialistId);
  const bookingDay = data.booking ? nextDays(7).find((d) => d.iso === data.booking?.date) : null;

  const hasStarted = Boolean(data.area);

  return (
    <FlowShell step={4}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Progress Dashboard
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Your recovery, measured
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            {hasStarted
              ? `Tracking your ${(data.area ?? "").toLowerCase()} recovery progress over time.`
              : "Complete an assessment to start tracking your recovery."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="heroOutline" className="rounded-full" asChild>
            <Link to="/recovery">
              <User className="size-4" /> Self-Guided
            </Link>
          </Button>
          <Button variant="hero" className="rounded-full" asChild>
            <Link to="/specialists">
              <HandHeart className="size-4" /> Experts
            </Link>
          </Button>
        </div>
      </div>

      {!hasStarted && (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-[2rem] border border-accent/30 bg-accent/[0.06] p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">No assessment yet — let's build your personalized plan.</p>
          <Button variant="hero" className="rounded-full" asChild>
            <Link to="/assessment">
              Start Assessment <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      )}

      {/* metrics */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-[2rem] border border-border bg-card p-6"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <m.icon className="size-5" />
            </span>
            <div className="mt-4 font-display text-4xl font-bold text-accent">
              +{m.value}
              {m.suffix}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, delay: i * 0.08 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* recovery timeline */}
        <div className="rounded-[2rem] border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold text-foreground">Recovery timeline</h2>
          <div className="mt-6 space-y-5">
            {timeline.map((t, i) => (
              <div key={t.week} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {i < timeline.length - 1 && <span className="my-1 w-px flex-1 bg-muted" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-foreground">{t.week}</span>
                    <span className="text-xs text-muted-foreground">Pain {t.pain}/10</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${(10 - t.pain) * 10}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* side: index + session history */}
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-accent/30 bg-accent/[0.06] p-6 text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Current Recovery Index</div>
            <div className="mt-2 font-display text-6xl font-bold text-accent">{scores.recoveryIndex}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {scores.recoveryIndex >= 70
                ? "Excellent trajectory — keep it up."
                : "Steadily improving — stay consistent."}
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Session history</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {data.booking && (
                <li className="flex items-start gap-3">
                  <CalendarCheck className="mt-0.5 size-4 text-accent" />
                  <div>
                    <div className="font-semibold text-foreground">
                      Studio session{specialist ? ` · ${specialist.name}` : ""}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> {data.booking.studio} · {bookingDay?.label} ·{" "}
                      {data.booking.time}
                    </div>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Activity className="mt-0.5 size-4 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">AI assessment completed</div>
                  <div className="text-xs text-muted-foreground">
                    {data.area ?? "—"} · Recovery Index {scores.recoveryIndex}
                  </div>
                </div>
              </li>
              {!data.booking && (
                <li className="text-xs text-muted-foreground">No studio sessions booked yet.</li>
              )}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Weekly report</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pain down, mobility up. Your consistency this week is paying off — next milestone in ~
              {Math.max(1, scores.weeks - 1)} weeks.
            </p>
          </div>
        </div>
      </div>
    </FlowShell>
  );
}