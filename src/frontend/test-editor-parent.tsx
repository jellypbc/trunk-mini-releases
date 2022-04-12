import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorParent({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.parent}>
      {item.arrows &&
        <ParentItemContainer
          arrows={item.arrows}
          rep={rep}
          itemID={itemID}
        />
      }
    </div>
  )
}

function ParentItemContainer({ arrows, rep, itemID } : any){
  const parentItem = arrows.filter((a: any) => a.kind === 'sub' && a.backItemID !== itemID) || []
  return (
    <>
      {parentItem && parentItem.map((a: any) => {
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
  const item = useItemByID(rep, arrow.backItemID)
  return (
    <div className={styles.parentTitle}>
       <span className={styles.parentArrow}>↱ </span>{item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
