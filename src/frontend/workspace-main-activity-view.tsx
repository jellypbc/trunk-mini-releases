import React, { useState } from 'react'
import styles from './workspace-main-activity-view.module.css'
import { htmlToText } from '../util/htmlToText'
import { dateInWords } from '../lib/dateInWords'
import { useRouter } from 'next/router'

type MainActivityViewProps = {
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

type ActivityItemProps = {
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

export default function MainActivityView({ items, handleSetSelectedItemID, roomID } : MainActivityViewProps ) {
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

function ActivityItem({ item, handleSetSelectedItemID, roomID } : ActivityItemProps ){
  const safeTitle = htmlToText(item.title)
  const safeCreatedAt = dateInWords(item.createdAt) || 'a while ago'
  const router = useRouter()

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
      <div className={styles.authorContainer}>
        <span className={styles.by}>By</span>
        <span className={styles.authorName}>Emma Dowling</span>
      </div>
      <div className={styles.arrowContainer}>
        <div className={styles.arrowCount}>Backlinks</div>
        <div className={styles.addLink}>Add Link</div>

      </div>
    </div>
  )
}
