import type { Metadata } from 'next'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Portfolio — jass.dev',
  description: 'A complete archive of web apps, CMS & e-commerce builds, WebGL experiences and tooling by jass.dev.',
}

export default function PortfolioPage() {
  const stats = [
    { value: '30+', label: 'Projects' },
    { value: new Set(projects.map((p) => p.category)).size.toString(), label: 'Disciplines' },
    { value: '4+', label: 'Years shipping' },
  ]

  return (
    <>
      <main className="pointer-events-none relative z-10 pt-24 pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gradient">Portfolio</p>
          <h1 className="mt-3 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Everything I&apos;ve <span className="text-brand-gradient">designed &amp; built</span>.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            From real-time dashboards to holographic WebGL interfaces — a full archive of client work, products and
            experiments.
          </p>
          <dl className="mt-10 flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/70 bg-white/60 px-5 py-3 shadow-sm backdrop-blur-xl"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <PortfolioGrid projects={projects} />
        </div>
      </main>
    </>
  )
}
