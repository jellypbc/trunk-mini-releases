import React, { useState, useEffect } from 'react'
import styles from './dashboard-nav-left.module.css'
import { useWorkspace } from './workspace-provider'

type Props = {
  roomID: string
}

export default function DashboardNavLeft({ roomID } : Props) {
  const { trunkIDs, addTrunkIDToWorkspace } = useWorkspace()

  useEffect(() => {
    trunkIDs.includes(roomID) === false && addTrunkIDToWorkspace(roomID)
  }, [])

  return (
    <div className={styles.container}>
    {trunkIDs && trunkIDs.map((trunkID: string) => {
      return (
        <Trunk
          key={`trunk-${trunkID}`}
          trunkID={trunkID}
        />
      )
    })}
    <AddTrunk />
  </div>
  )
}

function Trunk({trunkID} : any){
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  return (
    <div
      className={styles.trunk}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      { showTooltip &&
        <div className={styles.trunkTooltip}>
          {trunkID}
        </div>
      }
    </div>
  )
}


function AddTrunk(){
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  return (
    <div
      className={styles.addTrunk}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      { showTooltip &&
        <div className={styles.trunkTooltip}>
          Add a trunk
        </div>
      }
      +
    </div>
  )
}
