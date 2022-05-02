import React, { useState } from 'react'
import styles from './main-activity-view.module.css'
import { htmlToText } from '../../util/htmlToText'
import { dateInWords } from '../../lib/dateInWords'
import { useRouter } from 'next/router'
import {
  useAuthorsByItemID,
  useAuthorItemsByArrowIDs,
  useItemByID
} from '../../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import ItemParent from './item-parent'
// import { nanoid } from 'nanoid'
// import { uploadFileToIDB, trashFileFromIDB }  from '../../datamodel/local/file'
// import { uploadFileToSupabase, trashFileFromSupabase } from '../../datamodel/supabase/file'
// import { idbOK } from '../../lib/idbOK'
// import ItemFileUploadButton from './item-file-upload-button'
// import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../../lib/constants'

type MainActivityViewProps = {
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  rep: Replicache<M>
}

type ActivityItemProps = {
  item: any
  handleSetSelectedItemID: (itemID: string) => void
  roomID: string
  rep: Replicache<M>
  itemID: string
}

type AuthorInfoProps = {
  rep: Replicache<M>
  authorArrows: any[]
}

export default function MainActivityView({ items, handleSetSelectedItemID, roomID, rep } : MainActivityViewProps ) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function showTenMoreItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.container}>
      {items.slice(0, itemsShown).map((item : any) =>
        <ActivityItem
          key={`activity-item-${item.id}`}
          item={item}
          handleSetSelectedItemID={handleSetSelectedItemID}
          roomID={roomID}
          rep={rep}
          itemID={item.id}
        />
      )}
      <div className={styles.buttonContainer}>
        <button
          className={`btn btn-1`}
          onClick={showTenMoreItems}
        >
          Show 10 more items
        </button>
      </div>
    </div>
  )
}

function ActivityItem({ item, handleSetSelectedItemID, roomID, rep, itemID } : ActivityItemProps ){
  const safeTitle = htmlToText(item.title)
  const safeCreatedAt = dateInWords(item.createdAt) || 'a while ago'
  const router = useRouter()
  const authorArrows = useAuthorsByItemID(rep, item.id)
  const [showLinks, setShowLinks] = useState<boolean>(false)

  const modifiedRoomID = roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)


  function routeToItem(){
    router.push(`/workspace/${modifiedRoomID}/${item.id}`)
    handleSetSelectedItemID(item.id)
  }
  return (
    <div
      className={styles.activityItemContainer}
      onClick={() => routeToItem()}
      onMouseEnter={() => setShowLinks(true)}
      onMouseLeave={() => setShowLinks(false)}
    >
      <div className={styles.parentContainer}>
        <ItemParent
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      </div>
      {/* <div onClick={() => routeToItem()}>Expand</div> */}
      <div className={styles.createdContainer}>
        <div className={styles.createdBy}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
            </div>
          </div>
          <div className={styles.createdByEmail}>{item.createdBy}</div>
        </div>
        <div className={styles.createdAt}>{safeCreatedAt}</div>
      </div>
      {/* <FileUploadContainer
        itemID={item.id}
        item={item}
        rep={rep}
      /> */}
      <div className={styles.titleContainer}>
        {(safeTitle !== (`Untitled` || ``)) ? safeTitle : `[${htmlToText(item.content).substring(0,30)}...]`}
      </div>
      {authorArrows && authorArrows.length > 0 &&
        <AuthorInfo
          rep={rep}
          authorArrows={authorArrows}
        />
      }

      <div className={styles.arrowContainer}>
        {showLinks &&
        <>
          <div className={styles.arrowCountContainer}>
          <span className={styles.arrowCount}>{item.arrows.length}</span>
          <span className={styles.arrowLabel}>Backlinks</span>
        </div>
        <div className={styles.addLink}>Add Link</div>
        </>
        }
      </div>
    </div>
  )
}

function AuthorInfo({ rep, authorArrows} : AuthorInfoProps){
  const authorItemIDs = useAuthorItemsByArrowIDs(rep, authorArrows)
  return (
    authorItemIDs &&
    <div className={styles.authorContainer}>
      <span className={styles.by}>By</span>
      <span className={styles.authorName}>
        {authorItemIDs.slice(0,2).map((itemID: any, index: any) =>
          <AuthorName
            key={`author-${itemID}`}
            rep={rep}
            itemID={itemID}
            authorCount={authorItemIDs.length}
            index={index}
          />
        )}
      </span>
      {authorItemIDs.length > 2 &&
        <span>
          and {authorItemIDs.length - 2} more
        </span>
      }
    </div>
  )
}

function AuthorName({ rep, itemID, authorCount, index}: any){
  const item = useItemByID(rep, itemID)
  console.log('index',index)

  return (
    item &&
    <>
      { authorCount === 1 &&
        <span>
          {`${htmlToText(item.title).split(`[`)[0].trim()}`}
        </span>
      }
      { authorCount === 2 &&
        index === 0 &&
        <span>
          {`${htmlToText(item.title).split(`[`)[0].trim()} and `}
        </span>
      }
      { authorCount === 2 &&
        index === 1 &&
        <span>
          {`${htmlToText(item.title).split(`[`)[0].trim()}`}
        </span>
      }
      { authorCount > 2 &&
      <span>
        {`${htmlToText(item.title).split(`[`)[0].trim()}, `}
      </span>
      }
    </>
  )
}

// function FileUploadContainer({itemID, item, rep} : any) {
//   const [URL, setURL] = useState<any>('')

//   useEffect(() => {
//     generateIDBSourceFileURL(item.sourceURL)
//   }, [item.sourceURL])


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

//   function generateIDBSourceFileURL(sourceURL: string){
//     if (!idbOK()) return


//     let openRequest = indexedDB.open(DEFAULT_IDB_KEY, 1)

//     openRequest.onupgradeneeded = function(e: any){
//       let thisDB = e.target.result

//       if (!thisDB.objectStoreNames.contains(DEFAULT_SOURCE_FILES_BUCKET)) {
//         thisDB.createObjectStore(DEFAULT_SOURCE_FILES_BUCKET, { keyPath: 'id'})
//       }
//     }

//     openRequest.onsuccess = function(e : any) {
//       let db = e.target.result
//       let tx = db.transaction([DEFAULT_SOURCE_FILES_BUCKET], 'readwrite')
//       let store = tx.objectStore(DEFAULT_SOURCE_FILES_BUCKET)

//       let request = store.get(sourceURL)

//       request.onerror = function(e : any){
//         console.log('error', e.target.error.name)
//       }

//       request.onsuccess = function(e : any){
//         let result = e.target.result
//         result && setURL(window.URL.createObjectURL(result.file))
//       }

//       request.onerror = function(event: any) {
//         console.dir(event)
//       }

//     }
//     openRequest.onerror = function(event: any) {
//       console.dir(event)
//     }
//   }


//   return (
//     <div className={styles.upload}>
//       {item.sourceURL &&
//         <>
//           <div className={styles.file}>
//             <a href={URL} target="_blank" className={styles.link}>
//               {item.sourceURL && `🗂`}
//             </a>

//           </div>
//           <div
//             onClick={handleDeleteSourceFile}
//             className={styles.hoverOnly}
//           >
//             ⌘+T to Trash
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