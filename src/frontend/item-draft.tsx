import React, { useState, useEffect } from 'react'
import styles from './item-draft.module.css'
import ItemDraftTitleEditor from './item-draft-title-editor'


type Props = {
  item: any
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
}

export default function ItemDraft({ item, drafts, handleSetDrafts }:Props) {
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

  return (
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
      <div className={styles.right}>
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
            <div className={styles.option}>
              📂
            </div>
            <div className={styles.option}
              onClick={handleDraftDelete}
            >
              🗑
            </div>
          </div>

        }

        <div
          className={styles.titleContainer}
          onMouseOver={() => {
            setShowOptions(true)
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
            <ItemDraftTitleEditor
              content={titleValue}
              setValue={setTitleValue}
              editable={true}
              type={'title'}
            />
          </div>
        </div>
        { showContent &&
          <div className={styles.content}>
            <ItemDraftTitleEditor
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
            />
          </div>
        }

      </div>
    </div>
  )
}
