import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorBackrrows({ rep, itemID } : { rep: any, itemID: string }) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>

      {item.arrows &&
        <BackArrowContainer
          rep={rep}
          arrows={item.arrows}
          itemID={itemID}
        />
      }
    </div>
  )
}

function BackArrowContainer({ rep, arrows, itemID }: any ) {
  const backArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID !== itemID) || []
  return (
    <>
      <div className={styles.sectionHeader}>← <span className={styles.count}>{backArrows.length}</span></div>
      {backArrows && backArrows.map((a: any) => {
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

