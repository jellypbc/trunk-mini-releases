import React from 'react'
import styles from './dashboard.module.css'
import type { AuthSession } from '@supabase/supabase-js'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems } from '../datamodel/subscriptions'

import DashboardNavLeft from './dashboard-nav-left'
import DashboardNavTop from './dashboard-nav-top'
import DashboardBody from './dashboard-body'

type Props = {
  session: AuthSession
  roomID: string
  rep: Replicache<M>
}

export default function Dashboard({ session, roomID, rep } : Props) {
  const items = getSortedItems(rep)
  const { user } = session

  return (
    <div className={styles.container}>
      {roomID &&
        <div className={styles.dashboard}>
          <DashboardNavLeft roomID={roomID}/>
          <div className={styles.main}>
            <DashboardNavTop email={user && user.email || 'guest'} />
            {items &&
              <DashboardBody
                rep={rep}
                items={items}
              />
            }
          </div>
        </div>
      }
    </div>
  )
}

