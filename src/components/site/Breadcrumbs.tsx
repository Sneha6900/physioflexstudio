import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { prepareHomeScroll, type HomeSection } from "@/lib/home-scroll";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  to?: string;
  hash?: string;
  params?: Record<string, string>;
  homeSection?: HomeSection;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

function CrumbLink({ item, className }: { item: BreadcrumbItem; className?: string }) {
  const handleClick = () => {
    if (item.to === "/" && item.homeSection) {
      prepareHomeScroll(item.homeSection);
    }
  };

  return (
    <Link
      to={item.to!}
      hash={item.hash}
      params={item.params}
      onClick={handleClick}
      className={cn(
        "rounded-md transition-colors duration-200 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;
  const parent = items.length > 1 ? items[lastIndex - 1] : null;
  const home = items[0]?.to === "/" ? items[0] : null;

  const handleNavClick = (item: BreadcrumbItem) => {
    if (item.to === "/" && item.homeSection) {
      prepareHomeScroll(item.homeSection);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("relative z-0", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {parent?.to && (
          <Link
            to={parent.to}
            hash={parent.hash}
            params={parent.params}
            onClick={() => handleNavClick(parent)}
            className="type-nav inline-flex h-11 min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 font-semibold text-foreground shadow-[var(--shadow-soft)] transition-colors hover:border-accent/50 hover:text-forest"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Back to {parent.label}
          </Link>
        )}

        {home && items.length > 2 && parent?.to !== "/" && (
          <Link
            to={home.to!}
            hash={home.hash}
            onClick={() => handleNavClick(home)}
            className="type-nav inline-flex h-11 min-h-11 items-center gap-2 rounded-full border border-border/70 bg-background px-4 font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-forest"
          >
            Home
          </Link>
        )}
      </div>

      <ol className="mt-3 hidden flex-wrap items-center gap-1 text-xs sm:flex sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === lastIndex;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="size-3 shrink-0 text-muted-foreground/50 sm:size-3.5"
                  aria-hidden
                />
              )}
              {isLast || !item.to ? (
                <span
                  className="font-semibold text-foreground"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <CrumbLink item={item} className="font-medium text-muted-foreground" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
