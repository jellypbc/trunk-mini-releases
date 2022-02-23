import React, { useState, useEffect } from 'react'
import styles from './item-draft-expanded.module.css'
import ItemDraftTitleEditor from './item-draft-title-editor'
import { HotKeys } from 'react-hotkeys'


type Props = {
  item: any
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
}

export default function ItemDraftExpanded({ item, drafts, handleSetDrafts, setSelectedDraftID }:Props) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    handleDraftTitleChange()
  }, [titleValue])

  useEffect(() => {
    handleDraftContentChange()
  }, [contentValue])

  function handleDraftTitleChange(){
    const changedDraft = i
    changedDraft.title = titleValue

    const newDrafts = [...drafts]
    const index = newDrafts.findIndex((d: any) => d.id === i.id)
    newDrafts[index] = changedDraft
    handleSetDrafts(newDrafts)
  }

  function handleDraftContentChange(){
    const changedDraft = i
    changedDraft.content = contentValue

    const newDrafts = [...drafts]
    const index = newDrafts.findIndex((d: any) => d.id === i.id)
    newDrafts[index] = changedDraft
    handleSetDrafts(newDrafts)
  }

  const handlers = {
    manualSaveDraftItem: () => {
      event?.preventDefault();
      // code to save draft item
      // we don't actually need to add this because we are already saving on every keystroke
      alert(`Draft saved!`)
    },
    closeExpandedView: () => {
      setSelectedDraftID('')
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
          onClick={() => setSelectedDraftID('')}
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
            <ItemDraftTitleEditor
              content={titleValue}
              setValue={setTitleValue}
              editable={true}
              type={'title'}
            />
          </div>
        </div>
        <div className={styles.content}>
          <ItemDraftTitleEditor
            content={contentValue}
            setValue={setContentValue}
            editable={true}
            type={'content'}
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

