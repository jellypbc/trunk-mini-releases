import React from 'react'
import styles from './dashboard.module.css'
import type { AuthSession } from '@supabase/supabase-js'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems, getArrows } from '../datamodel/subscriptions'

import DashboardNavLeft from './dashboard-nav-left'
import DashboardNavTop from './dashboard-nav-top'
import DashboardBody from './dashboard-body'

type Props = {
  session: AuthSession
  roomID: string
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
}

export default function Dashboard({ session, roomID, rep, handleSetSelectedItemID } : Props) {
  const items = getSortedItems(rep)
  const arrows = getArrows(rep)
  const { user } = session

  return (
    <div className={styles.container}>
      {roomID &&
        <div className={styles.dashboard}>
          <DashboardNavLeft roomID={roomID} />
          <div className={styles.main}>
            <DashboardNavTop email={user && user.email || 'guest'} itemCount={items.length} arrowCount={arrows.length}/>
            {items &&
              <DashboardBody
                rep={rep}
                items={items}
                handleSetSelectedItemID={handleSetSelectedItemID}
              />
            }
          </div>
        </div>
      }
    </div>
  )
}
