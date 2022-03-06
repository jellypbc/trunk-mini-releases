import { idbOK } from '../../lib/idbOK'
import {
  DEFAULT_IDB_KEY,
  DEFAULT_SOURCE_FILES_BUCKET
} from '../../lib/constants'

export function uploadFileToIDB(file: File, sourceURL:
  string) {
  if (!idbOK()) return

  let openRequest = indexedDB.open(DEFAULT_IDB_KEY, 1)

  openRequest.onupgradeneeded = function(e: any) {
    let thisDB = e.target.result
    if (!thisDB.objectStoreNames.contains(DEFAULT_SOURCE_FILES_BUCKET)) {
      thisDB.createObjectStore(DEFAULT_SOURCE_FILES_BUCKET, { keyPath: 'id'})
    }
  }

  openRequest.onsuccess = function(e : any) {
    let db = e.target.result
    let tx = db.transaction(DEFAULT_SOURCE_FILES_BUCKET, 'readwrite')
    let store = tx.objectStore(DEFAULT_SOURCE_FILES_BUCKET)

    const newFile = {
      id: sourceURL,
      file: file
    }

    let request = store.add(newFile)

    request.onerror = function(e: any) {
      console.log('error', e.target.error.name, `file ${sourceURL} failed to upload to IDB`)
    }

    request.onsuccess = function(e: any) {
      console.log('success', e, `file ${sourceURL} uploaded to IDB`)
    }
  }
}

export function trashFileFromIDB(sourceURL: string){
  console.log('trashing file from IDB...', sourceURL)
  if (!idbOK()) return

  let openRequest = indexedDB.open(DEFAULT_IDB_KEY, 1)

  openRequest.onupgradeneeded = function(e: any) {
    let thisDB = e.target.result
    if (!thisDB.objectStoreNames.contains(DEFAULT_SOURCE_FILES_BUCKET)) {
      thisDB.createObjectStore(DEFAULT_SOURCE_FILES_BUCKET, { keyPath: 'id'})
    }
  }

  openRequest.onsuccess = function(e : any) {
    let db = e.target.result
    let tx = db.transaction(DEFAULT_SOURCE_FILES_BUCKET, 'readwrite')
    let store = tx.objectStore(DEFAULT_SOURCE_FILES_BUCKET)

    let request = store.delete(sourceURL)

    request.onerror = function(e: any) {
      console.log('error', e.target.error.name, `file ${sourceURL} failed to trash from IDB`)
    }

    request.onsuccess = function(e: any){
      console.log('success', e, `file ${sourceURL} trashed from IDB`)
    }
  }
}