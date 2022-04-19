import React, { useState } from 'react'
import { useItemByID, getArrowsByIDs, useArrowByID } from '../datamodel/subscriptions'
import TestEditor from './test-editor'
import { htmlToText } from '../util/htmlToText'
import styles from './test-editor-container.module.css'
import TestEditorFootnotes from './test-editor-footnotes'
import TestEditorFrontArrows from './test-editor-front-arrows'
import TestEditorBackArrows from './test-editor-back-arrows'
import TestEditorComments from './test-editor-comments'
import TestEditorParent from './test-editor-parent'
import TestEditorMainSubItems from './test-editor-main-sub-items'
import TestEditorAuthors from './test-editor-authors'
import TestEditorSubItems from './test-editor-sub-items'


export default function TestEditorContainer({rep, itemID, handleSetSelectedItemID} : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <Thingy
      item={item}
      rep={rep}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function Thingy({ item, rep, itemID, handleSetSelectedItemID}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <div className={styles.container}>
      <div className={styles.expandedEditorContainer}>
        <div
          className={styles.resetItemID}
          onClick={() => handleSetSelectedItemID('')}
        >
          Dashboard
        </div>
        <div className={styles.itemID}>{itemID}</div>
        <HighlightParent
          itemID={itemID}
          arrows={item.arrows}
          rep={rep}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        {item.highlight &&
          <div className={styles.highlight}>
            {htmlToText(item.highlight)}
          </div>
        }
        <div className={styles.parent}>
          <TestEditorParent
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
          <div className={styles.titleEditor}>
            <TestEditor
              doc={item.title}
              type={'title'}
              rep={rep}
              itemID={itemID}
              arrows={[]}
            />
          </div>
        </div>
        <div className={styles.content}>
          <TestEditor
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={item.arrows || []}
          />
        </div>
        <div className={styles.mainSubItems}>
          {fullArrows &&
            <TestEditorMainSubItems
              rep={rep}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
              fullArrows={fullArrows}
            />
          }
        </div>
        { fullArrows &&
          <Footer
            rep={rep}
            itemID={itemID}
            arrows={item.arrows}
            fullArrows={fullArrows}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        }
      </div>
    </div>
  )
}

function Footer({rep, itemID, arrows, fullArrows, handleSetSelectedItemID} : any) {
  return (
    fullArrows &&
    <div className={styles.meta}>
      <TestEditorFootnotes
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorAuthors
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorSubItems
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorFrontArrows
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorBackArrows
        rep={rep}
        itemID={itemID}
        fullArrows={fullArrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorComments
        rep={rep}
        itemID={itemID}
        arrows={arrows}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
      <TestEditorDeleteItem
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function HighlightParent({itemID, arrows, rep, handleSetSelectedItemID}: any) {
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
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function ParentTitle({rep, arrowID, handleSetSelectedItemID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <Title
      rep={rep}
      itemID={fullArrow.backItemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function Title({rep, itemID, handleSetSelectedItemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.highlightParentContainer}>
    <div
      className={styles.parentTitle}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      <span className={styles.parentArrow}>⮑ </span>
      {item.title && htmlToText(item.title)}
    </div>
    </div>
  )
}



function TestEditorDeleteItem({rep, itemID, handleSetSelectedItemID} : any) {
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
