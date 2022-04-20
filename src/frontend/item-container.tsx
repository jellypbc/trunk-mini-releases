import React, { useState, useEffect, ChangeEvent } from 'react'
import { useItemByID, getArrowsByIDs, useArrowByID, useAuthorsByItemID } from '../datamodel/subscriptions'
import EditorContainer from './editor-container'
import { htmlToText } from '../util/htmlToText'
import styles from './item-container.module.css'
import ItemArrowsFootnote from './item-arrows-footnote'
import ItemArrowsFront from './item-arrows-front'
import ItemArrowsBack from './item-arrows-back'
import ItemArrowsComment from './item-arrows-comment'
import ItemArrowsAuthor from './item-arrows-author'
import ItemArrowsSub from './item-arrows-sub'
import ItemParent from './item-parent'
import ItemMainSubItems from './item-main-sub-items'
import ItemFileUploadButton from './item-file-upload-button'
import ItemArrowsAuthoredBy from './item-arrows-authored-by'
import { nanoid } from 'nanoid'
import { uploadFileToIDB, trashFileFromIDB }  from '../datamodel/local/file'
import { uploadFileToSupabase, trashFileFromSupabase } from '../datamodel/supabase/file'
import { idbOK } from "../lib/idbOK"
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../lib/constants'

export default function ItemContainer({rep, itemID, handleSetSelectedItemID} : any) {
  const item = useItemByID(rep, itemID)

  return (
    item &&
    <div className={styles.container}>
      <div className={styles.expandedEditorContainer}>
        <div
          className={styles.resetItemID}
          onClick={() => handleSetSelectedItemID('')}
        >
          Dashboard
        </div>
        <div className={styles.itemID}>{itemID}</div>
        <FileUploadContainer
          itemID={itemID}
          item={item}
          rep={rep}
        />
        <HighlightParent
          itemID={itemID}
          arrows={item.arrows}
          rep={rep}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        {item.highlight &&
          <div className={styles.highlight}>
            {htmlToText(item.highlight)}
          </div>
        }
        <div className={styles.parent}>
          <ItemParent
            rep={rep}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div className={styles.titleEditor}>
            <EditorContainer
              doc={item.title}
              type={'title'}
              rep={rep}
              itemID={itemID}
              arrows={[]}
            />
          </div>
        </div>
        <div className={styles.authorsContainer}>
          {item.arrows.length > 0 &&
            <AuthorInfo
              rep={rep}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          }
        </div>
        <div className={styles.content}>
          <EditorContainer
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={item.arrows as any || []}
          />
        </div>
        <ItemArrows
          rep={rep}
          itemID={itemID}
          arrows={item.arrows}
          item={item}
          handleSetSelectedItemID={handleSetSelectedItemID}
          isPerson={item.title.includes('[person]')}
        />
      </div>
    </div>
  )
}

function ItemArrows({ rep, itemID, arrows, item, handleSetSelectedItemID, isPerson}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)

  return (
    arrowIDs && fullArrows &&
    <>
      <div className={styles.mainSubItems}>
        <ItemMainSubItems
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
          fullArrows={fullArrows}
        />
      </div>
      { isPerson &&
        <PersonFooter
          rep={rep}
          fullArrows={fullArrows}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
      <Footer
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </>
  )
}

function PersonFooter({rep, fullArrows, handleSetSelectedItemID}: any) {
  return (
    <div className={styles.meta}>
      <ItemArrowsAuthoredBy
        rep={rep}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function Footer({rep, itemID, arrows, fullArrows, handleSetSelectedItemID} : any) {
  return (
    <div className={styles.meta}>
      <ItemArrowsFootnote
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemArrowsAuthor
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemArrowsSub
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemArrowsFront
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemArrowsBack
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemArrowsComment
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemDeleteItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function FileUploadContainer({itemID, item, rep} : any) {
  const [URL, setURL] = useState<any>('')

  useEffect(() => {
    generateIDBSourceFileURL(item.sourceURL)
  }, [item.sourceURL])


  function onUpload(e: ChangeEvent<HTMLInputElement>){
    const file = e?.target.files?.[0]
    if (!file) {
      console.log(`No file found`)
    } else {
      // const itemID : string = itemID
      const draftFileID = nanoid()
      const fileType = file.type.split('/')[1]
      const sourceURL = `${itemID}/${draftFileID}.${fileType}`

      rep.mutate.updateItemSourceURL({id: itemID, sourceURL: sourceURL})
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
    rep.mutate.updateItemSourceURL({id: itemID, sourceURL: ''})
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
    <div className={styles.upload}>
      {item.sourceURL &&
        <>
          <div className={styles.file}>
            <a href={URL} target="_blank" className={styles.link}>
              {item.sourceURL && `🗂`}
            </a>

          </div>
          <div
            onClick={handleDeleteSourceFile}
            className={styles.hoverOnly}
          >
            ⌘+T to Trash
          </div>
        </>
      }
      <div className={styles.hoverOnly}>
        <ItemFileUploadButton
          onUpload={onUpload}
          loading={false}
          sourceUrl={item.sourceURL}
          itemID={itemID}
        />
      </div>
    </div>
  )
}


function HighlightParent({itemID, arrows, rep, handleSetSelectedItemID}: any) {
  let a
  arrows && arrows.map((arrow : any) => {
    if (
      arrow.kind === 'comment'
      &&
      arrow.backItemID !== itemID
    ) {
      a = arrow
    }
  })

  if (!a) return null

  const { arrowID } = a

  return (
    arrowID &&
    <ParentTitle
      rep={rep}
      arrowID={arrowID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function ParentTitle({rep, arrowID, handleSetSelectedItemID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <Title
      rep={rep}
      itemID={fullArrow.backItemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function Title({rep, itemID, handleSetSelectedItemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.highlightParentContainer}>
    <div
      className={styles.parentTitle}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      <span className={styles.parentArrow}>⮑ </span>
      {item.title && htmlToText(item.title)}
    </div>
    </div>
  )
}



function ItemDeleteItem({rep, itemID, handleSetSelectedItemID} : any) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const item = useItemByID(rep, itemID)

  function deleteItemAndSetSelectedItemIDToEmpty() {
    rep.mutate.deleteItem(itemID)
    handleSetSelectedItemID('')
  }
  return (
    <div
      className={styles.section}
    >
      <div
        className={styles.sectionHeader}
        onClick={() => setDeleteConfirmation(true)}
      >Delete</div>
      {deleteConfirmation && item &&
        <>
        <button
          onClick={() => deleteItemAndSetSelectedItemIDToEmpty()}
        >Delete {htmlToText(item.title)}</button>
        <span
          className={styles.cancel}
          onClick={() => setDeleteConfirmation(false)}
        >Cancel</span>
        </>
      }
    </div>
  )
}

function AuthorInfo({rep, itemID, handleSetSelectedItemID}: any){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    authors &&
      <AuthorArrows
        rep={rep}
        authorArrowIDs={authors}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
  )
}

function AuthorArrows({rep, authorArrowIDs, handleSetSelectedItemID} : any) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  if (!fullArrows) return null

  return (
    <>
    {fullArrows &&
      fullArrows.map((a, i) => {
        return (
          <AuthorItem
            key={`author-${a.id}`}
            rep={rep}
            itemID={a.frontItemID}
            isLast={i === fullArrows.length - 1 && true}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
    })}
    </>
  )
}

function AuthorItem({rep, itemID, isLast, handleSetSelectedItemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div
      className={styles.authors}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      <span>{htmlToText(item.title).split('[')[0].trim()}</span>
      {!isLast && <span>,&nbsp;</span>}
    </div>
  )
}
