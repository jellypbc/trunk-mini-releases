import React, { useState } from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'
import TestEditor from './test-editor'

export default function TestEditorMainSubItems({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.mainSubItems}>
      {item.arrows &&
        <SubItemContainer
          arrows={item.arrows}
          rep={rep}
          itemID={itemID}

        />
      }
    </div>
  )
}

function SubItemContainer({ arrows, rep, itemID } : any){
  const subItems = arrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID) || []
  return (
    <>
      {subItems && subItems.map((a: any) => {
        const arrow = useArrowByID(rep, a.arrowID)
        return (
          arrow &&
          <Arrow
            key={a.arrowID}
            arrow={arrow}
            rep={rep}
          />
        )
      })}
    </>
  )
}

function Arrow({rep, arrow}: any){
  const item = useItemByID(rep, arrow.frontItemID)
  const [showContent, setShowContent] = useState<boolean>(false)
  return (
    <div className={styles.subItemTitleContainer}>
      <div
        className={styles.titleEditor}
        onClick={() => setShowContent(!showContent)}
      >
        <div className={styles.titleSubItem}>{item && htmlToText(item.title) || 'nothing here'}</div>
      </div>
      { showContent && item &&
        <div className={styles.subItemContent}>
          <TestEditor
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={arrow.frontItemID}
          />
        </div>

      }
    </div>
  )
}
