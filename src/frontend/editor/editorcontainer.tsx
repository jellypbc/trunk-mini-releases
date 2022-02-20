import dynamic from 'next/dynamic';

import React, { useEffect, useRef, useState } from "react"
import { EditorView } from "prosemirror-view"
import { EditorState, Transaction } from "prosemirror-state"
import { Schema, DOMParser, DOMSerializer } from "prosemirror-model"
import { Step } from "prosemirror-transform"

import Editor from "./editor"
import { exampleSetup } from "./plugins/index"
import { schema } from "./config/schema"
import { collab, sendableSteps, getVersion, receiveTransaction } from "./config/collab"
import { createParser, createSerializer, getClient, compare, sendable, dispatchAction } from "./config/utils"
import { logger } from "./../lib/logger"
import { commentPlugin, commentUI } from "./plugins/comments"

interface EditorContainerProps {
  note: INote,
  rep: Replicache<MutatorDefs>,
  client: string
}

function EditorContainer(props: EditorContainerProps) {
  const { note, rep, client } = props
  const viewRef = useRef<any>()
  const parser = createParser(schema)
  const serialize = createSerializer(schema)
  const [currentClientId, setCurrentClientId] = useState<string | null>("")
  const [noteState, setNoteState] = useState<EditorState>()

  // first load
  useEffect(() => {
    ( async () => {
      const user : (string | null) = new URLSearchParams(window.location.search).get("user") || client
      if (!currentClientId) setCurrentClientId(user)
      const state = createStateFromProps(
        note.content,
        note.comments,
        schema,
        parser,
        parseInt(note.version),
        parseInt(note.comments_version),
        user
      )
      setNoteState(state)
      return () => {
        viewRef.current.view.destroy()
      }
    })()
  },

  [])

  interface DispatchAction {
    type: string,
    transaction?: Transaction,
  }

  function wrappedDispatch(action: DispatchAction) {
    const view = viewRef.current.view
    const newState = view.state.apply(action.transaction)

    if (action.type == "transaction") {

      let anySendable
      // console.log("sendable", sendable(newState))
      if (anySendable = sendable(newState)) {
        // console.log("%c[dispatchingTransaction]", "background: lightyellow", anySendable)

        const version = getVersion(newState)
        let notePayload = {
          id: note.id,
          sender: currentClientId,
          version: version,
          content: serialize(newState.doc),
          comments: JSON.stringify( anySendable.comments ),
          comments_version: note.comments_version
        }
        console.log("%c <postNote>", 'background: orange; color: white', notePayload)
        rep && rep.mutate.updateNote(notePayload)


        let type, sendableStepData, sendableVersion;
        if (anySendable.steps) {
          type = "STEPS"

          sendableStepData = JSON.stringify(
            anySendable.steps.steps.map((step: any) => step.toJSON())
          )
          sendableVersion = anySendable.steps.version

        } else if (anySendable.comments) {
          type = "COMMENTS"

          sendableStepData = JSON.stringify(anySendable.comments)
          sendableVersion = commentPlugin.getState(newState).version

          console.log(
            "%c queue type=comment payload", "background: lightblue",
            sendableVersion
          )
        }

        // this createQueue is running after processing steps when it shouldnt

        let queuePayload = {
          id: Math.random().toString(32).substr(2),
          noteId: note.id,
          content: sendableStepData,
          client: currentClientId,
          version: sendableVersion,
          deleted_at: "",
          confirmed_at: "{}",
          action_type: type
        }
        // console.log("%c <createQueue>", 'background: orange; color: white', queuePayload)
        // rep && rep.mutate.createQueue(queuePayload)
      }

      view.updateState(newState)

      setNoteState(newState)

    } else if (action.type == "receive") {
      view.updateState(newState)

      console.log("receiving a transaction!", action.transaction)

      // side effects here
        // these need to be incremented and then saved to cache
        // versionSteps
        // commentSteps

      const payload = {
        version: action.version,
        content: serialize(view.state.doc),
        comments: JSON.stringify(commentPlugin.getState(view.state).unsentEvents()),
        comments_version: action.comments_version,
        sender: currentClientId,
        id: note.id
      }
      console.log("%c processSteps <postNote>", 'background: black; color: white', payload)
      rep && rep.mutate.updateNote(payload)


      setNoteState(newState)
    }
  }

  return (
    <div>
      {noteState &&
        <div className="row gx-1 my-3">
          <div className="row editor mx-1">
            <Editor
              ref={viewRef}
              state={noteState}
              dispatchTransaction={wrappedDispatch}
            />
          </div>
        </div>
      }

    </div>
  )
}

const createStateFromProps = (
  doc: any,
  comments: [],
  schema: Schema,
  parser: any,
  version: number,
  commentsVersion: number,
  currentClientId: string | null,
) : EditorState<typeof schema> => {

  let initCommentState = { comments: [], commentsVersion: commentsVersion || 0 }

  if (comments) {
    const commentState = JSON.parse(comments)
    if (commentState.hasOwnProperty("comments") ) {
      initCommentState = {
        comments: comments,
        commentsVersion: commentsVersion
      }
    }
  }

  return EditorState.create({
    doc: parser(doc),
    comments: initCommentState,
    schema: schema,
    plugins: exampleSetup({schema: schema}).concat([
      collab({
        version: version,
        clientID: currentClientId
      }),
      commentPlugin,
      commentUI(transaction => this.dispatch({type: "transaction", transaction}))
    ])
  })
}

export default React.memo(EditorContainer)
