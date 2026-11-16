'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { BeforeSend } from '@vercel/analytics/next'

const CONSENT_STORAGE_KEY = 'jass-dev-analytics-consent'
const OPEN_PREFERENCES_EVENT = 'jass-dev:open-privacy-preferences'

type ConsentChoice = 'accepted' | 'rejected'

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((module) => module.Analytics),
  { ssr: false, loading: () => null },
)

export function ConsentManager({ analyticsEnabled }: { analyticsEnabled: boolean }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [storageError, setStorageError] = useState<string | null>(null)
  const choiceRef = useRef<ConsentChoice | null>(null)

  useEffect(() => {
    let storedChoice: string | null = null

    try {
      storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    } catch (error) {
      console.error('Unable to read privacy preferences from browser storage.', error)
      setStorageError('This browser could not read your saved privacy choice.')
    }

    const savedChoice =
      storedChoice === 'accepted' || storedChoice === 'rejected' ? storedChoice : null
    choiceRef.current = savedChoice
    setChoice(savedChoice)
    setIsOpen(savedChoice === null)
    setIsReady(true)

    const openPreferences = () => setIsOpen(true)
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences)
  }, [])

  const beforeSend = useCallback<BeforeSend>(
    (event) => (choiceRef.current === 'accepted' ? event : null),
    [],
  )

  const saveChoice = (nextChoice: ConsentChoice) => {
    choiceRef.current = nextChoice
    setChoice(nextChoice)
    setStorageError(null)

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice)
    } catch (error) {
      console.error('Unable to save privacy preferences to browser storage.', error)
      setStorageError('Your choice applies for this visit, but could not be saved in this browser.')
    }

    setIsOpen(false)
  }

  return (
    <>
      {analyticsEnabled && choice === 'accepted' && <Analytics beforeSend={beforeSend} />}

      {isReady && isOpen && (
        <aside
          aria-label="Privacy preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:p-5"
        >
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">Privacy preferences</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Allow optional analytics to help improve this site? Analytics stay off unless you allow them.
              You can change your choice later in the footer.
            </p>
            {storageError && (
              <p className="mt-2 text-xs text-destructive" role="alert">
                {storageError}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => saveChoice('rejected')}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => saveChoice('accepted')}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-gradient px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            >
              Allow analytics
            </button>
          </div>
        </aside>
      )}

      {storageError && !isOpen && (
        <div
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-xl border border-border bg-white/95 p-4 text-sm text-foreground shadow-xl backdrop-blur-xl"
          role="status"
        >
          <span>{storageError}</span>
          <button
            type="button"
            onClick={() => setStorageError(null)}
            className="shrink-0 rounded px-2 py-1 font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  )
}

export function PrivacyPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className="pointer-events-auto mt-2 rounded-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
    >
      Privacy preferences
    </button>
  )
}
