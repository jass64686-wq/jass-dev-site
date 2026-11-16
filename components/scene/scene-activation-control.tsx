'use client'

import { useCallback, useRef, useState } from 'react'
import { preloadHeroScene, SCENE_ACTIVATION_EVENT } from './scene-background'

type SceneStatus = 'idle' | 'loading' | 'ready' | 'active' | 'error'

export function SceneActivationControl() {
  const [status, setStatus] = useState<SceneStatus>('idle')
  const loadPromise = useRef<Promise<boolean> | null>(null)
  const isActive = useRef(false)

  const preload = useCallback(() => {
    if (loadPromise.current) return loadPromise.current

    setStatus('loading')
    loadPromise.current = preloadHeroScene().then(
      () => {
        setStatus('ready')
        return true
      },
      (error: unknown) => {
        console.error('Failed to load the interactive scene.', error)
        loadPromise.current = null
        setStatus('error')
        return false
      },
    )

    return loadPromise.current
  }, [])

  const activate = useCallback(() => {
    if (isActive.current) return

    void preload().then((loaded) => {
      if (!loaded || isActive.current) return
      isActive.current = true
      setStatus('active')
      window.dispatchEvent(new Event(SCENE_ACTIVATION_EVENT))
    })
  }, [preload])

  const label = {
    idle: 'Activate the interactive scene',
    loading: 'Preparing the interactive scene…',
    ready: 'Activate the interactive scene',
    active: 'Drag the shapes · click to recolor',
    error: 'Scene failed to load · retry',
  }[status]

  return (
    <button
      type="button"
      onPointerEnter={activate}
      onFocus={activate}
      onClick={activate}
      className="pointer-events-auto min-h-11 cursor-pointer rounded-sm px-2 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
      aria-live="polite"
    >
      {label}
    </button>
  )
}
