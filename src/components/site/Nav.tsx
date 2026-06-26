import { useEffect, useRef, useState } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { prepareHomeScroll, type HomeSection } from "@/lib/home-scroll";
import { cn } from "@/lib/utils";

const links: { label: string; href: string; section: HomeSection }[] = [
  { label: "How it works", href: "#how-it-works", section: "how-it-works" },
  { label: "Programs", href: "#exercises", section: "exercises" },
  { label: "Experts", href: "#experts", section: "experts" },
  { label: "Studios", href: "#locations", section: "locations" },
];

type NavProps = {
  /** Transparent glass nav over cinematic hero */
  hero?: boolean;
};

function NavSectionLink({
  label,
  href,
  section,
  onHero,
  onNavigate,
  mobile = false,
}: {
  label: string;
  href: string;
  section: HomeSection;
  onHero: boolean;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const className = cn(
    mobile
      ? "block rounded-2xl px-4 py-3.5 type-nav font-medium touch-target"
      : "type-nav rounded-full px-3 py-2 font-medium xl:px-4",
    onHero
      ? mobile
        ? "text-white hover:bg-white/10"
        : "text-white/75 hover:bg-white/10 hover:text-white"
      : mobile
        ? "text-foreground hover:bg-secondary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
  );

  if (isHome) {
    return (
      <a href={href} onClick={onNavigate} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link
      to="/"
      hash={section}
      onClick={() => {
        prepareHomeScroll(section);
        onNavigate?.();
      }}
      className={className}
    >
      {label}
    </Link>
  );
}

function DownloadAppButton({
  onHero,
  mobile = false,
}: {
  onHero: boolean;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      aria-label="Download App"
      tabIndex={-1}
      className={cn(
        "nav-download-cta cursor-default border backdrop-blur-md transition-all duration-300",
        mobile
          ? "mb-4 flex w-full items-center justify-center rounded-2xl px-4 py-3.5 type-button font-semibold"
          : "hidden shrink-0 items-center rounded-full px-3 py-2 type-nav font-semibold whitespace-nowrap lg:inline-flex lg:px-3.5 xl:px-4",
        onHero
          ? mobile
            ? "border-white/15 bg-white/10 text-white shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)] hover:border-white/25 hover:bg-white/14 hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)]"
            : "border-white/20 bg-white/10 text-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:border-white/30 hover:bg-white/14 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
          : "glass-card border-border/80 text-foreground shadow-[var(--shadow-soft)] hover:-translate-y-px hover:border-accent/28 hover:shadow-[var(--shadow-card)]",
      )}
    >
      Download App
    </button>
  );
}

export function Nav({ hero = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const onHero = hero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (menuToggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-3 sm:py-4",
        onHero && "backdrop-blur-[2px]",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4",
            onHero
              ? "border border-white/15 bg-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              : scrolled
                ? "border border-border/70 bg-background/90 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                : "border border-border/50 bg-background/85 shadow-[var(--shadow-soft)] backdrop-blur-xl",
          )}
        >
          <Link to="/" className="flex min-w-0 shrink items-center gap-2" onClick={closeMenu}>
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-500 sm:size-9",
                onHero
                  ? "bg-white/15 text-accent"
                  : "bg-primary text-primary-foreground",
              )}
            >
              <Activity className="size-4 sm:size-5" />
            </span>
            <span
              className={cn(
                "type-card-title truncate font-bold tracking-tight transition-colors duration-500",
                onHero ? "text-white" : "text-foreground",
              )}
            >
              PhysioFlex{" "}
              <span className="text-accent">Studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavSectionLink key={l.href} {...l} onHero={onHero} />
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            <DownloadAppButton onHero={onHero} />
            <div className="hidden lg:block">
              <ThemeToggle onHero={onHero} />
            </div>

            <button
              ref={menuToggleRef}
              type="button"
              className={cn(
                "touch-target grid size-11 place-items-center rounded-full lg:hidden",
                onHero ? "text-white" : "text-foreground",
              )}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <div
            ref={menuRef}
            className={cn(
              "fixed inset-x-4 top-[calc(var(--site-nav-height)+0.35rem)] z-50 max-h-[calc(100dvh-var(--site-nav-height)-1rem)] overflow-y-auto rounded-3xl p-4 shadow-[var(--shadow-card)] backdrop-blur-xl sm:inset-x-6 lg:hidden",
              onHero
                ? "border border-white/15 bg-black/90"
                : "border border-border/70 bg-background/98",
            )}
          >
            <DownloadAppButton onHero={onHero} mobile />

            <div className="mb-3 flex items-center justify-between border-b border-border/40 pb-3">
              <span
                className={cn(
                  "type-label font-semibold uppercase",
                  onHero ? "text-white/60" : "text-muted-foreground",
                )}
              >
                Menu
              </span>
              <ThemeToggle onHero={onHero} />
            </div>

            <nav className="space-y-1">
              {links.map((l) => (
                <NavSectionLink
                  key={l.href}
                  {...l}
                  onHero={onHero}
                  mobile
                  onNavigate={closeMenu}
                />
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
