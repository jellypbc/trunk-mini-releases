import { useEffect, useState } from 'react'
import { useWorkspace } from '../workspace-provider'

export default function AppNav() {

  const { isTauri } = useWorkspace()

  return (
    <>
      { isTauri &&
        <div
          data-tauri-drag-region
          id="nav"
          className="sticky
            top-0
            z-50
            h-44
            bg-white-100
            dark:bg-slate-800
          "
        >
        </div>
      }
    </>
  )
}

const renderTrafficLights = () => {
  return (
    <div>
      <div
        className={"titlebar-button titlebar-close " + (isFocused ? "active" : "")}
        onClick={() => appW.close()}
      >
      </div>
      <div
        className={"titlebar-button titlebar-minimize " + (isFocused ? "active" : "")}
        onClick={()=> appW.minimize()}
      >
      </div>
      <div
        className={"titlebar-button titlebar-expand " + (isFocused ? "active" : "")}
        onClick={()=> appW.toggleMaximize()}
      >
      </div>
    </div>
  )
}