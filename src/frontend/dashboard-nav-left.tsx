import React, { useState, useEffect } from 'react'
import styles from './dashboard-nav-left.module.css'
import { useWorkspace } from './workspace-provider'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { useClientTrunkIDs } from '../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase-client'

type Props = {
  roomID: string
  rep: Replicache<M>
}

export default function DashboardNavLeft({ roomID, rep } : Props) {
  const { trunkIDs, addTrunkIDToWorkspace } = useWorkspace()
  const repTrunkIDs = useClientTrunkIDs(rep)
  const [showAddTrunkModal, setShowAddTrunkModal] = useState<boolean>(false)

  const [clientID, setClientID] = useState<string>('')

  useEffect(() => {
    (async()  => {
      const clientID = await rep.clientID
      setClientID(clientID)
    })()
    trunkIDs.includes(roomID) === false && addTrunkIDToWorkspace(roomID)
  }, [])

  return (
    <>
    {repTrunkIDs && clientID &&
      <div className={styles.container}>
        {showAddTrunkModal &&
          <AddTrunkModal
            trunkIDs={JSON.parse(repTrunkIDs)}
            clientID={clientID}
            rep={rep}
            handleSetShowAddTrunkModal={setShowAddTrunkModal}
          />
        }
        <RepTrunkIDs
          repTrunkIDs={repTrunkIDs}
          handleSetShowAddTrunkModal={setShowAddTrunkModal}
        />
        <AddTrunk
          handleSetShowAddTrunkModal={setShowAddTrunkModal}
        />
      </div>
    }
    </>
  )
}

function AddTrunkModal({trunkIDs, clientID, rep, handleSetShowAddTrunkModal} : {trunkIDs: string[], clientID: any, rep: any, handleSetShowAddTrunkModal : any}) {
  const [draftTrunkID, setDraftTrunkID] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function updateProfile() {
    const newTrunkIDs = [...trunkIDs, draftTrunkID]
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user?.id,
        trunk_ids: JSON.stringify(newTrunkIDs),
        updated_at: new Date(),
      }
      console.log('updates', updates)

      updates && rep.mutate.setTrunkIDs({ id: clientID, trunkIDs: updates.trunk_ids})

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
      handleSetShowAddTrunkModal(false)
    }
  }

  return (
    <div className={styles.addTrunkModal}>
      <div className={styles.exit} onClick={() => handleSetShowAddTrunkModal(false)}>&times;</div>
      <input
        placeholder={`Enter a new room ID`}
        value={draftTrunkID}
        onChange={(e) => setDraftTrunkID(e.target.value)}
      />
      <button
        onClick={() => updateProfile()}
      >
        {loading ? `Loading...` : `Add trunk`}
      </button>
    </div>
  )
}

function RepTrunkIDs({repTrunkIDs} : any){
  // TODO: return
  // repTrunkIDs must be formatted as "["string", "string", ...]
  const trunkArray = JSON.parse(repTrunkIDs)

  return (
    trunkArray &&
    <div>
      {trunkArray.map((trunkID: string) => {
        return (
          <Trunk
            key={`trunk-${trunkID}`}
            trunkID={trunkID}
          />
        )
      })}
    </div>
  )
}

function Trunk({trunkID} : any){
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const router = useRouter()

  function routeToTrunk() {
    router.push({
      pathname: `/t/[roomID]`,
      query: { roomID: trunkID }
    })

  }
  return (
    <div
      className={styles.trunk}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => routeToTrunk()}
    >
      { showTooltip &&
        <div className={styles.trunkTooltip}>
          {trunkID}
        </div>
      }
    </div>
  )
}


function AddTrunk({handleSetShowAddTrunkModal}: any){
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <div
      className={styles.addTrunk}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => handleSetShowAddTrunkModal(true)}
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
