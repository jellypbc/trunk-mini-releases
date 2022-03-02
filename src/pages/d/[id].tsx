import { useEffect, useState } from "react";
import { Replicache } from "replicache";
import { Client } from "reps-client";
import { Designer } from "../../frontend/designer";
import { Nav } from "../../frontend/nav";
import { M, mutators } from "../../datamodel/mutators";
import { randUserInfo } from "../../datamodel/client-state";
import { randomShape } from "../../datamodel/shape";
import ItemList from '../../frontend/item-list'
import ItemDraftList from '../../frontend/item-draft-list'
import { useDrafts } from "../../datamodel/local/subscriptions";
import { updateDrafts } from "../../datamodel/local/draft";
import ItemDraftExpandedContainer from '../../frontend/item-draft-expanded-container'
import type { AuthSession } from '@supabase/supabase-js'
import LogIn from '../../frontend/log-in'
import { supabase } from "src/lib/supabase-client";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../../lib/constants'

export default function Home() {
  const [rep, setRep] = useState<Replicache<M> | null>(null);
  const [drafts, setDrafts] = useState<any[]>([])
  const [selectedDraftID, setSelectedDraftID] = useState<string>('')
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event: string, session: AuthSession | null) => {
      setSession(session)
    })
    const session = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
    session && setSession(JSON.parse(session).currentSession)

    const draftJSON = useDrafts()
    const parsedDrafts = draftJSON && JSON.parse(draftJSON) || []
    const draftList: any[] = []
    parsedDrafts.map((d: any) => {
      const changes = {
        createdAt: new Date(d.createdAt)
      }
      let changedDraft = { ...d, ...changes }
      draftList.push(changedDraft)
    })
    if (draftJSON != null) setDrafts(draftList)
  }, [])

  useEffect(() => {
    updateDrafts(drafts)
  }, [drafts])

  function handleSetDrafts(drafts: any) {
    setDrafts(drafts)
  }

  useEffect(() => {
    console.log('session', session)
  }, [session])

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
      });

      const workerHost =
        process.env.NEXT_PUBLIC_WORKER_HOST ??
        "wss://reps.trunk.workers.dev";
      const workerURL = `${workerHost}/connect`;
      console.info(`Connecting to worker at ${workerURL}`);
      new Client(r, roomID, workerURL);

      const defaultUserInfo = randUserInfo();
      await r.mutate.initClientState({
        id: await r.clientID,
        defaultUserInfo,
      });
      r.onSync = (syncing: boolean) => {
        if (!syncing) {
          r.onSync = null;
          r.mutate.initShapes(Array.from({ length: 5 }, () => randomShape()));
        }
      };

      setRep(r);
    })();
  }, []);


  if (!rep) {
    return null;
  }


  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "rgb(229,229,229)",
      }}
    >

      {session ?

        <div>
          <Nav
            rep={rep}
            session={session}
          />
          {selectedDraftID
            ?
            <ItemDraftExpandedContainer
              selectedDraftID={selectedDraftID}
              drafts={drafts}
              handleSetDrafts={handleSetDrafts}
              setSelectedDraftID={setSelectedDraftID}
              rep={rep}
            />
            :
            <div
              style={{display: "flex", maxHeight: "70vh"}}
              className={"main"}
            >
              <ItemList rep={rep} drafts={drafts} handleSetDrafts={handleSetDrafts}/>
              <ItemDraftList
                drafts={drafts}
                handleSetDrafts={handleSetDrafts}
                setSelectedDraftID={setSelectedDraftID}
                rep={rep}
              />
            </div>
          }
        </div>
      :
        <LogIn/>
      }
      <Designer {...{ rep }} />
    </div>
  );
}
