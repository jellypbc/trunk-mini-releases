import type { Replicache } from 'replicache'

import { useSubscribe } from 'replicache-react'
import { getClientState, clientStatePrefix } from './client-state'
import { getShape, shapePrefix } from './shape'
import { getItem, itemPrefix } from './item'
import { getArrow, arrowPrefix } from './arrow'
import type { M } from './mutators'

export function useItemIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const items = (await tx
        .scan({ prefix: itemPrefix })
        .keys()
        .toArray()) as string[]
      return items.map((k) => k.substring(itemPrefix.length))
    },
    []
  )
}

export function useItemByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      const item = await getItem(tx, id)
      if (item) {
        item.arrows = JSON.parse(item.arrows)
        item.createdAt = new Date(item.createdAt) as unknown as any
      }
      return item
    },
    null
  )
}

export function useArrowIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const arrows = (await tx
        .scan({ prefix: arrowPrefix })
        .keys()
        .toArray()) as string[]
      return arrows.map((k) => k.substring(arrowPrefix.length))
    },
    []
  )
}

export function useArrowByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      const arrow = await getArrow(tx, id)
      if (arrow) {
        arrow.createdAt = new Date(arrow.createdAt) as unknown as any
      }
      return arrow
    },
    null
  )
}

export function useUserInfo(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).userInfo
    },
    null
  )
}

export function useSupabaseUserInfo(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).supabaseUserInfo
    },
    null
  )
}

export function useClientEmail(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).supabaseUserInfo.email
    },
    null
  )
}

export function useClientUsername(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).supabaseUserInfo.username
    },
    null
  )
}

export function useClientAvatarURL(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).supabaseUserInfo.avatarURL
    },
    null
  )
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
  )
}


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

export function getClientStates(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const clientStates = await tx.scan({ prefix: clientStatePrefix }).entries().toArray();
      const things = clientStates && clientStates.filter((clientState :any) => clientState[1].hasOwnProperty("supabaseUserInfo") )
      return things
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

export function useAuthorsByItemID(rep: Replicache<M>, itemID: string) {
  const item = useItemByID(rep, itemID) as unknown as any
  return (
    item &&
    item.arrows.filter((a: any) => {
      return a.kind === 'author' && a.backItemID === itemID
    }).map((a: any) => a.arrowID)
  )
}

export function useAuthorItemsByArrowIDs(rep: Replicache<M>, arrowIDs: string[]){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    arrows.map((a: any) => a.frontItemID)
  )
}

export function useShapeIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const shapes = await tx.scan({ prefix: shapePrefix }).keys().toArray()
      return shapes.map((k) => k.substring(shapePrefix.length))
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
  )
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

