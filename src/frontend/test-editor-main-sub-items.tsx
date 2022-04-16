import React, { useState } from 'react'
import { useItemByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'
import TestEditor from './test-editor'

export default function TestEditorMainSubItems({ rep, itemID, handleSetSelectedItemID, fullArrows} : any) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    subItemItemIDs &&
      <div className={styles.mainSubItems}>
        {subItemItemIDs.map((itemID: any) => {
          return (
            <SubItemMain
              rep={rep}
              key={`subItemMain-${itemID}`}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          )
        })}
      </div>
  )
}


function SubItemMain({rep, itemID, handleSetSelectedItemID}: any){
  const item = useItemByID(rep, itemID)
  const [showContent, setShowContent] = useState<boolean>(false)
  return (
    <div className={styles.subItemTitleContainer}>
      <div
        className={styles.titleEditor}
        onClick={() => setShowContent(!showContent)}
      >
        <span className={styles.titleSubItem}>{item && htmlToText(item.title) || 'nothing here'}</span>
        <span className={styles.expand} onClick={() => handleSetSelectedItemID(itemID)}>↗</span>
      </div>
      { showContent && item &&
        <div className={styles.subItemContent}>
          <TestEditor
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={[]}
          />
        </div>
      }
    </div>
  )
}
