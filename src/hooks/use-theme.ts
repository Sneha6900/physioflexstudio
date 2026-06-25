import { useCallback, useSyncExternalStore } from "react";
import {
  applyTheme,
  enableThemeTransition,
  persistTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("physioflex-theme-change", handler);
  return () => window.removeEventListener("physioflex-theme-change", handler);
}

function getSnapshot(): Theme {
  return resolveTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

function notify() {
  window.dispatchEvent(new Event("physioflex-theme-change"));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    persistTheme(next);
    enableThemeTransition();
    notify();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return { theme, setTheme, toggleTheme };
}
