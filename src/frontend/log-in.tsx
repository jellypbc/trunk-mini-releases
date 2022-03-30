import React from 'react'
import { useEffect, useState } from "react";
import styles from './log-in.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase-client'
import { LOCAL_STORAGE_REDIRECT_URL_KEY } from '../lib/constants'

import version from '../util/version'
const url = `https://github.com/jellypbc/trunk-mini-releases/releases/download/${version}/MiniTrunk_${version}_x64.dmg`

export default function LogIn() {
  const [isTauri, setTauri] = useState<boolean>(false)

  useEffect(() => {
    if (window && '__TAURI__' in window) { setTauri(true) }
  }, [])

  async function signInWithGoogle() {
    const redirectUrl = location.href
    localStorage.setItem(LOCAL_STORAGE_REDIRECT_URL_KEY, redirectUrl)
    try {
      const { error } : { error: any } = await supabase.auth.signIn({
        provider: 'google',
      }, {
        redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null || undefined
      })
      if (error) throw error
    } catch (error : any) {
      console.log('Error thrown:', error.message)
      alert(error.error_description || error.message)
    } finally {
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Trunk</title>
        <meta name="description" content="Collaborative literature review tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={styles.nav}
        onClick={(e) => {
          e.preventDefault()
          signInWithGoogle()
        }}
      >
        Login or Register
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <div>Trunk</div>
        </h1>
        <div className={styles.description}>
          An app to help you organize your research, where your data lives with you.
        </div>
        <div className={'button-group'}>
          { !isTauri &&
            <Link href={url}>
              <button className={'button button-primary'} >
                Get Trunk for macOS
              </button>
            </Link>
          }
          <button
            className={'button button-primary'}
            onClick={(e) => {
            e.preventDefault()
            signInWithGoogle()
          }}>
            Use Trunk in browser
          </button>
        </div>
      </main>
      <footer
        className={styles.footer}
        onClick={() => alert('Under construction...')}
      >
        See the benefits of connected notes
      </footer>
  </div>
  )
}
