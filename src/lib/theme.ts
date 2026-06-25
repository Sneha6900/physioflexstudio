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

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Stored preference wins; otherwise follow system preference. */
export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document.documentElement.dataset.theme = theme;
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearStoredTheme() {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function enableThemeTransition() {
  document.documentElement.classList.add("theme-transitioning");
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 320);
}
