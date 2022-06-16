import React from 'react'
import {
  useItemByID,
  useAuthorArrowsByItemID,
  useArrowsByIDs
} from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'

type Props = {
  reflect: Reflect<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
  subItemItemIDs: any
}

export default function ArrowsFront({ reflect, itemID, fullArrows, handleSetSelectedItemID, subItemItemIDs} : Props) {
  const forwardArrows = fullArrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs = forwardArrows.map((a: any) => a.frontItemID)
  const uniqueFrontItemIDs = [...new Set(frontItemIDs)]
  const item = useItemByID(reflect, itemID)

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
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
      {subItemItemIDs && item &&
        <>
        <SubItemLinks
          reflect={reflect}
          subItemItemIDs={subItemItemIDs}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        </>
      }
    </>
  )
}


function SubItemLinks({reflect, subItemItemIDs, handleSetSelectedItemID}: any){
  return(
    subItemItemIDs.map((itemID :any) => {
      return (
        <SubItemLink
          key={`subItemLink-${itemID}`}
          itemID={itemID}
          reflect={reflect}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })
  )
}

function SubItemLink({itemID, reflect, handleSetSelectedItemID}: any){
  const item = useItemByID(reflect, itemID)
  return(
    item &&
    <div>
      {htmlToText(item.title)}
      <SubItemLinkLinks
        item={item}
        reflect={reflect}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
      />
    </div>
  )
}

function SubItemLinkLinks({item, reflect, itemID, handleSetSelectedItemID}: any){
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(reflect, arrowIDs) //sub item full arrows
  //put something there

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

function SubItemFootnoteFootnotesA({arrows, reflect, itemID, handleSetSelectedItemID }: any) {
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
          reflect={reflect}
          itemID={itemID}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
      )
    })}
    {subItemItemIDs &&
        <>
        <SubItemLinks
          reflect={reflect}
          subItemItemIDs={subItemItemIDs}
          handleSetSelectedItemID={handleSetSelectedItemID}
        />
        </>
      }
    </>
  )
}


function FrontArrowItem2({ reflect, itemID, handleSetSelectedItemID }: any){
  const item = useItemByID(reflect, itemID)
  return (
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          reflect={reflect}
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
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}

function FrontArrowItem({ reflect, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(reflect, itemID)
  return (
    item &&
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item.arrows.length > 0 &&
        <AuthorInfo
          reflect={reflect}
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

function AuthorInfo({reflect, itemID }: any){
  const authorArrows = useAuthorArrowsByItemID(reflect, itemID)


  return (
    authorArrows && authorArrows.length > 0 ?
    <AuthorArrows
      reflect={reflect}
      authorArrows={authorArrows}
      authorCount={authorArrows.length}
    /> : null
  )
}

function AuthorArrows({reflect, authorArrows, authorCount} : any) {

  return (
    <>
      <span className={styles.arrowAuthorDataSpan}>
        {authorArrows
          .slice(0, 2)
          .map((arrow: any, index: any) => {
            return (
            <AuthorItem
              key={`author-${arrow.id}`}
              reflect={reflect}
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


function AuthorItem({reflect, itemID, authorCount, index}: any) {
  const item = useItemByID(reflect, itemID)
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



