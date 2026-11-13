'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => null,
})

export function SceneBackground() {
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    let idleCallback: number | undefined
    const timer = window.setTimeout(() => {
      const showScene = () => setSceneReady(true)

      if ('requestIdleCallback' in window) {
        idleCallback = window.requestIdleCallback(showScene, { timeout: 2500 })
      } else {
        showScene()
      }
    }, 1200)

    return () => {
      window.clearTimeout(timer)
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-0">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#ede9fe_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#fce7f3_0%,transparent_55%),radial-gradient(ellipse_at_top_right,#cffafe_0%,transparent_45%),linear-gradient(180deg,#fdfcff_0%,#fff7ed_100%)]" />
      {sceneReady && (
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      )}
    </div>
  )
}
