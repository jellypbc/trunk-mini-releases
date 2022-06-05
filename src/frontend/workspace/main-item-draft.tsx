import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './main-item-draft.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import { randomItem } from '../../datamodel/item'
import { HotKeys } from 'react-hotkeys'
import EditorDraftingContainer from './editor-drafting-container'
import { nanoid } from 'nanoid'
import { uploadFileToIDB, trashFileFromIDB }  from '../../datamodel/local/file'
import { uploadFileToSupabase, trashFileFromSupabase } from '../../datamodel/supabase/file'
import { idbOK } from '../../lib/idbOK'
import ItemFileUploadButton from './item-file-upload-button'
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../../lib/constants'

type MainItemDraftProps = {
  rep: Replicache<M>
  clientEmail: string
  clientUsername: string
  clientAvatarURL: string
  handleSetShowMainItemDraft: (state: boolean) => void
}

const keyMap = {
  createItem: ['command+enter', 'ctrl+enter'],
  hideItemDraft: ['command+c', 'ctrl+c']
}

export default function MainItemDraft({ rep, clientEmail, clientUsername, clientAvatarURL, handleSetShowMainItemDraft }: MainItemDraftProps) {
  console.log('clientUsername', clientUsername, 'clientAvatarURL', clientAvatarURL)
  const [titleDraft, setTitleDraft] = useState<string>('<p></p>')
  const [contentDraft, setContentDraft] = useState<string>('<p></p>')

  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)
  const [file, setFile] = useState<any>(null)
  const [itemDraft, setItemDraft] = useState<any>(randomItem())
  const [URL, setURL] = useState<any>('')

  function saveDraftAsItem(){
    const item = itemDraft.item
    const changes = {
      title: titleDraft,
      content: contentDraft,
      createdBy: clientEmail || 'Anonymous Aardvark',
    }

    const itemItem = {...item, ...changes}

    rep.mutate.createItem({id: itemDraft.id, item: itemItem})

  }

  const handlers = {
    createItem: () => {
      saveDraftAsItem()
      setItemDraft(randomItem())
      setTitleDraft('<p> </p>')
      setContentDraft('<p> </p>')
      setShowTitleEditor(false)
      setShowContentEditor(false)
    },
    hideItemDraft: () => {
      handleSetShowMainItemDraft(false)
    }
  }

  const placeholderContentText = `What's on your mind?`
  const placeholderTitleText = `Untitled`

  let dropArea = document.getElementById('drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea && dropArea.addEventListener(eventName, preventDefaults, false)
  });

  dropArea && dropArea.addEventListener('drop', handleDrop, false)

  function handleDrop(e:any) {
    console.log('i am in handleDrop')
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
  }

  function handleFiles(files :any) {
    // ([...files]).forEach(uploadFile)

    uploadFile(files[0])
  }

  function uploadFile(file :any) {
    console.log('file', file)
    setFile(file)
  }

  useEffect(() => {
    if (!file) {
      console.log(`No file found`)
    } else {
      // const itemID : string = itemID
      const draftFileID = nanoid()
      const fileType = file.type.split('/')[1]
      const sourceURL = `${itemDraft.id}/${draftFileID}.${fileType}`

      // rep.mutate.updateItemSourceURL({id: itemID, sourceURL: sourceURL})
      setItemDraft({id: itemDraft.id, item: {...itemDraft.item, sourceURL: sourceURL}})
      //upload file to indexedDB
      uploadFileToIDB(file, sourceURL)
      //upload file to supabase
      uploadFileToSupabase(file, sourceURL)
    }

  }, [file])

  function preventDefaults (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

return (
  <HotKeys
    {...{
      keyMap,
      handlers,
    }}
  >
    <div className={styles.container}>
      {/* <div className={styles.dropArea} id="drop-area">Drop area</div> */}
      <div className={styles.draftContainer}>
        {/* <div className={styles.avatarContainer}>
          <div className={styles.avatar}>

          </div>
        </div> */}
        <div className={styles.itemDraft}>
          <div
            className={styles.itemDraftTitle}
          >
            {!showTitleEditor ?
              <textarea
                placeholder={placeholderTitleText}
                className={styles.titleTextArea}
                onClick={() => setShowTitleEditor(true)}
              />
              :
              <EditorDraftingContainer
                rep={rep}
                content={titleDraft}
                setValue={setTitleDraft}
                type={'title'}
              />
            }
          </div>
          <div className={styles.itemDraftContent}>
            {!showContentEditor ?
              <textarea
                placeholder={placeholderContentText}
                className={styles.contentTextArea}
                onClick={() => setShowContentEditor(true)}
              />
              :
              <EditorDraftingContainer
                rep={rep}
                content={contentDraft}
                setValue={setContentDraft}
                type={'content'}
              />
            }
          </div>

        </div>
      </div>
      <div className={styles.actionsContainer}>
        <div className={styles.left}>
          <FileUploadContainer
            itemID={itemDraft.id}
            item={itemDraft.item}
            handleSetItemDraft={setItemDraft}
            URL={URL}
            handleSetURL={setURL}
          />
        </div>
        <div className={styles.right}>
          <div
            className={`btn btn-2`}
            onClick={() => handleSetShowMainItemDraft(false)}
          >
            ⌘+C to Cancel
          </div>
          <div
            className={`btn btn-green`}
            onClick={() => saveDraftAsItem()}
          >
            ⌘+Enter to Publish
          </div>
        </div>
      </div>
    </div>
  </HotKeys>
  )
}

function FileUploadContainer({itemID, item, handleSetItemDraft, URL, handleSetURL} : any) {

  const [fileName, setFileName] = useState<string>('')

  useEffect(() => {
    generateIDBSourceFileURL(item.sourceURL)
  }, [item.sourceURL])

  function onUpload(e: ChangeEvent<HTMLInputElement>){
    const file = e?.target.files?.[0]
    file && setFileName(file.name)
    if (!file) {
      console.log(`No file found`)
    } else {
      // const itemID : string = itemID
      const draftFileID = nanoid()
      const fileType = file.type.split('/')[1]
      const sourceURL = `${itemID}/${draftFileID}.${fileType}`

      // rep.mutate.updateItemSourceURL({id: itemID, sourceURL: sourceURL})
      handleSetItemDraft({id: itemID, item: {...item, sourceURL: sourceURL}})
      //upload file to indexedDB
      uploadFileToIDB(file, sourceURL)
      //upload file to supabase
      uploadFileToSupabase(file, sourceURL)
    }
  }

  function handleDeleteSourceFile() {
    console.log('trashing...')
    //delete from IDB
    trashFileFromIDB(item.sourceURL)
    //delete from supabase
    trashFileFromSupabase(item.sourceURL)
    //remove sourceURL from item
    // rep.mutate.updateItemSourceURL({id: itemID, sourceURL: ''})
    handleSetItemDraft({id: itemID, item: {...item, sourceURL: ''}})
  }

  function generateIDBSourceFileURL(sourceURL: string){
    if (!idbOK()) return


    let openRequest = indexedDB.open(DEFAULT_IDB_KEY, 1)

    openRequest.onupgradeneeded = function(e: any){
      let thisDB = e.target.result

      if (!thisDB.objectStoreNames.contains(DEFAULT_SOURCE_FILES_BUCKET)) {
        thisDB.createObjectStore(DEFAULT_SOURCE_FILES_BUCKET, { keyPath: 'id'})
      }
    }

    openRequest.onsuccess = function(e : any) {
      let db = e.target.result
      let tx = db.transaction([DEFAULT_SOURCE_FILES_BUCKET], 'readwrite')
      let store = tx.objectStore(DEFAULT_SOURCE_FILES_BUCKET)

      let request = store.get(sourceURL)

      request.onerror = function(e : any){
        console.log('error', e.target.error.name)
      }

      request.onsuccess = function(e : any){
        let result = e.target.result
        result && handleSetURL(window.URL.createObjectURL(result.file))
      }

      request.onerror = function(event: any) {
        console.dir(event)
      }

    }
    openRequest.onerror = function(event: any) {
      console.dir(event)
    }
  }


  return (
    <>

      <div className={styles.section}>
        {item.sourceURL &&
          <div
            onClick={handleDeleteSourceFile}
            className={`btn btn-2`}
          >
            Remove file
          </div>
        }
        <ItemFileUploadButton
          onUpload={onUpload}
          loading={false}
          sourceUrl={item.sourceURL}
          itemID={itemID}
        />
      </div>
      {item.sourceURL &&
        <div className={styles.uploadedFileContainer}>
          <div className={styles.file}>
            <a href={URL} target="_blank" className={styles.link}>
              {item.sourceURL && `🗂 ` + fileName.slice(0, 30) + `...`}
            </a>
          </div>
        </div>
      }
    </>
  )
}
