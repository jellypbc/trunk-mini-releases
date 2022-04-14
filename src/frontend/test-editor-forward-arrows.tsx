import React from 'react'
import { useItemByID, getArrowsByIDs } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'


export default function TestEditorForwardArrows({ rep, itemID, arrows, handleSetSelectedItemID} : { rep: any, itemID: string, arrows: any[], handleSetSelectedItemID: any }) {
  const forwardArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const forwardArrowIDs = forwardArrows.map((a: any) => a.arrowID)
  return (
    forwardArrowIDs &&
      <div className={styles.section}>
        <ForwardArrowContainer
          rep={rep}
          arrowIDs={forwardArrowIDs}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      </div>
  )
}

function ForwardArrowContainer({ rep, arrowIDs, handleSetSelectedItemID }: any) {
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>→ <span className={styles.count}>{arrowIDs.length}</span> </div>
      {arrows && arrows.map((arrow: any) => {
        return (
          <Arrow
            key={`arrow-${arrow.id}`}
            arrow={arrow}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </>
  )
}

function Arrow({rep, arrow, handleSetSelectedItemID}: any){
  const item = useItemByID(rep, arrow.frontItemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}

