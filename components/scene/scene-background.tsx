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
    const showScene = () => {
      window.removeEventListener('pointermove', showScene)
      window.removeEventListener('pointerdown', showScene)
      window.removeEventListener('keydown', showScene)
      setSceneReady(true)
    }

    window.addEventListener('pointermove', showScene, { once: true, passive: true })
    window.addEventListener('pointerdown', showScene, { once: true, passive: true })
    window.addEventListener('keydown', showScene, { once: true })

    return () => {
      window.removeEventListener('pointermove', showScene)
      window.removeEventListener('pointerdown', showScene)
      window.removeEventListener('keydown', showScene)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-0">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#ede9fe_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#fce7f3_0%,transparent_55%),radial-gradient(ellipse_at_top_right,#cffafe_0%,transparent_45%),linear-gradient(180deg,#fdfcff_0%,#fff7ed_100%)]" />
      {!sceneReady && <div aria-hidden="true" className="scene-fallback pointer-events-none absolute right-[8%] top-[16%] aspect-square w-[min(74vw,44rem)] md:right-[5%] md:top-[12%]" />}
      {sceneReady && (
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      )}
    </div>
  )
}
