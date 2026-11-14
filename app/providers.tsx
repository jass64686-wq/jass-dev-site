'use client'

import { useEffect } from 'react'
import { initializeAnalytics } from '@/lib/analytics'

export function CSPostHogProvider() {
  const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  useEffect(() => {
    if (!postHogKey) return

    let loadTimer: number | undefined
    let idleCallback: number | undefined

    const loadAnalytics = () => {
      void initializeAnalytics().catch((error: unknown) => {
        console.error('[analytics] Failed to initialize analytics', error)
      })
    }

    const scheduleAnalytics = () => {
      loadTimer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleCallback = window.requestIdleCallback(loadAnalytics, { timeout: 5000 })
        } else {
          loadAnalytics()
        }
      }, 5000)
    }

    if (document.readyState === 'complete') {
      scheduleAnalytics()
    } else {
      window.addEventListener('load', scheduleAnalytics, { once: true })
    }

    return () => {
      window.removeEventListener('load', scheduleAnalytics)
      if (loadTimer !== undefined) window.clearTimeout(loadTimer)
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback)
    }
  }, [postHogKey])

  return null
}
