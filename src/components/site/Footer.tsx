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
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10">
                <Activity className="size-5 text-primary" />
              </span>
              <span className="text-base font-bold text-foreground sm:text-lg">
                PhysioFlex <span className="text-accent">Studio</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A physiotherapist-led mobility and assisted stretching studio. Move better, feel better, and
              measure every step of your progress.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="type-label font-semibold text-foreground">{g.title}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PhysioFlex Studio. Bangalore, India.</p>
          <p>Built for performance. Designed for recovery.</p>
        </div>
      </div>
    </footer>
  );
}
