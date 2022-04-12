import React from 'react'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorParentItem({ rep, itemID } : any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
      {item.arrows &&
        <CommentItemContainer
          arrows={item.arrows}
          rep={rep}
          itemID={itemID}

        />
      }
    </div>
  )
}

function CommentItemContainer({ arrows, rep, itemID } : any){
  const commentItem = arrows.filter((a: any) => a.kind === 'comment'
  && a.backItemID === itemID
  ) || []
  return (
    <>
      <div className={styles.sectionHeader}>
        Reactions and responses
        <span className={styles.count}>
          {commentItem.length}
        </span>
      </div>
      {commentItem && commentItem.map((a: any) => {
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
    <div className={styles.commentItem}>
      {item &&
        <>
          <div className={styles.highlight}>{htmlToText(item.highlight) || 'no highlight'}</div>
          <div>{htmlToText(item.content) || 'nothing here'}</div>
        </>
      }
    </div>
  )
}