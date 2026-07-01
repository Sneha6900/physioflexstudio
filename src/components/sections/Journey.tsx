import { motion } from "motion/react";
import {
  Users,
  ClipboardList,
  Dumbbell,
  LineChart,
  Sparkles,
  Star,
  Play,
  TrendingUp,
  Search,
  CheckCircle,
  Activity,
  CalendarDays,
  Flame,
} from "lucide-react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";

const appSteps = [
  {
    step: "Step 1",
    title: "Find & Book a Physiotherapist",
    description:
      "Browse verified physiotherapists, compare profiles, choose your preferred expert, and book your appointment in just a few taps.",
    icon: Users,
    color: "from-brand-teal/20 to-brand-teal/5",
    accent: "text-forest border-brand-teal/30",
  },
  {
    step: "Step 2",
    title: "Get Assessed",
    description:
      "During your session, your physiotherapist evaluates your condition, understands your concerns, and records your assessment.",
    icon: ClipboardList,
    color: "from-brand-lilac/25 to-brand-lilac/5",
    accent: "text-[#b37cb0] border-brand-lilac/45",
  },
  {
    step: "Step 3",
    title: "Follow Your Therapy Plan",
    description:
      "Access guided stretches, therapy sessions, and personalized recommendations prepared specifically for your condition.",
    icon: Dumbbell,
    color: "from-brand-pink/20 to-brand-pink/5",
    accent: "text-brand-pink border-brand-pink/30",
  },
  {
    step: "Step 4",
    title: "Track Your Progress",
    description:
      "Monitor reports, session history, upcoming appointments, and your overall progress from one dashboard.",
    icon: LineChart,
    color: "from-[#5ba99a]/20 to-[#5ba99a]/5",
    accent: "text-forest border-[#5ba99a]/30",
  },
] as const;

export function Journey() {
  return (
    <section id="journey" className="relative pt-6 pb-10 xs:pt-8 xs:pb-12 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 overflow-hidden bg-background border-b border-border/40">
      {/* Background Gradients */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,221,207,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(232,197,229,0.08)_0%,transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <Reveal className="mb-6 xs:mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-secondary/50 dark:bg-charcoal/50 border border-border/60">
            <Sparkles className="size-3.5 text-accent animate-pulse" />
            <span className="type-label font-bold uppercase tracking-[0.16em] text-foreground/80 sm:tracking-[0.2em]">
              HOW PHYSIOFLEX WORKS
            </span>
          </div>
          <h2 className="type-section mt-3 font-bold tracking-tight text-foreground sm:mt-5 text-center">
            Your Physiotherapy Journey — Made Simple
          </h2>
          <p className="type-body mt-2.5 max-w-xl text-muted-foreground mx-auto text-center leading-relaxed">
            From finding the right physiotherapist to tracking every session, PhysioFlex brings your entire physiotherapy experience into one easy-to-use app.
          </p>
        </Reveal>

        {/* Steps Bento Grid */}
        <Stagger className="flex md:grid md:grid-cols-2 gap-4 xs:gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scroll-px-4 px-4 sm:px-0 -mx-4 sm:mx-auto hide-scrollbar">
          {appSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card/40 dark:bg-card backdrop-blur-md p-6 shadow-soft hover:shadow-card hover:border-accent/40 transition-all duration-400 hover:-translate-y-1 overflow-hidden min-h-[360px] md:min-h-[380px] w-[80vw] xs:w-[75vw] sm:w-[400px] md:w-auto shrink-0 snap-start md:snap-align-none"
              >
                {/* Decorative glowing accent background inside card */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${item.color}`}
                  aria-hidden
                />

                {/* Top: Text Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="type-label font-bold tracking-[0.14em] text-forest">
                      {item.step}
                    </span>
                    <span className={`inline-grid size-8 place-items-center rounded-xl bg-card border border-border/60 shadow-sm ${item.accent}`}>
                      <Icon className="size-4" strokeWidth={2.2} />
                    </span>
                  </div>

                  <h3 className="type-card-title mt-2 font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="type-body mt-1.5 text-muted-foreground text-xs leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Futuristic Interactive Component Mockup */}
                <div className="relative z-10 mt-6 h-40 w-full rounded-2xl bg-secondary/50 dark:bg-background/80 border border-border/60 overflow-hidden flex flex-col justify-center p-4 shadow-inner">
                  {/* Step 1 Visual Mockup */}
                  {index === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 bg-card dark:bg-elevated rounded-full px-3 py-1.5 border border-border/60 text-[10px] text-muted-foreground shadow-sm">
                        <Search className="size-3 text-forest animate-pulse" />
                        <span>Find spine, knee, or joint specialists...</span>
                      </div>
                      <div className="flex items-center gap-3 bg-card dark:bg-elevated border border-border/60 rounded-xl p-3 shadow-sm transform group-hover:scale-[1.02] transition-transform duration-300">
                        <div className="size-10 rounded-full bg-accent/25 dark:bg-accent/15 flex items-center justify-center font-bold text-forest text-xs">
                          AS
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold text-foreground">Dr. Ananya Sharma</h4>
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-forest">
                              <Star className="size-2.5 fill-accent text-accent" />
                              4.9
                            </span>
                          </div>
                          <p className="text-[9px] text-muted-foreground">Lead Spine & Posture Specialist · 8 Yrs Exp</p>
                        </div>
                        <div className="bg-accent/15 border border-accent/20 rounded-full px-2.5 py-1 text-[9px] font-bold text-forest whitespace-nowrap animate-pulse">
                          Book Slot
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Visual Mockup */}
                  {index === 1 && (
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Dynamic assessment list */}
                      <div className="space-y-2">
                        <div className="bg-card dark:bg-elevated border border-border/60 rounded-lg px-2.5 py-1 text-[9px] flex items-center gap-1.5">
                          <CheckCircle className="size-3 text-forest" />
                          <span className="text-foreground font-semibold">Neck Flexion: 78°</span>
                          <span className="text-muted-foreground">(Normal: 80°)</span>
                        </div>
                        <div className="bg-card dark:bg-elevated border border-border/60 rounded-lg px-2.5 py-1 text-[9px] flex items-center gap-1.5">
                          <CheckCircle className="size-3 text-forest" />
                          <span className="text-foreground font-semibold">Spine Extension: 45°</span>
                          <span className="text-muted-foreground">(Normal: 50°)</span>
                        </div>
                      </div>

                      {/* Right: Posture Radar Grid */}
                      <div className="relative size-24 rounded-full border border-dashed border-border flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-2 rounded-full border border-dashed border-border/70" />
                        <div className="absolute inset-5 rounded-full border border-dashed border-border/40" />
                        
                        {/* Rotating Radar Line */}
                        <div className="absolute inset-0 origin-center animate-[spin_10s_linear_infinite] opacity-40 bg-[conic-gradient(from_0deg,transparent_60%,var(--accent)_100%)] rounded-full" />
                        
                        {/* Active Diagnostic Dots */}
                        <div className="absolute top-[30%] left-[25%] size-1.5 rounded-full bg-accent animate-ping" />
                        <div className="absolute top-[30%] left-[25%] size-1.5 rounded-full bg-accent" />
                        
                        <div className="absolute bottom-[28%] right-[30%] size-1.5 rounded-full bg-[#b37cb0] animate-pulse" />
                        <div className="absolute bottom-[28%] right-[30%] size-1.5 rounded-full bg-[#b37cb0]" />

                        <Activity className="size-5 text-forest/70 relative z-10" />
                      </div>
                    </div>
                  )}

                  {/* Step 3 Visual Mockup */}
                  {index === 2 && (
                    <div className="flex items-center justify-between gap-4">
                      {/* Active stretch details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <span className="type-badge bg-brand-pink/15 border border-brand-pink/20 rounded-full px-2 py-0.5 text-[8px] font-bold text-brand-pink uppercase tracking-wider">
                          Active Exercise
                        </span>
                        <h4 className="text-[11px] font-bold text-foreground truncate">Thoracic Extension Stretch</h4>
                        <p className="text-[9px] text-muted-foreground">Keep shoulders relaxed and breathe slowly</p>
                        
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[9px] bg-card dark:bg-elevated border border-border/60 rounded px-1.5 py-0.5 font-medium text-foreground">
                            Next: Neck Release
                          </span>
                        </div>
                      </div>

                      {/* Animated Timer Circle */}
                      <div className="relative size-20 shrink-0 flex items-center justify-center">
                        <svg className="absolute inset-0 size-full -rotate-90">
                          <circle cx="40" cy="40" r="30" className="fill-none stroke-border/40" strokeWidth="4" />
                          <circle
                            cx="40"
                            cy="40"
                            r="30"
                            className="fill-none stroke-brand-pink animate-[dash_6s_ease-in-out_infinite]"
                            strokeWidth="4"
                            strokeDasharray="188.4"
                            strokeDashoffset="47.1"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="relative z-10 flex flex-col items-center">
                          <span className="text-xs font-black text-foreground">0:45</span>
                          <Play className="size-2.5 text-brand-pink fill-brand-pink mt-0.5 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Visual Mockup */}
                  {index === 3 && (
                    <div className="flex flex-col h-full justify-between py-1">
                      {/* Stat summary bar */}
                      <div className="flex justify-between items-center bg-card dark:bg-elevated border border-border/60 rounded-xl px-3 py-1.5 shadow-sm relative z-10">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="size-3.5 text-forest animate-pulse" />
                          <span className="text-[10px] font-bold text-foreground">Overall Mobility Progress</span>
                        </div>
                        <span className="text-[10px] font-black text-forest bg-accent/20 px-2 py-0.5 rounded-md">
                          88%
                        </span>
                      </div>

                      {/* SVG Line Graph (Proper area graph filling rest of card height) */}
                      <div className="relative flex-1 mt-2.5 w-full flex flex-col justify-end">
                        <div className="relative w-full h-[65px]">
                          {/* Grid Lines */}
                          <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-border/15 pointer-events-none" />
                          <div className="absolute inset-x-0 top-[50%] border-t border-dashed border-border/15 pointer-events-none" />
                          <div className="absolute inset-x-0 top-[80%] border-t border-dashed border-border/15 pointer-events-none" />
                          
                          <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                              </linearGradient>
                              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="var(--accent)" floodOpacity="0.55" />
                              </filter>
                            </defs>

                            {/* Gradient Area Fill */}
                            <path
                              d="M 5,50 C 20,48 30,22 45,20 C 60,18 70,38 95,10 L 95,58 L 5,58 Z"
                              fill="url(#chartAreaGrad)"
                            />

                            {/* Top stroke line with premium glow filter */}
                            <path
                              d="M 5,50 C 20,48 30,22 45,20 C 60,18 70,38 95,10"
                              fill="none"
                              stroke="var(--accent)"
                              strokeWidth="2.8"
                              strokeLinecap="round"
                              filter="url(#glow)"
                            />

                            {/* Glowing points */}
                            <circle cx="5" cy="50" r="2.5" fill="var(--accent)" />
                            <circle cx="45" cy="20" r="2.5" fill="var(--accent)" />
                            <circle cx="95" cy="10" r="3.5" fill="var(--accent)" />
                          </svg>

                          {/* Floating Streak Badge overlay */}
                          <div className="absolute left-2.5 top-[15%] bg-card/95 backdrop-blur-sm border border-border/50 rounded-full px-2 py-0.5 text-[8px] font-bold text-foreground/80 flex items-center gap-1 shadow-soft">
                            <Flame className="size-2.5 text-brand-pink fill-brand-pink animate-pulse" />
                            <span>12 Day Streak</span>
                          </div>
                        </div>

                        {/* X-Axis labels */}
                        <div className="flex justify-between items-center text-[7px] text-muted-foreground/60 font-bold px-1 mt-1 border-t border-border/20 pt-1">
                          <span>MON</span>
                          <span>TUE</span>
                          <span>WED</span>
                          <span>THU</span>
                          <span>FRI</span>
                          <span>SAT</span>
                          <span>SUN</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
