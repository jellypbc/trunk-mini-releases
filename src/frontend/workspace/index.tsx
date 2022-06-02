import React, { useState } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import styles from './index.module.css'
import { useSortedItems, useClientEmail, useClientUsername, useClientAvatarURL } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase-client'

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

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
}

type BodyProps = {
  rep: Replicache<M>
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  clientEmail: string
  clientUsername: string
  clientAvatarURL: string
  handleSetCommandBar: (state: boolean) => void
}

type SidebarProps = {
  rep: Replicache<M>
  roomID: string
}

type MainProps = {
  items: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  rep: Replicache<M>
  clientEmail: string
  clientUsername: string
  clientAvatarURL: string
  handleSetCommandBar: (state: boolean) => void
}


export default function Workspace({ rep, handleSetSelectedItemID, roomID, handleSetCommandBar }: WorkspaceProps) {
  const items = useSortedItems(rep)
  const clientEmail = useClientEmail(rep)
  const clientUsername = useClientUsername(rep)
  const clientAvatarURL = useClientAvatarURL(rep)

  return (
    items &&
    <div className={styles.container}>
      {clientEmail &&
        <Nav
          email={clientEmail}
          handleSetCommandBar={handleSetCommandBar}
        />
      }
      {clientEmail && clientUsername && clientAvatarURL &&
        <Body
          rep={rep}
          items={items}
          handleSetSelectedItemID={handleSetSelectedItemID}
          roomID={roomID}
          clientEmail={clientEmail}
          clientUsername={clientUsername}
          clientAvatarURL={clientAvatarURL}
          handleSetCommandBar={handleSetCommandBar}
        />
      }
    </div>
  )
}


function Nav({ email, handleSetCommandBar } : NavProps) {
  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }


  return(
    <div className={styles.navContainer}>
      <div className={styles.left}>
        <div className={styles.logo}>Trunk</div>
        <div
          className={styles.searchBar}
          onClick={() => handleSetCommandBar(true)}>
          Search or type ⌘ + K
        </div>

      </div>
      <div className={styles.right}>
        <div
          className={styles.logOut}
          onClick={() => logOut()}
        >
          {email } ≡
        </div>
      </div>
    </div>
  )
}

function Body({ rep, items, handleSetSelectedItemID, roomID, clientEmail, clientUsername, clientAvatarURL, handleSetCommandBar} : BodyProps) {
  return(
    <div className={styles.bodyContainer}>
      <Sidebar
        rep={rep}
        roomID={roomID}
      />
      <Main
        items={items}
        handleSetSelectedItemID= {handleSetSelectedItemID}
        roomID={roomID}
        rep={rep}
        clientEmail={clientEmail}
        clientUsername={clientUsername}
        clientAvatarURL={clientAvatarURL}
        handleSetCommandBar={handleSetCommandBar}
      />
      <VariableGutter/>
    </div>
  )
}

function Sidebar({ rep, roomID } : SidebarProps ){
  return(
    <div className={styles.sidebar}>
      <SidebarTrunkNav
        rep={rep}
        roomID={roomID}
      />
    </div>
  )
}

function Main({ items, handleSetSelectedItemID, roomID, rep, clientEmail, clientUsername, clientAvatarURL, handleSetCommandBar } : MainProps){
  const itemCount = items.length
  const [showMainItemDraft, setShowMainItemDraft] = useState<boolean>(false)

  return (
    <div className={styles.main}>
      <MainNav
        itemCount={itemCount}
        handleSetShowMainItemDraft={setShowMainItemDraft}
        handleSetCommandBar={handleSetCommandBar}
      />
      {showMainItemDraft &&
        <MainItemDraft
          rep={rep}
          clientEmail={clientEmail}
          clientUsername={clientUsername}
          clientAvatarURL={clientAvatarURL}
          handleSetShowMainItemDraft={setShowMainItemDraft}
        />
      }
      <MainActivityView
        rep={rep}
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
    </div>
  )
}

