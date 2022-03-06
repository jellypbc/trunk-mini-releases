// import { useEffect, useRef, useState } from "react";
import React from "react";
import dynamic, {DynamicOptions} from 'next/dynamic'
import { open as openDialog } from '@tauri-apps/api/dialog';
import type TauriWindow from '../typings/window'
declare const window: TauriWindow;

const invoke : any = dynamic<any>(
  import('@tauri-apps/api/tauri').then(m=>m.invoke) as DynamicOptions<{}>,
  { ssr: false }
)

// window.__TAURI_METADATA__ = "hi"
const appWindow : any = dynamic<any>(
  import('@tauri-apps/api/window').then(m=>m.appWindow) as DynamicOptions<{}>,
  { ssr: false }
)

// interface ProgressPayload {
//   id: number
//   progress: number
//   total: number
// }
// type ProgressHandler = (progress: number, total: number) => void
// const handlers: Map<number, ProgressHandler> = new Map()
const handlers = new Map()
let listening = false

function listenToUploadEventIfNeeded(): Promise<void> {
  if (listening) {
    return Promise.resolve()
  }

  if (window && typeof window !== 'undefined') {

    return appWindow.listen('upload://progress', ({ payload } : any) => {
      const handler = handlers.get(payload.id)
      if (handler !== void 0) {
        handler(payload.progress, payload.total)
      }
    }).then(() => {
      listening = true
    })
  } else {
    return Promise.resolve()
  }
}

async function upload(
  url: string,
  filePath: string,
  progressHandler?: any,
  // progressHandler?: ProgressHandler,
  headers?: Map<string, string>
): Promise<void> {
    // if i have tauri
      // invokes tauri command locally
    // else if i am web
      // invokes upload to s3


    // 1. push to web no matter what
    // 2. (if desktop), push to filesystem


    const ids = new Uint32Array(1)

    window.crypto.getRandomValues(ids)
    const id = ids[0]

    if (progressHandler) {
      handlers.set(id, progressHandler)
    }

    await listenToUploadEventIfNeeded()

    await invoke('plugin:upload|upload', {
      id,
      url,
      filePath,
      headers: headers ?? {}
    })
}


interface UploaderProps {
  setPath: (path : string) => void,
  handleClick: () => void
}


export default function TauriUploader(props: UploaderProps) {
  const { setPath, handleClick } = props

  async function handleButtonClick() {
    handleClick()

    const path = await openDialog({ multiple: false, directory: false }) || ""
    if (typeof path === 'string') {
      setPath(path)

      const url = "http://jsonplaceholder.typicode.com"

      upload(url, path, (progress : any) => {
        console.log(progress)
      }).then().catch(e => {
        console.error(e)
      })
    }

  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
      >
        Choose a file
      </button>
    </div>
  )
}