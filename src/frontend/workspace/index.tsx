import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import styles from './index.module.css'
import { getSortedItems, useClientEmail } from '../../datamodel/subscriptions'

import Nav from './nav'
import SidebarTrunkNav from './sidebar-trunk-nav'
import MainActivityView from './main-activity-view'
import MainNav from './main-nav'
import MainItemDraft from './main-item-draft'

type WorkspaceProps = {
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

type BodyProps = {
  rep: Replicache<M>
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

type SidebarProps = {
  rep: Replicache<M>
}

type MainProps = {
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
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

function Body({ rep, items, handleSetSelectedItemID, roomID } : BodyProps) {
  return(
    <div className={styles.bodyContainer}>
      <Sidebar
        rep={rep}
      />
      <Main
        items={items}
        handleSetSelectedItemID= {handleSetSelectedItemID}
        roomID={roomID}
      />
      <VariableGutter/>
    </div>
  )
}

function Sidebar({ rep } : SidebarProps ){
  return(
    <div className={styles.sidebar}>
      <SidebarTrunkNav
        rep={rep}
      />
    </div>
  )
}


function Main({ items, handleSetSelectedItemID, roomID } : MainProps){
  const itemCount = items.length
  return (
    <div className={styles.main}>
      <MainNav
        itemCount={itemCount}
      />
      <MainItemDraft
      />
      <MainActivityView
        items={items}
        handleSetSelectedItemID={handleSetSelectedItemID}
        roomID={roomID}
      />
    </div>
  )
}

function VariableGutter(){
  return(
    <div className={styles.variableGutter}>
      Variable Gutter
    </div>
  )
}

