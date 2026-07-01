import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  DoorOpen, 
  Award, 
  HeartHandshake, 
  Zap, 
  Check, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

// Assets imports
import studioIndiranagar from "@/assets/studio-indiranagar.webp";
import studioKoramangala from "@/assets/studio-koramangala.webp";
import studioWhitefield from "@/assets/studio-whitefield.webp";
import heroPhysioClinic from "@/assets/hero-physio-clinic.webp";
import programAssistedStretch from "@/assets/program-assisted-stretch.webp";

type ShowcaseItem = {
  number: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  overlayTitle: string;
  overlayDesc: string;
  floatingPanels: string[];
};

const showcaseItems: ShowcaseItem[] = [
  {
    number: "01",
    title: "Performance Training Spaces",
    description: "Open environment suites equipped for functional mobility and active movement.",
    icon: Sparkles,
    image: studioKoramangala,
    overlayTitle: "Performance Training Spaces",
    overlayDesc: "Designed to inspire movement, build strength, and accelerate your progress.",
    floatingPanels: ["Modern Equipment", "Open Today", "Premium Studio"]
  },
  {
    number: "02",
    title: "Private Treatment Rooms",
    description: "Quiet, sound-insulated rooms for personalized physical adjustments.",
    icon: DoorOpen,
    image: studioIndiranagar,
    overlayTitle: "Private Treatment Rooms",
    overlayDesc: "Dedicated suites ensuring absolute focus and comfort during your therapy.",
    floatingPanels: ["Personalized Care", "Dignified Suites"]
  },
  {
    number: "03",
    title: "Certified Physiotherapists",
    description: "Licensed mobility experts who guide your path back to healthy motion.",
    icon: Award,
    image: heroPhysioClinic,
    overlayTitle: "Certified Physiotherapists",
    overlayDesc: "Expert clinical therapists managing your posture, angles, and joint reload.",
    floatingPanels: ["Certified Experts", "Clinical Progress"]
  },
  {
    number: "04",
    title: "Comfort & Wellness",
    description: "Warm, custom lighting, climate control, and welcoming lounges.",
    icon: HeartHandshake,
    image: studioWhitefield,
    overlayTitle: "Comfort & Wellness",
    overlayDesc: "Soothing clinical environments built for patient relaxation and comfort.",
    floatingPanels: ["Welcoming Staff", "Premium Spaces"]
  },
  {
    number: "05",
    title: "Advanced Mobility Equipment",
    description: "Professional tools for decompression, stretching, and stability.",
    icon: Zap,
    image: programAssistedStretch,
    overlayTitle: "Advanced Mobility Equipment",
    overlayDesc: "Utilizing professional medical-grade therapy tools for fast healing.",
    floatingPanels: ["Assisted Stretching", "Advanced Gear"]
  }
];

export function StudioWhyChoose() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const currentItem = showcaseItems[activeStep];

  return (
    <section 
      className="relative w-full border-t border-border/40 bg-white dark:bg-background py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(145,221,207,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Outer Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ====================================================
            DESKTOP LAYOUT (1024px and above)
            ==================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE (35% space) */}
          <div className="col-span-4 flex flex-col justify-center">
            <span className="brand-badge w-fit inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-secondary/50 dark:bg-elevated border border-border/60 mb-4">
              <Sparkles className="size-3.5 text-accent animate-pulse" />
              <span className="type-label font-bold uppercase tracking-[0.16em] text-foreground/80 sm:tracking-[0.2em] text-[9px]">
                STUDIO EXPERIENCE
              </span>
            </span>

            <h3 className="type-section font-black tracking-tight text-foreground leading-[1.1]">
              Built for Better<br />
              <span className="bg-gradient-to-r from-forest to-accent bg-clip-text text-transparent">
                Movement.
              </span>
            </h3>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-sm">
              Explore our purpose-built environments designed to bridge the gap between active clinical therapy and premium comfort.
            </p>

            {/* Interactive Vertical Timeline */}
            <div className="relative mt-8 flex flex-col gap-6 pl-6">
              {/* Timeline vertical connector line */}
              <div className="absolute left-[8px] top-4 bottom-4 w-[2px] bg-border/40 rounded-full" />
              
              {/* Progress Line */}
              <motion.div 
                className="absolute left-[8px] top-4 w-[2px] bg-accent rounded-full"
                animate={{
                  height: `${(activeStep / (showcaseItems.length - 1)) * 92}%`
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                style={{ transformOrigin: "top" }}
              />

              {showcaseItems.map((item, idx) => {
                const isActive = idx === activeStep;

                return (
                  <button
                    key={item.number}
                    onClick={() => setActiveStep(idx)}
                    className="group relative flex items-start text-left focus:outline-none"
                  >
                    {/* Circle Dot wrapper */}
                    <div className="absolute left-[-24px] top-1 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.25 : 0.8,
                          backgroundColor: isActive ? "var(--accent)" : "rgb(var(--color-background))"
                        }}
                        className={cn(
                          "size-3 rounded-full border-2 transition-colors duration-300 z-10",
                          isActive ? "border-accent shadow-[0_0_12px_rgba(145,221,207,0.7)]" : "border-muted-foreground/30"
                        )}
                      />
                    </div>

                    <div className="pl-3">
                      <span className={cn(
                        "type-label text-[10px] font-bold tracking-wider transition-colors duration-300",
                        isActive ? "text-forest" : "text-muted-foreground/60"
                      )}>
                        {item.number}
                      </span>
                      <h4 className={cn(
                        "text-[13px] font-bold leading-tight transition-colors duration-300 group-hover:text-forest",
                        isActive ? "text-foreground font-black" : "text-muted-foreground"
                      )}>
                        {item.title}
                      </h4>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-[11px] text-muted-foreground mt-1 leading-relaxed max-w-xs overflow-hidden"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE (65% space) */}
          <div className="col-span-8 flex flex-col gap-4 overflow-visible h-full justify-center">
            
            {/* Massive Showcase Image Container */}
            <div className="relative w-full aspect-[16/10] rounded-[32px] overflow-hidden border border-white/20 dark:border-white/10 shadow-card bg-card">
              
              {/* Crossfading Images */}
              {showcaseItems.map((item, idx) => (
                <img
                  key={item.number}
                  src={item.image}
                  alt={item.title}
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-all duration-1000 ease-out",
                    idx === activeStep ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                  )}
                />
              ))}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Bottom Left Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="text-xl font-bold tracking-tight text-white mb-1.5">
                      {currentItem.overlayTitle}
                    </h4>
                    <p className="text-xs text-white/70 max-w-lg leading-relaxed font-medium">
                      {currentItem.overlayDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Gently Floating Glass Cards */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {currentItem.floatingPanels.map((label, idx) => {
                  const offsets = [
                    "top-[12%] left-[8%]",
                    "top-[15%] right-[10%]",
                    "bottom-[22%] right-[8%]"
                  ];
                  const animationDurations = [4, 4.5, 3.8];
                  
                  return (
                    <motion.div
                      key={label}
                      animate={{ y: [-5, 5, -5] }}
                      transition={{
                        duration: animationDurations[idx % animationDurations.length],
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.4
                      }}
                      className={cn(
                        "absolute z-20 pointer-events-auto",
                        offsets[idx % offsets.length]
                      )}
                    >
                      <div className="backdrop-blur-md bg-white/40 dark:bg-[var(--glass-bg)] border border-white/25 dark:border-white/10 rounded-2xl px-4 py-2 text-[10px] sm:text-xs font-bold text-foreground sm:text-white flex items-center gap-1.5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
                        <Check className="size-3.5 text-forest sm:text-accent shrink-0" strokeWidth={2.8} />
                        {label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Image Filmstrip */}
            <div className="flex items-center gap-3 mt-2 select-none justify-center">
              {showcaseItems.map((item, idx) => (
                <button
                  key={item.number}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "relative aspect-[16/10] w-[90px] rounded-xl overflow-hidden cursor-pointer transition-all border-2 duration-300",
                    idx === activeStep 
                      ? "border-accent scale-105 shadow-[0_0_12px_rgba(145,221,207,0.4)]" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]"
                  )}
                >
                  <img src={item.image} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ====================================================
            TABLET / MOBILE LAYOUT (Below 1024px)
            ==================================================== */}
        <div className="lg:hidden w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="brand-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-secondary/50 dark:bg-elevated border border-border/60">
              <Sparkles className="size-3.5 text-accent animate-pulse" />
              <span className="type-label font-bold uppercase tracking-[0.16em] text-foreground/80 text-[9px]">
                STUDIO EXPERIENCE
              </span>
            </span>
            <h3 className="mt-3 font-bold tracking-tight text-foreground type-section text-center leading-tight">
              Built for Better <span className="bg-gradient-to-r from-forest to-accent bg-clip-text text-transparent">Movement.</span>
            </h3>
            <p className="mx-auto mt-2 text-xs text-muted-foreground leading-relaxed max-w-md">
              Explore our purpose-built environments designed to bridge the gap between active clinical therapy and premium comfort.
            </p>
          </div>

          {/* Swipeable Showcase Card */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden border border-border shadow-soft bg-card max-w-2xl mx-auto">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="size-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Overlay text */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h4 className="text-base font-bold text-white mb-1">
                {currentItem.overlayTitle}
              </h4>
              <p className="text-[10px] text-white/70 leading-relaxed font-medium">
                {currentItem.overlayDesc}
              </p>
            </div>

            {/* Mini navigation arrows */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 z-20">
              <button
                onClick={prevStep}
                className="size-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
              >
                <ChevronLeft className="size-4.5" />
              </button>
              <button
                onClick={nextStep}
                className="size-8 rounded-full bg-black/45 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
              >
                <ChevronRight className="size-4.5" />
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Feature Chips Slider */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none snap-x snap-mandatory justify-start max-w-2xl mx-auto">
            {showcaseItems.map((item, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={item.number}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "snap-center shrink-0 rounded-full px-4 py-2 border text-[11px] font-bold shadow-sm transition-all duration-300",
                    isActive 
                      ? "bg-accent/25 border-accent text-forest" 
                      : "bg-card border-border text-muted-foreground"
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
