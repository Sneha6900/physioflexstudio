import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-physio-clinic.webp";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-x-clip"
    >
      <div className="hero-bg-wrap z-0" aria-hidden>
        <img
          src={heroBg}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="hero-bg-img"
        />
      </div>

      <div className="hero-overlay z-[1]" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(145,221,207,0.08)_0%,transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pb-8 pt-[calc(var(--site-nav-height)+1.5rem)] sm:px-6 items-center">
        {/* Top spacer for justify-between balance */}
        <div className="hidden sm:block" />

        {/* Text content in center area */}
        <div className="max-w-2xl flex flex-col items-center text-center my-auto pt-24 xs:pt-32 sm:pt-0 sm:my-0">
          <div className="hero-glass mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:mb-4 sm:gap-2 sm:px-3 sm:py-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="type-label font-semibold uppercase tracking-[0.16em] text-white/90 sm:tracking-[0.2em]">
              Physiotherapy for Everyone
            </span>
          </div>

          <h1 className="text-white mb-4 text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
            <span className="hero-highlight-teal">Move</span> Better{" "}
            <span className="hero-highlight-lilac">Feel</span> Better
          </h1>

          <p className="max-w-xl text-white/90 leading-relaxed mb-6 sm:mb-8 text-[15px] xs:text-base sm:text-lg md:text-xl">
            Professional physiotherapy for neck back joint stiffness and mobility
            limitations so you can move confidently again
          </p>
        </div>

        {/* Buttons placed neatly at the bottom of the viewport on mobile */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3 w-full justify-center items-center mt-auto sm:mt-8 pb-4 sm:pb-0 z-20">
          <button
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            className="btn-mint type-button group inline-flex min-h-11 w-full cursor-default items-center justify-center gap-1.5 rounded-full px-6 py-2.5 text-center font-semibold sm:w-auto"
          >
            Book Your Assessment
            <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-4" />
          </button>
          <button
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            className="type-button inline-flex min-h-11 w-full cursor-default items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-2.5 text-center font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/55 hover:bg-white/10 sm:w-auto"
          >
            Explore Programs
          </button>
        </div>
      </div>
    </section>
  );
}
