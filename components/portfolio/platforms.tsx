import { SectionHeading } from './section-heading'

type Platform = { name: string; detail: string; mark: string; color: string }

const cms: Platform[] = [
  { name: 'WordPress', detail: 'Custom themes & Gutenberg blocks', mark: 'W', color: 'text-blue-600 bg-blue-500/10' },
  { name: 'Shopify', detail: 'Liquid themes, Shopify Plus & apps', mark: 'S', color: 'text-emerald-600 bg-emerald-500/10' },
  { name: 'Headless CMS', detail: 'Sanity, Contentful, Strapi + Next.js', mark: 'H', color: 'text-violet-600 bg-violet-500/10' },
  { name: 'Wix Studio', detail: 'Velo code & responsive builds', mark: 'Wx', color: 'text-slate-900 bg-slate-500/10' },
  { name: 'Squarespace', detail: 'Custom CSS, code blocks & commerce', mark: 'Sq', color: 'text-slate-900 bg-slate-500/10' },
  { name: 'Joomla', detail: 'Templates, extensions & migrations', mark: 'J', color: 'text-orange-600 bg-orange-500/10' },
  { name: 'Framer', detail: 'Interactive marketing sites & CMS', mark: 'F', color: 'text-fuchsia-600 bg-fuchsia-500/10' },
  { name: 'Webflow', detail: 'CMS collections, interactions & Memberstack', mark: 'Wf', color: 'text-indigo-600 bg-indigo-500/10' },
]

const commerce: Platform[] = [
  { name: 'WooCommerce', detail: 'Stores, subscriptions & custom checkout', mark: 'Wc', color: 'text-violet-600 bg-violet-500/10' },
  { name: 'CheckoutChamp', detail: 'Funnels, upsells & order bumps', mark: 'CC', color: 'text-pink-600 bg-pink-500/10' },
  { name: 'GoHighLevel', detail: 'Funnels, CRM automations & snapshots', mark: 'GHL', color: 'text-sky-600 bg-sky-500/10' },
  { name: 'BigCommerce', detail: 'Stencil themes & headless storefronts', mark: 'BC', color: 'text-slate-900 bg-slate-500/10' },
  { name: 'ClickFunnels', detail: 'Sales funnels & landing pages', mark: 'CF', color: 'text-orange-600 bg-orange-500/10' },
  { name: 'Stripe', detail: 'Payments, billing & subscriptions', mark: 'St', color: 'text-indigo-600 bg-indigo-500/10' },
  { name: 'Klaviyo', detail: 'Email flows & e-commerce tracking', mark: 'K', color: 'text-emerald-600 bg-emerald-500/10' },
  { name: 'Zapier / Make', detail: 'Workflow automation & integrations', mark: 'Z', color: 'text-orange-600 bg-orange-500/10' },
]

function PlatformGroup({ title, description, items }: { title: string; description: string; items: Platform[] }) {
  return (
    <div className="pointer-events-auto min-w-0 rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <ul className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
        {items.map(({ name, detail, mark, color }) => (
          <li
            key={name}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-white bg-white/70 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-violet-500/10"
          >
            <span
              aria-hidden="true"
              className={`grid size-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold ${color}`}
            >
              {mark}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Platforms() {
  return (
    <section id="platforms" className="pointer-events-none relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="cms & platforms" title="Platforms I build on" />
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-violet-600">$</span> ls ./platforms --all
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PlatformGroup title="CMS & Site Builders" description="Content-driven sites your team can edit." items={cms} />
          <PlatformGroup
            title="E-commerce & Funnels"
            description="Stores, checkouts and automations that convert."
            items={commerce}
          />
        </div>
      </div>
    </section>
  )
}
