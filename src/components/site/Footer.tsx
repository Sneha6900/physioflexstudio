import { Activity } from "lucide-react";
import { FooterDownload } from "@/components/site/FooterDownload";
import { FooterFollowUs } from "@/components/site/FooterFollowUs";

const groups = [
  {
    title: "Platform",
    links: ["Mobility Assessment", "Recovery Programs", "Progress Tracking", "Assisted Recovery"],
  },
  {
    title: "Company",
    links: ["About", "Studios", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="surface-dark overflow-x-clip border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.05fr] lg:items-start">
          <div className="footer-brand-column min-w-0">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10">
                <Activity className="size-5 text-primary" />
              </span>
              <span className="type-card-title font-bold text-foreground">
                PhysioFlex <span className="text-accent">Studio</span>
              </span>
            </div>
            <FooterDownload />
          </div>

          <div className="footer-links-grid grid gap-8 md:col-span-1 lg:contents">
            {groups.map((g) => (
              <div key={g.title} className="min-w-0">
                <h4 className="type-label font-semibold text-foreground">{g.title}</h4>
                <ul className="mt-3 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="type-footer text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <FooterFollowUs className="md:col-start-2 lg:col-start-auto" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center type-footer text-muted-foreground sm:flex-row sm:text-left">
          <p className="text-balance">© {new Date().getFullYear()} PhysioFlex Studio. Bangalore, India.</p>
          <p className="shrink-0 text-balance">Built for performance. Designed for recovery.</p>
        </div>
      </div>
    </footer>
  );
}
