import React from 'react'
import { getArrowsByIDs , useItemByID } from '../../datamodel/subscriptions'
import styles from './index.module.css'
import { htmlToText } from '../../util/htmlToText'

export default function ArrowsFootnote({ rep, arrows, itemID, handleSetSelectedItemID } : { rep: any, arrows: any[], itemID: string, handleSetSelectedItemID: any }) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <FootnoteContainer
        arrowIDs={footnoteArrowIDs}
        rep={rep}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function FootnoteContainer({ rep, arrowIDs, handleSetSelectedItemID } : any){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.count}>{arrows.length}</span>
        Footnotes
      </div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={a.id}
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
          <div>{htmlToText(item.content) || 'nothing here'}</div>
        </>
      }
    </div>
  )
}
