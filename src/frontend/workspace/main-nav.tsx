import React from 'react'
import styles from './main-nav.module.css'

type MainNavProps = {
  itemCount: number
}

export default function MainNav({ itemCount } : MainNavProps ) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span>Search or Type ⌘ + K</span>
        <span>Add new item</span>
        <span>Sort most recent</span>
      </div>
      <div className={styles.right}>
        {itemCount} items
      </div>
    </div>
  )
}
