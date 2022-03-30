import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
} from '../lib/constants'
import Onboarding from '../frontend/onboarding'
import LogIn from '../frontend/log-in'
import AppNav from './../frontend/nav/app-nav'

export default function Page() {
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      setSession(session)
    })
    const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
    session && setSession(JSON.parse(session).currentSession)
  }, [])

  return (
    <>
      <AppNav />
      {session ?
        <Onboarding
          session={session}
        />
        :
        <LogIn/>
      }
    </>
  )
}

