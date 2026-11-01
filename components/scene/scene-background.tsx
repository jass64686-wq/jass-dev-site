'use client'

import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => null,
})

export function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-0">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#ede9fe_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#fce7f3_0%,transparent_55%),radial-gradient(ellipse_at_top_right,#cffafe_0%,transparent_45%),linear-gradient(180deg,#fdfcff_0%,#fff7ed_100%)]" />
      <div className="absolute inset-0">
        <HeroScene />
      </div>
    </div>
  )
}
