import React, { useEffect, useRef, useState } from 'react'
import { createParser, createSerializer } from './editor/config/utils'
import { schema } from './editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './editor/plugins/index'
import Editor from './editor'
import styles from './item-draft-editor-container.module.css'
import EditorDraftingContainer from './editor-drafting-container'
import { useUserInfo } from '../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { randomDraft } from '../datamodel/local/draft'

type Props = {
  content: any
  setValue: (value: string) => void
  editable: boolean
  type: string
  rep: Replicache<M>
  handleSetDrafts: (drafts: any[]) => void
  drafts: any[]
}

const initialValue = '<p></p>'

function ItemDraftEditorContainer({ content: doc, setValue, editable, type, rep, handleSetDrafts, drafts } : Props) {
  const parser = createParser(schema)
  const serializer = createSerializer(schema)
  const viewRef = useRef<any>()
  const userInfo = useUserInfo(rep)

  const [state, setState] = useState<EditorState | undefined>()
  const [, setView] = useState<EditorView>()
  const [showCommentFloater, setShowCommentFloater] = useState<boolean>(false)
  const [serializedSelection, setSerializedSelection] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [commentDraft, setCommentDraft] = useState<string>(initialValue)

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [])

  const dispatchTransaction = (tx: Transaction | any) => {
    const selection : string = serializer(tx.curSelection.content())
    if (selection) {
      setShowCommentFloater(true)
      setSerializedSelection(selection)
    } else {
      setShowCommentFloater(false)
    }

    const view = viewRef.current.view
    setView(view)

    const newState = view.state.apply(tx)
    view.updateState(newState)

    setState(newState)
    setValue(serializer(newState.doc))
  }

  const fakeDispatchTransaction = (tx: Transaction) => {
    console.log('fakeDispatch', tx)
  }

  function handleCommentAdd() {
    const r = randomDraft()
    const updatedDraft = {
      ...r,
      highlight: serializedSelection,
      createdBy: userInfo?.avatar,
      title: commentDraft,
      createdAt: new Date(r.createdAt)
    }
    handleSetDrafts([...drafts, updatedDraft])
  }

  return (
    <>
      {state &&
        <>
          {showCommentFloater &&
            <div className={styles.commentFloaterContainer}>
              { showOptions &&
                <div className={styles.optionsContainer}>
                  <div
                    className={styles.option}
                    // dataTooltip={`Add Reaction · A`}
                  >
                    🙂
                  </div>
                  <div
                    className={styles.option}
                    // dataTooltip={`Reply · R`}
                    onClick={() => setShowReplyForm(true)}
                  >
                    💬
                  </div>
                  <div
                    className={styles.option}
                    // dataTooltip={`Delete · D`}
                  >
                    ...
                  </div>
                </div>
              }
              <div
                className={styles.selectedText}
                onMouseOver={() => setShowOptions(true)}
              >
                <Editor
                  type={'highlight'}
                  ref={null}
                  state={createStateFromProps(serializedSelection, schema, parser, viewRef && viewRef.current && viewRef.current.view)}
                  dispatchTransaction={fakeDispatchTransaction}
                  editable={false}
                />
              </div>
              {showReplyForm &&
                <>
                  <EditorDraftingContainer
                    rep={rep}
                    content={commentDraft}
                    clientInfo={userInfo}
                    setValue={setCommentDraft}
                    type={''}
                  />
                  <button
                  onClick={handleCommentAdd}
                  >save</button>
                </>
              }
            </div>
          }
          <Editor
            type={type}
            ref={viewRef}
            state={state}
            dispatchTransaction={dispatchTransaction}
            editable={editable}
          />
        </>
      }
    </>
  )
}

const createStateFromProps = (
  doc: string,
  schema: Schema,
  parser: (doc: string) => any,
  view: EditorView
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)}
    }),
  })
}

export default React.memo(ItemDraftEditorContainer)