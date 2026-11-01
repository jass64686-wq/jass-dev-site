import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import type { Project } from '@/lib/projects'
import { projects as allProjects } from '@/lib/projects'

const projects = allProjects.filter((project) => project.featured)

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="flex h-full flex-col">
      <div
        aria-hidden="true"
        className={`mb-8 h-1.5 w-16 rounded-full bg-gradient-to-r ${project.accent} transition-all duration-500 group-hover:w-28`}
      />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h3>
        {project.url && (
          <ArrowUpRight
            className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/80 px-3 py-1 font-mono text-xs text-foreground/80">
            {tag}
          </span>
        ))}
        <span className="ml-auto font-mono text-xs text-muted-foreground">{project.year}</span>
      </div>
    </div>
  )

  const className =
    'pointer-events-auto group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/60 p-7 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10'

  return project.url ? (
    <a href={project.url} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  )
}

export function Projects() {
  return (
    <section id="work" className="pointer-events-none relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" title="Projects I've shipped recently" />
          <Link
            href="/portfolio"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-white"
          >
            View full portfolio
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
