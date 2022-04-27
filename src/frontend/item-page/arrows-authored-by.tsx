import React from 'react'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Replicache } from 'replicache'
import { useItemByID } from '../../datamodel/subscriptions'


type Props = {
  rep: Replicache<M>
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function ArrowsAuthoredBy({ rep, fullArrows, handleSetSelectedItemID} : Props) {

  const authorArrows= fullArrows.filter((a: any) => a.kind === 'author' ) || []
  const authorItemIDs = authorArrows.map((a: any) => a.backItemID)
  const uniqueAuthorItemIDs = [...new Set(authorItemIDs)]
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>Authored</span>
        <span className={styles.count}>{uniqueAuthorItemIDs.length}</span>

      </div>
      {uniqueAuthorItemIDs.map((itemID: any) => {
        return (
          <AuthorArrowItem
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

type FrontArrowItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}


function AuthorArrowItem({ rep, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
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


