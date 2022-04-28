import React from 'react'
import {
  getArrowsByIDs,
  useItemByID
} from '../../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import { htmlToText } from '../../util/htmlToText'
import styles from './sidebar-outline.module.css'

type SidebarOutlineProps = {
  rep: Replicache<M>
  item: any
  itemID: string
}

export default function SidebarOutline({ rep, item, itemID } : SidebarOutlineProps) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)

  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  const uniqueSubItemItemIDs = [...new Set(subItemItemIDs)]

  return (
    <div className={styles.container}>
    {uniqueSubItemItemIDs && uniqueSubItemItemIDs.length > 0 &&
      uniqueSubItemItemIDs.map((itemID: any) => {
        return (
          <SubItemArrowItem
            key={`sidebarOutline-${itemID}`}
            itemID={itemID}
            rep={rep}
          />
        )
      })}
    </div>
  )
}

type FrontArrowItemProps = {
  rep: Replicache<M>
  itemID: string
}


function SubItemArrowItem({ rep, itemID }: FrontArrowItemProps){
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div
      className={styles.item}
    >
      <Title
        title={htmlToText(item.title)}
      />
    </div>
  )
}

function Title({ title } : any){
  const truncatedTitle = title.length > 17 && title.substring(0, 17) + "..." || title
  return(
    <div
      className={styles.title}
    >
      {truncatedTitle}
    </div>
  )
}
