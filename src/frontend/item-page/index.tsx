import React, {
  useState,
  useEffect,
  // ChangeEvent
} from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import {
  useItemByID,
  useClientEmail,
  getArrowsByIDs,
  useAuthorsByItemID
 } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { htmlToText } from '../../util/htmlToText'
import styles from './index.module.css'
import { supabase } from '../../lib/supabase-client'
import EditorContainer from './editor-container'
import ItemMainSubItems from './item-main-sub-items'
import ArrowsAuthoredBy from './arrows-authored-by'
import ArrowsAuthor from './arrows-author'
import ArrowsBack from './arrows-back'
import ArrowsComment from './arrows-comment'
import ArrowsFootnote from './arrows-footnote'
import ArrowsFront from './arrows-front'
import ArrowsSub from './arrows-sub'
import { HotKeys } from 'react-hotkeys'
import { LOCAL_STORAGE_REDIRECT_URL_KEY } from '../../lib/constants'
// import { nanoid } from 'nanoid'
// import { uploadFileToIDB, trashFileFromIDB }  from '../../datamodel/local/file'
// import { uploadFileToSupabase, trashFileFromSupabase } from '../../datamodel/supabase/file'
import { idbOK } from '../../lib/idbOK'
// import ItemFileUploadButton from './item-file-upload-button'
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../../lib/constants'
import SidebarOutline from './sidebar-outline'
import ItemParent from './item-parent'


type ItemPageProps = {
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  rep: Replicache<M>
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}

type NavProps = {
  email: string
  handleSetCommandBar: (state: boolean) => void
  rep: Replicache<M>
}

type SidebarProps = {
  createdBy: string
  arrowsCount: number
  itemID: string
  rep: Replicache<M>
  item: any
}

type MainProps = {
  itemID: string
  title: string
  content: string
  routeToWorkspace: () => void
  rep: Replicache<M>
  item: any
  handleSetSelectedItemID: (itemID: string) => void
}

const keyMap = {
  saveItem: ['command+s']
}

export default function ItemPage({ itemID, handleSetSelectedItemID, rep, roomID, handleSetCommandBar } : ItemPageProps ) {
  const item = useItemByID(rep, itemID)
  const clientEmail = useClientEmail(rep)

  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }

  if (!item) {
    return (
      <div className={styles.container}>
        <div>Loading...</div>
        <button onClick={() => routeToWorkspace()}>Return to workspace</button>
      </div>
    )
  }

  return (
    <>
    {item && clientEmail &&
      <Container
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        rep={rep}
        roomID={roomID}
        handleSetCommandBar={handleSetCommandBar}
        item={item}
        clientEmail={clientEmail}
      />}
    </>
  )
}

function Container({ itemID, handleSetSelectedItemID, rep, roomID, handleSetCommandBar, item, clientEmail } : any ) {


  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }

  async function signInWithGoogle() {
    const redirectUrl = location.href
    localStorage.setItem
    (LOCAL_STORAGE_REDIRECT_URL_KEY, redirectUrl)
    try {
      const { error } : { error: any } = await supabase.auth.signIn({
        provider: 'google',
      }, {
        redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null || undefined
      })
      if (error) throw error
    } catch (error : any) {
      console.log('Error thrown:', error.message)
      alert(error.error_description || error.message)
    } finally {
    }
  }

  return (
    <div className={styles.container}>
        <>
        {clientEmail === "guest" &&
          <div
            className={styles.banner}
            onClick={(e) => {
              e.preventDefault()
              signInWithGoogle()
            }}
          >
            You look familiar. Have we met? <span className={styles.bannerLogin}>Log in or register</span> to save your contributions. You look like someone named... <span className={styles.bannerAnon}>Anonymous Aardvark</span>. We'll call you that.
          </div>
        }
        <Nav
          email={clientEmail}
          handleSetCommandBar={handleSetCommandBar}
          rep={rep}
        />
        <div className={styles.bodyContainer}>
          <Sidebar
            createdBy={item.createdBy}
            arrowsCount={item.arrows.length}
            itemID={itemID}
            rep={rep}
            item={item}
          />
          <Main
            itemID={itemID}
            title={item.title}
            content={item.content}
            routeToWorkspace={routeToWorkspace}
            rep={rep}
            item={item}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        </div>
      </>
    </div>
  )
}

function Main ({ itemID, title, content, routeToWorkspace, rep, item, handleSetSelectedItemID } : MainProps){
  function copyShareURLToClipboard(){
    navigator.clipboard.writeText(location.href)
      .then(() => {
        alert(`Copied to clipboard: ${location.href}`)
      })
      .catch(() => {
        alert(`Failed to copy to clipboard: ${location.href}`)
      })
  }

  const handlers = {
    saveItem: (e: any) => {
      e.preventDefault()
      alert('Item saved!')
    }
  }

  return(
    <HotKeys
      {...{
        keyMap,
        handlers,
      }}
    >
      <div className={styles.mainContainer}>
        {/* <div>{itemID}</div> */}
        {/* <FileUploadContainer
          itemID={itemID}
          item={item}
          rep={rep}
        /> */}
        <div className={styles.parentContainer}>
          <ItemParent
            rep={rep}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        </div>
        <div className={styles.mainHeader}>
          <div className={styles.title}>
            <EditorContainer
              doc={title}
              type={'title'}
              rep={rep}
              itemID={itemID}
              arrows={[]}
            />
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
        </div>

      <div className={styles.content}>
        <EditorContainer
          doc={content}
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
      <div className={styles.inputContainer}>
        <input
          onClick={() => copyShareURLToClipboard()}
          id={`shareURL`}
          className={styles.input}
          defaultValue={location.href}
          readOnly={true}
        />
        <button
          onClick={() => copyShareURLToClipboard()}
        >Copy</button>
      </div>
      <button onClick={() => routeToWorkspace()}>Back to workspace</button>
    </div>
  </HotKeys>
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
      <ArrowsAuthoredBy
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
      <ArrowsFootnote
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsFront
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsBack
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsComment
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
       <ArrowsAuthor
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsSub
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <DeleteItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function DeleteItem({rep, itemID, handleSetSelectedItemID} : any) {
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

function MetadataModal({ itemID, rep} : any){
  const item = useItemByID(rep, itemID)

  return (
    item &&
    <div className={styles.metadataModal}>
      <div className={styles.metadataLabel}>
        Editing Item
      </div>
      <div className={styles.metadataCreatedBy}>
        <div className={styles.label}>Created by</div>
        <div>{item.createdBy}</div>
      </div>
      <div className={styles.boxStuff}>
        <div className={styles.metadataThing}>
          <div className={styles.label}>Title</div>
          <div>{htmlToText(item.title)}</div>
        </div>
        <div className={styles.metadataThing}>
          <div className={styles.label}>URL</div>
          <input
            placeholder={`www.whatever.com`}
            value={item.webSourceURL}
            onChange={(e:any) => rep.mutate.updateItemWebSourceURL({id: itemID, webSourceURL: e.target.value})}
          />
        </div>
        <div className={styles.metadataThing}>
          <div className={styles.label}>Publication date</div>
          <input
            placeholder={`June 4, 1843`}
            value={item.publicationDate}
            onChange={(e:any) => rep.mutate.updateItemPublicationDate({id: itemID, publicationDate: e.target.value})}
          />
        </div>
      </div>
      <div className={styles.metadataThing}>
        <div className={styles.label}>Label</div>
        <div>John Reed</div>
      </div>
      <div className={styles.tagContainer}>
        <div className={styles.tagAdd}>
          <div className={styles.bigLabel}>Tags</div>
          <div className={styles.addTagThing}>
            <input placeholder={`Enter tag text`}/>
            <button>Save</button>
          </div>
        </div>
        <div className={styles.tags}>
          <span>biology</span>
          <span>distillation technology</span>
          <span>caves</span>
          </div>
      </div>
      <div className={styles.archiveContainer}>
        <button>Archive</button>
      </div>
    </div>
  )
}

function Sidebar({ createdBy, arrowsCount, itemID, rep, item } : SidebarProps){
  const [showOutline, setShowOutline] = useState<boolean>(true)
  const [showMetadataModal, setShowMetadataModal] = useState<boolean>(false)
  const [URL, setURL] = useState<string>('')

  useEffect(() => {
    generateIDBSourceFileURL(item.sourceURL)
  }, [])

  function copyShareURLToClipboard(){
    navigator.clipboard.writeText(location.href)
      .then(() => {
        alert(`Copied to clipboard: ${location.href}`)
      })
      .catch(() => {
        alert(`Failed to copy to clipboard: ${location.href}`)
      })
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
      console.log('request', request)

      request.onerror = function(e : any){
        console.log('error', e.target.error.name)
      }

      request.onsuccess = function(e : any){
        let result = e.target.result
        // if result == undefined then fetch from supabase
        // then generateIDBSourceFileURL again
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


  return(
    <div className={styles.sidebarContainer}>
      {showMetadataModal &&
        <MetadataModal
          itemID={itemID}
          rep={rep}

        />
      }
      <div className={styles.top}>
        <div className={styles.createdByContainer}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <div className={styles.profile}>
                <div className={styles.online}>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.createdBy}>
            {createdBy ? createdBy.split(`@`)[0] : 'anonymous'}
          </div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Last updated</div>
          <div>April 4, 2022</div>
        </div>
        <div
          className={styles.metadataContainer}
          onClick={() => setShowMetadataModal(!showMetadataModal)}
        >
          View Metadata
        </div>
        <div className={styles.viewPDFContainer}>
          <a
            href={URL}
            target="_blank"
          >View PDF</a>
        </div>
        <div
          className={styles.shareItemContainer}
          onClick={() => copyShareURLToClipboard()}
        >
          Share this item
        </div>
        <div className={styles.arrowsCountContainer}>
          <div className={styles.arrowsCount}>
            {arrowsCount}
          </div>
          <div className={styles.arrowsLabel}>
            Linked items
          </div>
        </div>
        <div
          className={styles.outlineMinimapContainer}
          onClick={() => setShowOutline(!showOutline)}
        >
          <div className={styles.outlineMinimapLabel}>
            {showOutline ? <span className={styles.bold}>Outline</span> : <span>Outline</span>}
            <span>/</span>
            {!showOutline ? <span className={styles.bold}>Minimap</span> : <span>Minimap</span>}
          </div>
          {showOutline ?
            <div className={styles.outlineContainer}>
              <SidebarOutline
                rep={rep}
                item={item}
                itemID={itemID}
              />
            </div>
          :
            <div className={styles.outlineContainer}>
              Minimap
            </div>
          }
        </div>
      </div>
    </div>
  )
}

function Nav({ email, handleSetCommandBar, rep } : NavProps) {
  console.log('handleSetCommandBar', handleSetCommandBar)
  const [anonItemIDs, setAnonItemIDs] = useState<string[]>([])
  const [anonArrowIDs, setAnonArrowIDs] = useState<string[]>([])
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false)

  useEffect(() => {
    const anonItemIDs = localStorage.getItem('trunk.anonItemIDs')
    setAnonItemIDs(anonItemIDs && JSON.parse(anonItemIDs) || [])
    const anonArrowIDs = localStorage.getItem('trunk.anonArrowIDs')
    setAnonArrowIDs(anonArrowIDs && JSON.parse(anonArrowIDs) || [])
  }, [])

  useEffect(() => {
    if (anonItemIDs.length > 0 && email !== 'guest') {
      anonItemIDs.map((itemID: any) => {
        rep.mutate.updateItemCreatedBy({id: itemID, createdBy: email})
      })
      localStorage.setItem('trunk.anonItemIDs', JSON.stringify([]))
    }
  }, [anonItemIDs])

  useEffect(() => {
    if (anonArrowIDs.length > 0 && email !== 'guest') {
      anonArrowIDs.map((arrowID: any) => {
        rep.mutate.updateArrowCreatedBy({id: arrowID, createdBy: email})
      })
      localStorage.setItem('trunk.anonArrowIDs', JSON.stringify([]))
    }
  }, [anonArrowIDs])

  const router = useRouter()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  if (typeof window !== 'undefined') {
    window.onclick = function(event: any) {
      if (showProfileDropdown && event?.target?.id !== 'profileDropdown') {
        setShowProfileDropdown(false)
      }
    }
  }

  return(
    <div className={styles.navContainer}>
      <div className={styles.left}>

      </div>
      <div className={styles.rightContainer}>
        <div className={styles.right}>
          {/* <div
            className={styles.searchBar}
            onClick={() => handleSetCommandBar(true)}>
            Search or type ⌘ + K
          </div>
          <div
            className={styles.options}
            id="profileDropdown"
            onClick={() => setShowProfileDropdown(true)}
          >
            ≡
          </div> */}
        </div>
        {showProfileDropdown &&
          <div
            className={styles.rightAlignedDropdownMenu}
            onClick={() => logOut()}
            id="profileDropdown"
          >
            <div className={styles.left}>
              <div
                className={styles.option}
              >Log out</div>
            </div>
            <div className={styles.right}>
            </div>
          </div>
        }
      </div>
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

// function FileUploadContainer({itemID, item, rep} : any) {
//   // const [URL, setURL] = useState<any>('')

//   function onUpload(e: ChangeEvent<HTMLInputElement>){
//     const file = e?.target.files?.[0]
//     if (!file) {
//       console.log(`No file found`)
//     } else {
//       // const itemID : string = itemID
//       const draftFileID = nanoid()
//       const fileType = file.type.split('/')[1]
//       const sourceURL = `${itemID}/${draftFileID}.${fileType}`

//       rep.mutate.updateItemSourceURL({id: itemID, sourceURL: sourceURL})
//       //upload file to indexedDB
//       uploadFileToIDB(file, sourceURL)
//       //upload file to supabase
//       uploadFileToSupabase(file, sourceURL)
//     }
//   }

//   function handleDeleteSourceFile() {
//     console.log('trashing...')
//     //delete from IDB
//     trashFileFromIDB(item.sourceURL)
//     //delete from supabase
//     trashFileFromSupabase(item.sourceURL)
//     //remove sourceURL from item
//     rep.mutate.updateItemSourceURL({id: itemID, sourceURL: ''})
//   }

//   // function generateIDBSourceFileURL(sourceURL: string){
//   //   if (!idbOK()) return


//   //   let openRequest = indexedDB.open(DEFAULT_IDB_KEY, 1)

//   //   openRequest.onupgradeneeded = function(e: any){
//   //     let thisDB = e.target.result

//   //     if (!thisDB.objectStoreNames.contains(DEFAULT_SOURCE_FILES_BUCKET)) {
//   //       thisDB.createObjectStore(DEFAULT_SOURCE_FILES_BUCKET, { keyPath: 'id'})
//   //     }
//   //   }

//   //   openRequest.onsuccess = function(e : any) {
//   //     let db = e.target.result
//   //     let tx = db.transaction([DEFAULT_SOURCE_FILES_BUCKET], 'readwrite')
//   //     let store = tx.objectStore(DEFAULT_SOURCE_FILES_BUCKET)

//   //     let request = store.get(sourceURL)

//   //     request.onerror = function(e : any){
//   //       console.log('error', e.target.error.name)
//   //     }

//   //     request.onsuccess = function(e : any){
//   //       let result = e.target.result
//   //       result && setURL(window.URL.createObjectURL(result.file))
//   //     }

//   //     request.onerror = function(event: any) {
//   //       console.dir(event)
//   //     }

//   //   }
//   //   openRequest.onerror = function(event: any) {
//   //     console.dir(event)
//   //   }
//   // }


//   return (
//     <div className={styles.upload}>
//       {item.sourceURL &&
//         <>
//           {/* <div className={styles.file}>
//             <a href={URL} target="_blank" className={styles.link}>
//               {item.sourceURL && `🗂`}
//             </a>

//           </div> */}
//           <div
//             onClick={handleDeleteSourceFile}
//             className={styles.hoverOnly}
//           >
//             ⌘+T to Trash PDF
//           </div>
//         </>
//       }
//       <div className={styles.hoverOnly}>
//         <ItemFileUploadButton
//           onUpload={onUpload}
//           loading={false}
//           sourceUrl={item.sourceURL}
//           itemID={itemID}
//         />
//       </div>
//     </div>
//   )
// }
