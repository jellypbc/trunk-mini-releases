import React, { useEffect, useRef, useState } from 'react'
import { createParser} from './editor/config/utils'
import { schema } from './editor/config/schema'
import { EditorState, Transaction } from 'prosemirror-state'
import type { Schema } from 'prosemirror-model'
import { exampleSetup } from './editor/plugins/index'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import ArrowEditor from './arrow-editor'


function ArrowEditorContainer({ rep, doc}: {rep:any, doc: any}) {
  const parser = createParser(schema)
  const viewRef = useRef<any>()
  const [view, _] = useState<any>(null)
  const [noteState, setNoteState] = useState<EditorState>()

  useEffect(() => {
    const state = createStateFromProps(
      doc,
      schema,
      parser,
      view,
      [],
      rep
    )
    setNoteState(state)
  }, [])

  const dispatchTransaction = (transaction: Transaction) => {
    console.log({transaction})
  }

  return (
    <>
    {noteState &&
      <ArrowEditor
      ref={viewRef}
      state={noteState}
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
  arrows: any,
  rep: Replicache<M>,
) : EditorState<typeof schema> => {
  return EditorState.create({
    doc: parser(doc),
    schema: schema,
    plugins: exampleSetup({
      schema: schema,
      getView: () => { return (view)},
      arrows: arrows,
      rep: rep
    }),
    // @ts-ignore
    arrows: arrows,
    rep: rep,
  })
}

export default React.memo(ArrowEditorContainer)
