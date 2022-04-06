import React, { useState, useEffect } from 'react'
import styles from './item-draft-expanded.module.css'
import { HotKeys } from 'react-hotkeys'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'
import { useItemByID, useArrowByID } from '../datamodel/subscriptions'
import AddSubItem from './add-sub-item'
import { htmlToText } from '../util/htmlToText'

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
  const [showSubItemAdd, setShowSubItemAdd] = useState<boolean>(false)

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
        <div>
          {item.arrows && item.arrows.map((arrow : any) => {
            return (
              arrow.kind === 'sub' && arrow.backItemID !== itemID &&
              <div key={'subItem-' + arrow.arrowID}>
                <ParentEditorA
                  rep={rep}
                  arrowID={arrow.arrowID}
                />
              </div>
            )
          })}
        </div>
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
        <div
          className={styles.footnotes}
          onClick={() => setShowSubItemAdd(true)}
        >Sub-items<span className={styles.addSubItem}>+</span></div>
        {showSubItemAdd &&
          <AddSubItem
            rep={rep}
            backItem={item}
            backItemID={itemID}
            handleSubItemAdd={setShowSubItemAdd}
          />
        }
        {item.arrows && item.arrows.map((arrow : any) => {
          return (
            arrow.kind === 'sub' &&
            arrow.backItemID === itemID &&
            <div key={'subItem-' + arrow.arrowID} className={styles.subItem}>
              <SubItemEditorA
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
                selectedItemID={itemID}
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
                selectedItemID={itemID}
                />
            </div>
          )
        })}
      </div>
    </div>
    </HotKeys>
  )
}


import { useRouter } from 'next/router'

function ParentEditorA({rep, arrowID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <ParentEditorB
      rep={rep}
      fullArrow={fullArrow}
    />
  )
}

function ParentEditorB({rep, fullArrow}: any){
const itemID = fullArrow.backItemID
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
    className={styles.parent}
  >
    <span className={styles.parentArrow}>⮑</span>
    {item.title && htmlToText(item.title)}
  </div>
)

}

function SubItemEditorA({rep, arrowID}: any){
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <SubItemEditorB
      rep={rep}
      fullArrow={fullArrow}
    />
  )
}

function SubItemEditorB({rep, fullArrow}: any) {
  const itemID = fullArrow.frontItemID
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
      {item.title}
    </div>
  )
}


function FootnoteEditorX({rep, arrowID, direction, selectedItemID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <FootnoteEditorY
      rep={rep}
      fullArrow={fullArrow}
      direction={direction}
      selectedItemID={selectedItemID}
    />
  )
}


function FootnoteEditorY({rep, fullArrow, direction, selectedItemID}:any) {
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
    item && itemID !== selectedItemID ?
    <div
      onClick={handleRouteToItem}
    >
      {item.title && htmlToText(item.title)}
    </div>
    : null
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

