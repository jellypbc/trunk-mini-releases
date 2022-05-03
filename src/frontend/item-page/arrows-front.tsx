import React from 'react'
import { useItemByID, useAuthorsByItemID, getArrowsByIDs } from '../../datamodel/subscriptions'
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
      {subItemItemIDs &&
        <>
        Sub-item links
        <SubItemLinks
          rep={rep}
          subItemItemIDs={subItemItemIDs}
        />
        </>
      }
    </>
  )
}

// function SubItemLinks({rep, subItemItemIDs}: any){
//   return (
//     <div>subItem links</div>
//   )
// }

function SubItemLinks({rep, subItemItemIDs}: any){

  return(
    //loops through sub item ids
    subItemItemIDs.map((itemID :any) => {
      return (
        <SubItemLink
          key={`subItemLink-${itemID}`}
          itemID={itemID}
          rep={rep}
        />
      )
    })
  )
}

// each sub item
function SubItemLink({itemID, rep}: any){
  const item = useItemByID(rep, itemID)
  return(
    item &&
    <div>
      <SubItemLinkLinks
        item={item}
        rep={rep}
        itemID={itemID}
      />
    </div>
  )
}

function SubItemLinkLinks({item, rep, itemID}: any){
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs) //sub item full arrows


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
  // const footnotes = arrows.filter((a: any) => a.kind === 'footnote' && a.backItemID === itemID) || []
  // const footnoteArrowIDs = footnotes.map((a: any) => a.id)

  const forwardArrows = arrows.filter((a: any) => a.kind === 'reference' && a.backItemID === itemID ) || []
  const frontItemIDs = forwardArrows.map((a: any) => a.frontItemID)
  const uniqueFrontItemIDs = [...new Set(frontItemIDs)]
  console.log('uniqueFrontItemIDs', uniqueFrontItemIDs)
  return (
    <>
    {uniqueFrontItemIDs && uniqueFrontItemIDs.map((itemID: any) => {
      return (
        <Arrow2
          key={`arrow2a-${itemID}`}
          rep={rep}
          itemID={itemID}
        />
      )
    })}
    </>
  )
}

// function Thing({frontItemIDs, rep}: any){
//   console.log('frontItemIDs', frontItemIDs)
//   const arrows = getArrowsByIDs(rep, frontItemIDs)
//   console.log('arrows arrows', arrows)
//   return (
//     <>
//     {arrows && arrows.map((a: any) => {
//       return (
//         <Arrow2
//           key={a.id}
//           arrow={a}
//           rep={rep}
//           // handleSetSelectedItemID={handleSetSelectedItemID}
//         />
//       )
//     })}
//     </>
//   )
// }


function Arrow2({rep, itemID}: any){
  const item = useItemByID(rep, itemID)
  return (
    <div
      className={styles.commentItem}
      // onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div>{htmlToText(item.title)}</div>
        </>
      }
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
  const authors = useAuthorsByItemID(rep, itemID)

  return (
    authors &&
    <AuthorArrows
      rep={rep}
      authorArrowIDs={authors}
    />
  )
}

function AuthorArrows({rep, authorArrowIDs} : any) {
  const fullArrows = getArrowsByIDs(rep, authorArrowIDs)

  if (!fullArrows) return null

  return (
    <>
      {fullArrows && fullArrows.length > 0 &&
        <span className={styles.arrowAuthorDataSpan}>
          {fullArrows
            .slice(0, 2)
            .map((fullArrow: any, index: any) => {
              return (
              <AuthorItem
                key={`author-${fullArrow.id}`}
                rep={rep}
                itemID={fullArrow.frontItemID}
                authorCount={fullArrows.length}
                index={index}
              />
            )
          })
          }
          {fullArrows.length > 2 &&
            <span>{`and ${fullArrows.length - 2} more `}</span>
          }
        </span>
      }
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



