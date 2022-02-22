import React, { useRef, useState } from 'react'
import { randomItem } from '../datamodel/item'
import { useUserInfo } from '../datamodel/subscriptions'
import type { Replicache} from 'replicache'
import type { M } from '../datamodel/mutators'
import styles from './item-add.module.css'
import EditorContainer from './editor-container'

import { HotKeys } from "react-hotkeys"
import { randomDraft } from '../datamodel/local/draft'

type Props = {
  rep: Replicache<M>
  drafts: any[],
  handleSetDrafts: (drafts: any[]) => void
}

const initialValue = '<p></p>'

export default function ItemCreate({rep, drafts, handleSetDrafts }: Props) {
  const userInfo = useUserInfo(rep)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const placeholderText = `What's on your mind?`

  const [value, setValue] = useState<string>(initialValue)
  const [showEditor, setShowEditor] = useState<boolean>(false)


  const handlers = {
    addItem: () => handleItemPublish(),
    saveDraftItem: () => {
      event?.preventDefault();
      handleItemDraftAdd()
    }
  };

  function handleItemPublish(){
    const r : any = randomItem()
    r.item.title = value
    r.item.created_by = userInfo ? userInfo.avatar : 'unknown'
    rep.mutate.createItem(r)
    // set contentRef.current.value to '' or null
  }

  function handleItemDraftAdd(){
    const r = randomDraft()
    r.title = value
    r.created_by = userInfo ? userInfo.avatar : 'unknown'
    const changes = {
      created_at: new Date(r.created_at)
    }
    const draft = { ...r, ...changes}
    handleSetDrafts([...drafts, draft])
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
            {!showEditor ?
              <textarea
                ref={contentRef}
                placeholder={placeholderText}
                className={styles.contentTextArea}
                onClick={() => setShowEditor(true)}
              />
              :
              <EditorContainer
                rep={rep}
                content={value}
                clientInfo={userInfo}
                setValue={setValue}
              />
            }
          </div>
        </div>
      </div>
        <div className={styles.actionContainer}>
          <div
            className={styles.action}
            onClick={() => {
              event?.preventDefault()
              handleItemDraftAdd()
            }}
          >⌘+S to Save Draft</div>
          <div
            className={styles.action}
            onClick={() => handleItemPublish()}
          >⌘+Enter to Publish</div>
        </div>


    </div>

    </HotKeys>
  )
}


const keyMap = {
  addItem: ['command+enter'],
  saveDraftItem: ['command+s']
}
