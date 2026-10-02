import { stack } from "@/content/stack";
import { Reveal } from "./Reveal";

export function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <Reveal>
          <p className="label">Stack</p>
          <h2 className="display-l mt-3">What I reach for, grouped by the job it does.</h2>
        </Reveal>
        <dl className="mt-12 border-t border-line">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-3 border-b border-line py-6 md:grid-cols-[220px_1fr] md:gap-8">
              <dt className="label pt-1">{g.group}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
                {g.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
