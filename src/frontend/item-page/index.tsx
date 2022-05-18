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
  useArrowsByIDs,
  useAuthorArrowsByItemID,
  useCommentArrowsByItemID
 } from '../../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { htmlToText } from '../../util/htmlToText'
import styles from './index.module.css'
import { supabase } from '../../lib/supabase-client'
import EditorContainer from './editor-container'
import ItemMainSubItems from './item-main-sub-items'
import ArrowsAuthoredBy from './arrows-authored-by'
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
// import ItemFileUploadButton from './item-file-upload-button'
import ItemParent from './item-parent'
import Sidebar from './sidebar'


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
  roomID: string
  title: string
  handleSetSelectedItemID: (itemID: string) => void
}

type SidebarProps = {
  createdBy: string
  arrowsCount: number
  itemID: string
  rep: Replicache<M>
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  authorArrows: any
  trunkID: string
  publicationDate: string
  updatedAt: any
  createdAt: any
  showHighlights: boolean
  handleSetShowHighlights: (state: boolean) => void
}

type MainProps = {
  itemID: string
  title: string
  content: string
  rep: Replicache<M>
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  showHighlights: boolean
}

const keyMap = {
  saveItem: ['command+s']
}

export default function ItemPage({ itemID, handleSetSelectedItemID, rep, roomID, handleSetCommandBar } : ItemPageProps ) {
  const item = useItemByID(rep, itemID)

  const clientEmail = useClientEmail(rep)

  const router = useRouter()

  const modifiedRoomID = roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)

  function routeToWorkspace(){
    router.push(`/workspace/${modifiedRoomID}/i`)
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
  const authorArrows = useAuthorArrowsByItemID(rep, itemID)
  const [showHighlights, setShowHighlights] = useState<boolean>(true)

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
          roomID={roomID}
          title={item.title}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        <div className={styles.bodyContainer}>
          {authorArrows &&
            <Sidebar
              createdBy={item.createdBy}
              arrowsCount={item.arrows.length}
              itemID={itemID}
              rep={rep}
              item={item}
              handleSetSelectedItemID={handleSetSelectedItemID}
              authorArrows={authorArrows}
              trunkID={roomID}
              publicationDate={item.publicationDate}
              updatedAt={item.updatedAt}
              createdAt={item.createdAt}
              showHighlights={showHighlights}
              handleSetShowHighlights={setShowHighlights}
            />
          }
          <Main
            itemID={itemID}
            title={item.title}
            content={item.content}
            rep={rep}
            item={item}
            handleSetSelectedItemID={handleSetSelectedItemID}
            showHighlights={showHighlights}
          />
        </div>
      </>
    </div>
  )
}

function Main ({ itemID, title, content, rep, item, handleSetSelectedItemID, showHighlights } : MainProps){
  // function copyShareURLToClipboard(){
  //   navigator.clipboard.writeText(location.href)
  //     .then(() => {
  //       alert(`Copied to clipboard: ${location.href}`)
  //     })
  //     .catch(() => {
  //       alert(`Failed to copy to clipboard: ${location.href}`)
  //     })
  // }

  const commentArrows = useCommentArrowsByItemID(rep, itemID)

  const handlers = {
    saveItem: (e: any) => {
      e.preventDefault()
      alert('Item saved!')
    }
  }

  return (
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
              commentArrows={[]}
              showHighlights={false}
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
        {commentArrows &&
          <EditorContainer
            doc={content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            commentArrows={commentArrows}
            showHighlights={showHighlights}
          />
        }
      </div>
      <ItemArrows
        rep={rep}
        itemID={itemID}
        arrows={item.arrows}
        item={item}
        handleSetSelectedItemID={handleSetSelectedItemID}
        isPerson={item.title.includes('[person]')}
        showHighlights={showHighlights}
      />
    </div>
  </HotKeys>
  )
}

function ItemArrows({ rep, itemID, arrows, item, handleSetSelectedItemID, isPerson, showHighlights}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(rep, arrowIDs)

  return (
    arrowIDs && fullArrows &&
    <>
      <div className={styles.mainSubItems}>
        <ItemMainSubItems
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
          fullArrows={fullArrows}
          showHighlights={showHighlights}
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
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    <div className={styles.meta}>
      {subItemItemIDs &&
        <>
          <ArrowsFootnote
            rep={rep}
            itemID={itemID}
            arrows={arrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
            subItemItemIDs={subItemItemIDs}
          />
            <ArrowsFront
            rep={rep}
            itemID={itemID}
            fullArrows={fullArrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
            subItemItemIDs={subItemItemIDs}
          />
        </>
      }
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
      <ArrowsSub
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function Nav({ email, handleSetCommandBar, rep, roomID, title, handleSetSelectedItemID} : NavProps) {
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

  const modifiedRoomID = roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)

  function routeToWorkspace(){
    router.push(`/workspace/${modifiedRoomID}/i`)
    handleSetSelectedItemID('i')
  }

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
        <div
          className={styles.roomID}
          onClick={() => routeToWorkspace()}
        >
          {roomID.replace(`-`, ` `)}
        </div>
        <div>&rsaquo;</div>
        <div>{htmlToText(title)}</div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.right}>
          <div
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
          </div>
        </div>
        {showProfileDropdown &&
          <div
            className={styles.rightAlignedDropdownMenu}
            onClick={() => logOut()}
            id="profileDropdown"
          >
            <div className={styles.profileDropdownLeft}>
              <div>
                {email}
              </div>
              <div
                className={styles.option}
              >Log out</div>
            </div>
            {/* <div className={styles.profileDropdownRight}>
            </div> */}
          </div>
        }
      </div>
    </div>
  )
}

function AuthorInfo({rep, itemID, handleSetSelectedItemID}: any){
  const authorArrows = useAuthorArrowsByItemID(rep, itemID)

  return (
    authorArrows && authorArrows.length > 0 ?
      <AuthorArrows
        rep={rep}
        authorArrows={authorArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      /> : null
  )
}

function AuthorArrows({rep, authorArrows, handleSetSelectedItemID} : any) {
  const authorCount = authorArrows.length
  return (
    authorArrows.map((arrow: any, i: number) =>
      <AuthorItem
        key={`author-${arrow.id}`}
        rep={rep}
        itemID={arrow.frontItemID}
        isLast={i === authorCount - 1 && true}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    )
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
