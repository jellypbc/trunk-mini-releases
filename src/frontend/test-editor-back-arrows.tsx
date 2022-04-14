import React from 'react'
import { useItemByID, getArrowsByIDs } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorBackArrows({ rep, itemID, arrows } : { rep: any, itemID: string, arrows: any[] }) {
  const backArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID !== itemID) || []
  const backArrowIDs = backArrows.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <BackArrowContainer
        rep={rep}
        arrowIDs={backArrowIDs}
        itemID={itemID}
      />
    </div>
  )
}

function BackArrowContainer({ rep, arrowIDs }: any ) {
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>← <span className={styles.count}>{arrowIDs.length}</span></div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={`backArrow-${a.id}`}
            arrow={a}
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

