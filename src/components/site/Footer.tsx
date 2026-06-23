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
    <footer className="surface-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-white/10">
                <Activity className="size-5 text-accent" />
              </span>
              <span className="font-display text-lg font-bold">
                PhysioFlex<span className="text-accent">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              An AI-powered mobility and recovery ecosystem. Move better, recover faster, and
              measure every step of your progress.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="font-display text-sm font-semibold text-white/90">{g.title}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-white/55 transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} PhysioFlex Studio. Bangalore, India.</p>
          <p>Built for performance. Designed for recovery.</p>
        </div>
      </div>
    </footer>
  );
}