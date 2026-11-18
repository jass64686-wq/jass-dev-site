import { Mail, MousePointerClick, ShoppingCart, Workflow, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'

type Platform = {
  name: string
  detail: string
  color: string
  icons?: string[]
  fallbackIcon?: LucideIcon
}

const cms: Platform[] = [
  { name: 'WordPress', detail: 'Custom themes & Gutenberg blocks', color: 'text-blue-600 bg-blue-500/10', icons: ['/platform-icons/wordpress.svg'] },
  { name: 'Shopify', detail: 'Liquid themes, Shopify Plus & apps', color: 'text-emerald-600 bg-emerald-500/10', icons: ['/platform-icons/shopify.svg'] },
  { name: 'Headless CMS', detail: 'Sanity, Contentful, Strapi + Next.js', color: 'text-violet-600 bg-violet-500/10', icons: ['/platform-icons/sanity.svg'] },
  { name: 'Wix Studio', detail: 'Velo code & responsive builds', color: 'text-slate-900 bg-slate-500/10', icons: ['/platform-icons/wix.svg'] },
  { name: 'Squarespace', detail: 'Custom CSS, code blocks & commerce', color: 'text-slate-900 bg-slate-500/10', icons: ['/platform-icons/squarespace.svg'] },
  { name: 'Joomla', detail: 'Templates, extensions & migrations', color: 'text-orange-600 bg-orange-500/10', icons: ['/platform-icons/joomla.svg'] },
  { name: 'Framer', detail: 'Interactive marketing sites & CMS', color: 'text-fuchsia-600 bg-fuchsia-500/10', icons: ['/platform-icons/framer.svg'] },
  { name: 'Webflow', detail: 'CMS collections, interactions & Memberstack', color: 'text-indigo-600 bg-indigo-500/10', icons: ['/platform-icons/webflow.svg'] },
]

const commerce: Platform[] = [
  { name: 'WooCommerce', detail: 'Stores, subscriptions & custom checkout', color: 'text-violet-600 bg-violet-500/10', icons: ['/platform-icons/woocommerce.svg'] },
  { name: 'CheckoutChamp', detail: 'Funnels, upsells & order bumps', color: 'text-pink-600 bg-pink-500/10', fallbackIcon: ShoppingCart },
  { name: 'GoHighLevel', detail: 'Funnels, CRM automations & snapshots', color: 'text-sky-600 bg-sky-500/10', fallbackIcon: Workflow },
  { name: 'BigCommerce', detail: 'Stencil themes & headless storefronts', color: 'text-slate-900 bg-slate-500/10', icons: ['/platform-icons/bigcommerce.svg'] },
  { name: 'ClickFunnels', detail: 'Sales funnels & landing pages', color: 'text-orange-600 bg-orange-500/10', fallbackIcon: MousePointerClick },
  { name: 'Stripe', detail: 'Payments, billing & subscriptions', color: 'text-indigo-600 bg-indigo-500/10', icons: ['/platform-icons/stripe.svg'] },
  { name: 'Klaviyo', detail: 'Email flows & e-commerce tracking', color: 'text-emerald-600 bg-emerald-500/10', fallbackIcon: Mail },
  { name: 'Zapier / Make', detail: 'Workflow automation & integrations', color: 'text-orange-600 bg-orange-500/10', icons: ['/platform-icons/zapier.svg', '/platform-icons/make.svg'] },
]

function PlatformGroup({ title, description, items }: { title: string; description: string; items: Platform[] }) {
  return (
    <div className="pointer-events-auto min-w-0 rounded-3xl border border-white/70 bg-white/60 p-6 backdrop-blur-xl">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <ul className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
        {items.map(({ name, detail, color, icons, fallbackIcon: FallbackIcon }) => (
          <li
            key={name}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-white bg-white/70 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-violet-500/10"
          >
            <span
              aria-hidden="true"
              className={`grid size-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold ${color}`}
            >
              {icons ? (
                <span className="flex items-center justify-center gap-0.5">
                  {icons.map((icon) => (
                    <img key={icon} src={icon} alt="" className={icons.length > 1 ? 'size-4' : 'size-5'} />
                  ))}
                </span>
              ) : FallbackIcon ? <FallbackIcon className="size-5" aria-hidden="true" /> : null}
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
