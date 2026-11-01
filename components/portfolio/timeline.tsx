import { SectionHeading } from './section-heading'

const experience = [
  {
    period: '2023',
    role: 'Shopify, WordPress & JavaScript',
    company: 'Starting out',
    summary: 'Started by building and customizing Shopify and WordPress sites, developing a strong foundation in JavaScript and the web.',
    tags: ['Shopify', 'WordPress', 'JavaScript'],
  },
  {
    period: '2025',
    role: 'Expanding into full-stack development',
    company: 'Growing across the stack',
    summary: 'Built on frontend and CMS experience to work across modern applications, integrations, and backend services.',
    tags: ['React', 'Next.js', 'TypeScript', 'APIs'],
  },
  {
    period: '2026 — Present',
    role: 'Full-stack Developer & AI Agent Workflows',
    company: 'Building with AI',
    summary: 'Combining full-stack development with AI agents and tools to plan, build, and improve useful web experiences.',
    tags: ['Full-stack', 'AI Agents', 'Claude Code', 'Claude Console'],
    current: true,
  },
]

export function Timeline() {
  return (
    <section id="experience" className="pointer-events-none relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="experience" title="Where I've shipped" />
        <ol className="relative mt-12 ml-3 border-l border-dashed border-fuchsia-300">
          {experience.map((item) => (
            <li key={item.company} className="relative pb-8 pl-8 last:pb-0">
              <span
                className={`absolute top-6 -left-[7px] size-3.5 rounded-full border-2 border-white ${item.current ? 'bg-brand-gradient ring-4 ring-fuchsia-500/20' : 'bg-violet-400'}`}
                aria-hidden="true"
              />
              <article className="pointer-events-auto grid gap-4 rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-mono text-xs text-fuchsia-600">{item.period}</p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {item.role} <span className="font-normal text-muted-foreground">@ {item.company}</span>
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                </div>
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white bg-white/80 px-3 py-1 font-mono text-xs text-foreground shadow-sm">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
