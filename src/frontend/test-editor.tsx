import React, { useEffect, useRef, useState } from 'react'
import { createParser, createSerializer } from './editor/config/utils'
import { schema } from './editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './editor/plugins/index'
import EditorEditor from './editor-editor'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'


type Props = {
  doc: string
  type: string
  rep: Replicache<M>
  itemID: string
}

function TestEditor({ doc, type, rep, itemID } : Props) {
  const parser = createParser(schema)
  const serializer = createSerializer(schema)
  const viewRef = useRef<any>()

  const [state, setState] = useState<EditorState | undefined>()
  const [_, setView] = useState<EditorView>()

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      viewRef && viewRef.current && viewRef.current.view,
      rep,
      itemID
    )
    setState(state)
    setView(viewRef && viewRef.current && viewRef.current.view)
  }, [])

  const dispatchTransaction = (tx: Transaction | any) => {
    const view = viewRef.current.view
    setView(view)

    const newState = view.state.apply(tx)
    view.updateState(newState)

    setState(newState)

    if (type === 'title') {
      rep.mutate.updateItemTitle({id: itemID, title: serializer(newState.doc)})
    } else if (type === 'content') {
      rep.mutate.updateItemContent({id: itemID, content: serializer(newState.doc)})
    }
  }

  return (
    <>
      {state &&
        <EditorEditor
          type={type}
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
  parser: any,
  view: any,
  rep: Replicache<M>,
  itemID: string
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)},
      rep: rep,
      itemID: itemID
    }),
    // @ts-ignore
    rep: rep,
    itemID: itemID
  })
}

export default React.memo(TestEditor)