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
        <span
          onClick={() => handleSetShowMainItemDraft(true)}
          className={styles.addItemButton}
        >Add new item</span>
      </div>
      { itemCount > 0 &&
        <div className={styles.right}>
          {itemCount} items
        </div>
      }
    </div>
  )
}
