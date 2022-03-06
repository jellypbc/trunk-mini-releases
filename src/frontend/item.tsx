import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './item.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'
import EditorViewingContainer from './editor-viewing-container'
import EditorOptions from './editor-options'
import Arrow from './arrow'
import FileUploadButton from './file-upload-button'
import { nanoid } from 'nanoid'
import uploadFileToIDB from '../datamodel/local/file'
import uploadFileToSupabase from '../datamodel/supabase/file'
import { idbOK } from "../lib/idbOK"
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../lib/constants'

type Props = {
  itemID: string
  item: any
  rep: Replicache<M>
  setSelectedDraftID: any
}

export default function Item({ itemID, item, rep, setSelectedDraftID } : Props) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)
  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [URL, setURL] = useState<any>('')
  console.log('i', i)

  useEffect(() => {
    generateIDBSourceFileURL(i.sourceURL)
  }, [i.sourceURL])

  useEffect(() => {
    titleValue !== i.title && rep.mutate.updateItemTitle({ id: i.id, title: titleValue })
  }, [titleValue])

  useEffect(() => {
    contentValue !== i.content && rep.mutate.updateItemContent({ id: i.id, content: contentValue})
  }, [contentValue])

  const date = i.createdAt

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  function handleItemDelete() {
    rep.mutate.deleteItem(i.id)
  }

  function handleSetSelectedDraftID() {
    setSelectedDraftID(i.id)
  }

  const arrowArray = JSON.parse(item.arrows)

  function onUpload(e: ChangeEvent<HTMLInputElement>){
    console.log('e', e)
    const file = e?.target.files?.[0]
    if (!file) {
      console.log(`No file found`)
    } else {
      const itemID = i.id
      const draftFileID = nanoid()
      const fileType = file.type.split('/')[1]
      const sourceURL = `${itemID}/${draftFileID}.${fileType}`

      rep.mutate.updateItemSourceURL({id: i.id, sourceURL: sourceURL})
      //upload file to indexedDB
      uploadFileToIDB(file, sourceURL)
      //upload file to supabase
      uploadFileToSupabase(file, sourceURL)
    }
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
        console.log('result', result)
        result && setURL(window.URL.createObjectURL(result.file))
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
    <div
      className={styles.container}
      onMouseLeave={() => setShowOptions(false)}
    >


      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.metaData}>
          <div>{i.createdBy}</div>
          <div>{dateInWords(date)}</div>
        </div>
      </div>
      <div
        className={styles.right}
        onMouseOver={() => setShowOptions(true)}
      >
        { showOptions &&
          <EditorOptions
            handleSetShowOptions={setShowOptions}
            handleSetSelectedDraftID={handleSetSelectedDraftID}
            handleDraftDelete={handleItemDelete}
          />
        }
        <div className={styles.upload}>
          <div>
            <a href={URL} target="_blank">
              {i.sourceURL && `🗂`}
            </a>
          </div>
          <div>
            <FileUploadButton
              onUpload={onUpload}
              loading={false}
              sourceUrl={''}
            />
          </div>

        </div>
        <div>
          {arrowArray.map((a: any) => {
            return(
              <Arrow
                key={a}
                arrowID={a}
                rep={rep}
                itemID={itemID}
              />
            )
          })}
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div
            className={styles.title}
            onClick={() => setShowTitleEditor(true)}
          >
            {showTitleEditor ?
              <ItemEditorContainer
                content={titleValue}
                setValue={setTitleValue}
                editable={true}
                type={'title'}
                rep={rep}
                item={item}
                itemID={itemID}
              />
              :
              <EditorViewingContainer
                type={'title'}
                rep={rep}
                content={i.title}
                clientInfo={null}
                setValue={()=>{ return null}}
              />
            }
          </div>
        </div>

        <div
          className={styles.content}
          onClick={() => setShowContentEditor(true)}
        >
          { showContentEditor ?
            <ItemEditorContainer
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
              rep={rep}
              item={item}
              itemID={itemID}
            />
            :
            <EditorViewingContainer
              type={'content'}
              rep={rep}
              content={i.content}
              clientInfo={null}
              setValue={()=>{ return null}}
            />
          }
        </div>

      </div>
    </div>
  )
}
