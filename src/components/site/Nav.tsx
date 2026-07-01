import { useEffect, useRef, useState } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookNowButton } from "@/components/site/DownloadAppButton";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { prepareHomeScroll, type HomeSection } from "@/lib/home-scroll";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/physioflex-logo.jpeg";

const links: { label: string; href: string; section: HomeSection }[] = [
  { label: "Approach", href: "#how-it-works", section: "how-it-works" },
  { label: "Platform", href: "#journey", section: "journey" },
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
  isActive = false,
}: {
  label: string;
  href: string;
  section: HomeSection;
  onHero: boolean;
  onNavigate?: () => void;
  mobile?: boolean;
  isActive?: boolean;
}) {
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const className = cn(
    mobile
      ? "block rounded-2xl px-4 py-3.5 type-nav font-bold touch-target transition-all duration-300"
      : "type-nav rounded-full px-3 py-2 font-bold xl:px-4 transition-all duration-300",
    onHero
      ? isActive
        ? "bg-white/20 text-accent shadow-sm"
        : mobile
          ? "text-white hover:bg-white/10"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      : isActive
        ? "bg-accent/15 text-forest"
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

export function Nav({ hero = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const onHero = hero && !pastHero;

  // Active section scroll spy using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // triggers when center of viewport hits element
      threshold: 0.05,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const ids = ["top", "how-it-works", "journey", "assessment", "motus-ai", "exercises", "experts", "locations", "final-cta"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY >= window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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

  const getIsActive = (sect: string) => {
    if (sect === "how-it-works") return activeSection === "how-it-works";
    if (sect === "journey") return activeSection === "journey" || activeSection === "assessment" || activeSection === "motus-ai";
    if (sect === "exercises") return activeSection === "exercises";
    if (sect === "experts") return activeSection === "experts";
    if (sect === "locations") return activeSection === "locations";
    if (sect === "booking") return activeSection === "final-cta";
    return false;
  };

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
            "flex items-center justify-between gap-2 overflow-visible rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4",
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
                "grid size-9 sm:size-10 shrink-0 place-items-center overflow-hidden rounded-full border shadow-sm transition-colors duration-500",
                onHero
                  ? "border-white/20 bg-white/10"
                  : "border-border/60 bg-background",
              )}
            >
              <img src={logoImg} alt="PhysioFlex Studio Logo" className="size-full object-contain" />
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

          <nav className="hidden items-center gap-0.5 lg:flex ml-auto mr-4">
            {links.map((l) => (
              <NavSectionLink key={l.label} {...l} onHero={onHero} isActive={getIsActive(l.section)} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden shrink-0 items-center gap-2 overflow-visible lg:flex">
              <BookNowButton onHero={onHero} />
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
                  isActive={getIsActive(l.section)}
                />
              ))}
            </nav>

            <div className="mt-5 border-t border-border/40 pt-5">
              <BookNowButton fullWidth onHero={onHero} />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
