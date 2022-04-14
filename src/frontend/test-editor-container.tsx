import React from 'react'
import { useItemByID } from '../datamodel/subscriptions'
import TestEditor from './test-editor'
import { htmlToText } from '../util/htmlToText'
import styles from './test-editor-container.module.css'
import TestEditorFootnotes from './test-editor-footnotes'
import TestEditorForwardArrows from './test-editor-forward-arrows'
import TestEditorBackArrows from './test-editor-back-arrows'
import TestEditorComments from './test-editor-comments'
import TestEditorParent from './test-editor-parent'
import TestEditorMainSubItems from './test-editor-main-sub-items'


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
      <div className={styles.expandedEditorContainer}>
        <div
          className={styles.resetItemID}
          onClick={() => handleSetSelectedItemID('')}
        >
          Dashboard
        </div>
        <div className={styles.itemID}>{itemID}</div>
        {highlight &&
          <div className={styles.highlight}>
            {htmlToText(highlight)}
          </div>
        }
        <TestEditorParent
          rep={rep}
          itemID={itemID}
        />
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
              arrows={[]}
            />
          </div>
        </div>
        <div className={styles.content}>
          <TestEditor
            doc={content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={item.arrows || []}
          />
        </div>
        <div className={styles.mainSubItems}>
          <TestEditorMainSubItems
            rep={rep}
            itemID={itemID}
          />
        </div>
        <Footer
          rep={rep}
          itemID={itemID}
          arrows={item.arrows}
        />
      </div>
    </div>
  )
}

function Footer({rep, itemID, arrows} : any) {

  return (
    <div className={styles.meta}>
      <TestEditorFootnotes
        rep={rep}
        itemID={itemID}
        arrows={arrows}
      />
      <TestEditorForwardArrows
        rep={rep}
        itemID={itemID}
        arrows={arrows}
      />
      <TestEditorBackArrows
        rep={rep}
        itemID={itemID}
        arrows={arrows}
      />
      <TestEditorComments
        rep={rep}
        itemID={itemID}
        arrows={arrows}
      />
    </div>
  )

}
