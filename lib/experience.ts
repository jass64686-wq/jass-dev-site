export const EXPERIENCE_START_DATE = new Date(2023, 0, 1)
export const EXPERIENCE_START_LABEL = 'Jan 2023'

export function getExperienceDuration(asOf = new Date()) {
  let totalMonths =
    (asOf.getFullYear() - EXPERIENCE_START_DATE.getFullYear()) * 12 +
    asOf.getMonth() -
    EXPERIENCE_START_DATE.getMonth()

  if (asOf.getDate() < EXPERIENCE_START_DATE.getDate()) totalMonths -= 1
  totalMonths = Math.max(0, totalMonths)

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  }
}
