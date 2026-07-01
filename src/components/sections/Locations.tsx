import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MapPin, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { StudioWhyChoose } from "@/components/sections/StudioWhyChoose";
import { Button } from "@/components/ui/button";
import { studios, type Studio } from "@/lib/studios";
import { cn } from "@/lib/utils";

function badgeStyle(badge: Studio["badge"]) {
  switch (badge) {
    case "Most Popular":
      return "bg-accent text-accent-foreground";
    case "Premium Studio":
      return "bg-brand-lilac text-foreground";
    case "Best Rated":
      return "bg-brand-pink/90 text-foreground";
    case "New Location":
      return "bg-foreground text-background";
    default:
      return "bg-secondary text-foreground";
  }
}

export function Locations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  // Sync window width for responsive 3D offsets
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % studios.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + studios.length) % studios.length);
  };

  // Drag handler for mobile swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  // Calculate offsets based on screen width
  const getCardTransform = (index: number) => {
    let offset = index - currentIndex;

    // Wrap circular indices for 3 items
    if (offset < -1) offset += 3;
    if (offset > 1) offset -= 3;

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    if (offset === 0) {
      // Active center card
      return {
        x: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        rotateY: 0,
        pointerEvents: "auto" as const,
      };
    } else if (offset === -1) {
      // Left stacked card
      return {
        x: isMobile ? -60 : isTablet ? -130 : -220,
        scale: 0.9,
        zIndex: 10,
        opacity: isMobile ? 0 : isTablet ? 0.35 : 0.5,
        rotateY: isMobile ? 0 : 8,
        pointerEvents: "none" as const,
      };
    } else {
      // Right stacked card
      return {
        x: isMobile ? 60 : isTablet ? 130 : 220,
        scale: 0.9,
        zIndex: 10,
        opacity: isMobile ? 0 : isTablet ? 0.35 : 0.5,
        rotateY: isMobile ? 0 : -8,
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <section id="locations" className="bg-secondary/30 relative overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Background radial highlight */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#e8c5e5]/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 mb-12">
        <Reveal>
          <span className="type-label inline-flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-primary">
            <MapPin className="size-3.5" />
            Premium recovery studios
          </span>
          <h2 className="type-section mt-3 max-w-2xl text-balance text-foreground font-bold tracking-tight">
            Find A PhysioFlex Studio Near You
          </h2>
          <p className="type-body mt-2 max-w-xl text-muted-foreground leading-relaxed">
            Premium physiotherapy and rehabilitation environments — designed for comfort, movement, and healing.
          </p>
        </Reveal>
      </div>

      {/* 3D CAROUSEL CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto px-4 flex items-center justify-center overflow-visible select-none h-[500px]">
        {/* Navigation Left Arrow (Desktop/Tablet only) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 z-40 size-11 rounded-full border border-white/20 dark:border-white/10 bg-white/60 dark:bg-[var(--glass-bg)] backdrop-blur-md shadow-soft hover:shadow-card hover:bg-accent hover:text-accent-foreground text-foreground flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Previous studio"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Carousel Stack */}
        <div className="relative w-[310px] sm:w-[350px] h-[450px] flex items-center justify-center [perspective:1200px]">
          {studios.map((studio, idx) => {
            const transformProps = getCardTransform(idx);
            const isActive = idx === currentIndex;

            return (
              <motion.article
                key={studio.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                animate={transformProps}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-soft transition-shadow duration-500 flex-1",
                  isActive ? "hover:shadow-card hover:-translate-y-1" : ""
                )}
              >
                {/* Image Section (45-50% height) */}
                <div className="relative h-[48%] overflow-hidden rounded-t-[24px]">
                  <img
                    src={studio.image}
                    alt={`${studio.name} interior`}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  
                  {/* Badges Overlaid on Image */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2 pointer-events-none">
                    {studio.badge && (
                      <span className={cn(
                        "type-label rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-sm",
                        badgeStyle(studio.badge)
                      )}>
                        {studio.badge}
                      </span>
                    )}
                    <span className="type-label flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                      <Star className="size-3 fill-accent text-accent" />
                      {studio.rating}
                    </span>
                  </div>

                  <span className="type-label absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/45 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    {studio.availability}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-card min-w-0">
                  <div>
                    <h3 className="type-card-title text-foreground font-bold truncate leading-tight">
                      {studio.name}
                    </h3>
                    <p className="type-caption mt-1 flex items-center gap-1 font-bold text-forest">
                      <MapPin className="size-3" />
                      {studio.distance} · {studio.travelTime}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate mt-1">
                      {studio.address.split(",").slice(0, 2).join(",")}
                    </p>
                  </div>

                  {/* Highlights (max 2-3 feature chips) */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {studio.highlights.slice(0, 2).map((h) => (
                      <span
                        key={h}
                        className="type-badge inline-flex items-center gap-0.5 rounded-full bg-accent/12 px-2.5 py-0.5 text-[9px] font-bold text-forest"
                      >
                        <Check className="size-2.5 shrink-0" strokeWidth={3} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Book session primary CTA button */}
                  <div className="mt-4 pt-1">
                    <Button
                      type="button"
                      aria-disabled="true"
                      tabIndex={-1}
                      className="type-button h-10 w-full cursor-default rounded-full bg-accent text-[11px] font-bold text-accent-foreground shadow-sm hover:bg-accent/90 transition-all"
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Navigation Right Arrow (Desktop/Tablet only) */}
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 z-40 size-11 rounded-full border border-white/20 dark:border-white/10 bg-white/60 dark:bg-[var(--glass-bg)] backdrop-blur-md shadow-soft hover:shadow-card hover:bg-accent hover:text-accent-foreground text-foreground flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Next studio"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Slide pagination dots */}
      <div className="flex justify-center gap-2 mt-4 select-none">
        {studios.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex ? "w-4 bg-accent" : "w-1.5 bg-border/80 dark:bg-white/10"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Why Choose Our Studios Bento Grid */}
      <div className="mx-auto w-full max-w-7xl">
        <StudioWhyChoose />
      </div>
    </section>
  );
}
