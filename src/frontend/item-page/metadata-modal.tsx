import React, { useState} from 'react'
import styles from './metadata-modal.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useRouter } from 'next/router'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import { useItemByID } from '../../datamodel/subscriptions'

import AddAuthorArrow from './add-author-arrow'
import EditorContainer from './editor-container'

type MetadataModalProps = {
  itemID: string
  rep: Replicache<M>
  handleSetSelectedItemID: any
  authorArrows: any
  trunkID: string
  handleSetShowMetadataModal: (state: boolean) => void
  item: any
}

type AuthorProps = {
  itemID: string
  rep: Replicache<M>
  arrow: any
  handleSetSelectedItemID: (itemID: string) => void
}

type ArchiveItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  trunkID: string
  item: any
}

export default function MetadataModal({ itemID, rep, handleSetSelectedItemID, authorArrows, trunkID, handleSetShowMetadataModal, item} : MetadataModalProps) {
  const [showAddAuthor, setShowAddAuthor] = useState<boolean>(false)
  const [showAddAuthorButton, setShowAddAuthorButton] = useState<boolean>(false)

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
        <div className={styles.field}>
          <div className={styles.label}>Created by</div>
          <div>{item.createdBy}</div>
        </div>
        <div className={styles.lastField}>
          <div className={styles.label}>Title</div>
          <div>{htmlToText(item.title)}</div>
        </div>
      </div>
      <div className={styles.editableFields}>
        <div className={styles.field}>
          <div
            className={styles.labelContainer}
            onMouseEnter={() => setShowAddAuthorButton(true)}
            onMouseLeave={() => setShowAddAuthorButton(false)}
          >
            <div className={styles.left}>
              <div className={styles.label}>Authors</div>
              <div>{authorArrows.length}</div>

            </div>
            <div className={styles.right}>
              {showAddAuthorButton &&
                <div
                  className={styles.addAuthor}
                  onClick={() => setShowAddAuthor(true)}
                >
                  <div className={styles.plusSign}>
                  +
                  </div>
                </div>
              }
            </div>
          </div>
          <div className={styles.authorContainer}>
          {authorArrows.map((arrow: any) => {
            return (
              <Author
                key={`authorArrow-${arrow.id}`}
                itemID={arrow.frontItemID}
                rep={rep}
                arrow={arrow}
                handleSetSelectedItemID={handleSetSelectedItemID}
              />
            )
          })}
          </div>
          {showAddAuthor &&
            <AddAuthorArrow
              rep={rep}
              itemID={itemID}
              handleSetShowAddAuthor={setShowAddAuthor}
            />
          }
        </div>
        <div className={styles.field}>
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
        <div className={styles.lastField}>
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
      <ArchiveItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        trunkID={trunkID}
        item={item}
      />
    </div>
  )
}

function Author({ itemID, rep, arrow, handleSetSelectedItemID } : AuthorProps) {
  const item = useItemByID(rep, itemID)
  const [showRemoveAuthor, setShowRemoveAuthor] = useState<boolean>(false)

  function removeAuthorArrowFromItem() {
    const frontItemID = arrow.frontItemID
    const backItemID = arrow.backItemID
    const arrowID = arrow.id
    rep.mutate.updateItemArrowsDeleteArrow({ itemID: frontItemID, arrowID: arrowID})
    rep.mutate.updateItemArrowsDeleteArrow({ itemID: backItemID, arrowID: arrowID})
    rep.mutate.deleteArrow(arrowID)
  }

  return (
    item &&
    <div
      className={styles.individualAuthorContainer}
      onMouseOver={() => setShowRemoveAuthor(true)}
      onMouseLeave={() => setShowRemoveAuthor(false)}
    >
      <div
        className={styles.authorTitle}
        onClick={() => handleSetSelectedItemID(itemID)}
      >
        {htmlToText(item.title)}
      </div>
      {showRemoveAuthor &&
        <div
          className={styles.removeAuthor}
          onClick={() => removeAuthorArrowFromItem()}
        >
          <div className={styles.minusSign}>-</div>
        </div>
      }
    </div>
  )
}

function ArchiveItem({rep, itemID, handleSetSelectedItemID, trunkID, item} : ArchiveItemProps) {
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
