import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './workspace.module.css'
import { getSortedItems, useClientEmail } from '../datamodel/subscriptions'
import { supabase } from '../lib/supabase-client'
import { useRouter } from 'next/router'

import SidebarTrunkNav from './workspace-sidebar-trunk-nav'
import MainActivityView from './workspace-main-activity-view'
import MainNav from './workspace-main-nav'
import MainItemDraft from './workspace-main-item-draft'

type WorkspaceProps = {
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

type MainContainerProps = {
  rep: Replicache<M>
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

type SidebarProps = {
  rep: Replicache<M>
}

type NavMainContainerProps = {
  email: string
  items: any
}

type MainProps = {
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
}

export default function Workspace({ rep, handleSetSelectedItemID, roomID }: WorkspaceProps) {
  const items = getSortedItems(rep)
  const clientEmail = useClientEmail(rep)

  return (
    items &&
    <div className={styles.container}>
      {clientEmail &&
        <NavMainContainer
          email={clientEmail}
          items={items}
        />
      }
      <MainContainer
        rep={rep}
        items={items}
        handleSetSelectedItemID={handleSetSelectedItemID}
        roomID={roomID}
      />
    </div>
  )
}

function NavMainContainer({ email } : NavMainContainerProps) {
  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  return(
    <div className={styles.navMainContainer}>
      <div>
        Search or type ⌘ + K
      </div>
      <div
        onClick={() => logOut()}
      >
          { email }
      </div>
    </div>
  )
}

function MainContainer({ rep, items, handleSetSelectedItemID, roomID } : MainContainerProps) {

  return(
    <div className={styles.mainContainer}>
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
