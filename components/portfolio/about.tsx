import { ArrowRight, Boxes, Gauge, Layers, PlugZap, Server } from 'lucide-react'
import Link from 'next/link'
import { SectionHeading } from './section-heading'
import { CodeWindow, tok } from './code-window'

const services = [
  { icon: Layers, title: 'Frontend Engineering', detail: 'React, Next.js, TypeScript' },
  { icon: Boxes, title: 'CMS & E-commerce', detail: 'WordPress, Shopify, Webflow, WooCommerce' },
  { icon: Server, title: 'Backend & APIs', detail: 'Node.js, Postgres, GraphQL' },
  { icon: PlugZap, title: 'Funnels & Integrations', detail: 'CheckoutChamp, GoHighLevel, payments' },
  { icon: Gauge, title: 'Performance & SEO', detail: 'Core Web Vitals, a11y, audits' },
]

export function About() {
  return (
    <section id="about" className="pointer-events-none relative py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="about me" title="Building digital experiences that actually work." />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {"I bridge product, design, and engineering. I care about performance budgets, thoughtful motion, and turning complex systems into interfaces that feel effortless."}
          </p>
          <Link
            href="/about"
            className="pointer-events-auto group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.03]"
          >
            Learn more
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <CodeWindow title="developer.ts" className="pointer-events-auto lg:col-span-4">
          <span className={tok.kw}>const</span> <span className={tok.fn}>developer</span> = {'{'}
          {'\n'}  <span className={tok.prop}>name</span>: <span className={tok.str}>{"'Jass'"}</span>,
          {'\n'}  <span className={tok.prop}>role</span>: <span className={tok.str}>{"'Full-stack Engineer'"}</span>,
          {'\n'}  <span className={tok.prop}>location</span>: <span className={tok.str}>{"'Remote · UTC-5'"}</span>,
          {'\n'}  <span className={tok.prop}>experience</span>: <span className={tok.num}>4</span>,
          {'\n'}  <span className={tok.prop}>stack</span>: [
          {'\n'}    <span className={tok.str}>{"'Next.js'"}</span>, <span className={tok.str}>{"'TypeScript'"}</span>,
          {'\n'}    <span className={tok.str}>{"'WordPress'"}</span>, <span className={tok.str}>{"'Shopify'"}</span>,
          {'\n'}    <span className={tok.str}>{"'Webflow'"}</span>, <span className={tok.str}>{"'Headless'"}</span>,
          {'\n'}  ],
          {'\n'}  <span className={tok.prop}>available</span>: <span className={tok.kw}>true</span>,
          {'\n'}{'}'}
          {'\n\n'}<span className={tok.com}>{'// ready to ship'}</span>
          {'\n'}<span className={tok.kw}>export default</span> <span className={tok.fn}>developer</span>
        </CodeWindow>

        <div className="pointer-events-auto rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl lg:col-span-4">
          <h3 className="font-semibold text-foreground">What I do</h3>
          <p className="text-sm text-muted-foreground">End-to-end product engineering.</p>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex items-center gap-3 rounded-2xl border border-white bg-white/70 p-3 shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
