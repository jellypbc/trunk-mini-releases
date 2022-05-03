import React, { useState } from 'react'
import { useItemByID, getArrowsByIDs, useClientEmail } from '../../datamodel/subscriptions'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import EditorDraftingContainer from './editor-drafting-container'

export default function ArrowsComment({ rep, itemID, arrows, handleSetSelectedItemID } : any) {
  const email = useClientEmail(rep)
  const comments = arrows.filter((a: any) => a.kind === 'comment'
  && a.backItemID === itemID) || []
  const commentArrowIDs = comments.map((a: any) => a.arrowID)
  const uniqueCommentArrows = [...new Set(commentArrowIDs)]
  return (
    commentArrowIDs && email &&
    <div className={styles.section}>
      <CommentItemContainer
        arrowIDs={uniqueCommentArrows}
        rep={rep}
        itemID={itemID}
        handleSetSelectedItemID={handleSetSelectedItemID}
        email={email}
      />
    </div>
  )
}

import { randomItem } from '../../datamodel/item'
import { randomArrow } from '../../datamodel/arrow'

function CommentItemContainer({ arrowIDs, rep, itemID, handleSetSelectedItemID, email } : any){
  const arrows = getArrowsByIDs(rep, arrowIDs)
  const [showCommentEditor, setShowCommentEditor] = useState<boolean>(false)

  const [commentDraft, setCommentDraft] = useState<string>('<p></p>')
  const [showThing, setShowThing] = useState<boolean>(false)

  function submitComment(){

    let newItem = randomItem()
    let newArrow = randomArrow()

    //create randomitem
    //create randomarrow

    //set arrow data
    const arrowChanges = {
      backItemID: itemID,
      createdBy: email,
      frontItemID: newItem.id,
      kind: "comment",
      parentItemID: itemID
    }

    const arrow = {...newArrow.arrow, ...arrowChanges}

    const miniArrow = {
      arrowID: newArrow.id,
      to: 0,
      from: 0,
      kind: arrow.kind,
      backItemID: arrow.backItemID
    }

    // {arrowID, to, from, kind, backItemID}

    const newItemArrows = []
    newItemArrows.push(miniArrow)



    //set item data
    const itemChanges = {
      content: commentDraft,
      createdBy: email,
      arrows: JSON.stringify(newItemArrows),
    }


    const updatedItem = {...newItem.item, ...itemChanges}


    // apply arrow to new item
    // apply arrow to existing item

    // save new arro using rep
    rep.mutate.createArrow({ id: newArrow.id, arrow: arrow })

    // save new item using rep

    rep.mutate.createItem({id: newItem.id, item: updatedItem})

    // update existing itme with rep
    rep.mutate.updateItemAddSingleArrow({ id: itemID, arrow: miniArrow })
  }
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.count}>{arrowIDs.length}</span>
        Reactions and responses
      </div>
      {arrows && arrows.map((a: any) => {
        return (
          <Arrow
            key={`commment-${a.id}`}
            arrow={a}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
      {!showCommentEditor &&
            <div onClick={() => setShowCommentEditor(true)}>
            Add a comment
          </div>
      }
      {showCommentEditor &&
        <div>
          {!showThing ?
            <textarea
              placeholder="What's on your mind?"
              onClick={() => setShowThing(true)}
            />
            :
            <>
              <EditorDraftingContainer
                rep={rep}
                content={commentDraft}
                setValue={setCommentDraft}
                type={'comment'}
              />
              <div onClick={() => setShowCommentEditor(false)}>Cancel</div>
              <button onClick={() => submitComment()}>submit</button>
            </>
          }
        </div>
      }
    </>
  )
}


function Arrow({rep, arrow, handleSetSelectedItemID}: any){
  const item = useItemByID(rep, arrow.frontItemID)
  return (
    <div
      className={styles.commentItem}
      onClick={() => handleSetSelectedItemID(arrow.frontItemID)}
    >
      {item &&
        <>
          <div className={styles.highlight}>{htmlToText(item.highlight) || 'no highlight'}</div>
          <div>{htmlToText(item.content) || 'nothing here'}</div>
        </>
      }
    </div>
  )
}