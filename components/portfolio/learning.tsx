import { SectionHeading } from './section-heading'

const learning = [
  { name: 'WebGPU', progress: 70 },
  { name: 'Rust', progress: 55 },
  { name: 'AI Agents', progress: 65 },
  { name: 'Edge Databases', progress: 45 },
  { name: 'Motion Design', progress: 60 },
]

export function Learning() {
  return (
    <section id="learning" className="pointer-events-none relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="pointer-events-auto rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <SectionHeading eyebrow="currently learning" title="Always compiling" />
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-emerald-600">●</span> git checkout -b new-skills
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {learning.map(({ name, progress }) => (
              <li key={name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/5"
                  role="progressbar"
                  aria-label={`${name} progress`}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
