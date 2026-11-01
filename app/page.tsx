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

export default function Page() {
  return (
    <>
      <main className="pointer-events-none relative z-10">
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
