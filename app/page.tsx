import { Hero } from '@/components/portfolio/hero'
import { StatsStrip } from '@/components/portfolio/stats-strip'
import { About } from '@/components/portfolio/about'
import { TechStack } from '@/components/portfolio/tech-stack'
import { Projects } from '@/components/portfolio/projects'
import { Platforms } from '@/components/portfolio/platforms'
import { Process } from '@/components/portfolio/process'
import { Performance } from '@/components/portfolio/performance'
import { Timeline } from '@/components/portfolio/timeline'
import { Impact } from '@/components/portfolio/impact'
import { Learning } from '@/components/portfolio/learning'
import { Contact } from '@/components/portfolio/contact'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: 'Full-stack web developer',
      image: `${SITE_URL}/images/jass-professional.webp`,
      knowsAbout: [
        'Next.js',
        'Shopify',
        'WordPress',
        'Webflow',
        'Framer',
        'E-commerce',
        'Headless CMS',
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <main className="pointer-events-none relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <Hero />
        <StatsStrip />
        <About />
        <TechStack />
        <Platforms />
        <Projects />
        <Process />
        <Performance />
        <Timeline />
        <Impact />
        <Learning />
        <Contact />
      </main>
    </>
  )
}
