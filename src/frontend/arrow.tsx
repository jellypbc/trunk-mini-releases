import React from 'react'
import { useArrowByID } from '../datamodel/subscriptions'
import styles from './arrow.module.css'
import EditorViewingContainer from './editor-viewing-container'
import ItemParentTitle from './item-parent-title'

export default function Arrow({ rep, arrowID, itemID }: { rep : any, arrowID: string, itemID: string }) {
  const arrow = useArrowByID(rep, arrowID)

  let parentItemID

  if (arrow && arrow.parentItemID) {
    parentItemID = arrow.parentItemID
  }

  return (
    <div className={styles.container}>
    { arrow && arrow.parentItemID !== itemID &&
      <div className={styles.parent}>
        <div className={styles.parentTitle}>
          { parentItemID &&
          <ItemParentTitle
            parentItemID={parentItemID}
            rep={rep}
          />
          }
        </div>
        <div className={styles.parentHighlight}>
          <EditorViewingContainer
            type={'highlight'}
            rep={rep}
            content={arrow.highlight}
            clientInfo={null}
            setValue={()=>{ return null}}
          />
        </div>
      </div>
    }
    </div>
  )
}
