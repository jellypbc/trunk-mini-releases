import React, { useState } from 'react'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import { useSortedItems, useClientEmail, useClientUsername, useClientAvatarURL } from '../../datamodel/subscriptions'

import SignedInNav from '../nav/signed-in-nav'
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

  return (
    items &&
    // navcontainer
    <div className="relative z-30 justify-between items-center">

      {clientEmail &&
        <SignedInNav
          clientEmail={clientEmail}
          handleSetCommandBar={handleSetCommandBar}
        />
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

