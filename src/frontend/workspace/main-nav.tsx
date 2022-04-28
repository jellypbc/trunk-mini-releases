import React from 'react'
import styles from './main-nav.module.css'

type MainNavProps = {
  itemCount: number
  handleSetShowMainItemDraft: (state: boolean) => void
}

export default function MainNav({ itemCount, handleSetShowMainItemDraft } : MainNavProps ) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.search}>Search or Type ⌘ + K</span>
        <span
          onClick={() => handleSetShowMainItemDraft(true)}
          className={styles.addItemButton}
        >Add new item</span>
        <span
          className={styles.sortItems}
        >
          <span className={styles.sortLabel}>Sort</span>
          <span>Most recent</span>
        </span>
      </div>
      <div className={styles.right}>
        {itemCount} items
      </div>
    </div>
  )
}
