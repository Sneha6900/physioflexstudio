import { Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "X", icon: XIcon },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Instagram", icon: Instagram },
] as const;

type FooterFollowUsProps = {
  className?: string;
};

export function FooterFollowUs({ className }: FooterFollowUsProps) {
  return (
    <div className={cn("footer-follow min-w-0 text-center md:text-left", className)}>
      <h4 className="type-label font-semibold text-foreground">Follow Us</h4>

      <div className="footer-social-row mt-3 flex flex-nowrap items-center justify-center gap-5 md:justify-start">
        {socials.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            aria-disabled="true"
            tabIndex={-1}
            aria-label={label}
            className="footer-social-btn"
          >
            <Icon className="size-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
