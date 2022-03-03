import React, { useState, useEffect } from 'react'
import styles from './item-draft-expanded.module.css'
import { HotKeys } from 'react-hotkeys'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'


type Props = {
  itemID: string
  item: any
  setSelectedItemID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemExpanded({ itemID, item, setSelectedItemID, rep }:Props) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    rep.mutate.createItem({id: itemID, item: {...i, title: titleValue}})
  }, [titleValue])

  useEffect(() => {
    rep.mutate.createItem({id: itemID, item: {...i, content: contentValue}})
  }, [contentValue])

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

