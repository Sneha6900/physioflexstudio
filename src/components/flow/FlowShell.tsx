import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const FLOW_STEPS = [
  "Pain Area",
  "Pain Details",
  "AI Analysis",
  "Recovery Plan",
  "Recovery",
] as const;

export function FlowShell({
  step,
  children,
}: {
  step?: number;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-foreground">
              <Activity className="size-5 text-primary" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              PhysioFlex<span className="text-primary">.</span>
            </span>
          </Link>

          {typeof step === "number" && (
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
          )}

          <Link
            to="/dashboard"
            className="rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            My Progress
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
    </div>
  );
}