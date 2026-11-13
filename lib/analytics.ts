let posthogPromise: Promise<typeof import('posthog-js').default> | undefined

export function initializeAnalytics() {
  const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!postHogKey) return Promise.resolve(null)

  if (!posthogPromise) {
    posthogPromise = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(postHogKey, {
          api_host: '/ingest',
          ui_host: 'https://posthog.com',
          person_profiles: 'always',
          capture_pageview: true,
          capture_pageleave: true,
        })
        return posthog
      })
      .catch((error: unknown) => {
        posthogPromise = undefined
        throw error
      })
  }

  return posthogPromise
}
