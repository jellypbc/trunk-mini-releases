import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorSubItems({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
      Sub-items
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
      <div>{subItems.length} sub-items</div>
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
  const item = useItemByID(rep, arrow.backItemID)
  return (
    <div>
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
