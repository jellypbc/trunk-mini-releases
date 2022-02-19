import React, { useRef } from 'react'
import { randomItem } from '../datamodel/item'
import { useUserInfo } from '../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './item-add.module.css'

export default function ItemCreate({rep}:{rep: Replicache<M>}) {
  const userInfo = useUserInfo(rep)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  function handleNewItem(){
    const r = randomItem()
    r.item.title = contentRef.current?.value || 'Untitled'
    r.item.created_by = userInfo ? userInfo.avatar : 'unknown'
    console.log('randomItem()', randomItem())

    rep.mutate.createItem(r)
    // set contentRef.current.value to '' or null
  }

  return (

    <div className={styles.container}>
      <textarea
        ref={contentRef}
      />
      <button
        onClick={() => handleNewItem()}
      >Create Item</button>
    </div>
  )
}
