import React from 'react'
import { useItemByID, getArrowsByIDs } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'



export default function TestEditorBackArrows({ rep, itemID, arrows, handleSetSelectedItemID } : { rep: any, itemID: string, arrows: any[], handleSetSelectedItemID: any }) {
  const backArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID !== itemID) || []
  const backArrowIDs = backArrows.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <BackArrowContainer
        rep={rep}
        arrowIDs={backArrowIDs}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function BackArrowContainer({ rep, arrowIDs, handleSetSelectedItemID }: any ) {
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
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </>
  )
}

function Arrow({rep, arrow, handleSetSelectedItemID }: any){
  const item = useItemByID(rep, arrow.backItemID)
  return (
    <div
      onClick={() => handleSetSelectedItemID(arrow.backItemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}

