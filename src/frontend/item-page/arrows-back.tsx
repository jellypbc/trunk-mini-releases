import React from 'react'
import {
  useItemByID,
  useAuthorArrowsByItemID
} from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'

type Props = {
  reflect: Reflect<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function ArrowsBack({ reflect, itemID, fullArrows, handleSetSelectedItemID } : Props ) {
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
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </div>
  )
}

type BackArrowItemProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

function BackArrowItem({ reflect, itemID, handleSetSelectedItemID }: BackArrowItemProps){
  const item = useItemByID(reflect, itemID)
  return (
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          reflect={reflect}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
      <span>{item.publicationDate}</span>
      <span className={styles.arrowTitle}>{htmlToText(item.title) || 'nothing here'}</span>
    </div>
  )
}


function AuthorInfo({reflect, itemID, handleSetSelectedItemID}: any){
  const authorArrows = useAuthorArrowsByItemID(reflect, itemID)

  return (
    authorArrows && authorArrows.length > 0 ?
      <AuthorItem
        reflect={reflect}
        itemID= {authorArrows[0].frontItemID}
        handleSeSelectedItemID={handleSetSelectedItemID}
        authorCount={authorArrows.length}
      /> : null
  )
}

function AuthorItem({reflect, itemID, handleSetSelectedItemID, authorCount}: any) {
  const item = useItemByID(reflect, itemID)
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
