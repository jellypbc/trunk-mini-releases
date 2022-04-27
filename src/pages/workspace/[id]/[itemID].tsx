import React, { useEffect, useState } from 'react'
import { Replicache } from 'replicache'
import { M, mutators } from '../../../datamodel/mutators'
import {
  randUserInfo } from '../../../datamodel/client-state'
import type { AuthSession } from '@supabase/supabase-js'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../../../lib/constants'
import { supabase } from 'src/lib/supabase-client'
import { Client } from 'reps-client'
import { HotKeys } from 'react-hotkeys'
import Workspace from '../../../frontend/workspace/index'
import ItemPage from '../../../frontend/item-page/index'
import CommandBar from '../../../frontend/command-bar/index'

export default function Home() {
  const [rep, setRep] = useState<Replicache<M> | null>(null)
  const [trunkID, setTrunkID] = useState<string>('')
  const [session, setSession] = useState<AuthSession | null>(null)
  const [selectedItemID, setSelectedItemID] = useState<string>('')
  const [commandBar, setCommandBar] = useState<boolean>(false)
  const [nextID, setNextID] = useState<string>('')
  const [roomID, setRoomID] = useState<string>('')

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
    let [, , roomID, itemID] = location.pathname.split("/");
    setSelectedItemID(itemID)
    setRoomID(roomID)

    if (roomID.includes(`%2540`)) {
      roomID = roomID.replace(`%2540`, `@`)
    }

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

      const defaultSupabaseUserInfo = {
        email: 'default',
        username: 'default',
        avatarURL: 'default',
        trunkIDs: '[]'
      }

      const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
      const email = session && JSON.parse(session).currentSession.user.email || 'guest'

      defaultSupabaseUserInfo.email = email

      let supabaseProfileData : any = defaultSupabaseUserInfo
      await getProfile()

      async function getProfile() {
        try {
          const user = supabase.auth.user()

          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, avatar_url, trunk_ids`)
            .eq('id', user?.id)
            .single()

          if (error && status !== 406) {
            throw error
          }

          if (data) {
            supabaseProfileData = data
          }

        } catch (error :any) {
          alert(error.message)
        } finally {

        }
      }

      const changes = {
        trunkIDs: supabaseProfileData.trunk_ids || '[]',
        username: supabaseProfileData.username || 'guest',
      }

      const supabaseUserInfo = {...defaultSupabaseUserInfo, ...changes}

      await r.mutate.initClientState({
        id: await r.clientID,
        defaultUserInfo,
        defaultSupabaseUserInfo: supabaseUserInfo,
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

  if (!rep) {
    return null
  }

  // if (!session) {
  //   router.push(`/`)
  // }

  function handleSetSelectedItemID(id: string) {
    setSelectedItemID('next')
    setNextID(id)
  }

  return (
    session ? (
      <>
        {trunkID && rep && selectedItemID &&
          <HotKeys
            {...{
              style: { outline: "none", display: "flex", flex: 1 },
              keyMap,
              handlers,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              {commandBar &&
                <CommandBar
                  rep={rep}
                  handleSetSelectedItemID={handleSetSelectedItemID}
                  handleSetCommandBar={setCommandBar}
                  roomID={roomID}
                />
              }
              {selectedItemID === "i" || '' ?
                <Workspace
                  rep={rep}
                  handleSetSelectedItemID={setSelectedItemID}
                  roomID={roomID}
                  handleSetCommandBar={setCommandBar}
                />
                : selectedItemID === "next" ?
                  <div>loading</div>
                  :
                  <ItemPage
                    rep={rep}
                    itemID={selectedItemID}
                    handleSetSelectedItemID={handleSetSelectedItemID}
                    roomID={roomID}
                    handleSetCommandBar={setCommandBar}
                  />
              }
            </div>
          </HotKeys>
        }
      </>
    ): (
      <>
        { rep && trunkID && selectedItemID &&
          <HotKeys
            {...{
              style: { outline: "none", display: "flex", flex: 1 },
              keyMap,
              handlers,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              <ItemPage
                rep={rep}
                itemID={selectedItemID}
                handleSetSelectedItemID={handleSetSelectedItemID}
                roomID={roomID}
                handleSetCommandBar={setCommandBar}
              />

            </div>
          </HotKeys>
        }
      </>
    )
  )
}

const keyMap = {
  changeCommandBar: ['command+k']
}