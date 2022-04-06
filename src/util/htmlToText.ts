export function htmlToText(html: string) {
  return html.replace(/<[^>]+>/g, '')
}