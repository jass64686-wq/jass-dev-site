import { Quote } from 'lucide-react'
import { SectionHeading } from './section-heading'

const impact = [
  { value: '40%', label: 'Faster page loads', tint: 'bg-violet-500/10 text-violet-700' },
  { value: '25%', label: 'Higher conversion', tint: 'bg-fuchsia-500/10 text-fuchsia-700' },
  { value: '60%', label: 'Less dev time via design systems', tint: 'bg-orange-500/10 text-orange-700' },
  { value: '99%', label: 'Client satisfaction', tint: 'bg-emerald-500/10 text-emerald-700' },
]

const testimonials = [
  {
    quote: 'Jass turned a vague idea into a polished, blazing-fast product. Communication was clear and the code was a joy to inherit.',
    name: 'Maya Chen',
    role: 'CTO, Northwind Labs',
  },
  {
    quote: 'The Shopify store Jass rebuilt doubled our conversion rate. Rare mix of creative vision and engineering rigor.',
    name: 'Jonas Weber',
    role: 'Creative Director, Studio Prism',
  },
]

export function Impact() {
  return (
    <section id="impact" className="pointer-events-none relative py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="my impact" title="Results, not just code" />
          <dl className="mt-10 grid grid-cols-2 gap-3">
            {impact.map(({ value, label, tint }) => (
              <div key={label} className={`pointer-events-auto rounded-3xl border border-white/70 p-6 backdrop-blur-xl ${tint}`}>
                <dd className="text-4xl font-semibold tracking-tight">{value}</dd>
                <dt className="mt-2 text-sm text-foreground/70">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionHeading eyebrow="testimonials" title="What clients say" />
          <ul className="mt-10 flex flex-col gap-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="pointer-events-auto rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl">
                  <Quote className="size-5 text-fuchsia-500" aria-hidden="true" />
                  <blockquote className="mt-3 text-pretty leading-relaxed text-foreground">{t.quote}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white" aria-hidden="true">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
