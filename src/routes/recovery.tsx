import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Flame,
  HandHeart,
  LineChart,
  Play,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowShell } from "@/components/flow/FlowShell";
import { navCrumbs } from "@/lib/navigation";
import { setAssessment, useAssessment } from "@/lib/assessment-store";
import { getExercises, dailyGoals } from "@/lib/exercises";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "Self-Guided Recovery — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Your daily exercise schedule, guided videos, recovery goals and weekly reports — all in one self-guided dashboard.",
      },
    ],
  }),
  component: RecoveryPage,
});

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function RecoveryPage() {
  const data = useAssessment();
  const navigate = useNavigate();
  const exercises = getExercises(data.area);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [goals, setGoals] = useState<boolean[]>(dailyGoals.map(() => false));

  const completedCount = Object.values(done).filter(Boolean).length;
  const progress = Math.round((completedCount / exercises.length) * 100);

  return (
    <FlowShell step={4} crumbs={navCrumbs.recovery()}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Self-Guided Recovery
          </span>
          <h1 className="type-page mt-4 text-foreground">Today's recovery session</h1>
          <p className="type-body mt-3 max-w-xl text-muted-foreground">
            Your {(data.area ?? "mobility").toLowerCase()} program for today. Complete each exercise
            and log your progress.
          </p>
        </div>
        <Button
          variant="heroOutline"
          className="rounded-full"
          onClick={() => {
            setAssessment({ journey: "expert" });
            navigate({ to: "/specialists" });
          }}
        >
          <HandHeart className="size-4" /> Switch to Expert Assistance
        </Button>
      </div>

      {/* top stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard icon={Flame} label="Day streak" value="1" />
        <StatCard icon={Target} label="Session progress" value={`${progress}%`} />
        <StatCard icon={CalendarDays} label="This week" value="1 / 7" />
        <StatCard icon={Trophy} label="Total minutes" value={`${completedCount * 5}`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* schedule */}
        <div className="rounded-[2rem] border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Daily exercise schedule
            </h2>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{exercises.length} done
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-6 space-y-4">
            {exercises.map((ex) => {
              const isDone = done[ex.name];
              return (
                <div
                  key={ex.name}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border p-3 transition-all sm:flex-row sm:items-center",
                    isDone ? "border-accent/40 bg-accent/[0.06]" : "border-border bg-muted/30",
                  )}
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                    <img src={ex.thumb} alt={ex.name} className="h-full w-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center bg-foreground/20">
                      <Play className="size-5 fill-offwhite text-foreground" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-foreground">{ex.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {ex.duration} · {ex.difficulty}
                    </p>
                    <p className="type-caption mt-1 text-pretty text-muted-foreground">{ex.benefits}</p>
                  </div>
                  <Button
                    variant={isDone ? "hero" : "heroOutline"}
                    size="sm"
                    className="h-11 min-h-11 w-full shrink-0 rounded-full sm:w-auto"
                    onClick={() => setDone((d) => ({ ...d, [ex.name]: !d[ex.name] }))}
                  >
                    {isDone ? <Check className="size-4" /> : "Start"}
                  </Button>
                </div>
              );
            })}
          </div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/40 bg-accent/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <Trophy className="size-6 text-accent" />
                <span className="font-semibold text-foreground">
                  Session complete — great work!
                </span>
              </div>
              <Button variant="hero" size="sm" className="rounded-full" asChild>
                <Link to="/dashboard">
                  View Progress <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* side: goals + week + reports */}
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Recovery goals</h2>
            <ul className="mt-4 space-y-3">
              {dailyGoals.map((g, i) => (
                <li key={g}>
                  <button
                    onClick={() => setGoals((arr) => arr.map((v, idx) => (idx === i ? !v : v)))}
                    className="flex w-full items-center gap-3 text-left text-sm"
                  >
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border transition-all",
                        goals[i]
                          ? "border-accent bg-accent text-charcoal"
                          : "border-border text-transparent",
                      )}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <span
                      className={cn(
                        goals[i] ? "text-muted-foreground line-through" : "text-muted-foreground",
                      )}
                    >
                      {g}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">This week</h2>
            <div className="mt-4 grid grid-cols-7 gap-1 sm:flex sm:justify-between">
              {week.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-xl text-xs font-bold sm:size-9",
                      i === 0 ? "bg-accent text-charcoal" : "bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {i === 0 ? <Check className="size-4" /> : ""}
                  </span>
                  <span className="text-[0.65rem] text-muted-foreground sm:text-xs">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-accent">
              <LineChart className="size-5" />
              <h2 className="font-display text-lg font-bold text-foreground">Weekly report</h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Complete your sessions to unlock a detailed weekly report with mobility and pain
              trends.
            </p>
            <Button variant="heroOutline" className="mt-4 w-full rounded-full" asChild>
              <Link to="/dashboard">
                Open Progress Dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </FlowShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5">
      <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
        <Icon className="size-5" />
      </span>
      <div>
        <div className="font-display text-2xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
