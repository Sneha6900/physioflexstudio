import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, CheckCircle2, ClipboardList, HeartPulse, ArrowRight, Star, MapPin, CalendarCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhysioShell } from "@/components/physio/PhysioShell";
import { completeSession, hydratePhysio, logoutPhysio, toggleAvailability, usePhysio, acceptSession } from "@/lib/physio-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/physio/dashboard")({
  head: () => ({
    meta: [
      { title: "Physiotherapist Dashboard — PhysioFlex Studio" },
      {
        name: "description",
        content:
          "Accept assigned sessions, review client pain assessments, manage availability, and track daily and weekly targets from the PhysioFlex physiotherapist dashboard.",
      },
    ],
  }),
  component: PhysioDashboardPage,
});

function PhysioDashboardPage() {
  const physio = usePhysio();
  const navigate = useNavigate();

  useEffect(() => {
    hydratePhysio();
  }, []);

  useEffect(() => {
    if (!physio.user) {
      navigate({ to: "/physio/login" });
    }
  }, [physio.user, navigate]);

  if (!physio.user) {
    return null;
  }

  const assignedSessions = physio.sessions.filter((session) => session.status === "assigned");
  const acceptedSessions = physio.sessions.filter((session) => session.status === "accepted");
  const completedSessions = physio.sessions.filter((session) => session.status === "completed").slice(0, 3);
  const upcomingSessions = [...acceptedSessions, ...assignedSessions].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  return (
    <PhysioShell
      title="Your clinic on the go"
      subtitle="Accept sessions, preview pain assessments, and keep your availability and targets on track."
      user={physio.user}
      availability={physio.availability}
      onToggleAvailability={() => toggleAvailability()}
      onLogout={() => {
        logoutPhysio();
        navigate({ to: "/physio/login" });
      }}
    >
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Today's overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Your performance snapshot</h2>
              </div>
              <div className="rounded-3xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">{physio.availability ? "Available" : "Offline"}</div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { label: "Assigned sessions", value: assignedSessions.length, icon: ClipboardList },
                { label: "Client rating", value: physio.metrics.averageRating.toFixed(1), icon: Star },
                { label: "Daily target", value: `${physio.metrics.completedToday}/${physio.metrics.dailyTarget}`, icon: CalendarCheck },
                { label: "Weekly target", value: `${physio.metrics.completedWeek}/${physio.metrics.weeklyTarget}`, icon: Users },
              ].map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-border bg-muted/60 p-5">
                  <div className="flex items-center gap-3 text-accent">
                    <metric.icon className="size-5" />
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{metric.label}</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Upcoming clients</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Next appointments</h2>
              </div>
              <Button variant="heroOutline" size="sm" asChild>
                <Link to="/physio/dashboard">View full schedule</Link>
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              {upcomingSessions.length ? (
                upcomingSessions.map((session) => (
                  <SessionRow
                    key={session.id}
                    session={session}
                    onPrimaryAction={() =>
                      session.status === "assigned"
                        ? acceptSession(session.id)
                        : session.status === "accepted"
                        ? completeSession(session.id)
                        : undefined
                    }
                  />
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-border/60 bg-muted/50 px-5 py-8 text-center text-sm text-muted-foreground">
                  You have no sessions scheduled yet. Accept assigned sessions to start the day.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Key insights</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Session readiness</h2>
              </div>
              <CheckCircle2 className="size-6 text-accent" />
            </div>
            <div className="mt-6 space-y-4">
              <Metric label="Acceptance rate" value={`${physio.metrics.acceptanceRate}%`} />
              <Metric label="Sessions accepted" value={`${physio.metrics.sessionsAccepted}`} />
              <Metric label="Average rating" value={`${physio.metrics.averageRating.toFixed(1)}/5`} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Session history</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Recent completions</h2>
              </div>
              <ArrowRight className="size-6 text-accent" />
            </div>
            <div className="mt-6 space-y-4">
              {completedSessions.length ? (
                completedSessions.map((session) => (
                  <div key={session.id} className="rounded-3xl border border-border bg-muted/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{session.client}</p>
                        <p className="text-sm text-muted-foreground">{session.date} · {session.time}</p>
                      </div>
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{session.rating} ★</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{session.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No completed sessions yet. Complete appointments to build your history and ratings.</p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Profile management</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Expert profile</h2>
              </div>
              <HeartPulse className="size-6 text-accent" />
            </div>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <Detail label="Rate" value={`${physio.user.rating.toFixed(1)} / 5`} />
              <Detail label="Reviews" value={`${physio.user.reviews}`} />
              <Detail label="Specializations" value={physio.user.specializations.join(", ")} />
              <Detail label="Certifications" value={physio.user.certifications.join(" • ")} />
            </div>
          </div>
        </div>
      </section>
    </PhysioShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-muted/50 px-4 py-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border/70 py-3 last:border-b last:border-border/70">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SessionRow({
  session,
  onPrimaryAction,
}: {
  session: {
    id: string;
    client: string;
    area: string;
    painZones: string[];
    summary: string;
    date: string;
    time: string;
    studio: string;
    status: "assigned" | "accepted" | "completed";
    rating?: number;
  };
  onPrimaryAction?: () => void;
}) {
  const actionLabel =
    session.status === "assigned"
      ? "Accept session"
      : session.status === "accepted"
      ? "Mark complete"
      : undefined;

  return (
    <div className="rounded-3xl border border-border bg-muted/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
            session.status === "assigned"
              ? "bg-yellow-100 text-yellow-700"
              : session.status === "accepted"
              ? "bg-accent/10 text-accent"
              : "bg-emerald-100 text-emerald-700",
          )}>
            {session.status}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-foreground">{session.client}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{session.date} · {session.time} · {session.studio}</p>
        </div>
        {actionLabel ? (
          <Button size="sm" variant="heroOutline" onClick={onPrimaryAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Pain areas</p>
          <p className="mt-2 font-semibold text-foreground">{session.painZones.join(", ")}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Assessment summary</p>
          <p className="mt-2 text-sm text-muted-foreground">{session.summary}</p>
        </div>
      </div>
    </div>
  );
}
