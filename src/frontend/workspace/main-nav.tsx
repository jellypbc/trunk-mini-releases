import React from 'react'
import styles from './main-nav.module.css'

type MainNavProps = {
  itemCount: number
  handleSetShowMainItemDraft: (state: boolean) => void
  handleSetCommandBar: (state: boolean) => void
}

export default function MainNav({ itemCount, handleSetShowMainItemDraft, handleSetCommandBar } : MainNavProps ) {

  function handleShowMainItemDraftAndCloseCommandBar() {
    handleSetShowMainItemDraft(true)
    handleSetCommandBar(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span
          onClick={() => handleShowMainItemDraftAndCloseCommandBar()}
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
