import Link from "next/link";
import { profile } from "@/content/profile";

const highlights = [
  "Full stack engineer with 3+ years building production web apps and APIs.",
  "Core stack: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Solana web3.js and Anchor.",
  "Remote-ready across time zones, with hands-on experience shipping features from schema to deployed UI.",
];

const stacks = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind", "Solana", "Anchor", "Stripe", "Cloudinary"];

export default function RecruitersPage() {
  return (
    <main className="wrap py-12 md:py-20">
      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/" className="btn">Back home</Link>
        <a href={profile.cv} className="btn btn-primary">Download CV</a>
        <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn">WhatsApp</a>
      </div>

      <section className="rounded-[28px] border border-line bg-surface/80 p-6 sm:p-10">
        <p className="label">Recruiter quick view</p>
        <h1 className="display-l mt-3">Waleed Ilyas</h1>
        <p className="mt-3 text-xl text-ink-2">Full Stack Engineer · MERN · Next.js · Solana</p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink-2">
          <span className="badge-status">Remote-ready</span>
          <span className="badge-status">Pakistan (PKT, UTC+5)</span>
          <span className="badge-status">3+ years</span>
        </div>

        <p className="mt-8 max-w-3xl text-base text-ink-2">
          I build web application features end to end, from schema and APIs to production UI and deployment. I work comfortably across the full stack and can take a product from concept to release while keeping performance, clarity, and reliability in view.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[20px] border border-line bg-elevated p-6">
            <p className="label">What I build</p>
            <ul className="mt-4 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-ink-2">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border border-line bg-elevated p-6">
            <p className="label">Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stacks.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[28px] border border-line bg-surface/80 p-6 sm:p-8">
        <p className="label">Experience snapshot</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[18px] border border-line p-5">
            <h2 className="text-xl font-semibold">Buggcy</h2>
            <p className="mt-1 label text-ink-2">Full Stack Developer · 2024 → 2026</p>
            <p className="mt-3 text-ink-2">Built MERN and Next.js products with JWT auth, Stripe, Cloudinary, and Solana wallet features in production.</p>
          </div>
          <div className="rounded-[18px] border border-line p-5">
            <h2 className="text-xl font-semibold">Invex Tech</h2>
            <p className="mt-1 label text-ink-2">MERN Stack Developer · 2022 → 2024</p>
            <p className="mt-3 text-ink-2">Delivered responsive React interfaces and CRUD driven dashboards with Express, MongoDB, and Tailwind.</p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn btn-primary">Email me</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub</a>
      </div>
    </main>
  );
}
