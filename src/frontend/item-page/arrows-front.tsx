import React from 'react'
import {
  useItemByID,
  useAuthorArrowsByItemID,
  useArrowsByIDs
} from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Replicache } from 'replicache'

type Props = {
  rep: Replicache<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
  subItemItemIDs: any
}

export default function ArrowsFront({ rep, itemID, fullArrows, handleSetSelectedItemID, subItemItemIDs} : Props) {
  const forwardArrows = fullArrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs = forwardArrows.map((a: any) => a.frontItemID)
  const uniqueFrontItemIDs = [...new Set(frontItemIDs)]
  const item = useItemByID(rep, itemID)

  return (
    uniqueFrontItemIDs &&
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.count}>{forwardArrows.length}</span>
        <span>Links</span>
      </div>
      {uniqueFrontItemIDs.map((itemID: any) => {
        return (
          <FrontArrowItem
            key={`frontArrow-${itemID}`}
            itemID={itemID}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
      {subItemItemIDs && item &&
        <>
        <SubItemLinks
          rep={rep}
          subItemItemIDs={subItemItemIDs}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        </>
      }
    </>
  )
}


function SubItemLinks({rep, subItemItemIDs, handleSetSelectedItemID}: any){
  return(
    subItemItemIDs.map((itemID :any) => {
      return (
        <SubItemLink
          key={`subItemLink-${itemID}`}
          itemID={itemID}
          rep={rep}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })
  )
}

function SubItemLink({itemID, rep, handleSetSelectedItemID}: any){
  const item = useItemByID(rep, itemID)
  return(
    item &&
    <div>
      {htmlToText(item.title)}
      <SubItemLinkLinks
        item={item}
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function SubItemLinkLinks({item, rep, itemID, handleSetSelectedItemID}: any){
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(rep, arrowIDs) //sub item full arrows
  //put something there

  return (
    fullArrows &&
    <SubItemFootnoteFootnotesA
      arrows = {fullArrows}
      rep={rep}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
    />
  )
}

function SubItemFootnoteFootnotesA({arrows, rep, itemID, handleSetSelectedItemID }: any) {
  const subItemArrows= arrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)

  const forwardArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs = forwardArrows.map((a: any) => a.frontItemID)
  const uniqueFrontItemIDs = [...new Set(frontItemIDs)]
  return (
    <>
    {uniqueFrontItemIDs && uniqueFrontItemIDs.map((itemID: any) => {
      return (
        <FrontArrowItem2
          key={`arrow2a-${itemID}`}
          rep={rep}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })}
    {subItemItemIDs &&
        <>
        <SubItemLinks
          rep={rep}
          subItemItemIDs={subItemItemIDs}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        </>
      }
    </>
  )
}


function FrontArrowItem2({ rep, itemID, handleSetSelectedItemID }: any){
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          rep={rep}
          itemID={itemID}
        />
      }
      {item.publicationDate &&
        <span>{htmlToText(item.publicationDate)}</span>
      }
      <span className={styles.arrowTitle}>{htmlToText(item.title) || 'nothing here'}</span>
    </div>
  )
}


type FrontArrowItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

function FrontArrowItem({ rep, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          rep={rep}
          itemID={itemID}
        />
      }
      {item.publicationDate &&
        <span>{htmlToText(item.publicationDate)}</span>
      }
      <span className={styles.arrowTitle}>{htmlToText(item.title) || 'nothing here'}</span>
    </div>
  )
}

function AuthorInfo({rep, itemID }: any){
  const authorArrows = useAuthorArrowsByItemID(rep, itemID)


  return (
    authorArrows && authorArrows.length > 0 ?
    <AuthorArrows
      rep={rep}
      authorArrows={authorArrows}
      authorCount={authorArrows.length}
    /> : null
  )
}

function AuthorArrows({rep, authorArrows, authorCount} : any) {

  return (
    <>
      <span className={styles.arrowAuthorDataSpan}>
        {authorArrows
          .slice(0, 2)
          .map((arrow: any, index: any) => {
            return (
            <AuthorItem
              key={`author-${arrow.id}`}
              rep={rep}
              itemID={arrow.frontItemID}
              authorCount={authorCount}
              index={index}
            />
          )
        })
        }
        {authorArrows.length > 2 &&
          <span>{`and ${authorCount - 2} more `}</span>
        }
      </span>

    </>
  )
}


function AuthorItem({rep, itemID, authorCount, index}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <>
      { authorCount === 1 &&
        <>
          {`${htmlToText(item.title).split(`[`)[0].trim()}`}
        </>
      }
      { authorCount === 2 &&
        index === 0 &&
        <>
          {`${htmlToText(item.title).split(`[`)[0].trim()} and `}
        </>
      }
      { authorCount === 2 &&
        index === 1 &&
        <>
          {`${htmlToText(item.title).split(`[`)[0].trim()}`}
        </>
      }
      { authorCount > 2 &&
      <>
        {`${htmlToText(item.title).split(`[`)[0].trim()}, `}
      </>
      }
    </>
  )
}



