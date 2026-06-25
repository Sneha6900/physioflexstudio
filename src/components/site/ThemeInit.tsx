import { useEffect } from "react";
import { applyTheme, resolveTheme } from "@/lib/theme";

/** Syncs React tree with theme after hydration (inline script handles first paint). */
export function ThemeInit() {
  useEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  return null;
}
