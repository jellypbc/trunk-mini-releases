import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './workspace.module.css'
import { getSortedItems } from '../datamodel/subscriptions'

type WorkspaceProps = {
  rep: Replicache<M>
}

export default function Workspace({ rep }: WorkspaceProps) {
  const items = getSortedItems(rep)
  return (
    items &&
    <div className={styles.container}>
      {/* <div>{items.length}</div> */}
      <NavMainContainer />
      <MainContainer />
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

function MainContainer() {
  return(
    <div className={styles.mainContainer}>
      <Sidebar/>
      <Main/>
      <VariableGutter/>
    </div>
  )
}

function Sidebar(){
  return(
    <div className={styles.sidebar}>
      Sidebar
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
