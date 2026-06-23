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
import { Testimonials } from "@/components/sections/Testimonials";
import { Locations } from "@/components/sections/Locations";
import { FinalCta } from "@/components/sections/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhysioFlex Studio — Move Better. Recover Faster." },
      {
        name: "description",
        content:
          "AI-powered mobility assessment, personalized recovery plans, guided exercises, expert-assisted sessions, and measurable progress tracking.",
      },
      { property: "og:title", content: "PhysioFlex Studio — Move Better. Recover Faster." },
      {
        property: "og:description",
        content:
          "An AI-powered mobility and recovery ecosystem combining intelligent pain assessment, personalized exercises, and expert-assisted recovery.",
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
        <Testimonials />
        <Locations />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
