import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import type { AuthSession } from '@supabase/supabase-js'
import Onboarding from './onboarding'
import { useWorkspace } from './workspace-provider'
import { Replicache } from 'replicache'
import { M, mutators } from '../datamodel/mutators'
import { Client } from 'reps-client'
import { randUserInfo } from '../datamodel/client-state'
import { randomShape } from '../datamodel/shape'
import { getSortedItems } from '../datamodel/subscriptions'

type Props = {
  session: AuthSession
  roomID: string
}

export default function Dashboard({ session, roomID} : Props ) {
  const [showIndex, setShowIndex] = useState<boolean>(false)
  const [rep, setRep] = useState<Replicache<M> | null>(null)

  const {
    selectedTrunkID,
  } = useWorkspace()


  useEffect(() => {
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
      })
      r.onSync = (syncing: boolean) => {
        if (!syncing) {
          r.onSync = null;
          r.mutate.initShapes(Array.from({ length: 5 }, () => randomShape()));
        }
      }
      setRep(r)
    })()
  }, [])


  return (
    <div className={styles.container}>
      {selectedTrunkID ?
        <div className={styles.dashboard}>
          <div className={styles.trunks}>
            <Trunk />
            <Trunk />
            <Trunk />
          </div>
          <div className={styles.main}>
            <div className={styles.nav}>
              <input
                className={styles.search}
                placeholder={'Search or type ⌘ + K'}
              >
              </input>
              <div className={styles.options}>
                ≡
              </div>
            </div>
            <div className={styles.activityContainer}>
            {!showIndex ?
              rep && <ActivityFeed
                setShowIndex={setShowIndex}
                rep={rep}
              />
            :
              rep && <IndexView
                setShowIndex={setShowIndex}
                rep={rep}
              />
            }
            </div>
          </div>
        </div>
        :
        <Onboarding
          session={session}
          roomID={roomID}
        />
      }
    </div>
  )
}

function IndexView({ setShowIndex, rep } : any) {
  const items = getSortedItems(rep)
  return (
    <div className={styles.indexContainer}>
      <div className={styles.indexNav}>
        <div
          className={styles.activityView}
          onClick={() => setShowIndex(false)}
        >
          Back
        </div>
        <div className={styles.indexTitle}>
          All items
        </div>
        <div className={styles.indexSort}>
          <div>Sort results by:</div>
          <div>Title</div>
          <div>Most recent</div>
        </div>
      </div>
      <div className={styles.itemList}>
        {items &&
          <IndexList
            items={items}
          />
        }
      </div>
    </div>
  )
}

function IndexList({items} : any) {
  return (
    items.map((item : any) => {
      return (
        <IndexItem
          key={item.id}
          item={item}
        />
      )
    })
  )
}

function IndexItem({item}: any) {
  return(
    <div className={styles.indexItem}>
      <div className={styles.indexItemTitle}>
        {item.title.replace(/<\/?[^>]+(>|$)/g, "")}
      </div>
      <div className={styles.indexItemAuthor}>
        Author
      </div>
    </div>
  )
}

function ActivityFeed({ setShowIndex, rep } : any) {
  const items = getSortedItems(rep)
  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedOptions}>
        <div className={styles.emptyOptions}>
        </div>
        <div className={styles.optionActions}>
          <div>
            <button className={'button button-secondary'}>
              Add new item
            </button>
          </div>
          <div
            className={styles.viewAll}
            onClick={() => setShowIndex(true)}
          >
            View all items
          </div>
        </div>
      </div>
      {items &&
        <div className={styles.feed}>
          <Feed
            items={items}
            rep={rep}
          />
        </div>
      }
    </div>
  )
}

function Feed({ items }:any){
  return (
    items.map((item: any) => {
      return (
        <div key={item.id}>
          <FeedItem
            item={item}
          />
        </div>
      )
    })
  )
}

function FeedItem({item}: any) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>

      </div>
      <div className={styles.item}>
        {item.title.replace(/<\/?[^>]+(>|$)/g, "")}
      </div>
    </div>
  )
}

function Trunk(){
  return (
    <div className={styles.trunk}>

    </div>
  )
}
