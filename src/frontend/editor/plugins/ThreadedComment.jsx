import ReactDOM from 'react-dom'
import React, { useState } from 'react'

import styled from "styled-components"
// import classnames from 'classnames'

function ThreadedComment(props) {
  const { comment, dispatch, state, className, showActions, currentUser } = props
  const [isShowingReply, setIsShowingReply] = useState(false)

  const handleDelete = () => {
    dispatch(
      state.tr.setMeta(commentPlugin, { type: 'deleteComment', comment })
    )
  }

  const handleReply = () => {
    setIsShowingReply(true)
  }

  const handleReplySubmit = ({ text = 'Comment...', highlightedText = '' }) => {
    const replyTo = commentPluginKey.getState(state).findComment(comment.id)
    const user = buildUser()

    dispatch(
      state.tr.setMeta(commentPlugin, {
        type: 'newComment',
        from: replyTo.from,
        to: replyTo.to,
        comment: new Comment(randomID(), text, user, highlightedText),
      })
    )
  }

  const handleReplyCancel = () => {
    setIsShowingReply(false)
  }

  return (
    <div
      className={'commentShow ' + className}
      id={'comment-' + comment.id}
    >
      {comment.user && (
        <div className="j-commentUser">
          <a
            className="name-card"
            href={comment.user.username ? '/@' + comment.user.username : '#'}
            target="blank"
          >
            <img
              className="avatar"
              src={comment.user.avatar}
              alt={comment.user.username}
            />
            {comment.user.username}
          </a>
        </div>
      )}
      <p className="j-commentText">{comment.text}</p>
      {!isShowingReply && (
        <div>
          {showActions.reply && (
            <button
              className="btn btn-plain btn-sm j-commentReply px-0 mr-2"
              onClick={handleReply}
            >
              Reply
            </button>
          )}
          {showActions.delete &&
            currentUser &&
            currentUser.currentUser &&
            currentUser.currentUser.id == comment.user.id && (
              <button
                className="btn btn-plain btn-sm j-commentDelete px-0 mr-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
        </div>
      )}
      {isShowingReply && (
        <div>
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={handleReplyCancel}
            className="j-commentReplyForm border-top mt-3 pt-1 animated fadeIn"
          />
        </div>
      )}
    </div>
  )
}

export default ThreadedComment
