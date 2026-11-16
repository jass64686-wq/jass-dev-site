import { Briefcase, Code2, GitCommitHorizontal, Rocket } from 'lucide-react'
import { getExperienceDuration } from '@/lib/experience'
import { ExperienceDuration } from './experience-duration'

const initialExperienceDuration = getExperienceDuration()

const stats = [
  {
    icon: Briefcase,
    value: (
      <ExperienceDuration
        initialDuration={initialExperienceDuration}
        className="text-xl md:text-2xl"
      />
    ),
    label: 'Years of experience',
  },
  { icon: Rocket, value: '30+', label: 'Projects shipped' },
  { icon: GitCommitHorizontal, value: '1.2k', label: 'Commits this year' },
  { icon: Code2, value: '6', label: 'Open-source packages' },
]

export function StatsStrip() {
  return (
    <section aria-label="Highlights" className="pointer-events-none relative -mt-10 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/70 bg-white/40 backdrop-blur-xl md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 bg-white/50 p-5 md:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-fuchsia-500/20">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <dt className="order-last text-xs text-muted-foreground">{label}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-foreground">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
