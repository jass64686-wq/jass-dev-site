'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => null,
})

export function SceneToggle() {
  const [enabled, setEnabled] = useState(false)
  const userToggled = useRef(false)

  useEffect(() => {
    let idleCallback: number | undefined
    const timer = window.setTimeout(() => {
      const enableScene = () => {
        if (!userToggled.current) setEnabled(true)
      }

      if ('requestIdleCallback' in window) {
        idleCallback = window.requestIdleCallback(enableScene, { timeout: 2500 })
      } else {
        enableScene()
      }
    }, 1200)

    return () => {
      window.clearTimeout(timer)
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        aria-pressed={enabled}
        onClick={() => {
          userToggled.current = true
          setEnabled((current) => !current)
        }}
        className="pointer-events-auto rounded-full border border-white/70 bg-white/70 px-4 py-2 font-mono text-xs text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-white"
      >
        {enabled ? 'Disable interactive 3D scene' : 'Enable interactive 3D scene'}
      </button>
      {enabled && (
        <div className="pointer-events-auto fixed inset-0 -z-10">
          <HeroScene />
        </div>
      )}
    </>
  )
}
