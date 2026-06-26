function StoreBadge({
  src,
  alt,
  store,
}: {
  src: string;
  alt: string;
  store: "google" | "apple";
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`footer-download-badge-slot footer-download-badge-slot--${store}`}
    >
      <img src={src} alt="" draggable={false} decoding="async" />
    </div>
  );
}

export function FooterDownload() {
  return (
    <div className="footer-download mt-6 sm:mt-8">
      <h3 className="type-label font-semibold text-foreground">Download the App</h3>

      <div className="footer-download-badges mt-3">
        <StoreBadge store="google" src="/badges/google-play.png" alt="Get it on Google Play" />
        <StoreBadge store="apple" src="/badges/app-store.svg" alt="Download on the App Store" />
      </div>
    </div>
  );
}
