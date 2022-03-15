import React, {useState, useEffect} from 'react'
import styles from './editor-arrow-thread-container.module.css'
import ArrowEditorContainer from './arrow-editor-container'

export default function EditorArrowThreadContainer({rep,arrow}: {rep:any, arrow:any}) {
  return (
    <div className={styles.container}>
      <div className={styles.itemID}>
        {arrow.frontItemID}
      </div>
      <div className={styles.highlight}>
        <ArrowEditorContainer
          rep={rep}
          doc={arrow.highlight}
        />
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
import ItemEditorContainer from './item-editor-container'

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

  const [frontItemValue, setFrontItemValue] = useState<string>(item.content)
  useEffect(() => {
    rep.mutate.updateItemContent({ id: itemID, content: frontItemValue })
  }, [frontItemValue])

  return (
    <ItemEditorContainer
    content={frontItemValue}
    setValue={setFrontItemValue}
    editable={true}
    type={'footnote'}
    rep={rep}
    item={item}
    itemID={itemID}
  />
  )
}

function FrontItemEditorB({itemID, item, rep}: any){

  const [frontItemTitleValue, setFrontItemTitleValue] = useState<string>(item.title)
  useEffect(() => {
    rep.mutate.updateItemTitle({ id: itemID, title: frontItemTitleValue })
  }, [frontItemTitleValue])

  return (
    <ItemEditorContainer
    content={frontItemTitleValue}
    setValue={setFrontItemTitleValue}
    editable={true}
    type={'footnote'}
    rep={rep}
    item={item}
    itemID={itemID}
  />
  )
}
