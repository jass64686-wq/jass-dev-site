import type { Metadata } from 'next'
import { Clock, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { SectionHeading } from '@/components/portfolio/section-heading'
import { ContactPageForm } from '@/components/portfolio/contact-page-form'

export const metadata: Metadata = {
  title: 'Contact — jass.dev',
  description: 'Start a project with jass.dev — websites, Shopify & WooCommerce stores, funnels and headless CMS builds.',
}

const details = [
  { icon: Mail, label: 'Email', value: 'jass.dev39@gmail.com', href: 'mailto:jass.dev39@gmail.com' },
  { icon: Clock, label: 'Response time', value: 'Within 48 hours' },
  { icon: MapPin, label: 'Location', value: 'Remote · Worldwide' },
]

const socials = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://x.com', label: 'X' },
]

export default function ContactPage() {
  return (
    <>
      <main className="pointer-events-none relative z-10 pt-20 pb-24 md:py-24">
        <section className="py-4 md:py-12">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-5">
              <SectionHeading eyebrow="contact" title="Have an idea? Let's build it together." />
              <p className="leading-relaxed text-muted-foreground">
                Need a new website, a Shopify or WooCommerce store, a CheckoutChamp funnel or a GoHighLevel setup?
                Tell me a bit about your project and I&apos;ll get back to you with next steps.
              </p>
              <ul className="flex flex-col gap-3">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li
                    key={label}
                    className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-xl"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {href ? (
                        <Link href={href} className="text-sm font-medium text-foreground hover:underline">
                          {value}
                        </Link>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="pointer-events-auto flex flex-wrap gap-2">
                {socials.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-xl transition-colors hover:bg-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pointer-events-auto rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-violet-500/10 backdrop-blur-xl md:p-8 lg:col-span-7">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Send a message</h2>
              <p className="mb-6 mt-1 text-sm text-muted-foreground">All fields are required.</p>
              <ContactPageForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
