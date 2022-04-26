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
        <span>Search or Type ⌘ + K</span>
        <span
          onClick={() => handleSetShowMainItemDraft(true)}
        >Add new item</span>
        <span>Sort most recent</span>
      </div>
      <div className={styles.right}>
        {itemCount} items
      </div>
    </div>
  )
}
