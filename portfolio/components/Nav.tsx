"use client";
import { useState, useSyncExternalStore } from "react";
import { getMotion, getServerMotion, setMotion, subscribeMotion } from "@/lib/motion";
import { profile } from "@/content/profile";

const links = [
  ["Work", "#work"],
  ["Recruiters", "/recruiters"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const motion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  const toggleTheme = () => {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-6">
        <a href="#top" className="font-display text-2xl italic">
          {profile.name}
        </a>
        <nav aria-label="Primary" className="ml-auto hidden gap-7 text-sm text-ink-2 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-ink">
              {l}
            </a>
          ))}
        </nav>
        <span className="hidden items-center gap-2 text-[13px] text-ink-2 lg:flex">
          <span className="dot" />
          Available for remote roles
        </span>
        <button onClick={() => setMotion(!motion)} aria-pressed={motion} className="label hidden min-h-11 items-center rounded-full border border-line px-3 hover:text-ink lg:flex">
          Motion: {motion ? "on" : "off"}
        </button>
        <button onClick={toggleTheme} aria-label="Toggle light and dark theme" className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-2 hover:text-ink md:flex">
          ◐
        </button>
        <a href="#contact" className="btn btn-primary ml-auto md:ml-0">
          Hire me
        </a>
        <button className="btn px-4 md:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mnav" aria-label="Mobile" className="border-t border-line bg-bg md:hidden">
          <div className="wrap grid py-2">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line text-ink-2">
                {l}
              </a>
            ))}
            <button onClick={() => setMotion(!motion)} aria-pressed={motion} className="label flex min-h-12 items-center text-left">
              Motion: {motion ? "on" : "off"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
