import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function CodeWindow({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <figure
      className={cn(
        'min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-violet-500/20 backdrop-blur-xl',
        className,
      )}
    >
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose-400" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-amber-300" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-slate-400">{title}</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-300">
        <code>{children}</code>
      </pre>
    </figure>
  )
}

export const tok = {
  kw: 'text-violet-400',
  fn: 'text-cyan-300',
  str: 'text-pink-300',
  num: 'text-orange-300',
  com: 'text-slate-500 italic',
  prop: 'text-sky-300',
}
