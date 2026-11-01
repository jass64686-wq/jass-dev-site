import { Accessibility, Gauge, ImageIcon, Search, Smartphone, Zap } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { CodeWindow } from './code-window'

const items = [
  { icon: Gauge, title: 'Core Web Vitals', detail: 'LCP, INP & CLS in the green' },
  { icon: Zap, title: 'Edge Rendering', detail: 'SSR, ISR & streaming' },
  { icon: Search, title: 'Technical SEO', detail: 'Schema, metadata & sitemaps' },
  { icon: ImageIcon, title: 'Asset Optimization', detail: 'Modern formats, lazy loading' },
  { icon: Smartphone, title: 'Mobile-first', detail: 'Responsive on every screen' },
  { icon: Accessibility, title: 'Accessibility', detail: 'WCAG 2.2 AA compliant' },
]

const scores = [
  { label: 'Performance', value: 100 },
  { label: 'Accessibility', value: 100 },
  { label: 'Best Practices', value: 100 },
  { label: 'SEO', value: 100 },
]

export function Performance() {
  return (
    <section id="performance" className="pointer-events-none relative py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="performance & seo"
            title="Fast by default"
            description="Every build is measured. Speed, discoverability and accessibility are features, not afterthoughts."
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="pointer-events-auto rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-xl transition-colors hover:bg-white"
              >
                <Icon className="size-5 text-fuchsia-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-auto flex min-w-0 flex-col gap-4 lg:pt-16">
          <CodeWindow title="~/projects/portfolio — zsh">
            <span className="text-emerald-400">➜</span> <span className="text-cyan-300">portfolio</span>{' '}
            <span className="text-violet-400">git:(main)</span> npx lighthouse --view
            {'\n'}<span className="text-slate-500">{'  Running audits on https://jass.dev …'}</span>
            {'\n'}<span className="text-emerald-400">{'  ✓'}</span> First Contentful Paint   <span className="text-orange-300">0.4s</span>
            {'\n'}<span className="text-emerald-400">{'  ✓'}</span> Largest Contentful Paint <span className="text-orange-300">0.9s</span>
            {'\n'}<span className="text-emerald-400">{'  ✓'}</span> Total Blocking Time      <span className="text-orange-300">0ms</span>
            {'\n'}<span className="text-emerald-400">{'  ✓'}</span> Cumulative Layout Shift  <span className="text-orange-300">0.00</span>
            {'\n'}
            {'\n'}<span className="text-pink-300">{'  Done in 4.21s. All checks passed.'}</span>
          </CodeWindow>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {scores.map(({ label, value }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/70 bg-white/60 p-4 text-center backdrop-blur-xl"
              >
                <span className="grid size-14 place-items-center rounded-full border-4 border-emerald-500 font-mono text-sm font-semibold text-emerald-600">
                  {value}
                </span>
                <span className="text-[11px] leading-tight text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
