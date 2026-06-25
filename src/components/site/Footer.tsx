import { Activity } from "lucide-react";

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
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10">
                <Activity className="size-5 text-primary" />
              </span>
              <span className="type-card-title font-bold text-foreground">
                PhysioFlex <span className="text-accent">Studio</span>
              </span>
            </div>
            <p className="type-footer mt-3 max-w-xs leading-relaxed text-muted-foreground">
              A physiotherapist-led mobility and assisted stretching studio. Move better, feel
              better, and measure every step of your progress.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center type-footer text-muted-foreground sm:flex-row sm:text-left">
          <p className="text-balance">© {new Date().getFullYear()} PhysioFlex Studio. Bangalore, India.</p>
          <p className="shrink-0 text-balance">Built for performance. Designed for recovery.</p>
        </div>
      </div>
    </footer>
  );
}
