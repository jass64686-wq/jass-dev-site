'use client'

import FingerprintJS from '@fingerprintjs/fingerprintjs'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, type ReactNode } from 'react'

let initializedPostHogKey: string | undefined

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  useEffect(() => {
    if (!postHogKey) return

    if (initializedPostHogKey !== postHogKey) {
      posthog.init(postHogKey, {
        api_host: '/ingest',
        ui_host: 'https://posthog.com',
        person_profiles: 'always',
        capture_pageview: true,
        capture_pageleave: true,
      })
      initializedPostHogKey = postHogKey
    }

    let cancelled = false

    async function identifyVisitor() {
      try {
        const fingerprint = await FingerprintJS.load()
        const { visitorId } = await fingerprint.get()
        if (!cancelled) {
          posthog.identify(visitorId, { fingerprint_id: visitorId })
        }
      } catch (error) {
        console.error('[analytics] Failed to identify visitor', error)
      }
    }

    void identifyVisitor()
    return () => {
      cancelled = true
    }
  }, [postHogKey])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
