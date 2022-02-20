import React from 'react'
import styles from './item-draft.module.css'

export default function ItemDraft({ item }:{ item: any}) {
  const i = item

  const date = new Date(i.created_at)

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  return (
    <div className={styles.container}>
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
        <div className={styles.titleContainer}>
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
