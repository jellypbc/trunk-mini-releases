import React from 'react'
import { getArrowsByIDs , useItemByID } from '../datamodel/subscriptions'
import styles from './test-editor-container.module.css'
import { htmlToText } from '../util/htmlToText'

export default function TestEditorFootnotes({ rep, arrows, itemID } : { rep: any, arrows: any[], itemID: string }) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <FootnoteContainer
        arrowIDs={footnoteArrowIDs}
        rep={rep}
      />
    </div>
  )
}

function FootnoteContainer({ rep, arrowIDs } : any){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  return (
    <>
      <div className={styles.sectionHeader}>
        Footnotes <span className={styles.count}>{arrows.length}</span>
      </div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={a.id}
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
          <div>{htmlToText(item.content) || 'nothing here'}</div>
        </>
      }
    </div>
  )
}
