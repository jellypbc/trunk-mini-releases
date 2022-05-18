import type { Replicache } from 'replicache'

import { useSubscribe } from 'replicache-react'
import { getClientState, clientStatePrefix } from './client-state'
import { getShape, shapePrefix } from './shape'
import { getItem, itemPrefix } from './item'
import { getArrow, arrowPrefix } from './arrow'
import type { M } from './mutators'

// Item
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

export function useItemArrowIDsByID(rep: Replicache<M>, id: string) {
  return useSubscribe(
    rep,
    async (tx) => {
      const item = await getItem(tx, id)
      const arrows = item && JSON.parse(item.arrows) as unknown as any
      const arrowIDArray : [] = arrows && arrows.map((arrow: any) => arrow.arrowID)
      return arrowIDArray
    },
    null
  )
}

export function useSortedItems(rep: Replicache<M>) {
  const items = useItems(rep)
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

export function useItems(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).entries().toArray();
      return items
    },
    []
  )
}

export function useItemCount(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).keys().toArray()
      return items.length.toString()
    },
    null
  )
}

// User Info
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
    ""
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

export function useClientTrunkIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).supabaseUserInfo.trunkIDs
    },
    null
  )
}

export function useClientTrunkIDsArray(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const trunkIDs = (await getClientState(tx, await rep.clientID)).supabaseUserInfo.trunkIDs
      const trunkIDsArray = JSON.parse(trunkIDs)
      return trunkIDsArray
    },
    []
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

// Arrow
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

export function useArrows(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const arrows = await tx.scan({ prefix: arrowPrefix }).entries().toArray();
      return arrows
    },
    []
  )
}

export function useCommentArrows(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async(tx) => {
      const arrows = await tx.scan({ prefix: arrowPrefix}).entries().toArray()
      const filtered = arrows.filter((arrow: any) => arrow[1].kind === "comment")
      const simplified : any[] = []
      filtered.map(([k, v]: [string, any]) => {

        const changes = {
          createdAt:  new Date(v.createdAt),
        }
        const thing = {...v, ...changes}
        Object.assign(thing, { id: k.substring(arrowPrefix.length)})
        simplified.push(thing)
      })
      const sortedArrows = simplified.sort((a, b) => b.createdAt - a.createdAt)
      return sortedArrows
    },
    []
  )
}

export function useCommentArrowsByItemID(rep: Replicache<M>, itemID: string) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(rep)
  const arrowIDs = useItemArrowIDsByID(rep, itemID) as unknown as any
  let commentArrows : any[] = []
  arrowIDs && arrowIDs.map((arrowID: string) => {
    allArrows.find(([k, v]: [string, any]) => {
      const id = k.substring(arrowPrefix.length)
      if (id === arrowID && (v.kind === "reference" || v.kind === "comment" || v.kind === "footnote")) {
        commentArrows.push(Object.assign(v, {id: id}))
      }
    })
  })
  return commentArrows
}

export function useAuthorArrowsByItemID(rep: Replicache<M>, itemID: string) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(rep)
  const arrowIDs = useItemArrowIDsByID(rep, itemID) as unknown as any
  let authorArrows : any[] = []
  arrowIDs && arrowIDs.map((arrowID: string) => {
    allArrows.find(([k, v]: [string, any]) => {
      const id = k.substring(arrowPrefix.length)
      if (id === arrowID && v.kind === `author`) {
        authorArrows.push(Object.assign(v, {id: id}))
      }
    })
  })
  return authorArrows
}

export function useArrowsByIDs(rep: Replicache<M>, arrowIDs: any[]) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(rep)
  let arrows : any[] = []
  arrowIDs && arrowIDs.map((arrowID: any) => {
    allArrows.find(([k, v]: [string, any]) => {
      const id = k.substring(arrowPrefix.length)
      if (id === arrowID) {
        arrows.push(Object.assign(v, {id: id}))
      }
    })
  })
  return arrows
}


// Shape
export function useShapeIDs(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      const shapes = await tx.scan({ prefix: shapePrefix }).keys().toArray()
      return shapes.map((k) => k.substring(shapePrefix.length))
    },
    []
  )
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
  )
}

export function useSelectedShapeID(rep: Replicache<M>) {
  return useSubscribe(
    rep,
    async (tx) => {
      return (await getClientState(tx, await rep.clientID)).selectedID;
    },
    ""
  )
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
  )
}

