import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorSubItems({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
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
      <div>
        Sub-items
        <span className={styles.count}>
          {subItems.length}
        </span>
      </div>
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
  return (
    <div className={styles.item}>
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
