export const DAY_ABBR = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const WEEKDAYS = [1, 2, 3, 4, 5]
export const WEEKEND_DAYS = [0, 6]

export function isSameDaySet(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  const setA = new Set(a)
  return b.every((d) => setA.has(d))
}

export function describeWeekDays(weekDays: number[]): string {
  if (weekDays.length === 0) return ''
  if (isSameDaySet(weekDays, WEEKDAYS)) return 'weekdays'
  if (isSameDaySet(weekDays, WEEKEND_DAYS)) return 'weekends'
  if (weekDays.length === 7) return 'every day'
  return [...weekDays]
    .sort((a, b) => a - b)
    .map((d) => DAY_SHORT[d])
    .join(', ')
}
