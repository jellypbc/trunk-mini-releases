import React, { useState } from 'react'
import styles from './main-activity-view.module.css'
import { htmlToText } from '../../util/htmlToText'
import { dateInWords } from '../../lib/dateInWords'
import { useRouter } from 'next/router'
import {
  useAuthorsByItemID,
  useAuthorItemsByArrowIDs,
  useItemByID
} from '../../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'

type MainActivityViewProps = {
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  rep: Replicache<M>
}

type ActivityItemProps = {
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  rep: Replicache<M>
}

type AuthorInfoProps = {
  rep: Replicache<M>
  authorArrows: any[]
}

export default function MainActivityView({ items, handleSetSelectedItemID, roomID, rep } : MainActivityViewProps ) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function showTenMoreItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.container}>
      {items.slice(0, itemsShown).map((item : any) =>
        <ActivityItem
          key={`activity-item-${item.id}`}
          item={item}
          handleSetSelectedItemID={handleSetSelectedItemID}
          roomID={roomID}
          rep={rep}
        />
      )}
      <div className={styles.buttonContainer}>
        <button
          className={`btn btn-1`}
          onClick={showTenMoreItems}
        >
          Show 10 more items
        </button>
      </div>
    </div>
  )
}

function ActivityItem({ item, handleSetSelectedItemID, roomID, rep } : ActivityItemProps ){
  const safeTitle = htmlToText(item.title)
  const safeCreatedAt = dateInWords(item.createdAt) || 'a while ago'
  const router = useRouter()
  const authorArrows = useAuthorsByItemID(rep, item.id)

  function routeToItem(){
    router.push(`/workspace/${roomID}/${item.id}`)
    handleSetSelectedItemID(item.id)
  }
  return (
    <div
      className={styles.activityItemContainer}
      onClick={() => routeToItem()}
    >
      <div className={styles.createdContainer}>
        <div className={styles.createdBy}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
            </div>
          </div>
          <div className={styles.createdByEmail}>{item.createdBy}</div>
        </div>
        <div className={styles.createdAt}>{safeCreatedAt}</div>
      </div>
      <div className={styles.titleContainer}>
        {safeTitle}
      </div>
      {authorArrows && authorArrows.length > 0 &&
        <AuthorInfo
          rep={rep}
          authorArrows={authorArrows}
        />
      }

      <div className={styles.arrowContainer}>
        <div className={styles.arrowCountContainer}>
          <span className={styles.arrowCount}>{item.arrows.length}</span>
          <span className={styles.arrowLabel}>Backlinks</span>
        </div>
        <div className={styles.addLink}>Add Link</div>
      </div>
    </div>
  )
}

function AuthorInfo({ rep, authorArrows} : AuthorInfoProps){
  const authorItemIDs = useAuthorItemsByArrowIDs(rep, authorArrows)
  return (
    authorItemIDs &&
    <div className={styles.authorContainer}>
      <span className={styles.by}>By</span>
      <span className={styles.authorName}>
        {authorItemIDs.slice(0,1).map((itemID: string) =>
          <AuthorName
            key={`author-${itemID}`}
            rep={rep}
            itemID={itemID}
            authorCount={authorItemIDs.length}
          />
        )}
      </span>
    </div>
  )
}

function AuthorName({ rep, itemID, authorCount}: any){
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <>
      <span>{htmlToText(item.title).split(`[`)[0]} {authorCount > 1 && `+ ${authorCount - 1}`}</span>
    </>
  )
}
