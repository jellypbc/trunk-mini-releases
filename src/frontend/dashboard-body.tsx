import React, { useState } from 'react'
import styles from './dashboard-body.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'

import IndexView from './dashboard-body-index-view'
import ActivityView from './dashboard-body-activity-view'

type Props = {
  rep: Replicache<M>
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
}

export default function DashboardBody({ rep, items, handleSetSelectedItemID } : Props) {
  const [showIndex, setShowIndex] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <div className={styles.view}>
        {!showIndex ?
          <ActivityView
            setShowIndex={setShowIndex}
            items={items}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        :
          <IndexView
            setShowIndex={setShowIndex}
            items={items}
            handleSetSelectedItemID={handleSetSelectedItemID}
            rep={rep}
          />
        }
      </div>
    </div>
  )
}

