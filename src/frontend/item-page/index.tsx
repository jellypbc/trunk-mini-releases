import React, { useState } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import { useItemByID, useClientEmail } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { htmlToText } from '../../util/htmlToText'
import styles from './index.module.css'
import { supabase } from '../../lib/supabase-client'

type ItemPageProps = {
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  rep: Replicache<M>
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
}

type SidebarProps = {
  createdBy: string
  arrowsCount: number
}

export default function ItemPage({ itemID, handleSetSelectedItemID, rep, roomID, handleSetCommandBar } : ItemPageProps ) {
  const item = useItemByID(rep, itemID)
  const clientEmail = useClientEmail(rep)

  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }

  function copyShareURLToClipboard(){
    navigator.clipboard.writeText(location.href)
      .then(() => {
        alert(`Copied to clipboard: ${location.href}`)
      })
      .catch(() => {
        alert(`Failed to copy to clipboard: ${location.href}`)
      })
  }

  console.log('item', item)


  return (
    <div className={styles.container}>
      {item ?
        <>
          <Nav
            email={clientEmail}
            handleSetCommandBar={handleSetCommandBar}
          />
          <div className={styles.bodyContainer}>
            <Sidebar
              createdBy={item.createdBy}
              arrowsCount={item.arrows.length}
            />
            <div className={styles.mainContainer}>
              <div>{itemID}</div>
              <div>{htmlToText(item.title)}</div>
              <div className={styles.inputContainer}>
                <input
                  onClick={() => copyShareURLToClipboard()}
                  id={`shareURL`}
                  className={styles.input}
                  defaultValue={location.href}
                  readOnly={true}
                />
                <button
                  onClick={() => copyShareURLToClipboard()}
                >Copy</button>
              </div>
              <button onClick={() => routeToWorkspace()}>Back to workspace</button>
            </div>
          </div>
        </>
        :
        <div>
          <div>{itemID} does not exist</div>
          <button onClick={() => routeToWorkspace()}>go back to workspace</button>
        </div>
      }
    </div>
  )
}

function Sidebar({ createdBy, arrowsCount } : SidebarProps){
  const [showOutline, setShowOutline] = useState<boolean>(true)
  return(
    <div className={styles.sidebarContainer}>
      <div className={styles.top}>
        <div className={styles.createdByContainer}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <div className={styles.profile}>
                <div className={styles.online}>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.createdBy}>
            {createdBy ? createdBy.split(`@`)[0] : 'anonymous'}
          </div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Last updated</div>
          <div>April 4, 2022</div>
        </div>
        <div className={styles.metadataContainer}>
          View Metadata
        </div>
        <div className={styles.viewPDFContainer}>
          View PDF
        </div>
        <div className={styles.shareItemContainer}>
          Share this item
        </div>
        <div className={styles.arrowsCountContainer}>
          <div className={styles.arrowsCount}>
            {arrowsCount}
          </div>
          <div className={styles.arrowsLabel}>
            Linked items
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.outlineMinimapContainer}
          onClick={() => setShowOutline(!showOutline)}
        >
          {showOutline ? <span className={styles.bold}>Outline</span> : <span>Outline</span>}
          <span>/</span>
          {!showOutline ? <span className={styles.bold}>Minimap</span> : <span>Minimap</span>}
          {showOutline ?
            <div className={styles.outlineContainer}>
              Outline
            </div>
          :
            <div className={styles.outlineContainer}>
              Minimap
            </div>
          }
        </div>
      </div>
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
      <div
        className={styles.searchBar}
        onClick={() => handleSetCommandBar(true)}>
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
