"use client";
import { useState } from "react";
import Image from "next/image";
import { categories, projects, type Project } from "@/content/projects";
import { Reveal } from "./Reveal";

function Card({ p, large }: { p: Project; large?: boolean }) {
  const inProgress = p.status !== "live";
  return (
    <article className={`flex h-full flex-col rounded-[14px] border border-line bg-surface/85 p-6 transition-colors hover:border-line-strong ${large ? "lg:col-span-1" : ""}`}>
      <div
        className={`relative mb-5 overflow-hidden rounded-[10px] border border-line bg-elevated ${large ? "aspect-[16/10]" : "aspect-[16/8]"}`}
        {...(p.image ? {} : { role: "img", "aria-label": `${p.title} preview, screenshot coming when the project ships` })}
      >
        {p.image ? (
          <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(max-width:1024px) 100vw, 380px" className="object-cover object-top" />
        ) : (
          <>
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 17px, var(--border) 17px 18px)" }} />
            <span className="label absolute bottom-3 left-3">Project {String(p.n).padStart(2, "0")}</span>
          </>
        )}
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="badge-status">{inProgress ? "In progress" : "Live"}</span>
        {p.devnet && <span className="badge-devnet">Devnet</span>}
        <span className="badge-status !border-solid">Personal project</span>
      </div>
      <h3 className="font-display text-[28px] leading-tight">{p.title}</h3>
      <p className="mt-2 text-[15px] text-ink-2">{p.problem}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-6 text-sm">
        {p.liveUrl ? (
          <a className="btn" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
            Live
          </a>
        ) : (
          <span className="label self-center">Live link at launch</span>
        )}
        {p.repoUrl && (
          <a className="btn" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
            Code
          </a>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  const featured = cat === "All" ? list.filter((p) => p.featured) : [];
  const rest = cat === "All" ? list.filter((p) => !p.featured) : list;
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal>
          <p className="label">Selected work</p>
          <h2 className="display-l mt-3 max-w-[18ch]">Twelve personal projects, each one built to be cloned and run.</h2>
          <p className="mt-4 max-w-[560px] text-ink-2">Solana projects run on devnet only. Live links and case studies appear here as each one ships.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`min-h-11 rounded-full border px-5 text-sm transition-colors ${cat === c ? "border-accent bg-elevated text-ink" : "border-line text-ink-2 hover:text-ink"}`}>
              {c}
            </button>
          ))}
        </div>
        {featured.length > 0 && (
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {featured.map((p) => (
              <Card key={p.slug} p={p} large />
            ))}
          </div>
        )}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
