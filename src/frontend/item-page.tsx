import React from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { useItemByID } from '../datamodel/subscriptions'
import { useRouter } from 'next/router'
import { htmlToText } from '../util/htmlToText'
import styles from './item-page.module.css'

type ItemPageProps = {
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
  rep: Replicache<M>
  roomID: string
}

export default function ItemPage({ itemID, handleSetSelectedItemID, rep, roomID } : ItemPageProps ) {
  const item = useItemByID(rep, itemID)
  console.log('item', item)

  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }

  return (
    <div className={styles.container}>
    {item ?
      <div className={styles.main}>
        <div>{itemID}</div>
        <div>{htmlToText(item.title)}</div>
        <div>
          <input
            className={styles.input}
            value={location.href}
          />
        </div>
        <button onClick={() => routeToWorkspace()}>Back to workspace</button>
      </div>
      :
      <div>
        <div>{itemID} does not exist</div>
        <button onClick={() => routeToWorkspace()}>go back to workspace</button>
      </div>
    }
    </div>
  )
}
