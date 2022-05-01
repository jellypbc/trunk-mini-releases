import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
} from '../lib/constants'
import UserLogIn from '../frontend/user-log-in'
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
    const newRoomID = session && session.user?.email
    newRoomID && setRoomID(newRoomID)
  }, [session])

  useEffect(() => {
    roomID !== '' && handleTrunkSelect()
  }, [roomID])

  function handleTrunkSelect() {
    router.push({
      pathname: `/workspace/[roomID]`,
      query: {  roomID: `${roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)}` }
    })
  }

  return (
    <div>
      <UserLogIn/>
    </div>
  )
}

