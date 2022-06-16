import React, { useState } from 'react'
import {
  useItemByID,
  useArrowsByIDs,
  useCommentArrowsByItemID
} from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import EditorContainer from './editor-container'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'

type ItemMainSubItemsProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  fullArrows: any[]
  showHighlights: boolean
}

export default function ItemMainSubItems({ reflect, itemID, handleSetSelectedItemID, fullArrows, showHighlights} : ItemMainSubItemsProps) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    subItemItemIDs &&
      <div className={styles.mainSubItems}>
        {subItemItemIDs.map((itemID: any) => {
          return (
            <SubItemMain
              reflect={reflect}
              key={`subItemMain-${itemID}`}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
              showHighlights={showHighlights}
            />
          )
        })}
      </div>
  )
}


function SubItemMain({reflect, itemID, handleSetSelectedItemID, showHighlights}: any){
  const item = useItemByID(reflect, itemID)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showExpand, setShowExpand] = useState<boolean>(false)
  const commentArrows = useCommentArrowsByItemID(reflect, itemID)

  return (
    <div className={styles.subItemTitleContainer}>
      <div
        className={styles.titleEditor}
        onClick={() => setShowContent(!showContent)}
        onMouseOver={() => setShowExpand(true)}
        onMouseLeave={() => setShowExpand(false)}
      >
        <span className={styles.titleSubItem}>{item && htmlToText(item.title) || 'nothing here'}</span>
        {showExpand &&
          <span className={styles.expand} onClick={() => handleSetSelectedItemID(itemID)}>↗</span>
        }
      </div>
      { showContent && item &&
        <div className={styles.subItemContent}>
          {commentArrows &&
            <EditorContainer
              doc={item.content}
              type={'content'}
              reflect={reflect}
              itemID={itemID}
              commentArrows={commentArrows}
              showHighlights={showHighlights}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          }
          <ItemMainSubItemsA
            reflect={reflect}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
            item={item}
            showHighlights={showHighlights}
          />
        </div>
      }
    </div>
  )
}

function ItemMainSubItemsA({ reflect, itemID, handleSetSelectedItemID, item, showHighlights}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(reflect, arrowIDs)
  return (
    fullArrows &&
    <ItemMainSubItemsB
      reflect={reflect}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
      fullArrows={fullArrows}
      showHighlights={showHighlights}
    />
  )
}

function ItemMainSubItemsB({ reflect, itemID, handleSetSelectedItemID, fullArrows, showHighlights} : any) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    subItemItemIDs &&
      <div className={styles.mainSubItems}>
        {subItemItemIDs.map((itemID: any) => {
          return (
            <SubItemMain
              reflect={reflect}
              key={`subItemMain-${itemID}`}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
              showHighlights={showHighlights}
            />
          )
        })}
      </div>
  )
}
