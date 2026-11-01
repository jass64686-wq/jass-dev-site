import {
  Atom,
  Box,
  Braces,
  Cloud,
  Container,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Palette,
  Server,
  Sparkles,
  TestTube2,
  Terminal,
  Triangle,
  Wind,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

const stack = [
  { icon: FileCode2, name: 'TypeScript', color: 'text-blue-600 bg-blue-500/10' },
  { icon: Atom, name: 'React', color: 'text-cyan-600 bg-cyan-500/10' },
  { icon: Triangle, name: 'Next.js', color: 'text-slate-900 bg-slate-500/10' },
  { icon: Server, name: 'Node.js', color: 'text-emerald-600 bg-emerald-500/10' },
  { icon: Box, name: 'Three.js', color: 'text-violet-600 bg-violet-500/10' },
  { icon: Sparkles, name: 'GLSL', color: 'text-fuchsia-600 bg-fuchsia-500/10' },
  { icon: Sparkles, name: 'AI Agents', color: 'text-violet-600 bg-violet-500/10' },
  { icon: Terminal, name: 'Claude Code', color: 'text-orange-600 bg-orange-500/10' },
  { icon: Braces, name: 'Claude Console', color: 'text-amber-600 bg-amber-500/10' },
  { icon: Wind, name: 'Tailwind', color: 'text-sky-600 bg-sky-500/10' },
  { icon: Database, name: 'Postgres', color: 'text-indigo-600 bg-indigo-500/10' },
  { icon: Braces, name: 'GraphQL', color: 'text-pink-600 bg-pink-500/10' },
  { icon: Cpu, name: 'Rust / WASM', color: 'text-orange-600 bg-orange-500/10' },
  { icon: Container, name: 'Docker', color: 'text-blue-600 bg-blue-500/10' },
  { icon: Cloud, name: 'Vercel / AWS', color: 'text-slate-900 bg-slate-500/10' },
  { icon: GitBranch, name: 'Git', color: 'text-orange-600 bg-orange-500/10' },
  { icon: TestTube2, name: 'Playwright', color: 'text-emerald-600 bg-emerald-500/10' },
  { icon: Terminal, name: 'Bash / CLI', color: 'text-slate-900 bg-slate-500/10' },
  { icon: Palette, name: 'Figma', color: 'text-rose-600 bg-rose-500/10' },
]

export function TechStack() {
  return (
    <section id="stack" className="pointer-events-none relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="tech stack" title="Tools I build with" />
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-violet-600">$</span> npm ls --depth=0
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {stack.map(({ icon: Icon, name, color }) => (
            <li
              key={name}
              className="pointer-events-auto group flex flex-col items-center gap-3 rounded-2xl border border-white/70 bg-white/60 p-4 text-center backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-violet-500/10"
            >
              <span className={`grid size-11 place-items-center rounded-xl ${color}`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-foreground">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
