import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
} from '../lib/constants'
import Onboarding from '../frontend/onboarding'
import LogIn from '../frontend/log-in'
import AppNav from './../frontend/nav/app-nav'
import { useRouter } from 'next/router'


export default function Page() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [roomID, setRoomID] = useState<string>('')
  const router = useRouter()

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

  function handleTrunkSelect(roomID: string) {
    router.push({
      pathname: `/t/[roomID]`,
      query: { roomID: roomID }
    })
  }

  return (
    <>
      <AppNav />
      {session && roomID ?
        <Onboarding
          session={session}
          roomID={roomID}
          handleTrunkSelect={handleTrunkSelect}
        />
        :
        <LogIn/>
      }
    </>
  )
}

