import React, { useEffect, useRef, useState } from 'react'
import { createParser, createSerializer } from './editor/config/utils'
import { schema } from './editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './editor/plugins/index'
import Editor from './editor'

type Props = {
  content: any
  setValue: (value: string) => void
}

function ItemDraftTitleEditor({ content: doc, setValue } : Props) {
  const parser = createParser(schema)
  const serializer = createSerializer(schema)
  const viewRef = useRef<any>()

  const [state, setState] = useState<EditorState | undefined>()
  const [, setView] = useState<EditorView>()

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

  const dispatchTransaction = (tx: Transaction) => {
    const view = viewRef.current.view
    setView(view)

    const newState = view.state.apply(tx)
    view.updateState(newState)

    setState(newState)
    setValue(serializer(newState.doc))
  }

  return (
    <>
      {state &&
        <Editor
          type={'title'}
          ref={viewRef}
          state={state}
          dispatchTransaction={dispatchTransaction}
        />
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

export default React.memo(ItemDraftTitleEditor)