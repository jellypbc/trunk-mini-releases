import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
} from '../lib/constants'
import Dashboard from '../frontend/dashboard'
import LogIn from '../frontend/log-in'
import AppNav from './../frontend/nav/app-nav'

export default function Page() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [roomID, setRoomID] = useState<string>('')

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      setSession(session)
    })
    const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
    session && setSession(JSON.parse(session).currentSession)
  }, [])

  useEffect(() => {
    const newRoomID = session && session.user?.email?.split('@')[0]
    newRoomID && setRoomID(newRoomID)
  }, [session])

  return (
    <>
      <AppNav />
      {session && roomID ?
        <Dashboard
          session={session}
          roomID={roomID}
        />
        :
        <LogIn/>
      }
    </>
  )
}

