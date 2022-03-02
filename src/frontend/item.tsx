import React, { useState, useEffect } from 'react'
import styles from './item.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ItemEditorContainer from './item-editor-container'
import EditorViewingContainer from './editor-viewing-container'

export default function Item({ item, rep, drafts, handleSetDrafts } :{ item: any, rep: Replicache<M>, drafts: any, handleSetDrafts : any }) {
  const i = item
  const [titleValue, setTitleValue] = useState<string>(i.title)
  const [contentValue, setContentValue] = useState<string>(i.content)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)
  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)

  useEffect(() => {
    handleUpdateTitle()
  }, [titleValue])

  useEffect(() => {
    handleUpdateContent()
  }, [contentValue])

  function handleUpdateTitle(){
    const i = {
      ...item,
      title: titleValue,
      createdAt: item.createdAt.toString()
    }
    rep.mutate.createItem({id: i.id, item: i})
  }

  function handleUpdateContent(){
    const i = {
      ...item,
      content: contentValue,
      createdAt: item.createdAt.toString()
    }
    rep.mutate.createItem({id: i.id, item: i})
  }

  const date = i.createdAt

  function dateInWords(date: Date) {
    return date.toLocaleString('default', { month: 'short'}) + " " + date.toLocaleString('default', {day: 'numeric'})
  }

  // function handleItemDelete() {
  //   rep.mutate.deleteItem(i.id)
  // }

  return (
    <div
      className={styles.container}
      // onClick={handleItemDelete}
    >
      <div className={styles.left}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.metaData}>
          <div>{i.createdBy}</div>
          <div>{dateInWords(date)}</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.titleContainer}>
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div
            className={styles.title}
            onClick={() => setShowTitleEditor(true)}
          >
            {showTitleEditor ?
              <ItemEditorContainer
                content={titleValue}
                setValue={setTitleValue}
                editable={true}
                type={'title'}
                rep={rep}
                handleSetDrafts={handleSetDrafts}
                drafts={drafts}
              />
              :
              <EditorViewingContainer
                type={'title'}
                rep={rep}
                content={i.title}
                clientInfo={null}
                setValue={()=>{ return null}}
              />
            }
          </div>
        </div>

        <div
          className={styles.content}
          onClick={() => setShowContentEditor(true)}
        >
          { showContentEditor ?
            <ItemEditorContainer
              content={contentValue}
              setValue={setContentValue}
              editable={true}
              type={'content'}
              rep={rep}
              handleSetDrafts={handleSetDrafts}
              drafts={drafts}
            />
            :
            <EditorViewingContainer
              type={'content'}
              rep={rep}
              content={i.content}
              clientInfo={null}
              setValue={()=>{ return null}}
            />
          }
        </div>

      </div>
    </div>
  )
}
