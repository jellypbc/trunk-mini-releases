import React from 'react'
import { getArrowsByIDs , useItemByID } from '../../datamodel/subscriptions'
import styles from './index.module.css'
import { htmlToText } from '../../util/htmlToText'

type ArrowsFootnoteProps = {
  rep: any,
  arrows: any[],
  itemID: string,
  handleSetSelectedItemID: any,
  subItemItemIDs: any
}

export default function ArrowsFootnote({ rep, arrows, itemID, handleSetSelectedItemID, subItemItemIDs } : ArrowsFootnoteProps) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.arrowID)
  return (
    arrows &&
    <div className={styles.section}>
      <FootnoteContainer
        arrowIDs={footnoteArrowIDs}
        rep={rep}
        handleSetSelectedItemID={handleSetSelectedItemID}
        subItemItemIDs={subItemItemIDs}
      />
    </div>
  )
}

function FootnoteContainer({ rep, arrowIDs, handleSetSelectedItemID, subItemItemIDs } : any){
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
      {subItemItemIDs &&
        <>
        Sub-item footnotes
        <SubItemFootnotes
          rep={rep}
          subItemItemIDs={subItemItemIDs}
        />
        </>
      }
    </>
  )
}

function SubItemFootnotes({rep, subItemItemIDs}: any){

  return(
    subItemItemIDs.map((itemID :any) => {
      return (
        <SubItemFootnote
          key={`sub-item-footnote-${itemID}`}
          itemID={itemID}
          rep={rep}
        />
      )
    })
  )
}

function SubItemFootnote({itemID, rep}: any){
  console.log('itemID',itemID)
  const item = useItemByID(rep, itemID)
  return(
    item &&
    <div>
      <SubItemFootnoteFootnotes
        item={item}
        rep={rep}
        itemID={itemID}
      />
    </div>
  )
}

function SubItemFootnoteFootnotes({item, rep, itemID}: any){
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)

  return (
    fullArrows &&
    <SubItemFootnoteFootnotesA
      arrows = {fullArrows}
      rep={rep}
      itemID={itemID}
    />
  )
}

function SubItemFootnoteFootnotesA({arrows, rep, itemID}: any) {
  const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  const footnoteArrowIDs = footnotes.map((a: any) => a.id)
  return (
    <>
    {footnoteArrowIDs &&
    <Thing
      footnoteArrowIDs={footnoteArrowIDs}
      rep={rep}
    />}
    </>
  )
}

function Thing({footnoteArrowIDs, rep}: any){
  const arrows = getArrowsByIDs(rep, footnoteArrowIDs)
  return (
    <>
    {arrows && arrows.map((a: any) => {
      return (
        <Arrow2
          id={`arrow2-${a.id}`}
          key={a.id}
          arrow={a}
          rep={rep}
          // handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })}
    </>
  )
}


function Arrow2({rep, arrow}: any){
  const item = useItemByID(rep, arrow.frontItemID)
  return (
    <div
      className={styles.commentItem}
      // onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div>{htmlToText(item.content)}</div>
        </>
      }
    </div>
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
