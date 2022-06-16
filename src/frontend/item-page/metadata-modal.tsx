import React, { useState} from 'react'
import styles from './metadata-modal.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useRouter } from 'next/router'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import { useItemByID } from '../../datamodel/subscriptions'

import AddAuthorArrow from './add-author-arrow'
import EditorContainer from './editor-container'

type MetadataModalProps = {
  itemID: string
  reflect: Reflect<M>
  handleSetSelectedItemID: any
  authorArrows: any
  trunkID: string
  handleSetShowMetadataModal: (state: boolean) => void
  item: any
}

type AuthorProps = {
  itemID: string
  reflect: Reflect<M>
  arrow: any
  handleSetSelectedItemID: (itemID: string) => void
}

type ArchiveItemProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  trunkID: string
  item: any
}

export default function MetadataModal({ itemID, reflect, handleSetSelectedItemID, authorArrows, trunkID, handleSetShowMetadataModal, item} : MetadataModalProps) {
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
                reflect={reflect}
                arrow={arrow}
                handleSetSelectedItemID={handleSetSelectedItemID}
              />
            )
          })}
          </div>
          {showAddAuthor &&
            <AddAuthorArrow
              reflect={reflect}
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
              reflect={reflect}
              itemID={itemID}
              commentArrows={[]}
              showHighlights={false}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          </div>
        </div>
        <div className={styles.lastField}>
          <div className={styles.label}>Publication date</div>
          <div className={styles.input}>
            <EditorContainer
              doc={item.publicationDate}
              type={'publicationDate'}
              reflect={reflect}
              itemID={itemID}
              commentArrows={[]}
              showHighlights={false}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          </div>
        </div>
      </div>
      <ArchiveItem
        reflect={reflect}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        trunkID={trunkID}
        item={item}
      />
    </div>
  )
}

function Author({ itemID, reflect, arrow, handleSetSelectedItemID } : AuthorProps) {
  const item = useItemByID(reflect, itemID)
  const [showRemoveAuthor, setShowRemoveAuthor] = useState<boolean>(false)

  function removeAuthorArrowFromItem() {
    const frontItemID = arrow.frontItemID
    const backItemID = arrow.backItemID
    const arrowID = arrow.id
    reflect.mutate.updateItemArrowsDeleteArrow({ itemID: frontItemID, arrowID: arrowID})
    reflect.mutate.updateItemArrowsDeleteArrow({ itemID: backItemID, arrowID: arrowID})
    reflect.mutate.deleteArrow(arrowID)
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

function ArchiveItem({reflect, itemID, handleSetSelectedItemID, trunkID, item} : ArchiveItemProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const router = useRouter()
  const modifiedRoomID = trunkID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)

  function deleteItemAndSetSelectedItemIDToEmpty() {
    reflect.mutate.deleteItem(itemID)
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
