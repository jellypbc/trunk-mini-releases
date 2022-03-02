import LogIn from '../frontend/log-in'
import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY, LOCAL_STORAGE_REDIRECT_URL_KEY } from '../lib/constants'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

export default function Page() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      setSession(session)
    })
    const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
    session && setSession(JSON.parse(session).currentSession)
  }, [])

  useEffect(() => {
    const redirectUrl = localStorage.getItem(LOCAL_STORAGE_REDIRECT_URL_KEY)
    let room = redirectUrl && redirectUrl.split('/')[4]
    if (!room) {
      room = nanoid(6)
    }
    session && session.user && router.push(`/d/${room}`)
  },[session])

  return (
    <>
      <LogIn/>
    </>
  )
}

