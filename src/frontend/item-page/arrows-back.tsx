import React from 'react'
import { useItemByID, useAuthorsByItemID, getArrowsByIDs } from '../../datamodel/subscriptions'
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
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    authors &&
      <AuthorArrows
        rep={rep}
        authorArrowIDs={authors}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
  )
}

function AuthorArrows({rep, authorArrowIDs, handleSetSelectedItemID} : any) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  if (!fullArrows) return null


  return (
    <>
    {fullArrows && fullArrows.length > 0 &&
      <AuthorItem
        key={`author-${fullArrows[0].id}`}
        rep={rep}
        itemID={fullArrows[0].frontItemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        authorCount={fullArrows.length}
      />
    }
    </>
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
