import React, { useEffect, useRef, useState } from 'react'
import { createParser, createSerializer } from './editor/config/utils'
import { schema } from './editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './editor/plugins/index'
import Editor from './editor'
import { useUserInfo, useItemIDs } from '../datamodel/subscriptions'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { randomArrow } from '../datamodel/arrow'
import { randomItem } from '../datamodel/item'
import { htmlToText } from '../util/htmlToText'
import ArrowFloater from './arrow-floater'

type Props = {
  content: any
  setValue: (value: string) => void
  editable: boolean
  type: string
  rep: Replicache<M>
  item: any
  itemID: string
}

function ItemEditorContainer({ content: doc, setValue, editable, type, rep, item, itemID } : Props) {
  const parser = createParser(schema)
  const serializer = createSerializer(schema)
  const viewRef = useRef<any>()
  const userInfo = useUserInfo(rep)

  const itemIDs = useItemIDs(rep)

  const [state, setState] = useState<EditorState | undefined>()
  const [_, setView] = useState<EditorView>()
  const [showCommentFloater, setShowCommentFloater] = useState<boolean>(false)
  const [serializedSelection, setSerializedSelection] = useState<string>('')
  const [arrows, setArrows] = useState<any>(item.arrows)

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view,
      type === 'title' ? [] : arrows,
      rep,
      itemID
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [])

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view,
      type === 'title' ? [] : arrows,
      rep,
      itemID
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
    setSerializedSelection('')
    setShowCommentFloater(false)
  }, [arrows])


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


  function createCommentItem(commentDraft : string){
    let commentItem = randomItem()
    const commentItemChanges = {
      content: commentDraft,
      createdBy: '😸',
      highlight: serializedSelection,
    }

    commentItem.item = {...commentItem.item, ...commentItemChanges}

    return commentItem
  }

  function createArrow(type: string, frontItemID: string, commentDraft : string) {
    let selection = state?.selection
    let commentArrow = randomArrow()
    const arrowChanges = {
      createdBy: '😸',
      frontItemID: frontItemID,
      backItemID: itemID,
      content: commentDraft,
      highlight: serializedSelection,
      to: selection?.to || 0,
      from: selection?.from || 0,
      parentItemID: itemID,
      kind: type,
    }
    commentArrow.arrow = {...commentArrow.arrow, ...arrowChanges}
    return commentArrow
  }

  function handleCommentAdd(commentDraft: string) {
    const commentItem = createCommentItem(commentDraft)

    const commentArrow = createArrow('comment', commentItem.id, commentDraft)

    // set newArrow
    const newA = {
      arrowID: commentArrow.id,
      to: commentArrow.arrow.to,
      from: commentArrow.arrow.from,
      kind: commentArrow.arrow.kind,
      backItemID: commentArrow.arrow.backItemID
    }

    // push arrow.id to commentItem.arrows
    const arrows = []
    const existingArrows = JSON.parse(commentItem.item.arrows)
    existingArrows && existingArrows.map((a:any) => arrows.push(a))
    arrows.push(newA)
    commentItem.item.arrows = JSON.stringify(arrows)
    console.log('existingArrows', existingArrows)

    // append arrowID to existing item.arrows array
    const itemArrows = []
    const existingItemArrows = item.arrows ? item.arrows : []
    console.log('existingItemArrows', existingItemArrows)
    existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
    itemArrows.push(newA)

    // save arrow
    rep.mutate.createArrow({ id: commentArrow.id, arrow: commentArrow.arrow })
    // save commentItem
    rep.mutate.createItem({ id: commentItem.id, item: commentItem.item })
    // update arrows on selectedItem
    console.log('itemArrows', itemArrows)
    rep.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })
    // set arrows in this component, so that the editor knows to draw the decoration
    setArrows(itemArrows)
  }


  function createFootnoteItem(commentDraft: string){
    let footnoteItem = randomItem()
    const footnoteItemChanges = {
      content: commentDraft,
      createdBy: '😸',
      title: footnoteItem.id,
      highlight: serializedSelection
    }

    footnoteItem.item = {...footnoteItem.item, ...footnoteItemChanges}

    return footnoteItem
  }

  function handleFootnoteAdd(commentDraft: string) {
    // create footnoteItem
    let footnoteItem = createFootnoteItem(commentDraft)
    console.log('footnoteItem', footnoteItem)

    // create footnoteArrow
    const footnoteArrow = createArrow('footnote', footnoteItem.id, commentDraft)
    console.log('footnoteArrow', footnoteArrow)

    const newA = {
      arrowID: footnoteArrow.id,
      to: footnoteArrow.arrow.to,
      from: footnoteArrow.arrow.from,
      kind: footnoteArrow.arrow.kind,
      backItemID: footnoteArrow.arrow.backItemID
    }

    // push newA to footnoteItem.arrows
    const arrows = []
    arrows.push(newA)
    footnoteItem.item.arrows = JSON.stringify(arrows)

    // append newA to existing item.arrows array
    const itemArrows = []
    const existingItemArrows = item.arrows ? item.arrows : []
    existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
    itemArrows.push(newA)

    //save footnoteArrow

    rep.mutate.createArrow({ id: footnoteArrow.id, arrow: footnoteArrow.arrow })

    // save footnoteItem
    rep.mutate.createItem({ id: footnoteItem.id, item: footnoteItem.item })

    // update arrows on selectedItem
    console.log('itemArrows', itemArrows)
    rep.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })

    setArrows(itemArrows)

  }

  function createReferenceItem(commentDraft:string){
    let referenceItem = randomItem()
    const referenceItemChanges = {
      title: commentDraft,
      createdBy: '😸'
    }

    referenceItem.item = {...referenceItem.item, ...referenceItemChanges}

    return referenceItem
  }


  function handleReferenceAdd(commentDraft : string){
    // find if the comment is a valid itemID
    const cleanText = htmlToText(commentDraft)

    // if the comment is a valid itemID, draw arrow to existing item
    if (cleanText.length === 21 && itemIDs.includes(cleanText)) {
      // create an arrow
      const referenceArrow = createArrow('reference', cleanText, commentDraft)

      // create newA
      const newA = {
        arrowID: referenceArrow.id,
        to: referenceArrow.arrow.to,
        from: referenceArrow.arrow.from,
        kind: referenceArrow.arrow.kind,
        backItemID: referenceArrow.arrow.backItemID
      }

      // update selectedItem.arrows

      const itemArrows = []
      const existingItemArrows = item.arrows ? item.arrows : []
      existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
      itemArrows.push(newA)

      // update arrows of the existing referenced item with cleanText
      rep.mutate.updateItemAddSingleArrow({ id: cleanText, arrow: newA })

      // save arrow
      rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })
      //update arrows on selected item
      rep.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })
      // update arrows

      setArrows(itemArrows)

    } else { // create a new item and draw and arrow

      // create referenceItem
      const referenceItem = createReferenceItem(commentDraft)

      // create arrow

      const referenceArrow = createArrow('reference', referenceItem.id, commentDraft)

      // set newA


      const newA = {
        arrowID: referenceArrow.id,
        to: referenceArrow.arrow.to,
        from: referenceArrow.arrow.from,
        kind: referenceArrow.arrow.kind,
        backItemID: referenceArrow.arrow.backItemID
      }

      // push newA to referenceItem.arrows
      const arrows = []
      arrows.push(newA)
      referenceItem.item.arrows = JSON.stringify(arrows)

      //append newA to existing item.arrows array

      const itemArrows = []
      const existingItemArrows = item.arrows ? item.arrows : []
      existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
      itemArrows.push(newA)

      // save arrow

      rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })

      // save new item

      rep.mutate.createItem({ id: referenceItem.id, item: referenceItem.item })

      // update arrows on existing item
      rep.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })

      // set local arrows
      setArrows(itemArrows)
    }

  }

  function handleArrowAdd(id: string) {
    //create arrow
    const referenceArrow = createArrow('reference', id, '')
    //make newA

    const newA = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    // update arrows on existing item (local to this component)
    const itemArrows = []
    const existingItemArrows = item.arrows ? item.arrows : []
    existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
    itemArrows.push(newA)
    //set local arrows
    setArrows(itemArrows)

    // save arrow!
    rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })


    // save arrow to the item of id passed in
    rep.mutate.updateItemAddSingleArrow({ id: id, arrow: newA})

    // add arrow to existing item
    rep.mutate.updateItemAddSingleArrow({ id: itemID, arrow: newA })

  }

  return (
    <>
      {state &&
        <>
          {showCommentFloater &&
            <ArrowFloater
              serializedSelection={serializedSelection}
              rep={rep}
              userInfo={userInfo}
              handleReferenceAdd={handleReferenceAdd}
              handleCommentAdd={handleCommentAdd}
              handleFootnoteAdd={handleFootnoteAdd}
              handleArrowAdd={handleArrowAdd}
            />
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
  view: any,
  arrows: any,
  rep: Replicache<M>,
  itemID: string
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)},
      arrows: arrows,
      rep: rep,
      itemID: itemID
    }),
    // @ts-ignore
    arrows: arrows,
    rep: rep,
    itemID: itemID
  })
}

export default React.memo(ItemEditorContainer)