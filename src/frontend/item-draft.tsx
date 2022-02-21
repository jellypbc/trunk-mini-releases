import React, { useState } from 'react'
import styles from './item-draft.module.css'

type Props = {
  item: any
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
}

export default function ItemDraft({ item, drafts, handleSetDrafts }:Props) {
  const i = item
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const date = new Date(i.created_at)

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  function handleDraftDelete(){
    handleSetDrafts(drafts.filter((draft: any) => draft.id !== i.id))
  }

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.metaData}>
          <div>{i.created_by}</div>
          <div>{dateInWords(date)}</div>
        </div>
      </div>
      <div className={styles.right}>
        { showOptions &&
          <div
            className={styles.optionsContainer}
            onMouseLeave={() => setShowOptions(false)}
          >
            <div className={styles.option}>
              😄
            </div>
            <div className={styles.option}>
             💬
            </div>
            <div className={styles.option}
              onClick={handleDraftDelete}
            >
              🗑
            </div>
          </div>

        }
        <div
          className={styles.titleContainer}
          onMouseOver={() => setShowOptions(true)}
        >
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div className={styles.title}>{i.title}</div>
        </div>

        <div className={styles.content}>i am item</div>

      </div>
    </div>
  )
}
