import React from 'react'
import { useItemByID, getArrowsByIDs } from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'

export default function ArrowsComment({ rep, itemID, arrows, handleSetSelectedItemID } : any) {
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
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function CommentItemContainer({ arrowIDs, rep, handleSetSelectedItemID } : any){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.count}>{arrowIDs.length}</span>
        Reactions and responses
      </div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={`commment-${a.id}`}
            arrow={a}
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
      className={styles.commentItem}
      onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div className={styles.highlight}>{htmlToText(item.highlight) || 'no highlight'}</div>
          <div>{htmlToText(item.content) || 'nothing here'}</div>
        </>
      }
    </div>
  )
}