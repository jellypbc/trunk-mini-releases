import type { ReadTransaction, WriteTransaction } from 'replicache'
import { randInt } from '../util/rand'
import { supabase } from '../lib/supabase-client'

const colors = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9844a",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  "#277da1",
]

const avatars = [
  ["🐶", "Puppy"],
  ["🐱", "Kitty"],
  ["🐭", "Mouse"],
  ["🐹", "Hamster"],
  ["🐰", "Bunny"],
  ["🦊", "Fox"],
  ["🐻", "Bear"],
  ["🐼", "Panda"],
  ["🐨", "Koala"],
  ["🐯", "Tiger"],
  ["🦁", "Lion"],
  ["🐮", "Cow"],
  ["🐷", "Piggy"],
  ["🐵", "Monkey"],
  ["🐣", "Chick"],
]

import { z } from 'zod'

export const userInfoSchema = z.object({
  avatar: z.string(),
  name: z.string(),
  color: z.string(),
})

export const supabaseUserInfoSchema = z.object({
  email: z.string(),
  username: z.string(),
  avatarURL: z.string(),
  trunkIDs: z.string(),
})


// TODO: It would be good to merge this with the first-class concept of `client`
// that Replicache itself manages if possible.
export const clientStateSchema = z.object({
  cursor: z.object({
    x: z.number(),
    y: z.number(),
  }),
  overID: z.string(),
  selectedID: z.string(),
  userInfo: userInfoSchema,
  selectedItemID: z.string(),
  supabaseUserInfo: supabaseUserInfoSchema,
})

export type UserInfo = z.infer<typeof userInfoSchema>
export type ClientState = z.infer<typeof clientStateSchema>
export type SupabaseUserInfo = z.infer<typeof supabaseUserInfoSchema>

export async function initClientState(
  tx: WriteTransaction,
  { id, defaultUserInfo, defaultSupabaseUserInfo }: { id: string; defaultUserInfo: UserInfo, defaultSupabaseUserInfo: SupabaseUserInfo}
): Promise<void> {
  let supabaseProfileData : any
  await getProfile()

  async function getProfile() {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, trunk_ids`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        supabaseProfileData = data
      }

    } catch (error :any) {
      alert(error.message)
    } finally {

    }
  }

  const changes = {
    trunkIDs: supabaseProfileData.trunk_ids,
    username: supabaseProfileData.username,
  }

  const supabaseUserInfo = {...defaultSupabaseUserInfo, ...changes}

  if (await tx.has(key(id))) {
    return;
  }

  await putClientState(tx, {
    id,
    clientState: {
      cursor: {
        x: 0,
        y: 0,
      },
      overID: "",
      selectedID: "",
      userInfo: defaultUserInfo,
      selectedItemID: "",
      supabaseUserInfo: supabaseUserInfo,
    },
  });
}

export async function getClientState(
  tx: ReadTransaction,
  id: string
): Promise<ClientState> {
  const jv = await tx.get(key(id));
  if (!jv) {
    throw new Error("Expected clientState to be initialized already: " + id);
  }
  return clientStateSchema.parse(jv);
}

export function putClientState(
  tx: WriteTransaction,
  { id, clientState }: { id: string; clientState: ClientState }
): Promise<void> {
  return tx.put(key(id), clientState);
}

export async function setUsername(
  tx: WriteTransaction,
  { id, username } : { id: string, username: string }
): Promise<void> {
  const clientState = await getClientState(tx, id)
  clientState.supabaseUserInfo.username = username
  await putClientState(tx, { id, clientState})
}

export async function setTrunkIDs(
  tx: WriteTransaction,
  { id, trunkIDs } : { id: string, trunkIDs: string }
): Promise<void> {
  const clientState = await getClientState(tx, id)
  clientState.supabaseUserInfo.trunkIDs = trunkIDs
  await putClientState(tx, { id, clientState})
}

export async function setAvatarURL(
  tx: WriteTransaction,
  {id, avatarURL } : { id: string, avatarURL: string }
): Promise<void> {
  const clientState = await getClientState(tx, id)
  clientState.supabaseUserInfo.avatarURL = avatarURL
  await putClientState(tx, { id, clientState})
}

export async function setCursor(
  tx: WriteTransaction,
  { id, x, y }: { id: string; x: number; y: number }
): Promise<void> {
  const clientState = await getClientState(tx, id);
  clientState.cursor.x = x;
  clientState.cursor.y = y;
  await putClientState(tx, { id, clientState });
}

export async function overShape(
  tx: WriteTransaction,
  { clientID, shapeID }: { clientID: string; shapeID: string }
): Promise<void> {
  const client = await getClientState(tx, clientID);
  client.overID = shapeID;
  await putClientState(tx, { id: clientID, clientState: client });
}

export async function selectShape(
  tx: WriteTransaction,
  { clientID, shapeID }: { clientID: string; shapeID: string }
): Promise<void> {
  const client = await getClientState(tx, clientID);
  client.selectedID = shapeID;
  await putClientState(tx, { id: clientID, clientState: client });
}

export async function selectItem(
  tx: WriteTransaction,
  { clientID, itemID } : { clientID: string; itemID: string }
): Promise<void> {
  const client = await getClientState(tx, clientID);
  client.selectedItemID = itemID;
  await putClientState(tx, { id: clientID, clientState: client });
}

export function randUserInfo(): UserInfo {
  const [avatar, name] = avatars[randInt(0, avatars.length - 1)];
  return {
    avatar,
    name,
    color: colors[randInt(0, colors.length - 1)],
  };
}


function key(id: string): string {
  return `${clientStatePrefix}${id}`;
}

export const clientStatePrefix = `client-state-`;
