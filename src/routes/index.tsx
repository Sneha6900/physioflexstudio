import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { HomeScrollRestore } from "@/components/site/HomeScrollRestore";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Journey } from "@/components/sections/Journey";
import { Assessment } from "@/components/sections/Assessment";
import { MotusAI } from "@/components/sections/MotusAI";
import { Exercises } from "@/components/sections/Exercises";
import { Experts } from "@/components/sections/Experts";
import { Locations } from "@/components/sections/Locations";
import { FinalCta } from "@/components/sections/FinalCta";
import heroBg from "@/assets/hero-physio-clinic.webp";
import motusMascot from "@/assets/motus-mascot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhysioFlex Studio — Move Better, Feel Better" },
      {
        name: "description",
        content:
          "Professional physiotherapy for everyone. Relief, assisted stretching, posture correction, and mobility — designed for neck, back, and joint stiffness.",
      },
      { property: "og:title", content: "PhysioFlex Studio — Move Better, Feel Better" },
      {
        property: "og:description",
        content:
          "A trusted mobility studio helping people of all ages move confidently again with licensed physiotherapists and evidence-based treatment.",
      },
    ],
    links: [{ rel: "preload", as: "image", href: heroBg, type: "image/webp" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <HomeScrollRestore />
      <Nav hero />
      <main>
        <Hero />
        <HowItWorks />
        <Journey />
        <Assessment />
        <MotusAI />
        <Exercises />
        <Experts />
        <Locations />
        <FinalCta />
      </main>
      <Footer />
      
      {/* Floating Motus AI Button */}
      <button
        onClick={() => {
          document.getElementById("motus-ai")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-110 hover:shadow-accent/20 transition-all duration-300 overflow-hidden"
        aria-label="Navigate to Motus AI"
      >
        <img
          src={motusMascot}
          alt="Motus AI"
          className="h-10 w-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
      </button>
    </div>
  );
}
