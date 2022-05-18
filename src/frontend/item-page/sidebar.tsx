import React, { useState, useEffect } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import styles from './sidebar.module.css'
import { idbOK } from '../../lib/idbOK'
import { DEFAULT_SOURCE_FILES_BUCKET, DEFAULT_IDB_KEY } from '../../lib/constants'
import SidebarOutline from './sidebar-outline'
import MetadataModal from './metadata-modal'
import { dateInWordsIncludeYear, dateInWordsTimeOnly } from '../../lib/dateInWords'
import { htmlToText } from '../../util/htmlToText'

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
export default function Sidebar({ createdBy, arrowsCount, itemID, rep, item, handleSetSelectedItemID, authorArrows, trunkID, publicationDate, updatedAt, createdAt, showHighlights, handleSetShowHighlights} : SidebarProps) {
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
      {showMetadataModal && authorArrows &&
        <MetadataModal
          itemID={itemID}
          rep={rep}
          handleSetSelectedItemID={handleSetSelectedItemID}
          authorArrows={authorArrows}
          trunkID={trunkID}
          handleSetShowMetadataModal={setShowMetadataModal}
          item={item}
        />
      }
      <div className={styles.top}>
        <div className={styles.createdByContainer}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <div className={styles.profile}>
                {/* <div className={styles.online}>
                </div> */}
              </div>

            </div>
          </div>
          <div className={styles.createdBy}>
            {createdBy ? createdBy.split(`@`)[0] : 'anonymous'}
          </div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Created at</div>
          <div className={styles.updatedAt}>{dateInWordsIncludeYear(new Date(createdAt))}</div>
          <div className={styles.updatedAt}>{dateInWordsTimeOnly(new Date(createdAt))}</div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Last updated</div>
          <div className={styles.updatedAt}>{dateInWordsIncludeYear(new Date(updatedAt))}</div>
          <div className={styles.updatedAt}>{dateInWordsTimeOnly(new Date(updatedAt))}</div>
        </div>
        <div className={styles.updatedAtContainer}>
          <div className={styles.updatedAtLabel}>Publication date</div>
          <div>{htmlToText(publicationDate)}</div>
        </div>
        <div className={styles.updatedAtContainer}>
          {showHighlights ?
          <div onClick={() => handleSetShowHighlights(false)}>
            <span className={styles.highlightBoxOn}></span>
            <span>Highlights on</span>
          </div>
          :
          <div onClick={() => handleSetShowHighlights(true)}>
            <span className={styles.highlightBoxOff}></span>
            <span>Highlights off</span>
          </div>}
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
