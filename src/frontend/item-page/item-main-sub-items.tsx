import React, { useState } from 'react'
import { useItemByID, getArrowsByIDs } from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import EditorContainer from './editor-container'

export default function ItemMainSubItems({ rep, itemID, handleSetSelectedItemID, fullArrows} : any) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    subItemItemIDs &&
      <div className={styles.mainSubItems}>
        {subItemItemIDs.map((itemID: any) => {
          return (
            <SubItemMain
              rep={rep}
              key={`subItemMain-${itemID}`}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          )
        })}
      </div>
  )
}


function SubItemMain({rep, itemID, handleSetSelectedItemID}: any){
  const item = useItemByID(rep, itemID)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showExpand, setShowExpand] = useState<boolean>(false)

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
          <EditorContainer
            doc={item.content}
            type={'content'}
            rep={rep}
            itemID={itemID}
            arrows={item.arrows as any || []}
          />
          <ItemMainSubItemsA
            rep={rep}
            itemID={itemID}
            handleSetSelectedItemID={handleSetSelectedItemID}
            item={item}
          />
        </div>
      }
    </div>
  )
}

function ItemMainSubItemsA({ rep, itemID, handleSetSelectedItemID, item}: any) {
  const arrowIDs = item.arrows.map((a: any) => a.arrowID)
  const fullArrows = getArrowsByIDs(rep, arrowIDs)
  return (
    fullArrows &&
    <ItemMainSubItemsB
      rep={rep}
      itemID={itemID}
      handleSetSelectedItemID={handleSetSelectedItemID}
      fullArrows={fullArrows}
    />
  )
}


function ItemMainSubItemsB({ rep, itemID, handleSetSelectedItemID, fullArrows} : any) {
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  return (
    subItemItemIDs &&
      <div className={styles.mainSubItems}>
        {subItemItemIDs.map((itemID: any) => {
          return (
            <SubItemMain
              rep={rep}
              key={`subItemMain-${itemID}`}
              itemID={itemID}
              handleSetSelectedItemID={handleSetSelectedItemID}
            />
          )
        })}
      </div>
  )
}
