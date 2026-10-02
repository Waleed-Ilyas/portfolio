import Image from "next/image";
import { principles, profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section border-t border-line bg-surface">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Reveal>
          <Image src="/images/profile/waleed-card.webp" alt="Waleed Ilyas, full stack engineer" width={800} height={800} sizes="(max-width:1024px) 90vw, 420px" className="w-full max-w-[420px] rounded-[14px] border border-line" />
        </Reveal>
        <div>
          <Reveal>
            <p className="label">About</p>
            <h2 className="display-l mt-3">Based in Pakistan, <em>working your hours</em>.</h2>
            {profile.aboutLine && <p className="mt-5 max-w-[560px] text-lg text-ink-2">{profile.aboutLine}</p>}
            <p className="mt-5 max-w-[560px] text-ink-2">I work UTC+5 with a 4 to 6 hour overlap with Europe, and I am flexible for US teams. Open to full-time, contract and freelance work, remote worldwide.</p>
          </Reveal>
          <ol className="mt-10 grid gap-0 border-t border-line">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[48px_1fr]">
                <span className="label pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-2">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
