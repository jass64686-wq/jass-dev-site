'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/#platforms', label: 'Platforms' },
  { href: '/#experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <nav
        aria-label="Primary"
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5"
      >
        <Link
          href="/#top"
          className="pointer-events-auto rounded-full border border-white/60 bg-white/60 px-3 py-2 font-mono text-sm font-semibold tracking-tight text-foreground shadow-sm backdrop-blur-md"
        >
          jass<span className="text-brand-gradient">.dev</span>
        </Link>
        <ul className="pointer-events-auto hidden items-center gap-0.5 rounded-full border border-white/60 bg-white/50 p-1 shadow-sm backdrop-blur-md md:flex md:gap-1">
          {links.map((link) => {
            const isActive = link.href === pathname
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'block rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-white hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <button
          type="button"
          className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/60 bg-white/60 text-foreground shadow-sm backdrop-blur-md md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
        {menuOpen && (
          <ul
            id="mobile-navigation"
            className="pointer-events-auto absolute inset-x-4 top-[calc(100%-0.5rem)] flex flex-col gap-1 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-lg backdrop-blur-xl sm:inset-x-6 md:hidden"
          >
            {links.map((link) => {
              const isActive = link.href === pathname
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm transition-colors',
                      isActive
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:bg-white hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </nav>
    </header>
  )
}
