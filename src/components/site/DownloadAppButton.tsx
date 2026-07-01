import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type BookNowButtonProps = {
  className?: string;
  /** Full-width layout for mobile menu */
  fullWidth?: boolean;
  /** Frosted glass over cinematic hero nav */
  onHero?: boolean;
};

export function BookNowButton({ className, fullWidth, onHero }: BookNowButtonProps) {
  return (
    <Link
      to="/booking"
      className={cn(
        "inline-flex h-11 min-h-11 items-center justify-center rounded-full px-6 text-xs font-bold uppercase tracking-wider transition-all duration-300",
        onHero
          ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
          : "bg-accent hover:bg-[#79cdc0] text-accent-foreground border border-accent/30 shadow-[var(--shadow-soft)] hover:shadow-md",
        fullWidth && "w-full",
        className,
      )}
    >
      Book Now
    </Link>
  );
}
