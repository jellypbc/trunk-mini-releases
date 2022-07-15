import { useWorkspace } from '../workspace-provider'

import ProfileDropdownMenu from '../nav/profile-dropdown-menu'

import classNames from '../../util/classNames'

type NavProps = {
  clientEmail: string
  handleSetCommandBar: (state: boolean) => void
}

export default function SignedInNav({clientEmail, handleSetCommandBar}: NavProps){

  // gross
  const { isTauri } = useWorkspace()

  return (
    <nav className={classNames(
        isTauri ? "top-6" : "top-0",
        "nav items-center h-14 sticky w-screen flex justify-between flex-row",
        "py-0 z-30 space-x-4 space-x-reverse bg-white",
      )}
    >

      {/*left*/}
      <div className="">
        <div className="bg-gray-100 py-2 px-2.5 text-sm rounded-md text-gray-400 hover:cursor-pointer"
          onClick={() => handleSetCommandBar(true)}>
          Search or type ⌘ + K
        </div>
      </div>

      <ProfileDropdownMenu
        clientEmail={clientEmail}
      />

    </nav>
  )
}
