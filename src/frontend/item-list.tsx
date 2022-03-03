import React from 'react';
import type { Replicache } from 'replicache'
import type { M } from "../datamodel/mutators";
import { useUserInfo, getSortedItems } from '../datamodel/subscriptions'
import Item from './item'
import styles from './item-list.module.css'
import ItemAdd from './item-add'

type Props = {
  rep: Replicache<M>
  drafts: any[],
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
}

export default function ItemList({ rep, drafts, handleSetDrafts, setSelectedDraftID }: Props) {
  const sortedItems = getSortedItems(rep) as unknown as any
  const userInfo = useUserInfo(rep);

  return (
    <div className={styles.container}>
      <div className={styles.warning}>
        Anyone with the URL {location.href} can view these items.
      </div>
      <ItemAdd rep={rep} drafts={drafts} handleSetDrafts={handleSetDrafts}/>
      {
        userInfo && sortedItems && sortedItems.map((item : any) => {
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
    </div>
  )
}


