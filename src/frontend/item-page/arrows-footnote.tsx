import React from 'react'
import {
  useArrowsByIDs,
  useItemByID
} from '../../datamodel/subscriptions'
import styles from './index.module.css'
import { htmlToText } from '../../util/htmlToText'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'

type ArrowsFootnoteProps = {
  reflect: Reflect<M>,
  arrows: any[],
  itemID: string,
  handleSetSelectedItemID: any,
  subItemItemIDs: any
}

export default function ArrowsFootnote({ reflect, arrows, itemID, handleSetSelectedItemID, subItemItemIDs } : ArrowsFootnoteProps) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <FootnoteContainer
        arrowIDs={footnoteArrowIDs}
        reflect={reflect}
        handleSetSelectedItemID={handleSetSelectedItemID}
        subItemItemIDs={subItemItemIDs}
      />
    </div>
  )
}

function FootnoteContainer({ reflect, arrowIDs, handleSetSelectedItemID, subItemItemIDs } : any){
  const arrows = useArrowsByIDs(reflect, arrowIDs)
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
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
      {subItemItemIDs &&
        <>
        --
        <SubItemFootnotes
          reflect={reflect}
          subItemItemIDs={subItemItemIDs}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        </>
      }
    </>
  )
}

function SubItemFootnotes({reflect, subItemItemIDs, handleSetSelectedItemID}: any){

  return(
    subItemItemIDs.map((itemID :any) => {
      return (
        <SubItemFootnote
          key={`sub-item-footnote-${itemID}`}
          itemID={itemID}
          reflect={reflect}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })
  )
}

function SubItemFootnote({itemID, reflect, handleSetSelectedItemID}: any){
  const item = useItemByID(reflect, itemID)
  return(
    item &&
    <div>
      <SubItemFootnoteFootnotes
        item={item}
        reflect={reflect}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function SubItemFootnoteFootnotes({item, reflect, itemID, handleSetSelectedItemID}: any){
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(reflect, arrowIDs)

  return (
    fullArrows &&
    <SubItemFootnoteFootnotesA
      arrows = {fullArrows}
      reflect={reflect}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function SubItemFootnoteFootnotesA({arrows, reflect, itemID, handleSetSelectedItemID}: any) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.id)
  return (
    <>
    {footnoteArrowIDs &&
    <Thing
      footnoteArrowIDs={footnoteArrowIDs}
      reflect={reflect}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />}
    </>
  )
}

function Thing({footnoteArrowIDs, reflect, handleSetSelectedItemID}: any){
  const arrows = useArrowsByIDs(reflect, footnoteArrowIDs)
  return (
    <>
    {arrows && arrows.map((a: any) => {
      return (
        <Arrow2
          id={`arrow2-${a.id}`}
          key={a.id}
          arrow={a}
          reflect={reflect}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })}
    </>
  )
}


function Arrow2({reflect, arrow, handleSetSelectedItemID}: any){
  const item = useItemByID(reflect, arrow.frontItemID)
  return (
    <div
      className={styles.commentItem}
      onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div>{htmlToText(item.content)}</div>
        </>
      }
    </div>
  )
}


function Arrow({reflect, arrow, handleSetSelectedItemID}: any){
  const item = useItemByID(reflect, arrow.frontItemID)
  return (
    <div
      className={styles.commentItem}
      onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div>{htmlToText(item.content)}</div>
        </>
      }
    </div>
  )
}
