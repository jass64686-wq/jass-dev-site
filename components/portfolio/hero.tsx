import { ArrowRight, MousePointerClick } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section
      id="top"
      className="pointer-events-none relative flex min-h-svh items-start md:items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <div className="max-w-xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Available for new projects
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Building interfaces that feel{' '}
            <span className="text-brand-gradient">alive.</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {"I'm Jass, a full-stack developer crafting fast, accessible websites and stores with Next.js, WordPress, Shopify, Webflow and headless CMS."}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="pointer-events-auto group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="pointer-events-auto inline-flex items-center rounded-full border border-white/70 bg-white/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-white"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      <p className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
        <MousePointerClick className="size-4" aria-hidden="true" />
        Drag the shapes &middot; click to recolor
      </p>
    </section>
  )
}
