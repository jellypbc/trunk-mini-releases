import React, { useState } from 'react'
import styles from './onboarding.module.css'
import { HotKeys } from 'react-hotkeys'
import { supabase } from 'src/lib/supabase-client'
import InviteModal from './invite-modal'
import { nanoid } from 'nanoid'
// import { useRouter } from 'next/router'
import { useWorkspace } from './workspace-provider'

export default function Onboarding({ session } : any) {
  const [room, setRoom] = useState<string>('')
  const [showRoomSelector, setShowRoomSelector] = useState<boolean>(false)

  const {
    handleTrunkSelect,
  } = useWorkspace()

  // const router = useRouter()

  const { user } = session

  function selectRoom(){
    let selectedRoom = room
    if (!selectedRoom) {
      selectedRoom = nanoid(6)
    }
    // session && session.user && router.push(`/d/${selectedRoom}`)
    handleTrunkSelect(room)
    setRoom('')
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      alert('You have been signed out')
  }

  const handlers = {
    changeCommandBar: () => {
      alert('Under construction...')
    }
  }

  return (
    <HotKeys
      {...{
        style: { outline: "none", display: "flex", flex: 1 },
        keyMap,
        handlers,
      }}
    >
      {showRoomSelector &&
        <InviteModal
          room={room}
          setRoom={setRoom}
          handleSelectRoom={selectRoom}
          setShowRoomSelector={setShowRoomSelector}
        />
      }
      <div className={styles.container}>
        <div className={styles.nav}>
          <input className={styles.search} placeholder={'Search or type ⌘ + K'}>
          </input>
          <div
            className={styles.user}
            onClick={logOut}
          >
            {user.email}
          </div>
        </div>
        <div className={styles.options}>
          <div className={styles.personalTrunk}>
            <div className={styles.welcome}>
              <div className={styles.mainTitle}>
                Welcome to your Trunk
              </div>
              <div className={styles.personalTrunk}>
                <div className={styles.avatar}>
                </div>
                <div className={styles.clientInfo}>
                  dluan's trunk
                </div>
              </div>
            </div>
            <div className={styles.personalTrunkActions}>
              <div>Upload Item</div>
              or
              <div>Create a note</div>
            </div>
          </div>
          <div className={styles.otherOptions}>
            <div className={styles.browsePublicTrunks}>
              <div className={styles.title}>
                Browse public trunks
              </div>
              <div className={styles.description}>
                Search for a keyword
              </div>
            </div>
            <div className={styles.joinByInviteCode}>
              <div className={styles.title}>
                Have an invite code?
              </div>
              <button
                className={'button button-primary'}
                onClick={() => setShowRoomSelector(true)}
              >
                Join by invite code
              </button>
            </div>
          </div>
        </div>
      </div>
    </HotKeys>
  )
}

const keyMap = {
  changeCommandBar: ['command+k']
}


