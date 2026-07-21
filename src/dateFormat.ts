const formatter = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })

export function formatDate(timestamp: number): string {
  return formatter.format(new Date(timestamp))
}
