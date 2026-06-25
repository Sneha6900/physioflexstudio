import type { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/site/Breadcrumbs";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  crumbs?: BreadcrumbItem[];
  className?: string;
  contentClassName?: string;
  showFooter?: boolean;
};

export function PageShell({
  children,
  crumbs,
  className,
  contentClassName,
  showFooter = true,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen overflow-x-clip bg-background", className)}>
      <Nav />
      <main className="site-main-offset">
        <div className={cn("site-container", contentClassName)}>
          {crumbs && crumbs.length > 0 && (
            <Breadcrumbs
              items={crumbs}
              className="mb-[var(--site-breadcrumb-gap)]"
            />
          )}
          {children}
        </div>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
