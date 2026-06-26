import { cn } from "@/lib/utils";

type DownloadAppButtonProps = {
  className?: string;
  /** Full-width layout for mobile menu */
  fullWidth?: boolean;
  /** Frosted glass over cinematic hero nav */
  onHero?: boolean;
};

export function DownloadAppButton({ className, fullWidth, onHero }: DownloadAppButtonProps) {
  return (
    <button
      type="button"
      aria-disabled="true"
      tabIndex={-1}
      className={cn(
        "download-app-btn",
        onHero && "download-app-btn--hero",
        fullWidth && "download-app-btn--full",
        className,
      )}
    >
      Download App
    </button>
  );
}
