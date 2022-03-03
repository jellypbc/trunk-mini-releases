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
import { useUserInfo, getArrows } from '../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { randomArrow } from '../datamodel/arrow'
import { randomItem } from '../datamodel/item'



type Props = {
  content: any
  setValue: (value: string) => void
  editable: boolean
  type: string
  rep: Replicache<M>
  item: any
  itemID: string
}

const initialValue = '<p></p>'

function ItemEditorContainer({ content: doc, setValue, editable, type, rep, item, itemID } : Props) {
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
  // const [arrowArray, setArrowArray] = useState<any[]>([])

  const allArrows = getArrows(rep)
  console.log('allArrows', allArrows)

  // useEffect(() => {

  // }, [])

  // let arrows
  // if (item) {
  //   arrows = JSON.parse(item.arrows)
  //   const arrowArray = getCommentArrowsByArrowIDArray(rep, arrows)
  //   if (arrowArray === []) {
  //     setArrowArray(arrows)
  //   }
  // }



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

  // useEffect(() => {
  //   let inlineComments : any = []
  //   arrowArray && arrowArray.map(arrow => {
  //     if (arrow.kind === 'comment') {
  //       inlineComments.push(arrow)
  //     }
  //   })

  //   const comments : any = inlineComments

  //   const state = createStateFromProps(
  //     doc,
  //     schema,
  //     parser,
  //     viewRef && viewRef.current && viewRef.current.view
  //   )
  //   setState(state)
  //   setView(viewRef && viewRef.current && viewRef.current.view)
  // }, [arrows])


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
    let selection = state?.selection

    // create commentItem
    let commentItem = randomItem()
    console.log('commentItem', commentItem)
    //set comment item changes

    // arrows: "[]"
    // content: ""
    // createdAt: "2022-03-03T05:03:31.302Z"
    // createdBy: ""
    // title: "Untitled"
    // type: "item"
    const commentItemChanges = {
      content: commentDraft,
      createdBy: '😸',
      title: commentItem.id,
      highlight: serializedSelection,
    }

    commentItem.item = {...commentItem.item, ...commentItemChanges}
    console.log('finished commentItem w/o arrows', commentItem)

    // make an arrow

    // id: nanoid(),
    // arrow: {
    //   type: "arrow",
    //   createdAt: new Date().toISOString(),
    //   createdBy: '',
    //   frontItemID: '',
    //   backItemID: '',
    //   content: '<p></p>',
    //   highlight: '<p></p>',
    //   official: false,
    //   to: 0,
    //   from: 0,
    //   parentItemID: '',
    //   kind: '',
    // } as Arrow,
    let commentArrow = randomArrow()
    console.log('commentArrow', commentArrow)
    const arrowChanges = {
      createdBy: '😸',
      frontItemID: commentItem.id,
      backItemID: itemID,
      content: commentDraft,
      highlight: serializedSelection,
      to: selection?.to || 0,
      from: selection?.from || 0,
      parentItemID: itemID,
      kind: 'comment',
    }

    commentArrow.arrow = {...commentArrow.arrow, ...arrowChanges}
    console.log('finished commentArrow', commentArrow)

    // push arrow.id to commentItem.arrows
    const arrows = []
    const existingArrows = JSON.parse(commentItem.item.arrows)
    existingArrows && existingArrows.map((a: string) => arrows.push(a))
    arrows.push(commentArrow.id)
    console.log('arrowsIDs', arrows)
    commentItem.item.arrows = JSON.stringify(arrows)
    console.log('commentItem with arrows', commentItem)
    console.log('JSON.parse(commentItem.item.arrows)', JSON.parse(commentItem.item.arrows))
    // push arrow.id to item.arrows

    const itemArrows = []
    const existingItemArrows = JSON.parse(item.arrows)
    existingItemArrows && existingItemArrows.map((a: string) => itemArrows.push(a))
    itemArrows.push(commentArrow.id)
    item.arrows = JSON.stringify(itemArrows)
    console.log('item with new arrows', item)

    // save arrow
    console.log('commentArrow', commentArrow)
    rep.mutate.createArrow({ id: commentArrow.id, arrow: commentArrow.arrow })
    // save commentItem
    console.log('commentItem', commentItem)
    rep.mutate.createItem({ id: commentItem.id, item: commentItem.item })
    // save item
    console.log('item', item)
    rep.mutate.createItem({ id: itemID, item: item })

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
  parser: any,
  view: any
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

export default React.memo(ItemEditorContainer)