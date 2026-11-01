'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section aria-labelledby="archive-heading" className="mt-16">
      <h2 id="archive-heading" className="sr-only">
        Project archive
      </h2>
      <div role="group" aria-label="Filter by category" className="pointer-events-auto inline-flex flex-wrap gap-1 rounded-full border border-white/60 bg-white/50 p-1 shadow-sm backdrop-blur-md">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm transition-colors',
              active === category
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-white hover:text-foreground',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.title}>
            <article className="pointer-events-auto group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/65 p-6 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.title} website`}
                  className="absolute inset-0 z-10 rounded-3xl"
                />
              )}
              <div
                aria-hidden="true"
                className={`relative mb-6 flex h-36 items-end overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent} p-4`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.45),transparent_55%)]" />
                <div className="absolute -right-6 -bottom-6 size-28 rounded-full border border-white/40" />
                <div className="absolute -right-2 -bottom-2 size-16 rounded-full border border-white/50" />
                <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-white/90">
                  {project.category}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/80 px-2.5 py-1 font-mono text-[11px] text-foreground/80">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-foreground/5 pt-4 font-mono text-xs text-muted-foreground">
                <span>{project.role}</span>
                <span>{project.year}</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
