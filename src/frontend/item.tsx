import React from 'react'
import styles from './item.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'

export default function Item({ item, rep } :{ item: any, rep: Replicache<M> }) {
  const i = item

  const date = i.created_at

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  function handleItemDelete() {
    rep.mutate.deleteItem(i.id)
  }

  return (
    <div
      className={styles.container}
      onClick={handleItemDelete}
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
