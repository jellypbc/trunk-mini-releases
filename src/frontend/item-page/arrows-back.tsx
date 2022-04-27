import React from 'react'
import { useItemByID } from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Replicache } from 'replicache'

type Props = {
  rep: Replicache<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function ArrowsBack({ rep, itemID, fullArrows, handleSetSelectedItemID } : Props ) {
  const backArrows = fullArrows.filter((a: any) => a.kind === 'reference' && a.backItemID !== itemID) || []
  const backItemIDs = backArrows.map((a: any) => a.backItemID)
  const uniqueBackItemIDs = [...new Set(backItemIDs)]
  return (
    uniqueBackItemIDs &&
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>←</span>
        <span className={styles.count}>
          {backArrows.length}
        </span>
      </div>
      {uniqueBackItemIDs.map((itemID: any) => {
        return (
          <BackArrowItem
            key={`frontArrow-${itemID}`}
            itemID={itemID}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </div>
  )
}

type BackArrowItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

function BackArrowItem({ rep, itemID, handleSetSelectedItemID }: BackArrowItemProps){
  const item = useItemByID(rep, itemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
