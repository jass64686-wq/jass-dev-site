import { ChevronRight, Code2, Compass, PenTool, Rocket, ShieldCheck, Workflow } from 'lucide-react'
import { SectionHeading } from './section-heading'

const steps = [
  { icon: Compass, title: 'Discover', detail: 'Goals, users & constraints' },
  { icon: Workflow, title: 'Plan', detail: 'Architecture & roadmap' },
  { icon: PenTool, title: 'Design', detail: 'Prototypes & systems' },
  { icon: Code2, title: 'Develop', detail: 'Clean, typed, tested code' },
  { icon: ShieldCheck, title: 'Test', detail: 'E2E, a11y & perf checks' },
  { icon: Rocket, title: 'Deploy', detail: 'CI/CD & monitoring' },
]

export function Process() {
  return (
    <section id="process" className="pointer-events-none relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="development process"
          title="From idea to production"
          description="A predictable, transparent workflow — every step ships something you can see."
        />
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map(({ icon: Icon, title, detail }, i) => (
            <li key={title} className="relative">
              <div className="pointer-events-auto flex h-full flex-col gap-4 rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur-xl transition-colors hover:bg-white">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient text-white">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              </div>
              {i < steps.length - 1 ? (
                <ChevronRight
                  className="absolute top-1/2 -right-3 z-10 hidden size-4 -translate-y-1/2 text-fuchsia-500 lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
