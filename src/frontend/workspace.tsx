import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './workspace.module.css'
import { getSortedItems } from '../datamodel/subscriptions'

import SidebarTrunkNav from './workspace-sidebar-trunk-nav'

type WorkspaceProps = {
  rep: Replicache<M>
}

type MainContainerProps = {
  rep: Replicache<M>
}

type SidebarProps = {
  rep: Replicache<M>
}

export default function Workspace({ rep }: WorkspaceProps) {
  const items = getSortedItems(rep)
  return (
    items &&
    <div className={styles.container}>
      <NavMainContainer />
      <MainContainer
        rep={rep}
      />
    </div>
  )
}

function NavMainContainer() {
  return(
    <div className={styles.navMainContainer}>
      Nav Main Container
    </div>
  )
}

function MainContainer({ rep } : MainContainerProps) {
  return(
    <div className={styles.mainContainer}>
      <Sidebar
        rep={rep}
      />
      <Main/>
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


function Main(){
  return (
    <div className={styles.main}>
      Main
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
