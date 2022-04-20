import React, { useState, useEffect, ChangeEvent } from 'react'
import { useItemByID, getArrowsByIDs, useArrowByID, useAuthorsByItemID } from '../datamodel/subscriptions'
import EditorContainer from './editor-container'
import { htmlToText } from '../util/htmlToText'
import styles from './item-container.module.css'
import ItemFootnotes from './item-footnotes'
import ItemFrontArrows from './item-front-arrows'
import ItemBackArrows from './item-back-arrows'
import ItemComments from './item-comments'
import ItemParent from './item-parent'
import ItemMainSubItems from './item-main-sub-items'
import ItemAuthors from './item-authors'
import ItemSubItems from './item-sub-items'
import ItemFileUploadButton from './item-file-upload-button'
import { nanoid } from 'nanoid'
import { uploadFileToIDB, trashFileFromIDB }  from '../datamodel/local/file'
import { uploadFileToSupabase, trashFileFromSupabase } from '../datamodel/supabase/file'
import { idbOK } from "../lib/idbOK"
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../lib/constants'


export default function ItemContainer({rep, itemID, handleSetSelectedItemID} : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <Thingy
      item={item}
      rep={rep}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function Thingy({ item, rep, itemID, handleSetSelectedItemID}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)

  return (
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
            />
          }
        </div>
        <div className={styles.content}>
          <EditorContainer
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={item.arrows || []}
          />
        </div>
        <div className={styles.mainSubItems}>
          {fullArrows &&
            <ItemMainSubItems
              rep={rep}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
              fullArrows={fullArrows}
            />
          }
        </div>
        { fullArrows &&
          <Footer
            rep={rep}
            itemID={itemID}
            arrows={item.arrows}
            fullArrows={fullArrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        }
      </div>
    </div>
  )
}

function Footer({rep, itemID, arrows, fullArrows, handleSetSelectedItemID} : any) {
  return (
    fullArrows &&
    <div className={styles.meta}>
      <ItemFootnotes
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemAuthors
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemSubItems
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemFrontArrows
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemBackArrows
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ItemComments
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

function AuthorInfo({rep, itemID}: any){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    authors &&
      <Thing
        rep={rep}
        authorArrowIDs={authors}
      />
  )
}

function Thing({rep, authorArrowIDs} : any) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  if (!fullArrows) return null

  return (
    <>
    {fullArrows &&
      fullArrows.map((a, i) => {
        return (
          <AuthorFull
            rep={rep}
            itemID={a.frontItemID}
            isLast={i === fullArrows.length - 1 && true}
          />
        )
    })}
    </>
  )
}

function AuthorFull({rep, itemID, isLast}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.authors}>
      <span>{htmlToText(item.title).split('[')[0].trim()}</span>
      {!isLast && <span>,&nbsp;</span>}
    </div>
  )
}
