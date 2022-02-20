import React, { useRef } from 'react'
import { randomItem } from '../datamodel/item'
import { useUserInfo } from '../datamodel/subscriptions'
import type { Replicache} from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './item-add.module.css'

import EditorContainer from './editor/editorcontainer'

import { HotKeys } from "react-hotkeys"
import { randomDraft } from '../datamodel/local/draft'

type Props = {
  rep: Replicache<M>
  drafts: any[],
  handleSetDrafts: (drafts: any[]) => void
}

export default function ItemCreate({rep, drafts, handleSetDrafts }: Props) {
  const userInfo = useUserInfo(rep)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const placeholderText = `What's on your mind?`

  const handlers = {
    addItem: () => handleItemPublish(),
    saveDraftItem: () => {
      event?.preventDefault();
      handleItemDraftAdd()
    }
  };

  function handleItemPublish(){
    const r = randomItem()
    r.item.title = contentRef.current?.value || 'Untitled'
    r.item.created_by = userInfo ? userInfo.avatar : 'unknown'
    rep.mutate.createItem(r)
    // set contentRef.current.value to '' or null
  }

  function handleItemDraftAdd(){
    const r = randomDraft()
    r.title = contentRef.current?.value || 'Untitled'
    r.created_by = userInfo ? userInfo.avatar : 'unknown'
    handleSetDrafts([...drafts, r])
  }

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  return (
    <HotKeys
      {...{
        style: { outline: "none", display: "flex", flex: 1 },
        keyMap,
        handlers,
      }}
    >
    <div className={styles.container}>
<<<<<<< HEAD
      <textarea
        ref={contentRef}
      />

      <EditorContainer
        // ref={viewRef}
        // state={noteState}
        // dispatchTransaction={wrappedDispatch}
      />


      <button
        onClick={() => handleNewItem()}
      >Create Item</button>
    </div>
=======
      <div className={styles.contentContainer}>
        <div className={styles.left}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.metaData}>
            <div>{userInfo ? userInfo.avatar : `👻` }</div>
            <div>{dateInWords(new Date)}</div>
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
          <div className={styles.action}>⌘+S to Save Draft</div>
          <div className={styles.action}>⌘+Enter to Publish</div>
        </div>
      </div>
    </HotKeys>
>>>>>>> 18684b4eb7aa41be8b297c1acfa3baa5286b2bec
  )
}


const keyMap = {
  addItem: ['command+enter'],
  saveDraftItem: ['command+s']
}
