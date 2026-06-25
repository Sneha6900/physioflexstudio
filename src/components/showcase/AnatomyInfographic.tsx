import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import anatomyLight from "@/assets/Anatomy.png";
import anatomyDark from "@/assets/Darkmodeanatomy.png";
import { useTheme } from "@/hooks/use-theme";
import type { Theme } from "@/lib/theme";

const ALT_TEXT =
  "Medical infographic showing front and back human anatomy with three highlighted pain regions, demonstrating how the PhysioFlex app maps areas of discomfort during clinical assessment";

const ANATOMY_BY_THEME: Record<Theme, { src: string; width: number; height: number }> = {
  light: { src: anatomyLight, width: 640, height: 800 },
  dark: { src: anatomyDark, width: 640, height: 800 },
};

const THEME_CROSSFADE_S = 0.3;

function preloadAnatomy(src: string) {
  const img = new Image();
  img.src = src;
}

/**
 * Static product infographic — single image per theme, no overlays or interaction.
 */
export function AnatomyInfographic() {
  const { theme } = useTheme();
  const { src, width, height } = ANATOMY_BY_THEME[theme];

  useEffect(() => {
    const alternate = theme === "light" ? ANATOMY_BY_THEME.dark.src : ANATOMY_BY_THEME.light.src;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => preloadAnatomy(alternate));
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(() => preloadAnatomy(alternate), 400);
    return () => window.clearTimeout(timer);
  }, [theme]);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="app-journey-anatomy-card"
      aria-label="PhysioFlex mobile app pain assessment anatomy infographic"
    >
      <div className="app-journey-anatomy-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={theme}
            src={src}
            alt={ALT_TEXT}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="app-journey-anatomy-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: THEME_CROSSFADE_S, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
    </motion.figure>
  );
}
