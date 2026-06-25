import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassDeviceFrame({
  children,
  className,
  delay = 0,
  tilt = "right",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: "left" | "right" | "none";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative mx-auto w-full min-w-0 max-w-full", className)}
    >
      <div
        className={cn(
          "showcase-device-float pointer-events-none absolute -inset-2 rounded-[2.75rem] bg-[radial-gradient(ellipse_at_50%_100%,rgba(145,221,207,0.22)_0%,transparent_65%)] blur-2xl sm:-inset-4",
          tilt === "left" && "-translate-x-4",
          tilt === "right" && "translate-x-4",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative",
          tilt === "right" && "lg:[transform:perspective(1200px)_rotateY(-4deg)_rotateX(2deg)]",
          tilt === "left" && "lg:[transform:perspective(1200px)_rotateY(4deg)_rotateX(2deg)]",
        )}
      >
        <div className="showcase-device-float">
          <div className="showcase-device-frame relative overflow-hidden">
          <div className="showcase-device-chrome flex items-center gap-2 border-b border-border/60 bg-card/80 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <div className="type-caption mx-auto min-w-0 flex-1 rounded-md bg-background/60 px-3 py-1 text-center font-medium text-muted-foreground">
            app.physioflex.studio
          </div>
          </div>
          <div className="showcase-device-screen bg-card">{children}</div>
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60"
            aria-hidden
          />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
