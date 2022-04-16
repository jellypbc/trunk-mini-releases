import React from 'react'
import { useItemByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'
import type { M } from '../datamodel/mutators'
import type { Replicache } from 'replicache'

type Props = {
  rep: Replicache<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function TestEditorFrontArrows({ rep, itemID, fullArrows, handleSetSelectedItemID} : Props) {
  const forwardArrows = fullArrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs = forwardArrows.map((a: any) => a.frontItemID)
  const uniqueFrontItemIDs = [...new Set(frontItemIDs)]
  return (
    uniqueFrontItemIDs &&
    <>
      <div className={styles.sectionHeader}>
        <span>→</span>
        <span className={styles.count}>{forwardArrows.length}</span>
      </div>
      {uniqueFrontItemIDs.map((itemID: any) => {
        return (
          <FrontArrowItem
            key={`frontArrow-${itemID}`}
            itemID={itemID}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </>
  )
}

type FrontArrowItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

function FrontArrowItem({ rep, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(rep, itemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}

