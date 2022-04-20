import React, { useState, useEffect, ChangeEvent } from 'react'
import styles from './dashboard-body.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { htmlToText } from '../util/htmlToText'
import EditorContainer from './editor-container'
import { useItemByID, useArrowByID, getArrowsByIDs, useAuthorsByItemID } from '../datamodel/subscriptions'
import EditorParent from './item-parent'
import { HotKeys } from 'react-hotkeys'
import ItemFileUploadButton from './item-file-upload-button'
import { uploadFileToIDB, trashFileFromIDB }  from '../datamodel/local/file'
import { uploadFileToSupabase, trashFileFromSupabase } from '../datamodel/supabase/file'
import { nanoid } from 'nanoid'
import { idbOK } from '../lib/idbOK'
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../lib/constants'


type Props = {
  rep: Replicache<M>
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
}

export default function DashboardBody({ rep, items, handleSetSelectedItemID } : Props) {
  const [showIndex, setShowIndex] = useState<boolean>(false)


  return (
      <div className={styles.container}>
        <div className={styles.view}>
          {!showIndex ?
            <ActivityView
              setShowIndex={setShowIndex}
              items={items}
              rep={rep}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          :
            <IndexView
              setShowIndex={setShowIndex}
              items={items}
              handleSetSelectedItemID={handleSetSelectedItemID}
              rep={rep}
            />
          }
        </div>
      </div>

  )
}

const keyMap = {
  createItem: ['command+enter']
}

function IndexView({ setShowIndex, items, handleSetSelectedItemID, rep } : any) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }
  return (
    <div className={styles.indexContainer}>
      <div className={styles.indexNav}>
        <div
          className={styles.activityView}
          onClick={() => setShowIndex(false)}
        >
          Back
        </div>
        <div className={styles.indexTitle}>
          All items
        </div>
        <div className={styles.indexSort}>
          <div>Sort results by:</div>
          <div>Title</div>
          <div>Most recent</div>
        </div>
      </div>
      <div className={styles.itemList}>
        {items.slice(0, itemsShown).map((item : any) => {
          return (
            <div
              key={item.id}
              className={styles.indexItem}
              onClick={() => handleSetSelectedItemID(item.id)}
            >
              <div className={styles.indexItemTitle}>
                {item.title && htmlToText(item.title)}
              </div>
              {item.arrows.length > 0 &&
                <AuthorInfo
                  rep={rep}
                  itemID={item.id}
                />
              }
            </div>
          )
        })}

      </div>
      <button
        className={'button button-primary'} onClick={() => addTenItems()}
      > Show more items</button>
    </div>
  )
}

function AuthorInfo({rep, itemID}: any){
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    <Thing
      rep={rep}
      authorArrowIDs={authors}
    />
  )
}

function Thing({rep, authorArrowIDs} : any) {
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

function AuthorFull({rep, itemID, authorLength}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div>By {htmlToText(item.title).split('[')[0]}  {authorLength > 1 && `+ ${authorLength - 1}`} </div>
  )
}

function ActivityView({ setShowIndex, rep, items, handleSetSelectedItemID } : any) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedOptions}>
        <div className={styles.emptyOptions}>
        </div>
        <div className={styles.optionActions}>
          <div>
            {/* <button className={'button button-secondary'}>
              Add new item
            </button> */}
          </div>
          <div
            className={styles.viewAll}
            onClick={() => setShowIndex(true)}
          >
            View all items
          </div>
        </div>
      </div>
      <ItemDraft
        rep={rep}
      />
      <div className={styles.feed}>
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

import EditorDraftingContainer from './editor-drafting-container'
import { randomItem } from '../datamodel/item'

function ItemDraft({rep}  : any) {
  const [titleDraft, setTitleDraft] = useState<string>('<p> </p>')
  const [contentDraft, setContentDraft] = useState<string>('<p> </p>')

  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)


  function saveDraftAsItem(){
    const item = randomItem()
    const changes = {
      title: titleDraft,
      content: contentDraft,
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
    <div className={styles.itemDraftingContainer}>
      <div className={styles.thing}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.itemDraft}>
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


function ActivityItem({itemID, rep, handleSetSelectedItemID}: any) {
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
          <EditorParent
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
            <span className={styles.readOnly} onClick={() => setShowContentEditor(true)}>{htmlToText(item.content)}</span>
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

function ParentTitle({rep, arrowID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <Title
      rep={rep}
      itemID={fullArrow.backItemID}
    />
  )
}

function Title({rep, itemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.highlightParentTitle}>
      <span className={styles.highlightParentArrow}>⮑</span>
      {item.title && htmlToText(item.title)}
    </div>
  )
}

