import React from 'react'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'
import { useItemByID } from '../../datamodel/subscriptions'


type Props = {
  reflect: Reflect<M>
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function ArrowsAuthoredBy({ reflect, fullArrows, handleSetSelectedItemID} : Props) {

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
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </div>
  )
}

type FrontArrowItemProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}


function AuthorArrowItem({ reflect, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(reflect, itemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}


