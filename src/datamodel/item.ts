import type { ReadTransaction, WriteTransaction } from "replicache";
import { nanoid } from "nanoid";
import { z } from "zod";

export const itemSchema = z.object({
  type: z.literal(`item`),
  createdAt: z.string(),
  createdBy: z.string(),
  title: z.string(),
  content: z.string(),
  arrows: z.string(),
  highlight: z.string(),
  sourceURL: z.string()
});

export type Item = z.infer<typeof itemSchema>;

export async function getItem(
  tx: ReadTransaction,
  id: string
): Promise<Item | null> {
  const jv = await tx.get(key(id));
  if (!jv) {
    console.log(`Specified item ${id} not found.`);
    return null;
  }
  return itemSchema.parse(jv);
}

export function putItem(
  tx: WriteTransaction,
  { id, item }: { id: string; item: Item }
): Promise<void> {
  return tx.put(key(id), item);
}

export async function deleteItem(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id));
}

export async function updateItemTitle(
  tx: WriteTransaction,
  { id, title }: { id: string; title: string }
): Promise<void> {
  const item = await getItem(tx, id)
  return tx.put(key(id), {...item, title: title})
}

export async function updateItemContent(
  tx: WriteTransaction,
  { id, content }: { id: string; content: string }
): Promise<void> {
  const item = await getItem(tx, id)
  return tx.put(key(id), {...item, content: content})
}

export async function updateItemArrows(
  tx: WriteTransaction,
  { id, arrows }: { id: string, arrows: any[] }
): Promise<void> {
  const item = await getItem(tx, id)
  return tx.put(key(id), {...item, arrows: JSON.stringify(arrows)})
}

export async function updateItemAddSingleArrow(
  tx: WriteTransaction,
  { id, arrow } : { id: string, arrow: any }
): Promise<void> {
  const item = await getItem(tx, id)
  let arrows = item ? JSON.parse(item.arrows) : []
  arrows.push(arrow)
  const stringifiedArrows = JSON.stringify(arrows)
  const changes = {
    arrows: stringifiedArrows
  }

  const changedItem = {...item, ...changes}
  return tx.put(key(id), changedItem)
}

export async function updateItemArrowsDeleteArrow(
  tx: WriteTransaction,
  { itemID, arrowID } : { itemID: string, arrowID: string }
): Promise<void> {
  const item = await getItem(tx, itemID)
  let arrows = item ? JSON.parse(item.arrows) : []
  arrows = arrows.filter((arrow : any) => arrow.arrowID !== arrowID)
  const stringifiedArrows = JSON.stringify(arrows)
  const changes = {
    arrows: stringifiedArrows
  }
  const changedItem = {...item, ...changes}
  return tx.put(key(itemID), changedItem)
}


export async function updateItemSourceURL(
  tx: WriteTransaction,
  { id, sourceURL } : { id: string, sourceURL: string }
): Promise<void> {
  const item = await getItem(tx, id)
  return tx.put(key(id), {...item, sourceURL: sourceURL})
}

function key(id: string): string {
  return `${itemPrefix}${id}`;
}

export const itemPrefix = "item-";

export function randomItem() {
  return {
    id: nanoid(),
    item: {
      type: 'item',
      createdAt: new Date().toISOString(),
      createdBy: '',
      title: 'Untitled',
      content: '',
      arrows: '[]', // {arrowID, to, from, kind, backItemID}
      highlight: '',
      sourceURL: ''
    } as Item,
  };
}
