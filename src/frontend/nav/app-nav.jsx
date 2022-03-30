import { useEffect, useState } from 'react'

export default function AppNav() {
  const [isTauri, setTauri] = useState(false)
  const [appW, setAppW] = useState()
  const [isFocused, setFocus] = useState(false)

  useEffect(() => {
    (async () => {
      if (window && '__TAURI__' in window) {
        const {appWindow} = await import('@tauri-apps/api/window')
        setAppW(appWindow)
      }
    })()

    if (window && '__TAURI__' in window) { setTauri(true) }
  }, [])

  useEffect(() => {

    if (appW) {

      appW.listen('tauri://focus', () => {
        setFocus(true)
      })

      appW.listen('tauri://blur', () => {
        setFocus(false)
      })
    }

  }, [appW])

  return (
    <>
      { isTauri && appW &&
        <div data-tauri-drag-region className="titlebar">
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
      }
    </>
  )
}

