import type { Replicache } from "replicache";
import { useSubscribe } from "replicache-react";
import { getClientState, clientStatePrefix } from "./client-state";
import { getShape, shapePrefix } from "./shape";
import { getItem, itemPrefix } from "./item"
import type { mutators } from "./mutators";

export function getItems(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).entries().toArray();
      return items
    },
    []
  )
}

export function getSortedItems(rep: Replicache<typeof mutators>) {
  const items = getItems(rep)
  let parsedItems: any[] = []
  items.map(([k, v]: [string, any]) => {
    const changes = {
      createdAt:  new Date(v.createdAt)
    }
    let value = { ...v, ...changes }
    Object.assign(value, { id: k.substr(itemPrefix.length) })
    parsedItems.push(value)
  })
  const sortedItems = parsedItems.sort((a, b) => b.createdAt - a.createdAt)
  return sortedItems
}

export function useItemByID(rep: Replicache<typeof mutators>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      return await getItem(tx, id);
    },
    null
  );
}


export function useShapeIDs(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const shapes = await tx.scan({ prefix: shapePrefix }).keys().toArray();
      return shapes.map((k) => k.substr(shapePrefix.length));
    },
    []
  );
}

export function useShapeByID(rep: Replicache<typeof mutators>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      return await getShape(tx, id);
    },
    null
  );
}

export function useUserInfo(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).userInfo;
    },
    null
  );
}

export function useOverShapeID(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).overID;
    },
    ""
  );
}

export function useSelectedShapeID(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).selectedID;
    },
    ""
  );
}

export function useCollaboratorIDs(rep: Replicache<typeof mutators>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const clientIDs = await tx
        .scan({ prefix: clientStatePrefix })
        .keys()
        .toArray();
      const myClientID = await rep.clientID;
      return clientIDs
        .filter((k) => !k.endsWith(myClientID))
        .map((k) => k.substr(clientStatePrefix.length));
    },
    []
  );
}

export function useClientInfo(
  rep: Replicache<typeof mutators>,
  clientID: string
) {
  return useSubscribe(
    rep,
    async (tx) => {
      return await getClientState(tx, clientID);
    },
    null
  );
}
