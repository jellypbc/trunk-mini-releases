import React from 'react'
import {
  useItemByID,
  useAuthorArrowsByItemID
} from '../../datamodel/subscriptions'
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
        <span className={styles.count}>
          {backArrows.length}
        </span>
        <span>Backlinks</span>
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
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
      <span>{item.publicationDate}</span>
      <span className={styles.arrowTitle}>{htmlToText(item.title) || 'nothing here'}</span>
    </div>
  )
}


function AuthorInfo({rep, itemID, handleSetSelectedItemID}: any){
  const authorArrows = useAuthorArrowsByItemID(rep, itemID)

  return (
    authorArrows && authorArrows.length > 0 ?
      <AuthorItem
        rep={rep}
        itemID= {authorArrows[0].frontItemID}
        handleSeSelectedItemID={handleSetSelectedItemID}
        authorCount={authorArrows.length}
      /> : null
  )
}

function AuthorItem({rep, itemID, handleSetSelectedItemID, authorCount}: any) {
  const item = useItemByID(rep, itemID)
  const additionalAuthors = authorCount - 1
  return (
    item &&
    <span
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {htmlToText(item.title).split('[')[0].trim()}
      {additionalAuthors > 0 && ` + ${additionalAuthors}`}
    </span>
  )
}
