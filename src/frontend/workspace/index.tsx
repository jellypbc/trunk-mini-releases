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
    <div className="px-4 h-screen w-screen overflow-auto">
      {/* nav container */}
      <div className="my-0 mx-auto grid grid-rows-[auto_auto] gap-8">
        <div className="absolute">
          {clientEmail &&
            <SignedInNav
              clientEmail={clientEmail}
              handleSetCommandBar={handleSetCommandBar}
            />
          }
        </div>
      </div>
      {clientEmail && clientUsername && clientAvatarURL &&
        // body container
        <div className="pt-8 grid md:grid-cols-[150px_auto_250px] gap-4">
          <div className="hidden md:table-cell max-h-fit">
            <div className="absolute">
              <SidebarTrunkNav
                reflect={reflect}
                roomID={roomID}
              />
            </div>
          </div>
          <div className="py-2 px-4">
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
          <div className="p-4 hidden md:table-cell"></div>
        </div>
      }
    </div>
  )
}

