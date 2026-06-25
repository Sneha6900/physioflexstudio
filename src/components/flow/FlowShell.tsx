import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Check } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/site/Breadcrumbs";
import { cn } from "@/lib/utils";

export const FLOW_STEPS = [
  "Pain Area",
  "Pain Details",
  "Clinical Evaluation",
  "Recovery Plan",
  "Recovery",
] as const;

export function FlowShell({
  step,
  crumbs,
  children,
}: {
  step?: number;
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

      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-foreground">
              <Activity className="size-5 text-primary" />
            </span>
            <span className="truncate font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
              PhysioFlex <span className="text-primary">Studio</span>
            </span>
          </Link>

          {typeof step === "number" && (
            <>
              <div className="order-3 flex w-full items-center justify-center gap-1.5 md:hidden">
                {FLOW_STEPS.map((label, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-full border text-xs font-semibold",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : done
                              ? "border-primary/50 bg-primary/15 text-primary"
                              : "border-border text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-3.5" /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "line-clamp-1 w-full text-center text-[0.65rem] font-medium",
                          active ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {label.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="hidden items-center gap-2 md:flex">
                {FLOW_STEPS.map((label, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-full border text-xs font-semibold transition-all",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : done
                              ? "border-primary/50 bg-primary/15 text-primary"
                              : "border-border text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-3.5" /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          active ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                      {i < FLOW_STEPS.length - 1 && <span className="h-px w-5 bg-border" />}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <Link
            to="/dashboard"
            className="h-11 shrink-0 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold leading-none text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            My Progress
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl min-w-0 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
        {crumbs && crumbs.length > 0 && (
          <Breadcrumbs items={crumbs} className="mb-[var(--site-breadcrumb-gap)]" />
        )}
        {children}
      </main>
    </div>
  );
}