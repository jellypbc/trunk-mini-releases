import React, { useEffect, useState } from 'react'
import Dashboard from '../../frontend/dashboard'
import { Replicache } from 'replicache'
import { M, mutators } from '../../datamodel/mutators'
import { supabaseUserInfo, randUserInfo } from '../../datamodel/client-state'
import type { AuthSession } from '@supabase/supabase-js'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../../lib/constants'
import { supabase } from 'src/lib/supabase-client'
import { Client } from 'reps-client'
import ItemContainer from '../../frontend/item-container'
import DashboardCommandBar from '../../frontend/dashboard-command-bar'
import { HotKeys } from 'react-hotkeys'
import { useRouter } from 'next/router'

export default function Home() {
  const [rep, setRep] = useState<Replicache<M> | null>(null)
  const [trunkID, setTrunkID] = useState<string>('')
  const [session, setSession] = useState<AuthSession | null>(null)
  const [selectedItemID, setSelectedItemID] = useState<string>('')
  const [commandBar, setCommandBar] = useState<boolean>(false)
  const [nextID, setNextID] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      setSession(session)
    })
    const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
    session && setSession(JSON.parse(session).currentSession)
  }, [])


  useEffect(() => {
    if (selectedItemID === 'next') {
      setSelectedItemID(nextID)
      setNextID('')
    }
  }, [selectedItemID])

  useEffect(() => {
    const [, , roomID] = location.pathname.split("/");

    (async () => {
      const r = new Replicache({
        name: roomID,
        mutators,

        // TODO: Do we need these?
        // TODO: figure out backoff?
        pushDelay: 0,
        requestOptions: {
          maxDelayMs: 0,
          minDelayMs: 0,
        },

        // We only use pull to get the base cookie.
        pullInterval: null,
      });

      const workerHost =
        process.env.NEXT_PUBLIC_WORKER_HOST ??
        "wss://reps.trunk.workers.dev"
      const workerURL = `${workerHost}/connect`
      console.info(`Connecting to worker at ${workerURL}`)
      new Client(r, roomID, workerURL)

      const defaultUserInfo = randUserInfo()
      const defaultSupabaseUserInfo = supabaseUserInfo()
      await r.mutate.initClientState({
        id: await r.clientID,
        defaultUserInfo,
        defaultSupabaseUserInfo
      })
      r.onSync = (syncing: boolean) => {
        if (!syncing) {
          r.onSync = null
        }
      }
      setRep(r)
      setTrunkID(roomID)
    })()
  }, [])

  const handlers = {
    changeCommandBar: () => {
      setCommandBar(!commandBar)
    }
  }

  function handleSetSelectedItemID(id: string) {
    setSelectedItemID('next')
    setNextID(id)
  }

  if (!rep) {
    return null
  }

  if (!session) {
    router.push(`/`)
  }

  return (
    session && trunkID && rep &&
      <HotKeys
        {...{
          style: { outline: "none", display: "flex", flex: 1 },
          keyMap,
          handlers,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            left: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          {commandBar &&
            <DashboardCommandBar
              rep={rep}
              handleSetSelectedItemID={setSelectedItemID}
              handleSetCommandBar={setCommandBar}
            />
          }
          {selectedItemID ?
            selectedItemID !== 'next' ?
            <ItemContainer
              rep={rep}
              itemID={selectedItemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
            :
            <div>loading</div>
          :
            <Dashboard
              roomID={trunkID}
              rep={rep}
              handleSetSelectedItemID={setSelectedItemID}
              handleSetCommandBar={setCommandBar}
            />
          }
        </div>
      </HotKeys>
  )
}

const keyMap = {
  changeCommandBar: ['command+k']
}