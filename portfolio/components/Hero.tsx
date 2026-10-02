import { Fragment } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

const facts = [`${profile.years} yrs experience`, "12 personal projects", "MERN · Next.js · Solana/Anchor", "Pakistan · remote-ready"];

const HEADLINE: { t: string; em?: boolean; end?: string }[] = [
  { t: "I" }, { t: "design" }, { t: "and" }, { t: "ship" }, { t: "full-stack" }, { t: "products" }, { t: "from" },
  { t: "API" }, { t: "to" }, { t: "UI" }, { t: "with" }, { t: "clarity", em: true, end: "." },
];

export function Hero() {
  return (
    <section id="top" className="relative z-10 pt-14 md:pt-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="label">Full Stack Engineer · {profile.years} years</p>
          <h1 className="display-xl mt-5" aria-label="I build fast web apps and on-chain products, from MongoDB to Solana.">
            {HEADLINE.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
                  <span data-hero-word className="inline-block">
                    {w.em ? <em>{w.t}</em> : w.t}
                    {w.end ?? ""}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="mt-6 max-w-[520px] text-lg text-ink-2">I build product experiences end to end: database design, backend APIs, UI flow, deployment thinking, and real product polish — with a strong focus on clean architecture and honest delivery.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              View my work
            </a>
            <a href={profile.cv} className="btn">
              Download CV
            </a>
            <a href={profile.whatsapp} className="btn" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              Email me
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          {/* Phase 3 replaces this static orb with the R3F particle sphere */}
          <div className="absolute inset-[4%] rounded-full border border-dashed border-accent/30" />
          <div
            className="orb-static absolute inset-[10%] rounded-full opacity-80"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--violet) 70%, transparent) 1.2px, transparent 1.7px) 0 0/13px 13px",
              WebkitMask: "radial-gradient(circle,#000 60%,transparent 61%)",
              mask: "radial-gradient(circle,#000 60%,transparent 61%)",
            }}
          />
          <div className="orb-static absolute inset-[10%] rounded-full" style={{ background: "radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 60%)" }} />
          <Image
            src="/images/profile/waleed-hero.webp"
            alt="Portrait of Waleed Ilyas"
            width={609}
            height={1064}
            priority
            sizes="(max-width:1024px) 60vw, 300px"
            className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2 object-contain"
            style={{ WebkitMask: "linear-gradient(#000 82%, transparent)", mask: "linear-gradient(#000 82%, transparent)" }}
          />
        </div>
      </div>
      <div className="mt-14 border-y border-line bg-surface">
        <ul className="wrap label flex flex-wrap gap-x-10 gap-y-2 py-5">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
