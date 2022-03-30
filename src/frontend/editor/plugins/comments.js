import ReactDOM from 'react-dom'
import React, { useState } from 'react'

import { Plugin, PluginKey } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

import ThreadedComment from "./ThreadedComment"


export const commentPluginKey = new PluginKey('comments')

class Comment {
  constructor(text, id) {
    this.id = id
    this.text = text
  }
}

function deco(from, to, comment) {
  return Decoration.inline(from, to, { class: 'comment' }, { comment })
}

class CommentState {
  constructor(version, decorations, unsent) {
    this.version = version
    this.decorations = decorations
    this.unsent = unsent
  }

  mapThrough(mapping) {
    for (let i = this.comments.length - 1; i >= 0; i--) {
      let comment = this.comments[i]
      let from = mapping.map(comment.from, 1), to = mapping.map(comment.to, -1)
      if (from >= to) {
        this.comments.splice(i, 1)
      } else {
        comment.from = from
        comment.to = to
      }
    }
  }

  findComment(id) {
    let current = this.decorations.find()
    for (let i = 0; i < current.length; i++)
      if (current[i].spec.comment.id == id) return current[i]
  }
  commentsAt(pos) {
    return this.decorations.find(pos, pos)
  }

  apply(tr) {
    let action = tr.getMeta(commentPlugin), actionType = action && action.type
    if (!action && !tr.docChanged) return this
    let base = this

    console.log("%c [comments plugin] apply:", "background: violet", base, action)

    if (actionType == "receive") base = base.receive(action, tr.doc)

    let decos = base.decorations, unsent = base.unsent
    decos = decos.map(tr.mapping, tr.doc)

    if (actionType == "newComment") {
      decos = decos.add(tr.doc, [deco(action.from, action.to, action.comment)])
      unsent = unsent.concat(action)

      // increment version by 1

    } else if (actionType == "deleteComment") {
      decos = decos.remove([this.findComment(action.comment.id)])
      unsent = unsent.concat(action)

      // increment version by 1

    }

    return new CommentState(base.version, decos, unsent)
  }

  unsentEvents() {
    let result = []
    for (let i = 0; i < this.unsent.length; i++) {
      let action = this.unsent[i]
      if (action.type == "newComment") {
        let found = this.findComment(action.comment.id)
        if (found) result.push({type: "create", id: action.comment.id,
                                from: found.from, to: found.to,
                                text: action.comment.text})
      } else {
        result.push({type: "delete", id: action.comment.id})
      }
    }
    return result
  }

  receive({version, events, sent}, doc) {
    let set = this.decorations
    console.log("%c[comments plugin] receiving", "background: violet", version, events, sent, "set:", set)
    for (let i = 0; i < events.length; i++) {
      let event = events[i]
      if (event.type == "delete") {
        let found = this.findComment(event.id)
        if (found) set = set.remove([found])
      } else { // "create"
        if (!this.findComment(event.id))
          set = set.add(doc, [deco(event.from, event.to, new Comment(event.text, event.id))])
      }

      // increment version by 1

    }
    return new CommentState(version, set, this.unsent.slice(sent))
  }

  static init(config) {
    let decos = config.comments.comments.map((c) =>
      deco(c.from, c.to, new Comment(c.text, c.id, c.user, c.highlightedText))
    )

    const decorationSet = DecorationSet.create(config.doc, decos)

    const state = new CommentState(
      config.comments.commentsVersion,
      decorationSet,
      []
    )
    return state
  }

}

export const commentPlugin = new Plugin({
  state: {
    init: CommentState.init,
    apply(tr, prev) { return prev.apply(tr) }
  },
  props: {
    decorations(state) { return this.getState(state).decorations }
  }
})

function randomID() {
  return Math.floor(Math.random() * 0xffffffff)
}


// =====================================================================================
// Command for adding an annotation

export const addComment = function(state, dispatch) {
  let sel = state.selection
  if (sel.empty) return false
  if (dispatch) {
    let text = prompt("Annotation text", "")
    if (text)
      dispatch(state.tr.setMeta(commentPlugin,
        {
          type: "newComment",
          from: sel.from,
          to: sel.to,
          comment: new Comment(text, randomID())
        })
      )
  }
  return true
}

export const annotationIcon = {
  width: 1024, height: 1024,
  path: "M512 219q-116 0-218 39t-161 107-59 145q0 64 40 122t115 100l49 28-15 54q-13 52-40 98 86-36 157-97l24-21 32 3q39 4 74 4 116 0 218-39t161-107 59-145-59-145-161-107-218-39zM1024 512q0 99-68 183t-186 133-257 48q-40 0-82-4-113 100-262 138-28 8-65 12h-2q-8 0-15-6t-9-15v-0q-1-2-0-6t1-5 2-5l3-5t4-4 4-5q4-4 17-19t19-21 17-22 18-29 15-33 14-43q-89-50-141-125t-51-160q0-99 68-183t186-133 257-48 257 48 186 133 68 183z"
}

// =====================================================================================
// Comment UI

export const commentUI = function(dispatch) {
  return new Plugin({
    props: {
      decorations(state) {
        return commentTooltip(state, dispatch)
      }
    }
  })
}

function commentTooltip(state, dispatch) {
  let sel = state.selection
  if (!sel.empty) return null
  let comments = commentPlugin.getState(state).commentsAt(sel.from)
  if (!comments.length) return null
  return DecorationSet.create(state.doc, [
    Decoration.widget(
      sel.from,
      renderComments(comments, dispatch, state)
    )]
  )
}

function renderComments(comments, dispatch, state) {
  const node = document.createElement('div')
  node.className = 'tooltip-wrapper animated fadeIn'
  ReactDOM.render(
    <ul className="commentList">
      {comments.map((c, index) => {
        const isLast = index === comments.length - 1
        return (
          <p key={index}>
            Comment:
            {c.type.spec.comment.text}
          </p>
        )
      })}
    </ul>,
    node
  )
  return node
}

function renderComment(comment, dispatch, state) {
  let btn = crel("button", {class: "commentDelete", title: "Delete annotation"}, "×")
  btn.addEventListener("click", () =>
    dispatch(state.tr.setMeta(commentPlugin, {type: "deleteComment", comment}))
  )
  return crel("li", {class: "commentText"}, comment.text, btn)
}
