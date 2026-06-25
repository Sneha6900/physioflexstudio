import { Link, type LinkProps } from "@tanstack/react-router";
import { saveHomeScroll, type HomeSection } from "@/lib/home-scroll";

type LeavingHomeLinkProps = LinkProps & {
  homeSection?: HomeSection;
};

export function LeavingHomeLink({ homeSection, onClick, ...props }: LeavingHomeLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          saveHomeScroll(homeSection);
        }
        onClick?.(e);
      }}
    />
  );
}
