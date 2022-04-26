import styles from './index.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../../../datamodel/mutators'

import SidebarTrunkNav from './sidebar-trunk-nav'

import MainActivityView from './main-activity-view'
import MainNav from './main-nav'
import MainItemDraft from './main-item-draft'

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


export default function Body({ rep, items, handleSetSelectedItemID, roomID } : BodyProps) {
  return(
    <div className={styles.container}>
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
