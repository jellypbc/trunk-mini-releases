import React from 'react'
import styles from './dashboard-nav-top.module.css'
import { supabase } from '../lib/supabase-client'
import { useRouter } from 'next/router'
import { supabaseUserInfo } from '../datamodel/client-state'

type Props = {
  itemCount: number
  arrowCount: number
  handleSetCommandBar: (commandBar: boolean) => void
  roomID: string
}

export default function DashboardNavTop({ itemCount, arrowCount, handleSetCommandBar, roomID } : Props ) {

  const defaultSupabaseUserInfo = supabaseUserInfo()
  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  function routeToSettings() {
    router.push(`${roomID}/settings`)
  }

  return (
    <div className={styles.container}>
      <input
        onClick={() => handleSetCommandBar(true)}
        className={styles.search}
        placeholder={'Search or type ⌘ + K'}
      />
      <div className={styles.email}>
        <span className={styles.itemCount}
          onClick={() => routeToSettings()}
        >Settings</span>
        <span className={styles.itemCount}>{itemCount} items</span>
        <span className={styles.itemCount}>{arrowCount} arrows</span>
        <span className={styles.itemCount} onClick={() => logOut()}>{defaultSupabaseUserInfo.email}</span>
      </div>
    </div>
  )
}
