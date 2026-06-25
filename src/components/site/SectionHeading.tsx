import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5 type-label font-semibold uppercase tracking-[0.18em]",
              dark ? "text-accent" : "text-primary",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-accent" : "bg-primary")} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "type-section mt-2 text-balance text-foreground sm:mt-3",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "type-body mt-2 text-balance text-muted-foreground sm:mt-3",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}