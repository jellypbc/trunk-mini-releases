import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './workspace.module.css'
import { getSortedItems, useClientEmail } from '../datamodel/subscriptions'
import { supabase } from '../lib/supabase-client'
import { useRouter } from 'next/router'

import SidebarTrunkNav from './workspace-sidebar-trunk-nav'

type WorkspaceProps = {
  rep: Replicache<M>
}

type MainContainerProps = {
  rep: Replicache<M>
  items: any
}

type SidebarProps = {
  rep: Replicache<M>
}

type NavMainContainerProps = {
  email: string
  items: any
}

export default function Workspace({ rep }: WorkspaceProps) {
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

function MainContainer({ rep, items } : MainContainerProps) {

  return(
    <div className={styles.mainContainer}>
      <Sidebar
        rep={rep}
      />
      <Main
        items={items}
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


function Main({ items } : any){
  return (
    <div className={styles.main}>
      {`Item count: ${items.length}`}
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
