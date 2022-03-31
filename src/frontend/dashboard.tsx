import React, { useState } from 'react'
import styles from './dashboard.module.css'
import type { AuthSession } from '@supabase/supabase-js'
import Onboarding from './onboarding'
import { useWorkspace } from './workspace-provider'

type Props = {
  session: AuthSession
}

export default function Dashboard({ session } : Props ) {
  const [showIndex, setShowIndex] = useState<boolean>(false)

  const {
    selectedTrunkID,
  } = useWorkspace()

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
            {!showIndex ?
              <ActivityFeed
                setShowIndex={setShowIndex}
              />
            :
              <IndexView
                setShowIndex={setShowIndex}
              />
            }
          </div>
        </div>
        :
        <Onboarding
          session={session}
        />
      }
    </div>
  )
}

function IndexView({ setShowIndex } : any) {
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
        <IndexItem />
        <IndexItem />
      </div>
    </div>
  )
}

function IndexItem() {
  return(
    <div className={styles.indexItem}>
      <div className={styles.indexItemTitle}>
        Title
      </div>
      <div className={styles.indexItemAuthor}>
        Author
      </div>
    </div>
  )
}

function ActivityFeed({ setShowIndex } : any) {
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
      <div className={styles.feed}>
        <FeedItem/>
        <FeedItem/>
        <FeedItem/>
      </div>
    </div>

  )
}

function FeedItem() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>

      </div>
      <div className={styles.item}>
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
