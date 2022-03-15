import React, { useState, useEffect } from 'react'
import styles from './item-draft-expanded.module.css'
import { HotKeys } from 'react-hotkeys'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'

type Props = {
  itemID: string
  item: any
  setSelectedItemID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemExpanded({ itemID, item, setSelectedItemID, rep}: Props) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    rep.mutate.updateItemTitle({ id: itemID, title: titleValue })
  }, [titleValue])

  useEffect(() => {
    rep.mutate.updateItemContent({ id: itemID, content: contentValue })
  }, [contentValue])

  const handlers = {
    manualSaveDraftItem: () => {
      event?.preventDefault();
      // code to save draft item
      // we don't actually need to add this because we are already saving on every keystroke
      alert(`Draft saved!`)
    },
    closeExpandedView: () => {
      setSelectedItemID('')
    }
  };

  return (
    <HotKeys
      {...{
        style: { outline: "none", display: "flex", flex: 1 },
        keyMap,
        handlers,
      }}
    >
    <div className={styles.container}>
      <div className={styles.right}>
        <div
          className={styles.keyboardShortcut}
          onClick={() => setSelectedItemID('')}
        >ESC to Exit</div>
        <div
          className={styles.titleContainer}
          onClick={() => setShowContent(!showContent)}
        >
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div className={styles.title}>
            <ItemEditorContainer
              content={titleValue}
              setValue={setTitleValue}
              editable={true}
              type={'title'}
              rep={rep}
              item={item}
              itemID={itemID}
            />
          </div>
        </div>
        <div className={styles.content}>
          <ItemEditorContainer
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
              rep={rep}
              item={item}
              itemID={itemID}
            />
        </div>
        <div className={styles.footnotes}>Footnotes</div>
        {item.arrows && item.arrows.map((arrow : any) => {
          return (
            arrow.kind === 'footnote' &&
            <div key={arrow.arrowID}>
              <FootnoteEditorA
                rep={rep}
                arrowID={arrow.arrowID}
              />
            </div>
          )
        })}
        <div className={styles.footnotes}>→</div>
        {item.arrows && item.arrows.map((arrow : any) => {
          return (
            arrow.kind === 'reference' &&
            <div key={arrow.arrowID}>
              <FootnoteEditorX
                rep={rep}
                arrowID={arrow.arrowID}
                direction={'front'}
                />

            </div>
          )
        })}
        <div className={styles.footnotes}>←</div>
        {item.arrows && item.arrows.map((arrow : any) => {
          return (
            arrow.kind === 'reference' &&
            <div key={arrow.arrowID}>
              <FootnoteEditorX
                rep={rep}
                arrowID={arrow.arrowID}
                direction={'back'}
                />
            </div>
          )
        })}
      </div>

    </div>
    </HotKeys>
  )
}

function FootnoteEditorX({rep, arrowID, direction}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <FootnoteEditorY
      rep={rep}
      fullArrow={fullArrow}
      direction={direction}
    />
  )
}

import { useRouter } from 'next/router'

function FootnoteEditorY({rep, fullArrow, direction}:any) {
  const itemID = direction === 'front' ? fullArrow.frontItemID : fullArrow.backItemID
  const item = useItemByID(rep, itemID)
  const router = useRouter()
  const [, , roomID,] = location.pathname.split("/");

  function handleRouteToItem(){
    router.push({
      pathname: `/d/[roomid]/[itemid]`,
      query: { roomid: roomID, itemid: itemID }
    })

  }
  return (
    item &&
    <div
      onClick={handleRouteToItem}
    >
      {item.title.replace(/<\/?[^>]+(>|$)/g, "")}
    </div>
  )
}

function FootnoteEditorA({rep, arrowID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)

  return (
    fullArrow &&
    <FootnoteEditorB
      rep={rep}
      fullArrow={fullArrow}
    />
  )
}

function FootnoteEditorB({rep, fullArrow}:any) {
  console.log({fullArrow})

  const item = useItemByID(rep, fullArrow.frontItemID)
  return (
    item &&
    <FootnoteEditorC
      rep={rep}
      item={item}
      itemID={fullArrow.frontItemID}
    />
  )
}

function FootnoteEditorC({rep, item, itemID}: any) {
  const [footnoteValue, setFootnoteValue] = useState<string>(item.content)
  useEffect(() => {
    rep.mutate.updateItemContent({ id: itemID, content: footnoteValue })
  }, [footnoteValue])
  return (
    <ItemEditorContainer
      content={footnoteValue}
      setValue={setFootnoteValue}
      editable={true}
      type={'footnote'}
      rep={rep}
      item={item}
      itemID={itemID}
    />
  )
}


const keyMap = {
  manualSaveDraftItem: ['command+s'],
  closeExpandedView: ['esc']
}

