import { ContactDialog } from './contact-dialog'

export function SiteFooter() {
  return (
    <footer className="pointer-events-none relative z-10 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-foreground/10 px-6 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          <p>{'© 2026 jass.dev'}</p>
          <p className="mt-1">Built with Next.js, Tailwind CSS &amp; React Three Fiber</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">Have a project in mind?</p>
          <ContactDialog />
        </div>
      </div>
    </footer>
  )
}
