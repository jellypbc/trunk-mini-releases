import React, { useState } from 'react'
import styles from './main-item-draft.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import { randomItem } from '../../datamodel/item'
import { HotKeys } from 'react-hotkeys'
import EditorDraftingContainer from './editor-drafting-container'

type MainItemDraftProps = {
  rep: Replicache<M>
  clientEmail: string
  clientUsername: string
  clientAvatarURL: string
  handleSetShowMainItemDraft: (state: boolean) => void
}

const keyMap = {
  createItem: ['command+enter'],
  hideItemDraft: ['command+c']
}

export default function MainItemDraft({ rep, clientEmail, clientUsername, clientAvatarURL, handleSetShowMainItemDraft }: MainItemDraftProps) {
  console.log('clientUsername', clientUsername, 'clientAvatarURL', clientAvatarURL)
  const [titleDraft, setTitleDraft] = useState<string>('<p></p>')
  const [contentDraft, setContentDraft] = useState<string>('<p></p>')

  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)

  function saveDraftAsItem(){
    const item = randomItem()
    const changes = {
      title: titleDraft,
      content: contentDraft,
      createdBy: clientEmail || 'Anonymous Aardvark',
    }

    const itemItem = {...item.item, ...changes}
    rep.mutate.createItem({id: item.id, item: itemItem})
  }

  const handlers = {
    createItem: () => {
      console.log('something is happening')
      saveDraftAsItem()
      setTitleDraft('<p> </p>')
      setContentDraft('<p> </p>')
      setShowTitleEditor(false)
      setShowContentEditor(false)
    },
    hideItemDraft: () => {
      handleSetShowMainItemDraft(false)
    }
  }

  const placeholderContentText = `What's on your mind?`
  const placeholderTitleText = `Untitled`

  let dropArea = document.getElementById('drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea && dropArea.addEventListener(eventName, preventDefaults, false)
  });

  dropArea && dropArea.addEventListener('drop', handleDrop, false)

  function handleDrop(e:any) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
  }

function handleFiles(files :any) {
  ([...files]).forEach(uploadFile)
}

function uploadFile(file :any) {
  console.log('file', file)
  // let formData = new FormData()

  // formData.append('file', file)

  // fetch(url, {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(() => { /* Done. Inform the user */ })
  // .catch(() => { /* Error. Inform the user */ })
}

function preventDefaults (e: any) {
  e.preventDefault()
  e.stopPropagation()
}

return (
  <HotKeys
    {...{
      keyMap,
      handlers,
    }}
  >
    <div className={styles.container}>
      <div className={styles.draftContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>

          </div>
        </div>
        <div className={styles.itemDraft}>
          <div
            className={styles.itemDraftTitle}
          >
            {!showTitleEditor ?
              <textarea
                placeholder={placeholderTitleText}
                className={styles.titleTextArea}
                onClick={() => setShowTitleEditor(true)}
              />
              :
              <EditorDraftingContainer
                rep={rep}
                content={titleDraft}
                setValue={setTitleDraft}
                type={'title'}
              />
            }
          </div>
          <div className={styles.itemDraftContent}>
            {!showContentEditor ?
              <textarea
                placeholder={placeholderContentText}
                className={styles.contentTextArea}
                onClick={() => setShowContentEditor(true)}
              />
              :
              <EditorDraftingContainer
                rep={rep}
                content={contentDraft}
                setValue={setContentDraft}
                type={'content'}
              />
            }
          </div>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <div
          className={styles.action}
          onClick={() => handleSetShowMainItemDraft(false)}
        >
          ⌘+C to Cancel
        </div>
        <div
          className={styles.action}
          onClick={() => saveDraftAsItem()}
        >
          ⌘+Enter to Publish
        </div>
      </div>
      {/* <div id="drop-area" className={styles.dropArea}>
        Drop a file
      </div> */}
    </div>
  </HotKeys>
  )
}
