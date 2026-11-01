import Link from 'next/link'
import { Mail, Send } from 'lucide-react'

const socials = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://x.com', label: 'X' },
]

export function Contact() {
  return (
    <section id="contact" className="pointer-events-none relative pt-28 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="pointer-events-auto relative overflow-hidden rounded-[2rem] bg-brand-gradient p-10 text-white shadow-2xl shadow-fuchsia-500/20 md:p-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-72 rounded-full bg-white/20 blur-3xl"
          />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Contact</p>
          <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            {"Have an idea? Let's build it together."}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-violet-700 transition-transform hover:scale-[1.03]"
            >
              <Send className="size-4" aria-hidden="true" />
              Start a project
            </Link>
            <a
              href="mailto:jass.dev39@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/25"
            >
              <Mail className="size-4" aria-hidden="true" />
              jass.dev39@gmail.com
            </a>
            <ul className="flex items-center gap-2">
              {socials.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/25"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
