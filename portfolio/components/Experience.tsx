import { experience } from "@/content/experience";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="section border-y border-line bg-surface">
      <div className="wrap">
        <Reveal>
          <p className="label">Experience</p>
          <h2 className="display-l mt-3">Two teams, one direction: <em>full stack</em>, closer to the chain.</h2>
        </Reveal>
        <ol id="experience-list" className="relative mt-14 ml-2 grid gap-14 border-l border-line pl-6 sm:pl-10">
          <span data-timeline-line aria-hidden className="absolute -left-px top-0 h-full w-px bg-accent" />
          {experience.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[47px]" aria-hidden />
              <Reveal>
                <p className="label">{e.period}</p>
                <h3 className="mt-2 font-display text-[clamp(26px,3vw,36px)] leading-tight">{e.company}</h3>
                <p className="mt-1 text-ink-2">{e.role}</p>
                <ul className="mt-5 grid max-w-[720px] gap-3 text-[15px] text-ink-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-line-strong">
                      {b}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
