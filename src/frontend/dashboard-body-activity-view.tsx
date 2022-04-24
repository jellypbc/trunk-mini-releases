import React, { useState, useEffect, ChangeEvent } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './dashboard-body-activity-view.module.css'
import EditorDraftingContainer from './editor-drafting-container'
import { randomItem } from '../datamodel/item'
import { HotKeys } from 'react-hotkeys'
import { useItemByID, useArrowByID, getArrowsByIDs, useAuthorsByItemID, useClientEmail, useClientUsername, useClientAvatarURL } from '../datamodel/subscriptions'
import { htmlToText } from '../util/htmlToText'
import ItemParent from './item-parent'
import EditorContainer from './editor-container'
import { uploadFileToIDB, trashFileFromIDB }  from '../datamodel/local/file'
import { uploadFileToSupabase, trashFileFromSupabase } from '../datamodel/supabase/file'
import {
  DEFAULT_SOURCE_FILES_BUCKET,
  DEFAULT_IDB_KEY
} from '../lib/constants'
import { nanoid } from 'nanoid'
import { idbOK } from '../lib/idbOK'
import ItemFileUploadButton from './item-file-upload-button'
// import Image from 'next/image'

const keyMap = {
  createItem: ['command+enter']
}

type ActivityViewProps = {
  setShowIndex: (state: boolean) => void
  rep: Replicache<M>
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
}

export default function ActivityView({ setShowIndex, rep, items, handleSetSelectedItemID } : ActivityViewProps) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  const email = useClientEmail(rep)
  const username = useClientUsername(rep)
  const avatarURL = useClientAvatarURL(rep)

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.navActions}>
          <div>

          </div>
          <div
            className={styles.navToViewAll}
            onClick={() => setShowIndex(true)}
          >
            View all items
          </div>
        </div>
      </div>
      { email && username && avatarURL &&
        <ItemDraft
          rep={rep}
          email={email}
          username={username}
          avatarURL={avatarURL}
        />
      }
      <div className={styles.activityFeed}>
        { items.slice(0, itemsShown).map((item: any) => {
          return (
            <div key={item.id}>
              <ActivityItem
                itemID={item.id}
                rep={rep}
                handleSetSelectedItemID={handleSetSelectedItemID}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={'button button-primary'}
          onClick={addTenItems}
        >
          Show more items
        </button>
      </div>
    </div>
  )
}

type ItemDraftProps = {
  rep: Replicache<M>
  email: string
  username: string
  avatarURL: string
}

function ItemDraft({rep, email, username, avatarURL}  : ItemDraftProps) {
  console.log('username', username, 'avatarURL', avatarURL)
  const [titleDraft, setTitleDraft] = useState<string>('<p> </p>')
  const [contentDraft, setContentDraft] = useState<string>('<p> </p>')

  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)



  function saveDraftAsItem(){
    const item = randomItem()
    const changes = {
      title: titleDraft,
      content: contentDraft,
      createdBy: email,
    }

    const itemItem = {...item.item, ...changes}
    rep.mutate.createItem({id: item.id, item: itemItem})
  }

  const handlers = {
    createItem: () => {
      saveDraftAsItem()
      setTitleDraft('<p> </p>')
      setContentDraft('<p> </p>')
      setShowTitleEditor(false)
      setShowContentEditor(false)
    }
  }
  const placeholderText = `What's on your mind?`
  return (
    <HotKeys
      {...{
        style: { outline: "none", display: "flex", flex: 1 },
        keyMap,
        handlers,
      }}
    >
    <div className={styles.draftContainer}>
      <div className={styles.draft}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {/* {avatarURL &&
              <Image
                alt="Next.js logo"
                src={avatarURL}
                width={200}
                height={200}
                className={styles.avatarImage}
              />
            } */}
          </div>
        </div>
        <div className={styles.draftEditorContainer}>
          <div className={styles.titleDraftContainer}>
            <div className={styles.bullet}>
              <div className={styles.bulletBorder}>
                <div className={styles.bulletCenter}>
                </div>
              </div>
            </div>
            <div className={styles.titleDraft}>
              {!showTitleEditor ?
                <textarea
                  placeholder={`Untitled`}
                  className={styles.titleTextArea}
                  onClick={() => setShowTitleEditor(true)}
                />
                :
                <div>
                  <EditorDraftingContainer
                    rep={rep}
                    content={titleDraft}
                    clientInfo={null}
                    setValue={setTitleDraft}
                    type='title'
                  />
                </div>
              }
            </div>
          </div>
          <div className={styles.content}>
            {!showContentEditor ?
              <textarea
                placeholder={placeholderText}
                className={styles.contentTextArea}
                onClick={() => setShowContentEditor(true)}
              />
            :
            <EditorDraftingContainer
              rep={rep}
              content={contentDraft}
              clientInfo={null}
              setValue={setContentDraft}
              type='content'
            />
            }
          </div>
        </div>
      </div>
      <div className={styles.draftActions}>
        <div
          onClick={() => saveDraftAsItem()
        }>⌘+Enter to Publish</div>
      </div>
    </div>
    </HotKeys>
  )
}

type ActivityItemProps = {
  itemID: string
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
}


function ActivityItem({itemID, rep, handleSetSelectedItemID}: ActivityItemProps) {
  const item = useItemByID(rep, itemID)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)
  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showOptions, setShowOptions ] = useState<boolean>(false)


  function handleExpandItem(){
    handleSetSelectedItemID(itemID)
  }


  return (
    item &&
    <div
      className={styles.itemContainer}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>
      </div>
      <div
        className={styles.item}
        onMouseOver={() => setShowOptions(true)}
      >
        { showOptions &&
          <ActivityItemOptions
            handleSetShowOptions={setShowOptions}
            handleSetSelectedDraftID={handleExpandItem}
          />
        }
        <FileUploadContainer
          itemID={itemID}
          item={item}
          rep={rep}
        />
        { item.highlight &&
          <>
            <HighlightParent
              rep={rep}
              itemID={itemID}
              arrows={item.arrows}
            />
            <div className={styles.highlight}>
              {htmlToText(item.highlight)}
            </div>
          </>
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
          <div className={styles.title}>
            {!showTitleEditor
            ?
              <span className={styles.readOnly} onClick={() => setShowTitleEditor(true)}>{htmlToText(item.title)}</span>
            :
            <EditorContainer
              doc={item.title}
              type={'title'}
              rep={rep}
              itemID={itemID}
              arrows={[]}
            />
            }
          </div>
        </div>
        <div className={styles.authors}>
          { item.arrows.length > 0 &&
            <AuthorInfo
              rep={rep}
              itemID={itemID}
            />
          }
        </div>
        <div className={styles.content}>
          {!showContentEditor
          ?
            <span className={styles.readOnly} onClick={() => setShowContentEditor(true)}>{htmlToText(item.content).substring(0, 300)}</span>
          :
            <EditorContainer
              doc={item.content}
              type={'content'}
              rep={rep}
              itemID={itemID}
              arrows={[]}
            />
          }
        </div>
      </div>
    </div>
  )
}

type FileUploadContainerProps = {
  itemID: string
  item: any
  rep: Replicache<M>
}


function FileUploadContainer({itemID, item, rep} : FileUploadContainerProps) {
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


type ActivityItemOptionsProps = {
  handleSetShowOptions: (showOptions: boolean) => void
  handleSetSelectedDraftID: () => void
}

function ActivityItemOptions({ handleSetShowOptions, handleSetSelectedDraftID } : ActivityItemOptionsProps) {

  return (
    <div
      className={styles.activityItemOptionsContainer}
      onMouseLeave={() => handleSetShowOptions(false)}
    >
      <div
        className={styles.expandOption}
        onClick={() => handleSetSelectedDraftID()}
      >
        Expand · E
      </div>
    </div>
  )
}


function HighlightParent({itemID, arrows, rep}: any) {
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
    />
  )
}

type ParentTitleProps = {
  rep: Replicache<M>
  arrowID: string
}

function ParentTitle({rep, arrowID}: ParentTitleProps) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <Title
      rep={rep}
      itemID={fullArrow.backItemID}
    />
  )
}

type TitleProps = {
  rep: Replicache<M>
  itemID: string
}

function Title({rep, itemID}: TitleProps) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.highlightParentTitle}>
      <span className={styles.highlightParentArrow}>⮑</span>
      {item.title && htmlToText(item.title)}
    </div>
  )
}

type AuthorInfoProps = {
  rep: Replicache<M>
  itemID: string
}

function AuthorInfo({rep, itemID}: AuthorInfoProps){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    <AuthorItems
      rep={rep}
      authorArrowIDs={authors}
    />
  )
}

type AuthorItemsProps = {
  rep: Replicache<M>
  authorArrowIDs: string[]
}

function AuthorItems({rep, authorArrowIDs} : AuthorItemsProps) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  return (
    fullArrows.length > 0 ?
      <AuthorFull
        rep={rep}
        itemID={fullArrows[0].frontItemID}
        authorLength={fullArrows.length}
      />
      :
      null
  )
}

type AuthorFullProps = {
  rep: Replicache<M>
  itemID: string
  authorLength: number
}


function AuthorFull({rep, itemID, authorLength}: AuthorFullProps) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div>By {htmlToText(item.title).split('[')[0]}  {authorLength > 1 && `+ ${authorLength - 1}`} </div>
  )
}



