import React, { useState, useEffect } from 'react'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import styles from './sidebar-trunk-nav.module.css'
import { useClientTrunkIDsArray, useClientEmail } from '../../datamodel/subscriptions'
import { supabase } from '../../lib/supabase-client'
import { useRouter } from 'next/router'

type SidebarTrunkNavProps = {
  reflect: Reflect<M>
  roomID: string
}

type TrunkProps = {
  trunkID: string
  clientEmail: string
  selectedTrunkID: boolean
}

type AddTrunkProps = {
  trunkIDs: string[]
  reflect: Reflect<M>
  clientID: string
}

export default function SidebarTrunkNav({ reflect, roomID } : SidebarTrunkNavProps) {
  const clientTrunkIDs : string[] = useClientTrunkIDsArray(reflect)
  const clientEmail : any = useClientEmail(reflect)

  const [clientID, setClientID] = useState<string>('')

  const cleanRoomID = `${roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)}`

  useEffect(() => {
    (async()  => {
      const clientID = await reflect.clientID
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
            selectedTrunkID={cleanRoomID === `${trunkID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)}`}
          />
        )}
      </div>
      <AddTrunk
        trunkIDs={clientTrunkIDs}
        reflect={reflect}
        clientID={clientID}
      />
    </div>
  )
}

function Trunk({ trunkID, clientEmail, selectedTrunkID } : TrunkProps) {
  const router = useRouter()

  function routeToTrunk() {
    router.push({
      pathname: `/workspace/[roomID]`,
      query: { roomID: `${trunkID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)}` }
    })
  }
  return (
    <div
      className={styles.trunk}
      onClick={() => routeToTrunk()}
      style={{
        backgroundColor: `${selectedTrunkID === true && 'hsl(0, 0%, 94%)'}`,
      }}
    >
      <div className={styles.trunkType}>
        {clientEmail === trunkID && `private` || `shared`}
      </div>
      <div>{trunkID.split('@')[0]}</div>
    </div>
  )
}

function AddTrunk({ trunkIDs, reflect, clientID } : AddTrunkProps) {
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

      updates && reflect.mutate.setTrunkIDs({ id: clientID, trunkIDs: updates.trunk_ids})

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