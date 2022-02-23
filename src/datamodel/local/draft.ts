import { nanoid } from 'nanoid'
import { z } from 'zod'

const LOCAL_STORAGE_KEY = 'trunk-mini.item-drafts'

export const draftSchema = z.object({
  type: z.literal(`item`),
  id: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  title: z.string(),
  content: z.string(),
  highlight: z.string()
});

export type Draft = z.infer<typeof draftSchema>;

export function updateDrafts(drafts: Draft[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drafts))
}

export function randomDraft() {
  return {
    type: 'item',
    id: nanoid(),
    created_at: new Date().toISOString(),
    created_by: '',
    title: '<p>Untitled</p>',
    content: '<p></p>',
    highlight: '<p></p>'
  } as Draft;
}
