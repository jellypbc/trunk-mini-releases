import { nanoid } from 'nanoid'
import { z } from 'zod'
import type { ReadTransaction, WriteTransaction } from "replicache";

export const arrowSchema = z.object({
  type: z.literal(`arrow`),
  createdAt: z.string(),
  createdBy: z.string(),
  frontItemID: z.string(),
  backItemID: z.string(),
  content: z.string(),
  highlight: z.string(),
  official: z.boolean(),
  to: z.number(),
  from: z.number(),
  parentItemID: z.string(),
  kind: z.string(),
});

export async function getArrow(
  tx: ReadTransaction,
  id: string
): Promise<Arrow | null> {
  const jv = await tx.get(key(id));
  if (!jv) {
    console.log(`Specified arrow ${id} not found.`);
    return null;
  }
  return arrowSchema.parse(jv);
}

export function putArrow(
  tx: WriteTransaction,
  { id, arrow }: { id: string; arrow: Arrow }
): Promise<void> {
  return tx.put(key(id), arrow);
}

export async function deleteArrow(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id));
}

export type Arrow = z.infer<typeof arrowSchema>;

function key(id: string): string {
  return `${arrowPrefix}${id}`;
}

export const arrowPrefix = "arrow-";

export function randomArrow() {
  return {
    id: nanoid(),
    arrow: {
      type: "arrow",
      createdAt: new Date().toISOString(),
      createdBy: '',
      frontItemID: '',
      backItemID: '',
      content: '<p></p>',
      highlight: '<p></p>',
      official: false,
      to: 0,
      from: 0,
      parentItemID: '',
      kind: '',
    } as Arrow,
  }
}