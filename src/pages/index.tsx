import LogIn from '../frontend/log-in'
import React, { useState, useEffect } from 'react'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase-client'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY, LOCAL_STORAGE_REDIRECT_URL_KEY } from '../lib/constants'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'
import RoomSelector from '../frontend/room-selector'

// import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
// import { relaunch } from "@tauri-apps/api/process";
// try {
//     const {shouldUpdate, manifest} = await checkUpdate();
//     if (shouldUpdate) {
//         // display dialog
//         await installUpdate();
//         // install complete, restart app
//         await relaunch();
//     }
// } catch(error) {
//     console.log(error);
// }


export default function Page() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [room, setRoom] = useState<string>('')
  const [showRoomSelector, setShowRoomSelector] = useState<boolean>(false)
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
    room && setRoom(room)

    if (session !== null) {
      setShowRoomSelector(true)
    }
    if (session === null) {
      setShowRoomSelector(false)
    }
  },[session])

  function selectRoom(){
    let selectedRoom = room
    if (!selectedRoom) {
      selectedRoom = nanoid(6)
    }
    session && session.user && router.push(`/d/${selectedRoom}`)
    setRoom('')
  }

  return (
    <>
      {showRoomSelector ?
        <RoomSelector
          room={room}
          setRoom={setRoom}
          handleSelectRoom={selectRoom}
        />
        :
        <LogIn/>
      }
    </>
  )
}

