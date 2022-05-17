import React, { useState} from 'react'
import { useItemByID } from '../../datamodel/subscriptions'
import styles from './metadata-modal.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useRouter } from 'next/router'

import ArrowsAuthor from './arrows-author'
import EditorContainer from './editor-container'

export default function MetadataModal({ itemID, rep, handleSetSelectedItemID, authorArrows, trunkID} : any) {
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
          {authorArrows &&
            <ArrowsAuthor
              rep={rep}
              itemID={itemID}
              authorArrows={authorArrows}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          }
        </div>
        <div className={styles.metadataThing}>
          <div className={styles.label}>URL</div>
          <div className={styles.input}>
            <EditorContainer
              doc={item.webSourceURL}
              type={'webSourceURL'}
              rep={rep}
              itemID={itemID}
              commentArrows={[]}
            />
          </div>
        </div>
        <div className={styles.metadataThing}>
          <div className={styles.label}>Publication date</div>
          <div className={styles.input}>
            <EditorContainer
              doc={item.publicationDate}
              type={'publicationDate'}
              rep={rep}
              itemID={itemID}
              commentArrows={[]}
            />
          </div>
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
        <DeleteItem
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
          trunkID={trunkID}
        />
      </div>
    </div>
  )
}

function DeleteItem({rep, itemID, handleSetSelectedItemID, trunkID} : any) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const item = useItemByID(rep, itemID)
  const router = useRouter()
  const modifiedRoomID = trunkID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)


  function deleteItemAndSetSelectedItemIDToEmpty() {
    rep.mutate.deleteItem(itemID)
    handleSetSelectedItemID('')
    router.push(`/workspace/${modifiedRoomID}`)
  }

  return (
    <>
      <div
        className={styles.archiveContainer}
        onClick={() => setDeleteConfirmation(true)}
      >Archive</div>
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
    </>
  )
}
