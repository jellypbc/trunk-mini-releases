import React, { useState, useEffect } from 'react'
import styles from './item-draft.module.css'
import ItemDraftEditorContainer from './item-draft-editor-container'
import { HotKeys } from 'react-hotkeys'
import type { Replicache } from 'replicache'
import EditorContainer from './editor-container'
import type { M } from '../datamodel/mutators'


type Props = {
  item: any
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemDraft({ item, drafts, handleSetDrafts, setSelectedDraftID, rep }:Props) {
  const i = item
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showCaret, setShowCaret] = useState<boolean>(false)

  const date = new Date(i.created_at)

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

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  function handleDraftDelete(){
    handleSetDrafts(drafts.filter((draft: any) => draft.id !== i.id))
  }

  const handlers = {
    manualSaveDraftItem: () => {
      event?.preventDefault();
      // code to save draft item
      // we don't actually need to add this because we are already saving on every keystroke
      alert(`Draft saved!`)
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
    <div
      className={styles.container}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.metaData}>
          <div>{i.created_by}</div>
          <div>{dateInWords(date)}</div>
        </div>
      </div>

      <div
        className={styles.right}
        onMouseOver={() => setShowOptions(true)}
      >
        { showOptions &&
          <div
            className={styles.optionsContainer}
            onMouseLeave={() => setShowOptions(false)}
          >
            <div className={styles.option}>
              😄
            </div>
            <div className={styles.option}>
              💬
            </div>
            <div
              className={styles.option}
              onClick={() => setSelectedDraftID(i.id)}
            >
              📂
            </div>
            <div className={styles.option}
              onClick={handleDraftDelete}
            >
              🗑
            </div>
          </div>
        }
        {i.highlight &&
          <div className={styles.highlight}>
            <EditorContainer
              rep={rep}
              content={i.highlight}
              clientInfo={null}
              setValue={()=>{ return null}}
            />
          </div>
        }


        <div
          className={styles.titleContainer}
          onMouseOver={() => {
            setShowCaret(true)
          }}
          onMouseLeave={()=>{setShowCaret(false)}}
          onClick={() => setShowContent(!showContent)}
        >
           <div className={styles.caretContainer}>
            {showCaret &&
              <div className={showContent ?
                styles.caretOpened
                :
                styles.caretClosed
              }></div>
            }
            </div>
          <div className={styles.bullet}>
            {showCaret
            ?
            <div className={styles.bulletBorderEmphasized}>
              <div className={styles.bulletCenterEmphasized}>
              </div>
            </div>
            :
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
            }
          </div>
          <div className={styles.title}>
            <ItemDraftEditorContainer
              content={titleValue}
              setValue={setTitleValue}
              editable={true}
              type={'title'}
              rep={rep}
              handleSetDrafts={handleSetDrafts}
              drafts={drafts}
            />
          </div>
        </div>
        { showContent &&
          <div className={styles.content}>
            <ItemDraftEditorContainer
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
              rep={rep}
              handleSetDrafts={handleSetDrafts}
              drafts={drafts}
            />
          </div>
        }
      </div>
    </div>
    </HotKeys>
  )
}

const keyMap = {
  manualSaveDraftItem: ['command+s']
}

