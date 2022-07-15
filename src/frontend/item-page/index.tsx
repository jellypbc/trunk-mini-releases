import React, {
  useState,
  // ChangeEvent
} from 'react'
import type { Reflect } from '@rocicorp/reflect'
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
import ItemMainSubItems from './item-main-sub-items'
import ItemPageNav from './item-page-nav'


type ItemPageProps = {
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  reflect: Reflect<M>
  roomID: string
  handleSetCommandBar: (state: boolean) => void
}



type MainProps = {
  itemID: string
  title: string
  content: string
  reflect: Reflect<M>
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  showHighlights: boolean
}

const keyMap = {
  saveItem: ['command+s']
}

export default function ItemPage({ itemID, handleSetSelectedItemID, reflect, roomID, handleSetCommandBar } : ItemPageProps ) {
  const item = useItemByID(reflect, itemID)

  const clientEmail = useClientEmail(reflect)

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
        reflect={reflect}
        roomID={roomID}
        handleSetCommandBar={handleSetCommandBar}
        item={item}
        clientEmail={clientEmail}
      />}
    </>
  )
}

function Container({ itemID, handleSetSelectedItemID, reflect, roomID, handleSetCommandBar, item, clientEmail } : any ) {
  const authorArrows = useAuthorArrowsByItemID(reflect, itemID)
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
    <div className="h-screen w-screen pt-4 overflow-auto">
      <div className="my-0 mx-auto max-w-screen-lg h-full grid grid-rows-[auto_auto] gap-4">
        {clientEmail === "guest" &&
          <div className={styles.hi}>
            <div
              className={styles.banner}
              onClick={(e) => {
                e.preventDefault()
                signInWithGoogle()
              }}
            >
              You look familiar. Have we met? <span className={styles.bannerLogin}>Log in</span> to save your contributions. You look like someone named... <span className={styles.bannerAnon}>Anonymous Aardvark</span>. We'll call you that.
            </div>
          </div>
        }
        <div className="">
          <ItemPageNav
            email={clientEmail}
            handleSetCommandBar={handleSetCommandBar}
            reflect={reflect}
            roomID={roomID}
            title={item.title}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        </div>
        <div className="grid md:grid-cols-[150px_550px_auto] gap-4">
          {authorArrows &&
            <div className="p-4 hidden md:table-cell max-h-fit">
              <Sidebar
                createdBy={item.createdBy}
                arrowsCount={item.arrows.length}
                itemID={itemID}
                reflect={reflect}
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
            </div>
          }
          <div className="p-4">
            <Main
              itemID={itemID}
              title={item.title}
              content={item.content}
              reflect={reflect}
              item={item}
              handleSetSelectedItemID={handleSetSelectedItemID}
              showHighlights={showHighlights}
            />
          </div>
          <div className="p-4 hidden md:table-cell">
          </div>
        </div>
      </div>
    </div>
  )
}

function Main ({ itemID, title, content, reflect, item, handleSetSelectedItemID, showHighlights } : MainProps){
  // function copyShareURLToClipboard(){
  //   navigator.clipboard.writeText(location.href)
  //     .then(() => {
  //       alert(`Copied to clipboard: ${location.href}`)
  //     })
  //     .catch(() => {
  //       alert(`Failed to copy to clipboard: ${location.href}`)
  //     })
  // }

  const commentArrows = useCommentArrowsByItemID(reflect, itemID)

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
          reflect={reflect}
        /> */}
        <div className={styles.parentContainer}>
          <ItemParent
            reflect={reflect}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        </div>
        <div className={styles.mainHeader}>
          <div className={styles.title}>
            <EditorContainer
              doc={title}
              type={'title'}
              reflect={reflect}
              itemID={itemID}
              commentArrows={[]}
              showHighlights={false}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          </div>
          <div className={styles.authorsContainer}>
            {item.arrows.length > 0 &&
              <AuthorInfo
                reflect={reflect}
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
            reflect={reflect}
            itemID={itemID}
            commentArrows={commentArrows}
            showHighlights={showHighlights}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        }
      </div>
      <ItemArrows
        reflect={reflect}
        itemID={itemID}
        arrows={item.arrows}
        item={item}
        handleSetSelectedItemID={handleSetSelectedItemID}
        isPerson={item.title.includes('[person]')}
      />
    </div>
  </HotKeys>
  )
}

function ItemArrows({ reflect, itemID, arrows, item, handleSetSelectedItemID, isPerson}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(reflect, arrowIDs)

  return (
    arrowIDs && fullArrows &&
    <>
      <div className={styles.mainSubItems}>
        <ItemMainSubItems
          reflect={reflect}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
          fullArrows={fullArrows}
          showHighlights={true}
        />
      </div>
      { isPerson &&
        <PersonFooter
          reflect={reflect}
          fullArrows={fullArrows}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
      <Footer
        reflect={reflect}
        itemID={itemID}
        arrows={arrows}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </>
  )
}

function PersonFooter({reflect, fullArrows, handleSetSelectedItemID}: any) {
  return (
    <div className={styles.meta}>
      <ArrowsAuthoredBy
        reflect={reflect}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function Footer({reflect, itemID, arrows, fullArrows, handleSetSelectedItemID} : any) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    <div className={styles.meta}>
      {subItemItemIDs &&
        <>
          <ArrowsFootnote
            reflect={reflect}
            itemID={itemID}
            arrows={arrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
            subItemItemIDs={subItemItemIDs}
          />
            <ArrowsFront
            reflect={reflect}
            itemID={itemID}
            fullArrows={fullArrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
            subItemItemIDs={subItemItemIDs}
          />
        </>
      }
      <ArrowsBack
        reflect={reflect}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsComment
        reflect={reflect}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <ArrowsSub
        reflect={reflect}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}


function AuthorInfo({reflect, itemID, handleSetSelectedItemID}: any){
  const authorArrows = useAuthorArrowsByItemID(reflect, itemID)

  return (
    authorArrows && authorArrows.length > 0 ?
      <AuthorArrows
        reflect={reflect}
        authorArrows={authorArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      /> : null
  )
}

function AuthorArrows({reflect, authorArrows, handleSetSelectedItemID} : any) {
  const authorCount = authorArrows.length
  return (
    authorArrows.map((arrow: any, i: number) =>
      <AuthorItem
        key={`author-${arrow.id}`}
        reflect={reflect}
        itemID={arrow.frontItemID}
        isLast={i === authorCount - 1 && true}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    )
  )
}

function AuthorItem({reflect, itemID, isLast, handleSetSelectedItemID}: any) {
  const item = useItemByID(reflect, itemID)
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

// function FileUploadContainer({itemID, item, reflect} : any) {
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

//       reflect.mutate.updateItemSourceURL({id: itemID, sourceURL: sourceURL})
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
//     reflect.mutate.updateItemSourceURL({id: itemID, sourceURL: ''})
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
