import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorForwardArrows({ rep, itemID } : { rep: any, itemID: string }) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
      →
      {item.arrows &&
        <ForwardArrowContainer
          rep={rep}
          arrows={item.arrows}
          itemID={itemID}
        />
      }
    </div>
  )
}

function ForwardArrowContainer({ rep, arrows, itemID }: any ) {
  const forwardArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs : string[] = []
  forwardArrows.map((a: any) => {
    const arrow = useArrowByID(rep, a.arrowID)
    if (arrow) {
      frontItemIDs.includes(arrow.frontItemID) === false && frontItemIDs.push(arrow.frontItemID)
    }
  })
  return (
    <>
      <div>{frontItemIDs.length} forward arrows</div>
      {frontItemIDs && frontItemIDs.map((itemID: any) => {
        return (
          <Arrow
            key={`arrow-${itemID}`}
            itemID={itemID}
            rep={rep}
          />
        )
      })}
    </>
  )
}

function Arrow({rep, itemID}: any){
  const item = useItemByID(rep, itemID)
  return (
    <div className={styles.item}>
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}

