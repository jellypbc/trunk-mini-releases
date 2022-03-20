import React, { useState } from 'react';
import type { Replicache } from 'replicache'
import type { M } from "../datamodel/mutators";
import { useUserInfo, getSortedItems, useItemByID } from '../datamodel/subscriptions'
import Item from './item'
import styles from './item-list.module.css'
import ItemAdd from './item-add'

type Props = {
  rep: Replicache<M>
  drafts: any[],
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
}

const pinnedItemID = 'MRLRN-jrmJce1u4aNkBTk'

export default function ItemList({ rep, drafts, handleSetDrafts, setSelectedDraftID }: Props) {
  const sortedItems = getSortedItems(rep) as unknown as any
  const userInfo = useUserInfo(rep);
  const pinnedItem = useItemByID(rep, pinnedItemID)
  const [itemsShown, setItemsShown] = useState<number>(10)

  function setSelectedDraftIDToPinned(){
    setSelectedDraftID(pinnedItemID)
  }

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }
  return (
    <div className={styles.container}>
      <div className={styles.warning}>
        Anyone with the URL {location.href} can view these items.
      </div>
      <ItemAdd rep={rep} drafts={drafts} handleSetDrafts={handleSetDrafts}/>
      {pinnedItem &&
        <Item
          key={`pinnedItem-${pinnedItemID}`}
          item={pinnedItem}
          rep={rep}
          setSelectedDraftID={setSelectedDraftIDToPinned}
          itemID={pinnedItemID}
        />
      }
      {
        userInfo && sortedItems && sortedItems.slice(0,itemsShown).map((item : any) => {
          return (
            <Item
              key={item.id}
              item={item}
              rep={rep}
              setSelectedDraftID={setSelectedDraftID}
              itemID={item.id}
            />
          )
        })
      }
      { sortedItems.length > 10 && itemsShown < sortedItems.length &&
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={addTenItems}
          >
            Show more items
          </button>
        </div>
      }
    </div>
  )
}