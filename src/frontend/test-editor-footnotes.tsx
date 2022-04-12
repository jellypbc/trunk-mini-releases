import React from 'react'
import { useItemByID } from '../datamodel/subscriptions'
import styles from './test-editor-container.module.css'

export default function TestEditorFootnotes({ rep, itemID } : { rep: any, itemID: string }) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.section}>
      {item.arrows &&
        <FootnoteContainer arrows={item.arrows} />
      }
    </div>
  )
}

function FootnoteContainer({ arrows } : any){
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote') || []
  return (
    <>
      <div className={styles.sectionHeader}>Footnotes <span className={styles.count}>{footnotes.length}</span></div>
    </>
  )
}
