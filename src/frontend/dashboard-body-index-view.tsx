import React, { useState } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './dashboard-body-index-view.module.css'
import { htmlToText } from '../util/htmlToText'
import { useItemByID, useArrowsByIDs, useAuthorsByItemID } from '../datamodel/subscriptions'

type IndexViewProps = {
  setShowIndex: (state: boolean) => void
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
  rep: Replicache<M>
}

export default function IndexView({setShowIndex, items, handleSetSelectedItemID, rep} : IndexViewProps) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div
          className={styles.navToActivityView}
          onClick={() => setShowIndex(false)}
        >
          Back
        </div>
        <div className={styles.header}>
          All items
        </div>
        <div className={styles.sortOptions}>
          <div>Sort results by:</div>
          <div>Title</div>
          <div>Most recent</div>
        </div>
      </div>
      <div className={styles.itemIndex}>
        {items.slice(0, itemsShown).map((item : any) => {
          return (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => handleSetSelectedItemID(item.id)}
            >
              <div className={styles.itemTitle}>
                {item.title && htmlToText(item.title)}
              </div>
              {item.arrows.length > 0 &&
                <AuthorInfo
                  rep={rep}
                  itemID={item.id}
                />
              }
            </div>
          )
        })}
      </div>
      <button
        className={'button button-primary'} onClick={() => addTenItems()}
      > Show more items</button>
    </div>
  )
}

type AuthorInfoProps = {
  rep: Replicache<M>
  itemID: string
}

function AuthorInfo({rep, itemID}: AuthorInfoProps){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    <AuthorItems
      rep={rep}
      authorArrowIDs={authors}
    />
  )
}

type AuthorItemsProps = {
  rep: Replicache<M>
  authorArrowIDs: string[]
}

function AuthorItems({rep, authorArrowIDs} : AuthorItemsProps) {
  const fullArrows = useArrowsByIDs(rep, authorArrowIDs)

  return (
    fullArrows.length > 0 ?
      <AuthorItem
        rep={rep}
        itemID={fullArrows[0].frontItemID}
        authorLength={fullArrows.length}
      />
      :
      null
  )
}

type AuthorItemProps = {
  rep: Replicache<M>
  itemID: string
  authorLength: number
}


function AuthorItem({rep, itemID, authorLength}: AuthorItemProps) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div>
      By {htmlToText(item.title).split('[')[0]}  {authorLength > 1 && `+ ${authorLength - 1}`}
    </div>
  )
}
