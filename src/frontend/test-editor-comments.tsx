import React from 'react'
import { useItemByID, getArrowsByIDs } from '../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'

export default function TestEditorParentItem({ rep, itemID, arrows } : any) {
  const comments = arrows.filter((a: any) => a.kind === 'comment'
  && a.backItemID === itemID) || []
  const commentArrowIDs = comments.map((a: any) => a.arrowID)
  return (
    commentArrowIDs &&
    <div className={styles.section}>
      <CommentItemContainer
        arrowIDs={commentArrowIDs}
        rep={rep}
        itemID={itemID}
      />
    </div>
  )
}

function CommentItemContainer({ arrowIDs, rep } : any){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>
        Reactions and responses
        <span className={styles.count}>
          {arrowIDs.length}
        </span>
      </div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={`commment-${a.id}`}
            arrow={a}
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