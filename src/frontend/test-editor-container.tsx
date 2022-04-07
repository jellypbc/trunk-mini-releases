import React from 'react'
import { useItemByID } from '../datamodel/subscriptions'
import TestEditor from './test-editor'
import { htmlToText } from '../util/htmlToText'
import styles from './test-editor-container.module.css'
import TestEditorFootnotes from './test-editor-footnotes'
import TestEditorSubItems from './test-editor-sub-items'
import TestEditorForwardArrows from './test-editor-forward-arrows'
import TestEditorBackArrows from './test-editor-back-arrows'
import TestEditorComments from './test-editor-comments'


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
  const { content, title, highlight } = item
  return (
    <div className={styles.container}>
      <div
        className={styles.resetItemID}
        onClick={() => handleSetSelectedItemID('')}
      >
        Dashboard
      </div>
      <div className={styles.itemID}>{itemID}</div>
      {highlight ?
        <div className={styles.highlight}>
          {htmlToText(highlight)}
        </div> :
        <div className={styles.highlight}>
          No highlight
        </div>
      }
      <div className={styles.titleContainer}>
        <div className={styles.bullet}>
          <div className={styles.bulletBorder}>
            <div className={styles.bulletCenter}>
            </div>
          </div>
        </div>
        <div className={styles.titleEditor}>
          <TestEditor
            doc={title}
            type={'title'}
            rep={rep}
            itemID={itemID}
          />
        </div>
      </div>
      <div className={styles.content}>
        <TestEditor
          doc={content}
          type={'content'}
          rep={rep}
          itemID={itemID}
        />
      </div>
      <div className={styles.meta}>
        <TestEditorFootnotes
          rep={rep}
          itemID={itemID}
        />
        <TestEditorSubItems />
        <TestEditorForwardArrows />
        <TestEditorBackArrows />
        <TestEditorComments />
      </div>
    </div>
  )
}

