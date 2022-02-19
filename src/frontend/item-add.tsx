import React, { useRef } from 'react'
import { randomItem } from '../datamodel/item'
import { useUserInfo } from '../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './item-add.module.css'
import { HotKeys } from "react-hotkeys";

export default function ItemCreate({rep}:{rep: Replicache<M>}) {
  const userInfo = useUserInfo(rep)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const placeholderText = `What's on your mind?`

  function handleNewItem(){
    const r = randomItem()
    r.item.title = contentRef.current?.value || 'Untitled'
    r.item.created_by = userInfo ? userInfo.avatar : 'unknown'
    console.log('randomItem()', randomItem())

    rep.mutate.createItem(r)
    // set contentRef.current.value to '' or null
  }


  const handlers = {
    addComment: () => handleNewItem()
  };

  return (
    <HotKeys
      {...{
        style: { outline: "none", display: "flex", flex: 1 },
        keyMap,
        handlers,
      }}
    >
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.left}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.metaData}>
            <div>🦊</div>
            <div>Feb 18</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.inputContainer}>
            <textarea
              ref={contentRef}
              placeholder={placeholderText}
              className={styles.contentTextArea}
            />
          </div>
        </div>
      </div>
        <div className={styles.actionContainer}>
          ⌘+Enter to Publish
        </div>
      </div>
    </HotKeys>
  )
}


const keyMap = {
  addComment: ['command+enter']
}
