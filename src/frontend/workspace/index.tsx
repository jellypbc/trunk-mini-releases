import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import styles from './index.module.css'
import { getSortedItems, useClientEmail } from '../../datamodel/subscriptions'

import Nav from './nav/index'
import Body from './body/index'

type WorkspaceProps = {
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

export default function Workspace({ rep, handleSetSelectedItemID, roomID, handleSetCommandBar }: WorkspaceProps) {
  const items = getSortedItems(rep)
  const clientEmail = useClientEmail(rep)

  return (
    items &&
    <div className={styles.container}>
      {clientEmail &&
        <Nav
          email={clientEmail}
          handleSetCommandBar={handleSetCommandBar}
        />
      }
      <Body
        rep={rep}
        items={items}
        handleSetSelectedItemID={handleSetSelectedItemID}
        roomID={roomID}
      />
    </div>
  )
}
