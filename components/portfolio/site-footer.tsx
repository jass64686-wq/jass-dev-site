import Link from 'next/link'
import { Send } from 'lucide-react'
import { PrivacyPreferencesButton } from './consent-manager'

export function SiteFooter() {
  return (
    <footer className="pointer-events-none relative z-10 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-foreground/10 px-6 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          <p>{'© 2026 Jass Dev'}</p>
          <p className="mt-1">Built with Next.js, Tailwind CSS &amp; React Three Fiber</p>
          <PrivacyPreferencesButton />
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">Have a project in mind?</p>
          <Link
            href="/contact"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition-transform hover:scale-[1.03]"
          >
            <Send className="size-4" aria-hidden="true" />
            Let&apos;s work together
          </Link>
        </div>
      </div>
    </footer>
  )
}
