import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { Journey } from "@/components/sections/Journey";
import { Assessment } from "@/components/sections/Assessment";
import { Exercises } from "@/components/sections/Exercises";
import { Experts } from "@/components/sections/Experts";
import { Progress } from "@/components/sections/Progress";
import { Locations } from "@/components/sections/Locations";
import { FinalCta } from "@/components/sections/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhysioFlex Studio — Move Better. Feel Better." },
      {
        name: "description",
        content:
          "Physiotherapist-led assisted stretching and mobility studio focused on pain relief, posture correction, and mobility improvement.",
      },
      { property: "og:title", content: "PhysioFlex Studio — Move Better. Feel Better." },
      {
        property: "og:description",
        content:
          "A physiotherapist-supervised studio delivering clinical assessment, assisted stretching, and measurable mobility gains.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Journey />
        <Assessment />
        <Exercises />
        <Experts />
        <Progress />
        <Locations />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
