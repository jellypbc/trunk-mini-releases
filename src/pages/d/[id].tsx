import { useEffect, useState } from 'react'
import { Replicache } from 'replicache'
import { Client } from 'reps-client'
import { Designer } from '../../frontend/replidraw/designer'
import { Nav } from '../../frontend/replidraw/nav'
import { M, mutators } from '../../datamodel/mutators'
import {
  randUserInfo,
} from '../../datamodel/client-state'
import { randomShape } from '../../datamodel/shape'

export default function Home() {
  const [rep, setRep] = useState<Replicache<M> | null>(null)

  // TODO: Replicache + SSR could be cool!
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
      })

      const workerHost =
        process.env.NEXT_PUBLIC_WORKER_HOST ??
        "wss://reps.jellytrunk.workers.dev";
      const workerURL = `${workerHost}/connect`
      console.info(`Connecting to worker at ${workerURL}`)
      new Client(r, roomID, workerURL)

      const defaultUserInfo = randUserInfo();


      const defaultSupabaseUserInfo = {
        email: 'default',
        username: 'default',
        avatarURL: 'default',
        trunkIDs: '[]',
      }
      await r.mutate.initClientState({
        id: await r.clientID,
        defaultUserInfo,
        defaultSupabaseUserInfo: defaultSupabaseUserInfo
      })
      r.onSync = (syncing: boolean) => {
        if (!syncing) {
          r.onSync = null;
          r.mutate.initShapes(Array.from({ length: 5 }, () => randomShape()))
        }
      }

      setRep(r)
    })()
  }, [])

  if (!rep) {
    return null
  }

  return (
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
        <Nav rep={rep} />
        <Designer {...{ rep }} />
      </div>
  )
}

