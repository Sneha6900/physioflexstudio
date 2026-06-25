import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, DollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/site/Breadcrumbs";
import { cn } from "@/lib/utils";
import type { PhysioProfile } from "@/lib/physio-store";

export function PhysioShell({
  title,
  subtitle,
  user,
  availability,
  onToggleAvailability,
  onLogout,
  crumbs,
  children,
}: {
  title: string;
  subtitle: string;
  user: PhysioProfile;
  availability: boolean;
  onToggleAvailability: () => void;
  onLogout: () => void;
  crumbs?: BreadcrumbItem[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/"
                className="flex w-fit shrink-0 items-center gap-2 rounded-3xl border border-border/80 bg-background/90 px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary"
              >
                <Activity className="size-5 text-accent" />
                PhysioFlex Studio
              </Link>
              <div className="min-w-0">
                <p className="type-label font-semibold uppercase text-muted-foreground">
                  Physiotherapist dashboard
                </p>
                <h1 className="type-page text-foreground">{title}</h1>
                <p className="type-body max-w-xl text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
              <button
                type="button"
                onClick={onToggleAvailability}
                className={cn(
                  "h-11 min-h-11 rounded-full px-4 text-sm font-semibold transition",
                  availability
                    ? "bg-accent text-charcoal"
                    : "border border-border bg-muted/70 text-muted-foreground hover:bg-muted",
                )}
              >
                {availability ? "Available now" : "Offline"}
              </button>
              <Button variant="outline" size="sm" className="h-11 min-h-11" onClick={onLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl min-w-0 px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-8">
        {crumbs && crumbs.length > 0 && (
          <Breadcrumbs items={crumbs} className="mb-[var(--site-breadcrumb-gap)]" />
        )}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,18rem)] xl:grid-cols-[minmax(0,1.4fr)_minmax(0,20rem)]">
          <section className="space-y-6">{children}</section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-16 w-16 rounded-3xl object-cover"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Logged in as</p>
                  <p className="text-lg font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.specializations.join(" • ")}
                  </p>
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
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Quick actions
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Fast access to your schedule, performance, and profile tools.
                  </p>
                </div>
                <ArrowLeft className="size-5 text-accent" />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/physio/dashboard"
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
                  Today&apos;s schedule
                </Link>
                <Link
                  to="/physio/dashboard"
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
                  Manage availability
                </Link>
                <Link
                  to="/physio/dashboard"
                  className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
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
