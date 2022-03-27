// import type { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'


export default function AppNav() {
  const [isTauri, setTauri] = useState(false)
  const [appW, setAppW] = useState()
  const [isFocused, setFocus] = useState(false)

  useEffect(() => {
    (async () => {
      if (window && '__TAURI__' in window) {
        const {appWindow} = await import('@tauri-apps/api/window')
        setAppW(appWindow)
        // appWindow.close().then()

        // const appWindow = dynamic(
        //   import('@tauri-apps/api/window').then(m=>m.appWindow),
        //   { ssr: false }
        // )
      }
      // if (window && '__TAURI__' in window) {
      //   const { appWindow } = await import('@tauri-apps/api/window')
      // }

      // console.log("appw", appWindow)
    })()


    if (window && '__TAURI__' in window) {
      console.log("DOG")
      setTauri(true)
    }
  }, [])

  useEffect(() => {

    if (appW) {

      appW.listen('tauri://focus', () => {
        console.log("FOCUSED!")
        setFocus(true)
      }).then(()=>{
      })

      appW.listen('tauri://blur', () => {
        console.log("blured!")
        setFocus(false)
      }).then(()=>{
      })
    }

  }, [appW])


      // appW.listen('tauri://focus', () => {
      //   console.log("FOCUSED!")
      // }).then(()=>{
      //   setFocus(true)
      // })

      // appW.listen('tauri://blur', () => {
      //   console.log("blured!")
      // }).then(()=>{
      //   setFocus(false)
      // })


  console.log("isTauri", isTauri)

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

