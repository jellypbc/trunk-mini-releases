import React from 'react'
import { useItemByID, getArrowsByIDs } from '../datamodel/subscriptions'
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

    </div>
  )
}
