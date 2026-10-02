"use client";

import { useEffect, useMemo, useState } from "react";

const items = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Recruiter quick view", href: "/recruiters" },
  { label: "Download CV", href: "/Waleed-Ilyas-CV.pdf" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if ((isMeta && event.key.toLowerCase() === "k") || (event.altKey && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    window.location.assign(href);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open command palette"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-50 hidden h-11 items-center gap-2 rounded-full border border-line bg-surface/80 px-3 text-sm text-ink-2 shadow-sm backdrop-blur md:inline-flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 p-4 pt-20 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-2xl rounded-[24px] border border-line bg-surface p-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-line px-3 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Search</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump to a section"
                className="w-full border-none bg-transparent text-base text-ink placeholder:text-ink-3 focus:outline-none"
              />
            </div>
            <div className="max-h-[420px] overflow-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-5 text-sm text-ink-2">No matches found.</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item.href)}
                    className="flex w-full items-center justify-between gap-4 rounded-[12px] px-3 py-3 text-left transition-colors hover:bg-elevated"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">{item.href.startsWith("#") ? "section" : "page"}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
