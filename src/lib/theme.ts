export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "physioflex-theme";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

/** First visit defaults to light; only stored preference overrides. */
export function resolveTheme(): Theme {
  return getStoredTheme() ?? "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
}

export function enableThemeTransition() {
  document.documentElement.classList.add("theme-transitioning");
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 400);
}
