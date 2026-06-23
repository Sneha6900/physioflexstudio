import { useEffect, useState } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "How it works", href: "#journey" },
  { label: "Features", href: "#features" },
  { label: "Programs", href: "#exercises" },
  { label: "Experts", href: "#experts" },
  { label: "Studios", href: "#locations" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border border-border/70 bg-background/80 shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "border border-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Activity className="size-5 text-accent" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              PhysioFlex<span className="text-accent">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/dashboard">My Progress</Link>
            </Button>
            <Button variant="dark" size="sm" className="rounded-full px-5" asChild>
              <Link to="/assessment">Start Assessment</Link>
            </Button>
          </div>

          <button
            className="grid size-9 place-items-center rounded-full text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-3xl border border-border/70 bg-background/95 p-3 shadow-[var(--shadow-card)] backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <Button variant="dark" className="mt-2 w-full rounded-2xl" asChild>
              <Link to="/assessment" onClick={() => setOpen(false)}>
                Start Assessment
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}