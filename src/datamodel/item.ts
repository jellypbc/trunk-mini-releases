import type { ReadTransaction, WriteTransaction } from "replicache";
import { nanoid } from "nanoid";
import { z } from "zod";

export const itemSchema = z.object({
  type: z.literal(`item`),
  created_at: z.string(),
  created_by: z.string(),
  title: z.string(),
  content: z.string()
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
  console.log('jv', jv)
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

function key(id: string): string {
  return `${itemPrefix}${id}`;
}

export const itemPrefix = "item-";

export function randomItem() {
  return {
    id: nanoid(),
    item: {
      type: 'item',
      created_at: new Date().toISOString(),
      created_by: '',
      title: 'Untitled',
      content: '',
    } as Item,
  };
}
