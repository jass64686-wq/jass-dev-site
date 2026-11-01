import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Platforms } from '@/components/portfolio/platforms'
import { SectionHeading } from '@/components/portfolio/section-heading'
import { TechStack } from '@/components/portfolio/tech-stack'
import { Timeline } from '@/components/portfolio/timeline'

export const metadata: Metadata = {
  title: 'About — jass.dev',
  description: 'About Jass — a full-stack developer with 4+ years of experience across Shopify, WordPress, JavaScript and modern web applications.',
}

export default function AboutPage() {
  return (
    <>
      <main className="pointer-events-none relative z-10 pt-20 pb-24 md:py-24">
        {/* About Intro */}
        <section id="about-intro" className="py-4 md:py-12">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading eyebrow="about me" title="Building digital experiences that actually work." />
              <div className="mt-8 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  {"Hi, I'm Jass. I bridge product, design, and engineering — from custom Next.js apps to WordPress, Shopify, Webflow, Framer and headless CMS builds."}
                </p>
                <p>
                  {"Since starting in 2023, I've grown from building Shopify and WordPress sites with JavaScript to working across the full stack, creating stores, content sites, applications and integrations."}
                </p>
              </div>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.03]"
                >
                  Work with me
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center rounded-full border border-white/70 bg-white/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-xl transition-colors hover:bg-white"
                >
                  View portfolio
                </Link>
              </div>
            </div>
            <figure className="pointer-events-auto relative mx-auto w-full max-w-sm md:col-span-5">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-2 shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
                <Image
                  src="/images/jass-professional.webp"
                  alt="Portrait of Jass"
                  width={640}
                  height={800}
                  priority
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center font-mono text-xs text-muted-foreground">
                {'jass.dev · available for projects'}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-white/70 bg-white/60 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-foreground">Engineering Philosophy</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  I believe in shipping fast, but never at the expense of quality. I prioritize clean code, type safety, and comprehensive testing to ensure longevity.
                  My focus is on creating developer-friendly architectures that allow teams to move quickly without breaking things.
                </p>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/60 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-foreground">Design Perspective</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Design isn't just about how it looks, but how it works. I approach design as a collaborative effort, focusing on user needs and business goals.
                  I love working with designers to ensure our implementation is pixel-perfect and highly accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <TechStack />

        <Platforms />

        {/* Experience */}
        <Timeline />
      </main>
    </>
  )
}
