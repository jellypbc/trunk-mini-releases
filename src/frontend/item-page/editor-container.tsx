import React, { useEffect, useRef, useState } from 'react'
import { createParser, createSerializer } from './../editor/config/utils'
import { schema } from './../editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './../editor/plugins/index'
import Editor from './editor'
import type { Replicache } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import EditorArrowCreate from './editor-arrow-create'
import {
  useItemByID,
  useItemIDs,
  useClientEmail
} from '../../datamodel/subscriptions'
import { randomItem } from '../../datamodel/item'
import { randomArrow } from '../../datamodel/arrow'
import { htmlToText } from '../../util/htmlToText'

type Props = {
  doc: string
  type: string
  reflect: Replicache<M>
  itemID: string
  commentArrows: any[]
  showHighlights: boolean
  handleSetSelectedItemID: (itemID: string) => void
}

function EditorContainer({ doc, type, reflect, itemID, commentArrows, showHighlights, handleSetSelectedItemID } : Props) {
  const parser = createParser(schema)
  const serializer = createSerializer(schema)
  const viewRef = useRef<any>()

  const [state, setState] = useState<EditorState | undefined>()
  const [_, setView] = useState<EditorView>()
  const [serializedSelection, setSerializedSelection] = useState<string>()
  const [showArrowFloater, setShowArrowFloater] = useState<boolean>(false)
  const [anonItemIDs, setAnonItemIDs] = useState<string[]>([])
  const [anonArrowIDs, setAnonArrowIDs] = useState<string[]>([])
  const email = useClientEmail(reflect)
  const [showEmptyCommentError, setShowEmptyCommentError] = useState<boolean>(false)

  const item : any = useItemByID(reflect, itemID)
  const itemIDs = useItemIDs(reflect)

  useEffect(() => {
    const anonItemIDs = localStorage.getItem('trunk.anonItemIDs') || `[]`
    setAnonItemIDs(JSON.parse(anonItemIDs))
    const anonArrowIDs = localStorage.getItem('trunk.anonArrowIDs') || `[]`
    setAnonItemIDs(JSON.parse(anonItemIDs))
    setAnonArrowIDs(JSON.parse(anonArrowIDs))

    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view,
      reflect,
      itemID,
      commentArrows || [],
      handleSetSelectedItemID,
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [])

  useEffect(() => {
    localStorage.setItem('trunk.anonItemIDs', JSON.stringify(anonItemIDs))
  }, [anonItemIDs])

  useEffect(() => {
    localStorage.setItem('trunk.anonArrowIDs', JSON.stringify(anonArrowIDs))
  }, [anonArrowIDs])

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view,
      reflect,
      itemID,
      showHighlights && commentArrows || [],
      handleSetSelectedItemID,
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [showHighlights])

  useEffect(() => {
      const state = createStateFromProps(
        doc,
        schema,
        parser,
        viewRef && viewRef.current && viewRef.current.view,
        reflect,
        itemID,
        showHighlights && commentArrows || [],
        handleSetSelectedItemID,
      )
      setState(state)
      setView(viewRef && viewRef.current && viewRef.current.view)
  }, [commentArrows.length])

  const debounce = (func : any, timeout = 300) => {
    let timer : any
    return (...args : any) => {
      clearTimeout(timer)
      // @ts-ignore
      timer = setTimeout(() => {func.apply(this, args)}, timeout)
    }
  }

  const processContentChange = debounce((thing: any) => reflect.mutate.updateItemContent(thing))

  const processTitleChange = debounce((thing: any) => reflect.mutate.updateItemTitle(thing))
  const processWebSourceURLChange = debounce((thing: any) => reflect.mutate.updateItemWebSourceURL(thing))
  const processPublicationDateChange = debounce((thing: any) => reflect.mutate.updateItemPublicationDate(thing))

  const dispatchTransaction = (tx: Transaction | any) => {
    const view = viewRef.current.view
    setView(viewRef.current.view)

    const newState = view.state.apply(tx)
    view.updateState(newState)

    setState(newState)

    if (type === 'title') {
      processTitleChange({id: itemID, title: serializer(newState.doc)})
    } else if (type === 'content') {
      processContentChange({id: itemID, content: serializer(newState.doc)})
    } else if (type === `webSourceURL`) {
      processWebSourceURLChange({id: itemID, webSourceURL: serializer(newState.doc)})
    } else if (type === `publicationDate`) {
      processPublicationDateChange({id: itemID, publicationDate: serializer(newState.doc)})
    }

    setArrowFloater(tx)
  }

  const setArrowFloater = (tx : Transaction | any) => {
    const selection : string = serializer(tx.curSelection.content())
    if (selection) {
      setShowArrowFloater(true)
      setSerializedSelection(selection)
    } else {
      setShowArrowFloater(false)
    }
  }

  function createCommentItem(commentDraft : string){
    let commentItem : any = randomItem()
    const commentItemChanges = {
      content: commentDraft,
      createdBy: email && email !== 'guest' && email || 'Anonymous Aardvark',
      highlight: serializedSelection,
    }

    commentItem.item = {...commentItem.item, ...commentItemChanges}

    return commentItem
  }

  function createArrow(type: string, frontItemID: string, commentDraft : string) {
    let selection = state?.selection
    let commentArrow : any = randomArrow()
    const arrowChanges = {
      createdBy: email && email !== 'guest' && email || 'Anonymous Aardvark',
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

  // function checkEmptyDraft(draft:string) {
  //   if (draft === '<p></p>' || draft === '') {
  //     setShowEmptyCommentError(true)
  //     return
  //   } else {
  //     setShowEmptyCommentError(false)
  //   }
  // }

  function handleCommentAdd(commentDraft: string) {
    // checkEmptyDraft(commentDraft)
    if (commentDraft === '<p></p>' || commentDraft === '') {
      setShowEmptyCommentError(true)
      return
    } else {
      setShowEmptyCommentError(false)
    }

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

    // append arrowID to existing item.arrows array
    const itemArrows = []
    const existingItemArrows = item.arrows ? item.arrows : []
    existingItemArrows && existingItemArrows.map((a: any) => itemArrows.push(a))
    itemArrows.push(newA)

    // save arrow
    reflect.mutate.createArrow({ id: commentArrow.id, arrow: commentArrow.arrow })
    // save commentItem
    reflect.mutate.createItem({ id: commentItem.id, item: commentItem.item })
    // update arrows on selectedItem
    reflect.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })
    // set arrows in this component, so that the editor knows to draw the decoration
    // setArrows(itemArrows)

    if (email === 'guest') {
      //set localStorage items that belong to anon aardvark
      const commentItemID = commentItem.id

      const draftAnonItemIDs : string[] = []
      anonItemIDs && anonItemIDs.map((id: string) => draftAnonItemIDs.push(id))

      draftAnonItemIDs.push(commentItemID)

      setAnonItemIDs(draftAnonItemIDs)
      // set localStorage arrows that belong to anon aardvark

      const arrowItemID = newA.arrowID
      const draftAnonArrowIDs : string[] = []
      anonArrowIDs && anonArrowIDs.map((id: string) => draftAnonArrowIDs.push(id))

      draftAnonArrowIDs.push(arrowItemID)
      setAnonArrowIDs(draftAnonArrowIDs)

    }

    setShowArrowFloater(false)
  }

  function createFootnoteItem(commentDraft: string){
    let footnoteItem : any = randomItem()
    const footnoteItemChanges = {
      content: commentDraft,
      createdBy: email && email !== 'guest' && email || 'Anonymous Aardvark',
      title: footnoteItem.id,
      highlight: serializedSelection
    }

    footnoteItem.item = {...footnoteItem.item, ...footnoteItemChanges}

    return footnoteItem
  }

  function handleFootnoteAdd(commentDraft: string) {
    // checkEmptyDraft(commentDraft)
    if (commentDraft === '<p></p>' || commentDraft === '') {
      setShowEmptyCommentError(true)
      return
    } else {
      setShowEmptyCommentError(false)
    }
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

    reflect.mutate.createArrow({ id: footnoteArrow.id, arrow: footnoteArrow.arrow })

    // save footnoteItem
    reflect.mutate.createItem({ id: footnoteItem.id, item: footnoteItem.item })

    // update arrows on selectedItem
    console.log('itemArrows', itemArrows)
    reflect.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })

    // setArrows(itemArrows)
    setShowArrowFloater(false)


  }

  function createReferenceItem(commentDraft:string){
    let referenceItem = randomItem()
    const referenceItemChanges = {
      title: commentDraft,
      createdBy: email && email !== 'guest' && email || 'Anonymous Aardvark',
    }

    referenceItem.item = {...referenceItem.item, ...referenceItemChanges}

    return referenceItem
  }


  function handleReferenceAdd(commentDraft : string){
    if (commentDraft === '<p></p>' || commentDraft === '') {
      setShowEmptyCommentError(true)
      return
    } else {
      setShowEmptyCommentError(false)
    }
    // checkEmptyDraft(commentDraft)
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
      reflect.mutate.updateItemAddSingleArrow({ id: cleanText, arrow: newA })

      // save arrow
      reflect.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })
      //update arrows on selected item
      reflect.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })
      // update arrows

      // setArrows(itemArrows)

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

      reflect.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })

      // save new item

      reflect.mutate.createItem({ id: referenceItem.id, item: referenceItem.item })

      // update arrows on existing item
      reflect.mutate.updateItemArrows({ id: itemID, arrows: itemArrows })

      // we don't need this anymore because we're subscribing to arrows in the component above this one... and it should autoupdate itself
      // // set local arrows
      // setArrows(itemArrows)
      setShowArrowFloater(false)
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
    // //set local arrows
    // setArrows(itemArrows)

    // save arrow!
    reflect.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })


    // save arrow to the item of id passed in
    reflect.mutate.updateItemAddSingleArrow({ id: id, arrow: newA})

    // add arrow to existing item
    reflect.mutate.updateItemAddSingleArrow({ id: itemID, arrow: newA })
    setShowArrowFloater(false)
  }

  return (
    <>
      {/* {type === 'content' &&
        <div style={{cursor: 'pointer', padding: '1rem 0'}} onClick={() => setShowArrows(!showArrows)}>
          →
        </div>
      } */}
      {state &&
        <>
          {showArrowFloater && type === 'content' &&
            <EditorArrowCreate
              serializedSelection={serializedSelection}
              reflect={reflect}
              handleReferenceAdd={handleReferenceAdd}
              handleCommentAdd={handleCommentAdd}
              handleFootnoteAdd={handleFootnoteAdd}
              handleArrowAdd={handleArrowAdd}
              showEmptyCommentError={showEmptyCommentError}
              handleSetShowEmptyCommentError={setShowEmptyCommentError}
            />
          }
          <Editor
            type={type}
            ref={viewRef}
            state={state}
            dispatchTransaction={dispatchTransaction}
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
  reflect: Replicache<M>,
  itemID: string,
  arrows: any,
  handleSetSelectedItemID: (id: string) => void,
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)},
      reflect: reflect,
      itemID: itemID,
      arrows: arrows,
      handleSetSelectedItemID: handleSetSelectedItemID,
    }),
    // @ts-ignore
    reflect: reflect,
    itemID: itemID,
    arrows: arrows,
    handleSetSelectedItemID: handleSetSelectedItemID,
  })
}

export default React.memo(EditorContainer)