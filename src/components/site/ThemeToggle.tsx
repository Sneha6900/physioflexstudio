import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  onHero?: boolean;
  className?: string;
};

export function ThemeToggle({ onHero = false, className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full transition-all duration-300",
        onHero
          ? "border border-white/15 bg-white/10 text-white hover:bg-white/20"
          : "border border-border bg-secondary text-foreground hover:bg-muted",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-[1.125rem] transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-[1.125rem] transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
        aria-hidden
      />
    </button>
  );
}
