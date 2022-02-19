import React from 'react';
import type { Replicache } from 'replicache'
import type { M } from "../datamodel/mutators";

import { getItems, useUserInfo, getSortedItems } from '../datamodel/subscriptions'
import Item from './item'
import styles from './item-list.module.css'
import ItemAdd from './item-add'

type Props = {
  rep: Replicache<M>;
}

export default function ItemList({ rep }: Props) {
  const items = getItems(rep) as unknown as any
  const userInfo = useUserInfo(rep);

  return (
    <div className={styles.container}>
      <ItemAdd rep={rep}/>
      {
        userInfo && items && items.map((item : any) => {
          return (
            <Item
              key={`item-${item.id}`}
              item={item}
            />
          )
        })

      }
    </div>
  )
}
