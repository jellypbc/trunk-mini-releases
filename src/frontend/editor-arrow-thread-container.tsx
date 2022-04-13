import React, { useState } from 'react'
import styles from './editor-arrow-thread-container.module.css'
import { htmlToText } from '../util/htmlToText'
import TestEditor from './test-editor'

export default function EditorArrowThreadContainer({rep,arrow}: {rep:any, arrow:any}) {
  return (
    <div className={styles.container}>
      <div className={styles.itemID}>
        {arrow.frontItemID}
      </div>
      <div className={styles.highlight}>
        {htmlToText(arrow.highlight)}
      </div>
      <FrontItemStuff
        rep={rep}
        itemID={arrow.frontItemID}
        arrow={arrow}
      />
    </div>
  )
}

import { useItemByID } from '../datamodel/subscriptions'
import { dateInWords } from '../lib/dateInWords'

function FrontItemStuff({rep, itemID, arrow }:{rep: any, itemID: string, arrow: any}) {
  console.log({arrow})
  const item = useItemByID(rep, itemID)

  return (
    item &&
    <>

      <div className={styles.meta}>
        <div>{item.createdBy}</div>
        <div>{dateInWords(new Date(item.createdAt))}</div>
      </div>
      <div className={styles.title}>
        <FrontItemEditorB
        itemID={itemID}
        item={item}
        rep={rep}
        />
      </div>
      <div className={styles.content}>
      <FrontItemEditorA
        itemID={itemID}
        item={item}
        rep={rep}
      />
      </div>
    </>
  )
}

function FrontItemEditorA({itemID, item, rep}: any){
  const [showEditor, setShowEditor] = useState<boolean>(false)
  return (
    showEditor ? (
      <TestEditor
        doc={item.content}
        type={'content'}
        rep={rep}
        itemID={itemID}
        arrows={[]}
      />
    ) : (
      <div onClick={() => setShowEditor(true)}>
        {htmlToText(item.content ? item.content : 'empty')}
      </div>
    )
  )
}

function FrontItemEditorB({itemID, item, rep}: any){
  const [showEditor, setShowEditor] = useState<boolean>(false)
  return (
    showEditor ? (
      <TestEditor
        doc={item.title}
        type={'title'}
        rep={rep}
        itemID={itemID}
        arrows={[]}
      />
    ): (
      <div onClick={() => setShowEditor(true)}>{htmlToText(item.title ? item.title : 'empty')}</div>
    )
  )
}
