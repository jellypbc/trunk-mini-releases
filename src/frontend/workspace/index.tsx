import React, { useState } from 'react'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import { useSortedItems, useClientEmail, useClientUsername, useClientAvatarURL } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase-client'

import { useWorkspace } from '../workspace-provider'

import SidebarTrunkNav from './sidebar-trunk-nav'
import MainActivityView from './main-activity-view'
import MainNav from './main-nav'
import MainItemDraft from './main-item-draft'

type WorkspaceProps = {
  reflect: Reflect<M>
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

export default function Workspace({ reflect, handleSetSelectedItemID, roomID, handleSetCommandBar }: WorkspaceProps) {
  const items = useSortedItems(reflect)
  const clientEmail = useClientEmail(reflect)
  const clientUsername = useClientUsername(reflect)
  const clientAvatarURL = useClientAvatarURL(reflect)

  const [showMainItemDraft, setShowMainItemDraft] = useState<boolean>(false)

  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  // gross
  const { isTauri } = useWorkspace()
  const classN = isTauri ?
    "nav top-6 items-center h-14 sticky w-screen px-2 py-0 z-30 flex justify-between flex-row space-x-4 space-x-reverse bg-white" :
    "nav top-0 items-center h-14 sticky w-screen px-2 py-0 z-30 flex justify-between flex-row space-x-4 space-x-reverse bg-white"

  return (
    items &&
    // navcontainer
    <div className="relative z-30  justify-between items-center">
      {clientEmail &&

        <nav className={classN}>

          {/*left*/}
          <div className="">
            <div className="bg-gray-100 py-2 px-2.5 text-sm rounded-md text-gray-400 hover:cursor-pointer"
              onClick={() => handleSetCommandBar(true)}>
              Search or type ⌘ + K
            </div>
          </div>

          {/*right*/}
          <div className="align-right">
            <div className="text-sm text-gray-400 hover:cursor-pointer"
              onClick={() => logOut()}
            >
              {clientEmail} ≡
            </div>
          </div>

        </nav>
      }

      {clientEmail && clientUsername && clientAvatarURL &&
        <div className="flex z-20">
          <div className="w-44 fixed left-0 top-10 h-screen mt-2 p-10 ">
            <SidebarTrunkNav
              reflect={reflect}
              roomID={roomID}
            />
          </div>
          <div className="flex-1 ml-44 z-20 relative ">
            <div className="p-4">
              <div>
                <MainNav
                  itemCount={items.length}
                  handleSetShowMainItemDraft={setShowMainItemDraft}
                  handleSetCommandBar={handleSetCommandBar}
                  showMainItemDraft={showMainItemDraft}
                />
                {showMainItemDraft &&
                  <MainItemDraft
                    reflect={reflect}
                    clientEmail={clientEmail}
                    clientUsername={clientUsername}
                    clientAvatarURL={clientAvatarURL}
                    handleSetShowMainItemDraft={setShowMainItemDraft}
                  />
                }
                <MainActivityView
                  reflect={reflect}
                  items={items}
                  handleSetSelectedItemID={handleSetSelectedItemID}
                  roomID={roomID}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

