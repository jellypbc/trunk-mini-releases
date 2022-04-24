import React, { useState, useEffect } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './workspace-sidebar-trunk-nav.module.css'
import { useClientTrunkIDsArray, useClientEmail } from '../datamodel/subscriptions'
import { supabase } from '../lib/supabase-client'

type SidebarTrunkNavProps = {
 rep: Replicache<M>
}

type TrunkProps = {
  trunkID: string
  clientEmail: string
}

type AddTrunkProps = {
  trunkIDs: string[]
  rep: Replicache<M>
  clientID: string
}

export default function SidebarTrunkNav({ rep } : SidebarTrunkNavProps) {
  const clientTrunkIDs : string[] = useClientTrunkIDsArray(rep)
  const clientEmail : any = useClientEmail(rep)
  const [clientID, setClientID] = useState<string>('')

  useEffect(() => {
    (async()  => {
      const clientID = await rep.clientID
      setClientID(clientID)
    })()
  }, [])

  return (
    clientTrunkIDs && clientEmail && clientID &&
    <div className={styles.container}>
      <div className={styles.trunkContainer}>
        { clientTrunkIDs.map((trunkID: string) =>
          <Trunk
            key={`trunk-${trunkID}`}
            trunkID={trunkID}
            clientEmail={clientEmail}
          />
        )}
      </div>
      <AddTrunk
        trunkIDs={clientTrunkIDs}
        rep={rep}
        clientID={clientID}
      />
    </div>
  )
}

function Trunk({ trunkID, clientEmail } : TrunkProps) {
  return(
    <div className={styles.trunk}>
      <div className={styles.trunkType}>
        {clientEmail === trunkID && `private` || `shared`}
      </div>
      <div>{trunkID}</div>
    </div>
  )
}

function AddTrunk({ trunkIDs, rep, clientID } : AddTrunkProps) {
  const [showAddTrunkForm, setShowAddTrunkForm] = useState<boolean>(false)
  const [draftTrunkID, setDraftTrunkID] = useState<string>('')

  async function updateProfile() {
    const newTrunkIDs = [...trunkIDs, draftTrunkID]
    try {
      const user = supabase.auth.user()

      const updates = {
        id: user?.id,
        trunk_ids: JSON.stringify(newTrunkIDs),
        updated_at: new Date(),
      }
      console.log('updates', updates)

      setShowAddTrunkForm(false)
      setDraftTrunkID('')

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
    }
  }

  return (
    <div className={styles.addTrunkContainer}>
        <div className={styles.addTrunkInputContainer}>
          {showAddTrunkForm ?
            <div>
              <input
                className={styles.addTrunkInput}
                placeholder={`trunkID`}
                value={draftTrunkID}
                onChange={(e) => setDraftTrunkID(e.target.value)}
              />
              <div className={styles.buttonContainer}>
              <button
                className={`btn btn-2`}
                onClick={() => setShowAddTrunkForm(false)}
              >
                Cancel
              </button>
              <button
                className={`btn btn-1`}
                onClick={() => updateProfile()}
              >Save</button>
              </div>
            </div>
          :
          <div className={styles.buttonContainer}>
            <button
              className={`btn btn-1`}
              onClick={() => setShowAddTrunkForm(true)}
            >
              Add trunk
            </button>
          </div>
        }

        </div>


    </div>
  )
}