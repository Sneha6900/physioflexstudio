import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";
import { applyTheme, resolveTheme } from "@/lib/theme";

type ThemeContextValue = ReturnType<typeof useTheme>;

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useTheme();

  useEffect(() => {
    applyTheme(resolveTheme());
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
