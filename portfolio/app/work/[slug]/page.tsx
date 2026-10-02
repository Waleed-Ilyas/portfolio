import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import Link from "next/link";
import Image from "next/image";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study | Waleed Ilyas`,
    description: project.problem,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  let Content;
  try {
    Content = (await import(`@/content/case-studies/${slug}.mdx`)).default;
  } catch {
    // If the MDX file isn't created yet, fallback
    Content = function ComingSoon() {
      return (
        <div className="py-20 text-center">
          <h2 className="text-xl">Case study coming soon</h2>
          <p className="mt-2 text-ink-2">This project case study is currently being written.</p>
        </div>
      );
    };
  }

  // Find prev/next projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <main className="pb-32 pt-24">
      <article className="wrap max-w-[800px]">
        <header className="mb-16">
          <Link href="/#work" className="btn mb-8 inline-flex">
            ← Back to Work
          </Link>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {project.devnet && <span className="badge-devnet">Devnet</span>}
            <span className="badge-status !border-solid">{project.category}</span>
            <div className="flex gap-2">
              {project.stack.slice(0, 4).map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <h1 className="display-xl">{project.title}</h1>
          <p className="mt-4 text-xl text-ink-2">{project.problem}</p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Live Site
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn">
                View Source Code
              </a>
            )}
          </div>
        </header>

        {project.image && (
          <figure className="mb-16 overflow-hidden rounded-[14px] border border-line bg-elevated shadow-lg">
            <div className="aspect-[16/10] relative">
              <Image 
                src={project.image} 
                alt={`${project.title} screenshot`} 
                fill 
                sizes="(max-width: 800px) 100vw, 800px" 
                className="object-cover object-top"
                priority
              />
            </div>
          </figure>
        )}

        <div className="prose prose-invert prose-p:text-ink-2 prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-accent/80 prose-hr:border-line max-w-none">
          <Content />
        </div>
        
        <hr className="my-16 border-line" />
        
        <div className="rounded-[14px] border border-line bg-surface/85 p-8 text-center">
          <h3 className="font-display text-3xl">Want this for your team?</h3>
          <p className="mt-4 text-ink-2">I am currently available for remote full-stack roles.</p>
          <a href="mailto:waleedilyas99@gmail.com" className="btn btn-primary mt-6">
            Let&apos;s talk
          </a>
        </div>
      </article>

      <div className="wrap mt-16 max-w-[800px]">
        <nav className="flex items-center justify-between border-t border-line pt-8">
          <Link href={`/work/${prevProject.slug}`} className="group max-w-[45%]">
            <span className="label block mb-2 text-ink-3 transition-colors group-hover:text-ink">Previous</span>
            <span className="font-display text-2xl transition-colors group-hover:text-accent">{prevProject.title}</span>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="group max-w-[45%] text-right">
            <span className="label block mb-2 text-ink-3 transition-colors group-hover:text-ink">Next</span>
            <span className="font-display text-2xl transition-colors group-hover:text-accent">{nextProject.title}</span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
