import React from 'react'
import { useEffect, useState } from "react";
import styles from './log-in.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase-client'
import { LOCAL_STORAGE_REDIRECT_URL_KEY } from '../lib/constants'

// import type { redirect } from 'next/dist/server/api-utils';
import version from '../util/version'
const url = `https://github.com/jellypbc/trunk-mini-releases/releases/download/${version}/MiniTrunk_${version}_x64.dmg`

export default function LogIn() {

  const [isTauri, setTauri] = useState(false)

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

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div>Trunk</div>
        </h1>
        <p className={styles.description}>
          A reading partner
        </p>

        <div className="btn-group">
          {
            !isTauri &&
            <a
              className={`${styles.magicLinkBtn} btn btn-primary btn-lg mx-3`}
              href={url}
            >
              Download for Mac
            </a>
          }

          <button
            className={`${styles.magicLinkBtn} btn btn-light btn-lg `}
            onClick={(e) => {
            e.preventDefault()
            signInWithGoogle()
          }}>
            Login
          </button>
        </div>

      </main>
      <div className={styles.secret}>
        <Link href="/workspace">
        <a>secret passage</a>
        </Link>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://jellypbc.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Produced by Jelly Public Benefit Corporation
        </a>
      </footer>
  </div>
  )
}
