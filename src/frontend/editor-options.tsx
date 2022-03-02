import React from 'react'
import styles from './editor-options.module.css'

type Props = {
  handleSetShowOptions: (showOptions: boolean) => void
  handleSetSelectedDraftID: () => void
  handleDraftDelete: () => void
}

export default function EditorOptions({ handleSetShowOptions, handleSetSelectedDraftID, handleDraftDelete } : Props) {
  return (
    <div
      className={styles.container}
      onMouseLeave={() => handleSetShowOptions(false)}
    >
      <div className={styles.option}>
        😄
      </div>
      <div className={styles.option}>
        💬
      </div>
      <div
        className={styles.option}
        onClick={() => handleSetSelectedDraftID()}
      >
        📂
      </div>
      <div className={styles.option}
        onClick={handleDraftDelete}
      >
        🗑
      </div>
    </div>
  )
}
