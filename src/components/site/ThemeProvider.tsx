import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";
import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

type ThemeContextValue = ReturnType<typeof useTheme>;

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useTheme();

  useEffect(() => {
    applyTheme(resolveTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!getStoredTheme()) {
        const next: Theme = media.matches ? "dark" : "light";
        applyTheme(next);
        window.dispatchEvent(new Event("physioflex-theme-change"));
      }
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return ctx;
}
