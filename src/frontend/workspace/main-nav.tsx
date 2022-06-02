import React from 'react'
import styles from './main-nav.module.css'

type MainNavProps = {
  itemCount: number
  handleSetShowMainItemDraft: (state: boolean) => void
  handleSetCommandBar: (state: boolean) => void
  showMainItemDraft: boolean
}

export default function MainNav({ itemCount, handleSetShowMainItemDraft, handleSetCommandBar, showMainItemDraft } : MainNavProps ) {

  function handleShowMainItemDraftAndCloseCommandBar() {
    handleSetShowMainItemDraft(true)
    handleSetCommandBar(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {!showMainItemDraft &&
          <span
            onClick={() => handleShowMainItemDraftAndCloseCommandBar()}
            className={`btn btn-green`}
          >New item</span>
        }
      </div>
      { itemCount > 0 &&
        <div className={styles.right}>
          {itemCount} items
        </div>
      }
    </div>
  )
}
