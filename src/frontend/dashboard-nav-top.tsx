import React from 'react'
import styles from './dashboard-nav-top.module.css'
import { supabase } from '../lib/supabase-client'
import { useRouter } from 'next/router'

type Props = {
  email: string
  itemCount: number
  arrowCount: number
}

export default function DashboardNavTop({ email, itemCount, arrowCount } : Props ) {
  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder={'Search or type ⌘ + K'}
      />
      <div
        className={styles.email}
        onClick={() => logOut()}
      >
        <span className={styles.itemCount}>{itemCount} items</span>
        <span className={styles.itemCount}>{arrowCount} arrows</span>
        {email}
      </div>
    </div>
  )
}
