import { DOMParser, DOMSerializer } from 'prosemirror-model'
import { Replicache, MutatorDefs } from 'replicache'
import { EditorState } from 'prosemirror-state'
import { Schema } from 'prosemirror-model'
import { sendableSteps } from "./collab"
import { commentPlugin } from "../plugins/comments"

export const getTimestamp = (timestampName: any, post: any) =>
  (post &&
    post.data &&
    post.data.attributes &&
    post.data.attributes[timestampName]) ||
  null

// determine if post has been saved to the server
// returns `false` if the post was already saved (created)
export const getIsNewPost = (post: any) => !getTimestamp('created_at', post)

export const createParser = (schema: any) => {
  const parser = DOMParser.fromSchema(schema)

  return (content: string) => {
    const container = document.createElement('article')
    container.innerHTML = content

    return parser.parse(container)
  }
}

// TODO: fix me so im not just making weird empty DOM things
export const createSerializer = (schema: any) => {
  const serializer = DOMSerializer.fromSchema(schema)

  return (doc: any) => {
    const container = document.createElement('article')
    container.appendChild(serializer.serializeFragment(doc.content))

    return container.innerHTML
  }
}

export async function getClient(rep: Replicache<MutatorDefs>) {
  return await Promise.resolve(rep.clientID)
}


export function compare(a: any, b: any) {
  const a_version = a[1].version
  const b_version = b[1].version
  return b_version - a_version
}

export function sendable(editState: EditorState) {
  let steps = sendableSteps(editState)
  let comments = commentPlugin.getState(editState).unsentEvents()
  if (steps || comments.length) return {steps, comments}
}
