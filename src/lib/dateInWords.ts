export function dateInWords(date: any) {
  const dateInWords = date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  return dateInWords
}