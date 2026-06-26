import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "Twitter", icon: Twitter },
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
            <Icon className="size-5" strokeWidth={1.75} />
          </button>
        ))}
      </div>
    </div>
  );
}
