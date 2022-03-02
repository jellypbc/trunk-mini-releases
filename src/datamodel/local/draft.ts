import { nanoid } from 'nanoid'
import { z } from 'zod'

const LOCAL_STORAGE_KEY = 'trunk-mini.item-drafts'

export const draftSchema = z.object({
  type: z.literal(`item`),
  id: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
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
    createdAt: new Date().toISOString(),
    createdBy: '',
    title: '<p>Untitled</p>',
    content: '<p></p>',
    highlight: '<p></p>'
  } as Draft;
}
