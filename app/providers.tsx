'use client'

import { useEffect } from 'react'
import { initializeAnalytics } from '@/lib/analytics'

export function CSPostHogProvider() {
  const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  useEffect(() => {
    if (!postHogKey) return

    let cancelled = false
    let loadTimer: number | undefined
    let idleCallback: number | undefined

    const loadAnalytics = () => {
      void initializeAnalytics()
        .then(async (posthog) => {
          if (cancelled || !posthog) return
          const { default: FingerprintJS } = await import('@fingerprintjs/fingerprintjs')
          const fingerprint = await FingerprintJS.load()
          const { visitorId } = await fingerprint.get()
          if (!cancelled) {
            posthog.identify(visitorId, { fingerprint_id: visitorId })
          }
        })
        .catch((error: unknown) => {
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
      cancelled = true
      window.removeEventListener('load', scheduleAnalytics)
      if (loadTimer !== undefined) window.clearTimeout(loadTimer)
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback)
    }
  }, [postHogKey])

  return null
}
