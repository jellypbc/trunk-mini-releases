import React, { useEffect, useState } from 'react'
// import SignedInNav from '../frontend/nav/signed-in-nav'

import { Reflect } from '@rocicorp/reflect'
import { M, clientMutators } from '../datamodel/mutators'
import { randUserInfo } from '../datamodel/client-state'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../lib/constants'
// import { useClientEmail, useClientUsername, useClientAvatarURL } from '../datamodel/subscriptions'
import { nanoid } from 'nanoid'
import { supabase } from 'src/lib/supabase-client'

import { consoleLogSink, OptionalLoggerImpl } from '@rocicorp/logger';

// type SettingsProps = {
//   handleSetCommandBar: (state: boolean) => void
// }

export default function Settings() {
  const [reflect, setReflectClient] = useState<Reflect<M> | null>(null);
  const [, setOnline] = useState(false);

  const logSink = consoleLogSink;
  const logger = new OptionalLoggerImpl(logSink);

  // const [commandBar, setCommandBar] = useState<boolean>(false)

  // const clientEmail = useClientEmail(reflect)
  // const clientUsername = useClientUsername(reflect)
  // const clientAvatarURL = useClientAvatarURL(reflect)


  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
  //     setSession(session)
  //   })
  //   const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
  //   session && setSession(JSON.parse(session).currentSession)
  // }, [])

  useEffect(() => {
    let [, , roomID] = location.pathname.split("/");
    if (roomID && roomID.includes(`%2540`)) {
      roomID = roomID.replace(`%2540`, `@`)
    }

    (async () => {
      const workerOrigin =
        process.env.NEXT_PUBLIC_WORKER_HOST ??
        "wss://reps.trunk.workers.dev";
      logger.info?.(`Connecting to worker at ${workerOrigin}`);
      const userID = nanoid();
      const r = new Reflect<M>({
        socketOrigin: workerOrigin,
        onOnlineChange: setOnline,
        userID,
        roomID,
        auth: JSON.stringify({
          userID,
          roomID,
        }),
        logSinks: [logSink],
        mutators: clientMutators
      });

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
      session && await getProfile()

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

      setReflectClient(r)
    })()
  }, [])

  if (!reflect) {
    return null
  }

  return (
    <>
      <div className="w-screen relative z-30 justify-between items-center top-5">

{/*        {clientEmail &&
          <SignedInNav
            clientEmail={clientEmail}
            handleSetCommandBar={setCommandBar}
          />
        }*/}

        <div className="flex z-20">
          <div className="flex z-20">
            <div className="w-44 fixed left-0 top-10 h-screen mt-2 p-10 ">

              <h1>Settings</h1>
              <a href="/">Back</a>

              <div className="py-6">
                <h4>Username</h4>
                {/* <p>{clientUsername}</p> */}

                <br/>

                <h4>Avatar</h4>
                {/* <p>{clientAvatarURL}</p> */}
              </div>



            </div>
          </div>
        </div>

      </div>
    </>
  )
}