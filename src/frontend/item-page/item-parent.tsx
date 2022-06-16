import React from 'react'
import { useItemByID, useArrowByID } from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'

type ItemParentProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

export default function ItemParent({ reflect, itemID, handleSetSelectedItemID } : ItemParentProps) {
  const item = useItemByID(reflect, itemID)
  return (
    item &&
    <>
      {item.arrows &&
        <ParentItemContainer
          arrows={item.arrows}
          reflect={reflect}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      }
    </>
  )
}

function ParentItemContainer({ arrows, reflect, itemID, handleSetSelectedItemID } : any){
  const parentItem = arrows.filter((a: any) => a.kind === 'sub' && a.backItemID !== itemID) || []
  return (
    <>
      {parentItem && parentItem.map((a: any) => {
        const arrow = useArrowByID(reflect, a.arrowID)
        return (
          arrow &&
          <Arrow
            key={a.arrowID}
            arrow={arrow}
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </>
  )
}

function Arrow({reflect, arrow, handleSetSelectedItemID}: any){
  const item = useItemByID(reflect, arrow.backItemID)
  return (
    <div
      className={styles.parentTitle}
      onClick={() => handleSetSelectedItemID(arrow.backItemID)}
    >
       <span className={styles.parentArrow}>↱ </span>{item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}
