import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorParentItem({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
      Parent item
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
      <div>{parentItem.length} parent item</div>
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
    <div className={styles.item}>
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
