import React, { useEffect, useRef, useState } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'
import type { Schema } from 'prosemirror-model'
import { schema } from './../editor/config/schema'
import { createParser, createSerializer } from './../editor/config/utils'
import type { EditorView } from 'prosemirror-view'
import { EditorState, Transaction } from 'prosemirror-state'
import { exampleSetup } from './../editor/plugins/index'
import Editor from './editor'

type Props = {
  rep: Replicache<M>
  content: any,
  setValue: (value: string) => void
  type: string
}
function EditorDraftingContainer({ rep, content : doc, setValue, type } : Props) {
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
      viewRef && viewRef.current && viewRef.current.view,
      rep
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [])

  useEffect(() => {
    if (doc === '<p></p>') {
      const state = createStateFromProps(
        doc,
        schema,
        parser,
        viewRef && viewRef.current && viewRef.current.view,
        rep
      )
      setState(state)
      setView(viewRef && viewRef.current && viewRef.current.view)
    }
  }, [doc])

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
          ref={viewRef}
          state={state}
          dispatchTransaction={dispatchTransaction}
          type={type}
        />
      }
    </>
  )
}

const createStateFromProps = (
  doc: string,
  schema: Schema,
  parser: (doc: string) => any,
  view: EditorView,
  rep: Replicache<M>
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)},
      rep: rep,
    }),
  })
}

export default React.memo(EditorDraftingContainer)
