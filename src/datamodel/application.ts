import type { ReadTransaction, WriteTransaction } from "replicache";
import { nanoid } from "nanoid";
import { z } from "zod";
// import { randInt } from "../util/rand";

export const applicationSchema = z.object({
  type: z.literal("application"),
  text: z.string()
});

export type Application = z.infer<typeof applicationSchema>;

export function putApplication(
  tx: WriteTransaction,
  { id, application }: { id: string; application: Application }
): Promise<void> {
  return tx.put(key(id), application);
}

export async function getApplication(
  tx: ReadTransaction,
  id: string
): Promise<Application | null> {
  const jv = await tx.get(key(id));
  if (!jv) {
    console.log(`Specified application ${key(id)} not found.`);
    return null;
  }
  return applicationSchema.parse(jv);
}

export async function updateApplication(
  tx: WriteTransaction,
  stuff: { id: string; text: string }
): Promise<any>{
  const { id, text } = stuff
  let application = ((await tx.get(key(id)) as unknown) as Application)
  application.text = text
  console.log('application new', application)

  // await tx.put(key(id), application)
  await putApplication(tx, { id, application });
}

function key(id: string): string {
  return `${applicationPrefix}${id}`;
}

export const applicationPrefix = "app-";

export function randomApplication() {
  return {
    id: nanoid(),
    application: {
      type: "application",
      text: "Hello World"
    } as Application,
  };
}