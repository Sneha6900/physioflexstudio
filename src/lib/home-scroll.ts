const STORAGE_KEY = "physioflex-home-scroll";

export type HomeSection = "how-it-works" | "journey" | "exercises" | "experts" | "locations" | "booking";

type ScrollState = {
  y?: number;
  section?: HomeSection | null;
};

function read(): ScrollState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ScrollState;
  } catch {
    return null;
  }
}

function write(state: ScrollState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/** Call when navigating away from the homepage (e.g. Explore Programs). */
export function saveHomeScroll(section?: HomeSection) {
  write({
    y: window.scrollY,
    section: section ?? null,
  });
}

/** Call when breadcrumb/link intends to return to a homepage section. */
export function prepareHomeScroll(section?: HomeSection) {
  write({ section: section ?? null });
}

export function restoreHomeScroll() {
  const state = read();
  if (!state) return;

  sessionStorage.removeItem(STORAGE_KEY);

  const scrollToSection = () => {
    if (state.section) {
      const el = document.getElementById(state.section);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return true;
      }
    }
    if (typeof state.y === "number") {
      window.scrollTo({ top: state.y, behavior: "auto" });
      return true;
    }
    return false;
  };

  requestAnimationFrame(() => {
    if (!scrollToSection()) {
      requestAnimationFrame(scrollToSection);
    }
  });
}
