import type { Reflect } from '@rocicorp/reflect'

import { useSubscribe } from 'replicache-react'
import { getClientState, clientStatePrefix } from './client-state'
import { getShape, shapePrefix } from './shape'
import { getItem, itemPrefix } from './item'
import { getArrow, arrowPrefix } from './arrow'
import type { M } from './mutators'

// Item
export function useItemIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
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

export function useItemByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
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

export function useItemArrowIDsByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const item = await getItem(tx, id)
      const arrows = item && JSON.parse(item.arrows) as unknown as any
      const arrowIDArray : [] = arrows && arrows.map((arrow: any) => arrow.arrowID)
      return arrowIDArray
    },
    null
  )
}

export function useSortedItems(reflect: Reflect<M>) {
  const items = useItems(reflect)
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

export function useItems(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).entries().toArray();
      return items
    },
    []
  )
}

export function useItemCount(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async(tx) => {
      const items = await tx.scan({ prefix: itemPrefix }).keys().toArray()
      return items.length.toString()
    },
    null
  )
}

// User Info
export function useUserInfo(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).userInfo
    },
    null
  )
}

export function useSupabaseUserInfo(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).supabaseUserInfo
    },
    null
  )
}

export function useClientEmail(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).supabaseUserInfo.email
    },
    ""
  )
}

export function useClientUsername(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).supabaseUserInfo.username
    },
    null
  )
}

export function useClientTrunkIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).supabaseUserInfo.trunkIDs
    },
    null
  )
}

export function useClientTrunkIDsArray(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const trunkIDs = (await getClientState(tx, await reflect.clientID)).supabaseUserInfo.trunkIDs
      const trunkIDsArray = JSON.parse(trunkIDs)
      return trunkIDsArray
    },
    []
  )
}

export function useClientAvatarURL(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).supabaseUserInfo.avatarURL
    },
    null
  )
}

export function useClientInfo(
  reflect: Reflect<M>,
  clientID: string
) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getClientState(tx, clientID);
    },
    null
  )
}

// Arrow
export function useArrowIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
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

export function useArrowByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
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

export function useArrows(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async(tx) => {
      const arrows = await tx.scan({ prefix: arrowPrefix }).entries().toArray();
      return arrows
    },
    []
  )
}

export function useCommentArrows(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
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

export function useCommentArrowsByItemID(reflect: Reflect<M>, itemID: string) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(reflect)
  const arrowIDs = useItemArrowIDsByID(reflect, itemID) as unknown as any
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

export function useAuthorArrowsByItemID(reflect: Reflect<M>, itemID: string) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(reflect)
  const arrowIDs = useItemArrowIDsByID(reflect, itemID) as unknown as any
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

export function useArrowsByIDs(reflect: Reflect<M>, arrowIDs: any[]) {
  // this needs to be refactored bc allArrows can be a huge array
  const allArrows = useArrows(reflect)
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
export function useShapeIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const shapes = await tx.scan({ prefix: shapePrefix }).keys().toArray()
      return shapes.map((k: string) => k.substring(shapePrefix.length))
    },
    []
  )
}

export function useShapeByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getShape(tx, id);
    },
    null
  )
}

export function useOverShapeID(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).overID;
    },
    ""
  )
}

export function useSelectedShapeID(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).selectedID;
    },
    ""
  )
}

export function useCollaboratorIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const clientIDs = await tx
        .scan({ prefix: clientStatePrefix })
        .keys()
        .toArray();
      const myClientID = await reflect.clientID;
      return clientIDs
        .filter((k: string) => !k.endsWith(myClientID))
        .map((k: string) => k.substring(clientStatePrefix.length));
    },
    []
  )
}

