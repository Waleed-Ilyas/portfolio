import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { MotionRig } from "@/components/MotionRig";
import { MobileBar } from "@/components/MobileBar";
import { CommandPalette } from "@/components/CommandPalette";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <MotionRig />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-line pb-24 pt-10 md:pb-10">
        <div className="wrap flex flex-wrap justify-between gap-4 text-[13px] text-ink-3">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
      <MobileBar />
    </>
  );
}
