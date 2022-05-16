import React, { useState } from 'react'
import styles from './dashboard-body-index-view.module.css'
import { htmlToText } from '../util/htmlToText'

type IndexViewProps = {
  setShowIndex: (state: boolean) => void
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
}

export default function IndexView({setShowIndex, items, handleSetSelectedItemID} : IndexViewProps) {
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