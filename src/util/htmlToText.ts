export function htmlToText(html: string) {
  return html && html.replace(/<[^>]+>/g, '') || ''
}