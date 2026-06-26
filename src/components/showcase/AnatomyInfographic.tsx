import { useEffect } from "react";
import anatomyLight from "@/assets/Anatomy.png";
import anatomyDark from "@/assets/Darkmodeanatomy.png";
import { Reveal } from "@/components/site/Reveal";
import { useTheme } from "@/hooks/use-theme";
import type { Theme } from "@/lib/theme";

const ALT_TEXT =
  "Medical infographic showing front and back human anatomy with three highlighted pain regions, demonstrating how the PhysioFlex app maps areas of discomfort during clinical assessment";

const ANATOMY_BY_THEME: Record<Theme, { src: string; width: number; height: number }> = {
  light: { src: anatomyLight, width: 640, height: 800 },
  dark: { src: anatomyDark, width: 640, height: 800 },
};

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
    const alternate =
      theme === "light" ? ANATOMY_BY_THEME.dark.src : ANATOMY_BY_THEME.light.src;
    const onThemeChange = () => preloadAnatomy(alternate);
    window.addEventListener("physioflex-theme-change", onThemeChange);
    return () => window.removeEventListener("physioflex-theme-change", onThemeChange);
  }, [theme]);

  return (
    <Reveal as="div">
      <figure
        className="app-journey-anatomy-card"
        aria-label="PhysioFlex mobile app pain assessment anatomy infographic"
      >
        <div className="app-journey-anatomy-stage">
          <img
            key={theme}
            src={src}
            alt={ALT_TEXT}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="app-journey-anatomy-img"
          />
        </div>
      </figure>
    </Reveal>
  );
}
