import React, { useState } from 'react'
import styles from './dashboard.module.css'
import type { AuthSession } from '@supabase/supabase-js'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems } from '../datamodel/subscriptions'

type Props = {
  session: AuthSession
  roomID: string
  rep: Replicache<M>
}

export default function Dashboard({ session, roomID, rep } : Props ) {
  console.log('session', session)
  console.log('rep', rep)
  const [showIndex, setShowIndex] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      {roomID &&
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
