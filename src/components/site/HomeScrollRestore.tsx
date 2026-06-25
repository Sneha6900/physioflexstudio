import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { restoreHomeScroll } from "@/lib/home-scroll";

export function HomeScrollRestore() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (pathname === "/") {
      restoreHomeScroll();
    }
  }, [pathname]);

  return null;
}
