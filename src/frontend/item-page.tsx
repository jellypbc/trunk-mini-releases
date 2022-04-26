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

  const router = useRouter()

  function routeToWorkspace(){
    router.push(`/workspace/${roomID}/i`)
    handleSetSelectedItemID('i')
  }

  function copyShareURLToClipboard(){
    navigator.clipboard.writeText(location.href)
      .then(() => {
        alert(`Copied to clipboard: ${location.href}`)
      })
      .catch(() => {
        alert(`Failed to copy to clipboard: ${location.href}`)
      })
  }


  return (
    <div className={styles.container}>
    {item ?
      <div className={styles.main}>
        <div>{itemID}</div>
        <div>{htmlToText(item.title)}</div>
        <div className={styles.inputContainer}>
          <input
            onClick={() => copyShareURLToClipboard()}
            id={`shareURL`}
            className={styles.input}
            defaultValue={location.href}
            readOnly={true}
          />
          <button
            onClick={() => copyShareURLToClipboard()}
          >Copy</button>
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
