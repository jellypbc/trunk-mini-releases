import { useState, useEffect } from 'react'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase-client'
import { htmlToText } from '../../util/htmlToText'
import styles from './nav.module.css'
import TooltipBottom from '../tooltip/tooltip-bottom'

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
  reflect: Reflect<M>
  roomID: string
  title: string
  handleSetSelectedItemID: (itemID: string) => void
}

export default function Nav({ email, handleSetCommandBar, reflect, roomID, title, handleSetSelectedItemID} : NavProps) {
  const [anonItemIDs, setAnonItemIDs] = useState<string[]>([])
  const [anonArrowIDs, setAnonArrowIDs] = useState<string[]>([])
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false)

  useEffect(() => {
    const anonItemIDs = localStorage.getItem('trunk.anonItemIDs')
    setAnonItemIDs(anonItemIDs && JSON.parse(anonItemIDs) || [])
    const anonArrowIDs = localStorage.getItem('trunk.anonArrowIDs')
    setAnonArrowIDs(anonArrowIDs && JSON.parse(anonArrowIDs) || [])
  }, [])

  useEffect(() => {
    if (anonItemIDs.length > 0 && email !== 'guest') {
      anonItemIDs.map((itemID: any) => {
        reflect.mutate.updateItemCreatedBy({id: itemID, createdBy: email})
      })
      localStorage.setItem('trunk.anonItemIDs', JSON.stringify([]))
    }
  }, [anonItemIDs])

  useEffect(() => {
    if (anonArrowIDs.length > 0 && email !== 'guest') {
      anonArrowIDs.map((arrowID: any) => {
        reflect.mutate.updateArrowCreatedBy({id: arrowID, createdBy: email})
      })
      localStorage.setItem('trunk.anonArrowIDs', JSON.stringify([]))
    }
  }, [anonArrowIDs])

  const router = useRouter()

  const modifiedRoomID = roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)

  function routeToWorkspace(){
    router.push(`/workspace/${modifiedRoomID}/i`)
    handleSetSelectedItemID('i')
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  if (typeof window !== 'undefined') {
    window.onclick = function(event: any) {
      if (showProfileDropdown && event?.target?.id !== 'profileDropdown') {
        setShowProfileDropdown(false)
      }
    }
  }

  function truncatedTitle() {
    const titleAsText = htmlToText(title)
    if (titleAsText.length > 20) {
      return `${titleAsText.substring(0, 20)}...`
    }
    return titleAsText
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div
              className={styles.trunkID}
              onClick={() => routeToWorkspace()}
            >
              {roomID.replace(`-`, ` `)}
            </div>
          <div className={styles.caret}>
            &rsaquo;
          </div>
          <div className={styles.title}>
            <TooltipBottom
              text={truncatedTitle()}
              fullText={htmlToText(title)}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.search}>
            <div
              className={styles.searchBar}
              onClick={() => handleSetCommandBar(true)}>
              Search or type ⌘ + K
            </div>
          </div>
          <div className={styles.dropdown}>
            <div
              className={styles.options}
              id="profileDropdown"
              onClick={() => setShowProfileDropdown(true)}
            >
              ≡
            </div>
          </div>
          {showProfileDropdown &&
            <div
              className={styles.rightAlignedDropdownMenu}
              onClick={() => logOut()}
              id="profileDropdown"
            >
              <div className={styles.profileDropdownLeft}>
                <div>
                  {email}
                </div>
                <div
                  className={styles.option}
                >Log out</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
