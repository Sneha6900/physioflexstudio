import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, ClipboardList, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import motusMascot from "@/assets/motus-mascot.png";

export function MotusAI() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section
      id="motus-ai"
      className="relative overflow-hidden bg-gradient-to-b from-background via-white to-background dark:from-background dark:via-charcoal dark:to-background py-6 xs:py-8 sm:py-10 lg:py-12 border-b border-border/40 scroll-mt-28"
    >
      {/* Apple-style Blurred Studio Background Foliage & Lighting */}
      <div className="absolute top-[20%] -left-36 size-96 bg-gradient-to-br from-emerald-600/10 to-teal-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-36 size-96 bg-gradient-to-br from-teal-600/10 to-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-[radial-gradient(circle_at_center,rgba(145,221,207,0.14)_0%,transparent_60%)] pointer-events-none" />

      {/* Styled connection pulse animation keyframes */}
      <style>{`
        @keyframes pulseTravel {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .pulse-path {
          stroke-dasharray: 12 70;
          animation: pulseTravel 5s linear infinite;
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6">
        
        {/* CENTERED HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-4 xs:mb-6 sm:mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-secondary/50 dark:bg-elevated border border-brand-teal/40 shadow-sm">
              <Sparkles className="size-3.5 text-accent animate-pulse" />
              <span className="type-label font-bold uppercase tracking-[0.16em] text-foreground/80 sm:tracking-[0.2em] text-[9px]">
                MEET MOTUS AI
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="type-section mt-2 font-bold tracking-tight text-foreground sm:mt-4 leading-tight">
              Smart Care.<br />
              <span className="bg-gradient-to-r from-forest to-accent bg-clip-text text-transparent">
                Powered by Motus.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="type-body mt-2 max-w-[650px] text-muted-foreground mx-auto leading-relaxed text-xs sm:text-sm">
              Our AI assistant that understands your body and builds the right rehabilitation plan for you.
            </p>
          </Reveal>
        </div>

        {/* CENTERPIECE WORKSPACE AREA */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-5xl mx-auto h-[260px] xs:h-[300px] sm:h-[360px] md:h-[420px] lg:h-[440px] flex items-center justify-center overflow-visible select-none"
        >
          {/* SVG CURVED CONNECTING PATHS */}
          <svg className="absolute inset-0 size-full pointer-events-none z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
            {/* Ambient Background Paths */}
            <path d="M 160 110 C 320 110, 420 160, 470 210" fill="none" stroke="rgba(145,221,207,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 160 390 C 320 390, 420 340, 470 290" fill="none" stroke="rgba(145,221,207,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 840 110 C 680 110, 580 160, 530 210" fill="none" stroke="rgba(145,221,207,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 840 390 C 680 390, 580 340, 530 290" fill="none" stroke="rgba(145,221,207,0.15)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Glowing Pulse Paths overlay */}
            <path d="M 160 110 C 320 110, 420 160, 470 210" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" className="pulse-path opacity-80" />
            <path d="M 160 390 C 320 390, 420 340, 470 290" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" className="pulse-path opacity-80" />
            <path d="M 840 110 C 680 110, 580 160, 530 210" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" className="pulse-path opacity-80" />
            <path d="M 840 390 C 680 390, 580 340, 530 290" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" className="pulse-path opacity-80" />
          </svg>

          {/* 3D HOLOGRAPHIC PLATFORM BASE */}
          <div className="absolute bottom-[3%] xs:bottom-[6%] sm:bottom-[10%] md:bottom-[15%] left-1/2 -translate-x-1/2 w-[220px] xs:w-[260px] sm:w-[320px] md:w-[360px] h-[70px] sm:h-[100px] pointer-events-none flex items-center justify-center z-0">
            {/* Holographic light cylinder projection */}
            <div className="absolute bottom-6 w-32 xs:w-40 sm:w-44 h-44 xs:h-56 sm:h-72 bg-gradient-to-t from-accent/20 via-accent/4 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-6 w-[1.5px] h-44 xs:h-56 sm:h-72 bg-gradient-to-t from-cyan-400/60 to-transparent blur-[0.5px] opacity-75" />

            {/* 3D Rotated ellipses */}
            <div className="relative w-full h-full [transform:perspective(500px)_rotateX(68deg)] flex items-center justify-center">
              {/* Outer Ring */}
              <div className="w-[200px] h-[200px] xs:w-[240px] xs:h-[240px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] rounded-full border border-accent/40 shadow-[0_0_60px_rgba(145,221,207,0.35)] animate-[spin_24s_linear_infinite]" />
              {/* Mid Dashed Ring */}
              <div className="absolute w-[150px] h-[150px] xs:w-[180px] xs:h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] rounded-full border border-dashed border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.25)] animate-[spin_18s_linear_infinite_reverse]" />
              {/* Inner Projected Core */}
              <div className="absolute w-[95px] h-[95px] xs:w-[110px] xs:h-[110px] sm:w-[130px] sm:h-[130px] md:w-[140px] md:h-[140px] rounded-full border-2 border-accent bg-accent/15 shadow-[0_0_40px_rgba(145,221,207,0.6)]" />
            </div>
          </div>

          {/* CENTERPIECE FLOATING MASCOT */}
          <motion.div
            style={{
              x: coords.x * 20,
              y: coords.y * 20,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative z-10 flex flex-col items-center justify-center transform scale-[0.62] xs:scale-[0.72] sm:scale-[0.85] md:scale-95 mt-[-20px] xs:mt-[-30px] sm:mt-[-40px] md:mt-[-50px]"
          >
            <img
              src={motusMascot}
              alt="Motus AI Mascot"
              className="w-28 xs:w-32 sm:w-44 h-auto object-contain filter drop-shadow-[0_12px_32px_rgba(145,221,207,0.45)]"
            />
            
            {/* hologram shadow */}
            <motion.div 
              animate={{ scale: [0.88, 1.02, 0.88], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 sm:-bottom-8 w-16 xs:w-20 sm:w-24 h-1.5 sm:h-2.5 bg-black/10 dark:bg-black/30 rounded-full blur-[6px]" 
            />
          </motion.div>

          {/* FOUR FLOATING GLASS CARDS - RESPONSIVE LAYOUT */}
          
          {/* Card 1: Top Left */}
          <div className="absolute top-[3%] xs:top-[5%] left-[2%] sm:left-[4%] md:left-[6%] lg:left-[8%] w-[125px] xs:w-[155px] sm:w-[190px] md:w-[220px] lg:w-[240px] z-20 pointer-events-auto">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass-card flex items-start gap-1.5 xs:gap-2 sm:gap-3 border border-white/25 dark:border-white/10 bg-white/45 dark:bg-[var(--glass-bg)] backdrop-blur-md rounded-xl xs:rounded-2xl sm:rounded-[24px] p-2 xs:p-3 sm:p-4 md:p-5 shadow-soft hover:border-accent/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <span className="grid size-6 xs:size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-brand-teal/15 text-forest border border-brand-teal/35">
                <Activity className="size-3 xs:size-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-foreground text-[9px] xs:text-[11px] sm:text-xs md:text-[13px] leading-snug text-wrap">Understand Your Pain</h4>
                <p className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground leading-relaxed hidden xs:block">Map and analyze specific joint discomfort areas.</p>
              </div>
            </motion.div>
          </div>

          {/* Card 2: Bottom Left */}
          <div className="absolute bottom-[3%] xs:bottom-[5%] left-[2%] sm:left-[4%] md:left-[6%] lg:left-[8%] w-[125px] xs:w-[155px] sm:w-[190px] md:w-[220px] lg:w-[240px] z-20 pointer-events-auto">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.6, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass-card flex items-start gap-1.5 xs:gap-2 sm:gap-3 border border-white/25 dark:border-white/10 bg-white/45 dark:bg-[var(--glass-bg)] backdrop-blur-md rounded-xl xs:rounded-2xl sm:rounded-[24px] p-2 xs:p-3 sm:p-4 md:p-5 shadow-soft hover:border-accent/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <span className="grid size-6 xs:size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-brand-lilac/20 text-[#b37cb0] border border-brand-lilac/35">
                <ClipboardList className="size-3 xs:size-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-foreground text-[9px] xs:text-[11px] sm:text-xs md:text-[13px] leading-snug text-wrap">Personalized Plans</h4>
                <p className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground leading-relaxed hidden xs:block">Receive custom stretch guides adjusted for you.</p>
              </div>
            </motion.div>
          </div>

          {/* Card 3: Top Right */}
          <div className="absolute top-[3%] xs:top-[5%] right-[2%] sm:right-[4%] md:right-[6%] lg:right-[8%] w-[125px] xs:w-[155px] sm:w-[190px] md:w-[220px] lg:w-[240px] z-20 pointer-events-auto">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass-card flex items-start gap-1.5 xs:gap-2 sm:gap-3 border border-white/25 dark:border-white/10 bg-white/45 dark:bg-[var(--glass-bg)] backdrop-blur-md rounded-xl xs:rounded-2xl sm:rounded-[24px] p-2 xs:p-3 sm:p-4 md:p-5 shadow-soft hover:border-accent/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <span className="grid size-6 xs:size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-[#5ba99a]/15 text-[#5ba99a] border border-[#5ba99a]/35">
                <TrendingUp className="size-3 xs:size-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-foreground text-[9px] xs:text-[11px] sm:text-xs md:text-[13px] leading-snug text-wrap">Track Your Progress</h4>
                <p className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground leading-relaxed hidden xs:block">Visualize mobility scores and dashboards.</p>
              </div>
            </motion.div>
          </div>

          {/* Card 4: Bottom Right */}
          <div className="absolute bottom-[3%] xs:bottom-[5%] right-[2%] sm:right-[4%] md:right-[6%] lg:right-[8%] w-[125px] xs:w-[155px] sm:w-[190px] md:w-[220px] lg:w-[240px] z-20 pointer-events-auto">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.2, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass-card flex items-start gap-1.5 xs:gap-2 sm:gap-3 border border-white/25 dark:border-white/10 bg-white/45 dark:bg-[var(--glass-bg)] backdrop-blur-md rounded-xl xs:rounded-2xl sm:rounded-[24px] p-2 xs:p-3 sm:p-4 md:p-5 shadow-soft hover:border-accent/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <span className="grid size-6 xs:size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-brand-pink/15 text-brand-pink border border-brand-pink/35">
                <ShieldCheck className="size-3 xs:size-4.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-foreground text-[9px] xs:text-[11px] sm:text-xs md:text-[13px] leading-snug text-wrap">Safe & Reliable</h4>
                <p className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground leading-relaxed hidden xs:block">Clinical indicators built on safety parameters.</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
