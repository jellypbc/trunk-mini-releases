import type { Replicache } from "replicache";
import { useSubscribe } from "replicache-react";
import { getClientState, clientStatePrefix } from "./client-state";
import { getShape, shapePrefix } from "./shape";
import { getItem, itemPrefix } from "./item"
import { getArrow, arrowPrefix } from './arrow'
import type { M } from "./mutators";

export function getItems(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).entries().toArray();
      return items
    },
    []
  )
}

export function getItemCount(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).keys().toArray()
      return items.length.toString()
    },
    null
  )
}

export function getArrows(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const arrows = await tx.scan({ prefix: arrowPrefix }).entries().toArray();
      return arrows
    },
    []
  )
}

export function getCommentArrowsByArrowIDArray(rep: Replicache<M>, arrowIDs: string[]) {
  let arrows : any[] = []
  arrowIDs && arrowIDs.map(id => {
    const arrow = useArrowByID(rep, id)
    arrows.push(arrow)
  })
  return arrows
}

export function getSortedItems(rep: Replicache<M>) {
  const items = getItems(rep)
  let parsedItems: any[] = []
  items.map(([k, v]: [string, any]) => {
    const changes = {
      createdAt:  new Date(v.createdAt),
      arrows: v.arrows && JSON.parse(v.arrows) || [],
    }
    let value = { ...v, ...changes }
    Object.assign(value, { id: k.substr(itemPrefix.length) })
    parsedItems.push(value)
  })
  const sortedItems = parsedItems.sort((a, b) => b.createdAt - a.createdAt)
  return sortedItems
}

export function useItemByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      const i = await getItem(tx, id);
      if (i) {
        i.arrows = JSON.parse(i.arrows)
        i.createdAt = new Date(i.createdAt) as unknown as any
      }
      return i
    },
    null
  );
}

export function useArrowByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      const a = await getArrow(tx, id);
      return a
    },
    null
  )
}

export function getArrowsByIDs(rep: Replicache<M>, arrowIDs: any[]) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = getArrows(rep)
  let arrows : any[] = []
  arrowIDs && arrowIDs.map((arrowID: any) => {
    allArrows.find(([k, v]: [string, any]) => {
      const id = k.substr(arrowPrefix.length)
      if (id === arrowID) {
        arrows.push(Object.assign(v, {id: id}))
      }
    })
  })
  return arrows
}

export function useShapeIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const shapes = await tx.scan({ prefix: shapePrefix }).keys().toArray();
      return shapes.map((k) => k.substr(shapePrefix.length));
    },
    []
  );
}

export function useItemIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).keys().toArray();
      return items.map((k) => k.substr(itemPrefix.length));
    },
    []
  );
}

export function useShapeByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      return await getShape(tx, id);
    },
    null
  );
}

export function useUserInfo(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).userInfo;
    },
    null
  );
}

export function useOverShapeID(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).overID;
    },
    ""
  );
}

export function useSelectedShapeID(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).selectedID;
    },
    ""
  );
}

export function useCollaboratorIDs(rep: Replicache<M>) {
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
  rep: Replicache<M>,
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
