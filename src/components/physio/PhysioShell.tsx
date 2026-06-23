import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, DollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PhysioProfile } from "@/lib/physio-store";

export function PhysioShell({
  title,
  subtitle,
  user,
  availability,
  onToggleAvailability,
  onLogout,
  children,
}: {
  title: string;
  subtitle: string;
  user: PhysioProfile;
  availability: boolean;
  onToggleAvailability: () => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{
        backgroundImage:
          "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 rounded-3xl border border-border/80 bg-background/90 px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary">
              <Activity className="size-5 text-accent" />
              PhysioFlex
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Physiotherapist dashboard</p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
              <p className="max-w-xl text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onToggleAvailability}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                availability
                  ? "bg-accent text-charcoal"
                  : "border border-border bg-muted/70 text-muted-foreground hover:bg-muted",
              )}
            >
              {availability ? "Available now" : "Offline"}
            </button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
          <section className="space-y-6">{children}</section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-3xl object-cover" />
                <div>
                  <p className="text-sm text-muted-foreground">Logged in as</p>
                  <p className="text-lg font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.specializations.join(" • ")}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent" />
                  {user.certifications.length} certifications
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-accent" />
                  {user.years} years experience
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-accent" />
                  {user.studioLocations.join(" • ")}
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Quick actions</h2>
                  <p className="text-sm text-muted-foreground">Fast access to your schedule, performance, and profile tools.</p>
                </div>
                <ArrowLeft className="size-5 text-accent" />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/physio/dashboard" className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary">
                  Today&apos;s schedule
                </Link>
                <Link to="/physio/dashboard" className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary">
                  Manage availability
                </Link>
                <Link to="/physio/dashboard" className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary">
                  Session history
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
