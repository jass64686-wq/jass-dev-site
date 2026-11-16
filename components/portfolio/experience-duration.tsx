'use client'

import { useEffect, useState } from 'react'
import { getExperienceDuration } from '@/lib/experience'

type ExperienceDurationValue = ReturnType<typeof getExperienceDuration>
type ExperienceDurationFormat = 'years-months' | 'years-shipping'

export function ExperienceDuration({
  initialDuration,
  className,
  format = 'years-months',
}: {
  initialDuration: ExperienceDurationValue
  className?: string
  format?: ExperienceDurationFormat
}) {
  const [duration, setDuration] = useState(initialDuration)

  useEffect(() => {
    let timer: number

    const updateDuration = () => {
      const now = new Date()
      setDuration(getExperienceDuration(now))

      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      timer = window.setTimeout(updateDuration, nextMonth.getTime() - now.getTime())
    }

    updateDuration()
    return () => window.clearTimeout(timer)
  }, [])

  const formattedDuration =
    format === 'years-shipping'
      ? `${duration.years}.${String(duration.months).padStart(2, '0')}+`
      : `${duration.years}y ${duration.months}m`

  return (
    <span className={className}>
      <span aria-hidden="true">{formattedDuration}</span>
      <span className="sr-only">
        {duration.years} years and {duration.months} months
      </span>
    </span>
  )
}
