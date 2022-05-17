import React, { useState} from 'react'
import { useItemByID } from '../../datamodel/subscriptions'
import styles from './metadata-modal.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useRouter } from 'next/router'

import ArrowsAuthor from './arrows-author'
import EditorContainer from './editor-container'

export default function MetadataModal({ itemID, rep, handleSetSelectedItemID, authorArrows, trunkID, handleSetShowMetadataModal, item} : any) {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.title}>
          Editing Item
        </div>
        <div
          className={styles.exit}
          onClick={() => handleSetShowMetadataModal(false)}
        >&times;</div>
      </div>
      <div className={styles.readOnlyFields}>
        <div className={styles.label}>Created by</div>
        <div>{item.createdBy}</div>
      </div>
      <div className={styles.editableFields}>
        <div className={styles.field}>
          <div className={styles.label}>Title</div>
          <div>{htmlToText(item.title)}</div> // make ediable
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Authors</div>
          <div>stuff</div>
          {/* {authorArrows &&
            <ArrowsAuthor
              rep={rep}
              itemID={itemID}
              authorArrows={authorArrows}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          } */}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>URL</div>
          {/* <div className={styles.input}>
            <EditorContainer
              doc={item.webSourceURL}
              type={'webSourceURL'}
              rep={rep}
              itemID={itemID}
              commentArrows={[]}
            />
          </div> */}
          <div>stuff</div>
        </div>
        <div className={styles.lastField}>
          <div className={styles.label}>Publication date</div>
          {/* <div className={styles.input}>
            <EditorContainer
              doc={item.publicationDate}
              type={'publicationDate'}
              rep={rep}
              itemID={itemID}
              commentArrows={[]}
            />
          </div> */}
          <div>stuff</div>
        </div>
      </div>
      <DeleteItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        trunkID={trunkID}
        item={item}
      />
    </div>
  )
}

function DeleteItem({rep, itemID, handleSetSelectedItemID, trunkID, item} : any) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const router = useRouter()
  const modifiedRoomID = trunkID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)


  function deleteItemAndSetSelectedItemIDToEmpty() {
    rep.mutate.deleteItem(itemID)
    handleSetSelectedItemID('')
    router.push(`/workspace/${modifiedRoomID}`)
  }

  return (
    <div className={styles.archiveContainer}>
      <div>
        <button
          className={`btn btn-1`}
          onClick={() => setDeleteConfirmation(true)}
        >
          Archive
        </button>
      </div>
      {deleteConfirmation && item &&
        <div className={styles.archiveConfirmation}>
        <button
          className={`btn btn-x`}
          onClick={() => deleteItemAndSetSelectedItemIDToEmpty()}
        >Archive <span className={styles.itemTitle}>{htmlToText(item.title)}</span></button>
        <button
          className={`btn btn-2`}
          onClick={() => setDeleteConfirmation(false)}
        >Cancel</button>
        </div>
      }
    </div>
  )
}
