import React, { useState, useEffect } from 'react'
import styles from './item-draft-expanded.module.css'
import { HotKeys } from 'react-hotkeys'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'


type Props = {
  item: any
  setSelectedItemID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemExpanded({ item, setSelectedItemID, rep }:Props) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    // handleDraftTitleChange()
  }, [titleValue])

  useEffect(() => {
    // handleDraftContentChange()
  }, [contentValue])

  // function handleDraftTitleChange(){
  //   const changedDraft = i
  //   changedDraft.title = titleValue

  //   const newDrafts = [...drafts]
  //   const index = newDrafts.findIndex((d: any) => d.id === i.id)
  //   newDrafts[index] = changedDraft
  //   handleSetDrafts(newDrafts)
  // }

  // function handleDraftContentChange(){
  //   const changedDraft = i
  //   changedDraft.content = contentValue

  //   const newDrafts = [...drafts]
  //   const index = newDrafts.findIndex((d: any) => d.id === i.id)
  //   newDrafts[index] = changedDraft
  //   handleSetDrafts(newDrafts)
  // }

  const handlers = {
    manualSaveDraftItem: () => {
      event?.preventDefault();
      // code to save draft item
      // we don't actually need to add this because we are already saving on every keystroke
      alert(`Draft saved!`)
    },
    closeExpandedView: () => {
      setSelectedItemID('')
    }
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
      <div className={styles.right}>
        <div
          className={styles.keyboardShortcut}
          onClick={() => setSelectedItemID('')}
        >ESC to Exit</div>
        <div
          className={styles.titleContainer}
          onClick={() => setShowContent(!showContent)}
        >
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div className={styles.title}>
            <ItemEditorContainer
              content={titleValue}
              setValue={setTitleValue}
              editable={true}
              type={'title'}
              rep={rep}
            />
          </div>
        </div>
        <div className={styles.content}>
          <ItemEditorContainer
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
              rep={rep}
            />
        </div>
      </div>
    </div>
    </HotKeys>
  )
}

const keyMap = {
  manualSaveDraftItem: ['command+s'],
  closeExpandedView: ['esc']
}

