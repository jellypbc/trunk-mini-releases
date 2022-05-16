import React from 'react'
import styles from './dashboard.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { useSortedItems, useArrows } from '../datamodel/subscriptions'

import DashboardNavLeft from './dashboard-nav-left'
import DashboardNavTop from './dashboard-nav-top'
import DashboardBody from './dashboard-body'

type Props = {
  roomID: string
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
  handleSetCommandBar: (commandBar: boolean) => void
  session: any
}

export default function Dashboard({ roomID, rep, handleSetSelectedItemID, handleSetCommandBar, session } : Props) {
  const items = useSortedItems(rep)
  const arrows = useArrows(rep)

  return (
    <div className={styles.container}>
      {roomID &&
        <div className={styles.dashboard}>
          <DashboardNavLeft
            roomID={roomID}
            rep={rep}
          />
          <div className={styles.main}>
            <DashboardNavTop
              itemCount={items.length}
              arrowCount={arrows.length}
              handleSetCommandBar={handleSetCommandBar}
              roomID={roomID}
              rep={rep}
              session={session}
            />
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
