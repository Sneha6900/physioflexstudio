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
    <div className="min-h-screen surface-dark">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-offwhite">
              <Activity className="size-5 text-accent" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-offwhite">
              PhysioFlex<span className="text-accent">.</span>
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
                          ? "border-accent bg-accent text-charcoal"
                          : done
                            ? "border-accent/50 bg-accent/15 text-accent"
                            : "border-white/15 text-white/40",
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        active ? "text-offwhite" : "text-white/40",
                      )}
                    >
                      {label}
                    </span>
                    {i < FLOW_STEPS.length - 1 && <span className="h-px w-5 bg-white/15" />}
                  </div>
                );
              })}
            </div>
          )}

          <Link
            to="/dashboard"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:text-offwhite"
          >
            My Progress
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
    </div>
  );
}