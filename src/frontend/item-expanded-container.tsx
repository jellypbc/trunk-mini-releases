import React from 'react'
import styles from './item-draft-expanded-container.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { useItemByID } from '../datamodel/subscriptions'
import ItemExpanded from './item-expanded'

type Props = {
  selectedItemID: string
  setSelectedItemID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemExpandedContainer({ selectedItemID, setSelectedItemID, rep}: Props) {
  const i = useItemByID(rep, selectedItemID)
  return (
    i &&
    <div className={styles.container}>
      <ItemExpanded
        item={i}
        setSelectedItemID={setSelectedItemID}
        rep={rep}
      />
    </div>
  )
}
