import React, { useState } from 'react'
import styles from './editor-arrow-display.module.css'
import { htmlToText } from '../../util/htmlToText'
import EditorContainer from './editor-container'
import { useItemByID, useClientEmail, useArrowsByIDs } from '../../datamodel/subscriptions'
import { randomItem } from '../../datamodel/item'
import { randomArrow } from '../../datamodel/arrow'
import type { Replicache } from 'replicache'
import type { M } from '../../datamodel/mutators'

type EditorArrowDisplayProps = {
  rep: Replicache<M>
  arrow: any
}

export default function EditorArrowDisplay({ rep, arrow }: EditorArrowDisplayProps) {
  const email = useClientEmail(rep)
  // const { id : arrowID } = arrow

  // const [showDeleteOptions, setShowDeleteOptions] = useState<boolean>(false)

  // function deleteArrowOnly() {
  //   rep.mutate.updateItemArrowsDeleteArrow({ itemID: arrow.frontItemID, arrowID: arrowID })
  //   rep.mutate.updateItemArrowsDeleteArrow({ itemID: arrow.backItemID, arrowID: arrowID })
  //   rep.mutate.deleteArrow(arrowID)
  // }

  // function deleteArrowAndFrontItem(){
  //   rep.mutate.updateItemArrowsDeleteArrow({ itemID: arrow.frontItemID, arrowID: arrowID })
  //   rep.mutate.updateItemArrowsDeleteArrow({ itemID: arrow.backItemID, arrowID: arrowID })
  //   rep.mutate.deleteArrow(arrowID)
  //   rep.mutate.deleteItem(arrow.frontItemID)
  // }

  if (arrow.kind === 'comment' || arrow.kind === 'footnote') {
    return (
      <CommentDisplay
        rep={rep}
        itemID={arrow.frontItemID}
        arrow={arrow}
        kind={arrow.kind}
        email={email}
      />
    )
  }

  return (
    email &&
    <div className={styles.container}>
      <div className={styles.sidebar}></div>
      <div className={styles.main}></div>
      <div className={styles.gutter}>
        <div className={styles.gutterContainer}>
          {/* {showDeleteOptions ?
            <div className={styles.deleteOptions}>
              <div
                className={styles.deleteOption}
                onClick={() => deleteArrowOnly()}
              >Delete arrow</div>
              <div
                className={styles.deleteOption}
                onClick={() => deleteArrowAndFrontItem()}
              >
                Delete arrow and item
              </div>
              <div
                className={styles.deleteOption}
                onClick={() => setShowDeleteOptions(false)}
              >&times;</div>
            </div>
            :
            <div
              className={styles.toggleDeleteOptions}
              onClick={() => setShowDeleteOptions(true)}
              >...</div>
          } */}
          <div className={styles.highlight}>
            {htmlToText(arrow.highlight)}
          </div>
          {email &&
            <FrontItemStuff
              rep={rep}
              itemID={arrow.frontItemID}
            />
          }
        </div>
      </div>
    </div>
  )
}


import EditorDraftingContainer from './editor-drafting-container'

function CommentDisplay({
  rep,
  itemID,
  arrow,
  // kind,
  // email
} : any) {
  const item = useItemByID(rep, itemID)
  // const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  // const [commentDraft, setCommentDraft] = useState<string>('<p></p>')

  // function submitComment(){

  //   let newItem = randomItem()
  //   let newArrow = randomArrow()

  //   //create randomitem
  //   //create randomarrow

  //   //set arrow data
  //   const arrowChanges = {
  //     backItemID: itemID,
  //     createdBy: email,
  //     frontItemID: newItem.id,
  //     kind: "comment",
  //     parentItemID: itemID
  //   }

  //   const arrow = {...newArrow.arrow, ...arrowChanges}

  //   const miniArrow = {
  //     arrowID: newArrow.id,
  //     to: 0,
  //     from: 0,
  //     kind: arrow.kind,
  //     backItemID: arrow.backItemID
  //   }

  //   // {arrowID, to, from, kind, backItemID}

  //   const newItemArrows = []
  //   newItemArrows.push(miniArrow)



  //   //set item data
  //   const itemChanges = {
  //     content: commentDraft,
  //     createdBy: email,
  //     arrows: JSON.stringify(newItemArrows),
  //   }


  //   const updatedItem = {...newItem.item, ...itemChanges}


  //   // apply arrow to new item
  //   // apply arrow to existing item

  //   // save new arro using rep
  //   // console.log('new arrow: { id: newArrow.id, arrow: arrow }', { id: newArrow.id, arrow: arrow })
  //   rep.mutate.createArrow({ id: newArrow.id, arrow: arrow })

  //   // save new item using rep
  //   // console.log('new item: {id: newItem.id, item: updatedItem}', {id: newItem.id, item: updatedItem})
  //   rep.mutate.createItem({id: newItem.id, item: updatedItem})

  //   // update existing itme with rep
  //   // console.log('{ id: itemID, arrow: miniArrow }', { id: itemID, arrow: miniArrow })
  //   rep.mutate.updateItemAddSingleArrow({ id: itemID, arrow: miniArrow })
  // }

  return (
    item &&
    <div className={styles.container}>
      <div className={styles.sidebar}></div>
      <div className={styles.main}></div>
      <div className={styles.gutter}>
        <div className={styles.gutterContainer}>
          <div className={styles.highlight}>
            {htmlToText(arrow.highlight)}
          </div>
          <div className={styles.content}>
            <EditorContainer
              doc={item.content}
              type={'arrowContent'}
              rep={rep}
              itemID={itemID}
              commentArrows={[]}
              showHighlights={false}
            />
            {/* {item.arrows.length === 1 ?
            <ReplyForm
                itemID={itemID}
                rep={rep}
                email={email}
            />
            :
              <CommentReply
                arrows={item.arrows}
                rep={rep}
                itemID={itemID}
                email={email}
              />
            } */}

          </div>
          <div className={styles.arrowMetadata}>
            <div>3 notes</div>
            <div>3d ago</div>
            <div>cindywu</div>
          </div>
        </div>
      </div>

      {/*
      <div className={styles.content}>
        <EditorContainer
          doc={item.content}
          type={'content'}
          rep={rep}
          itemID={itemID}
          commentArrows={[]}
          showHighlights={false}
        />
      </div>
      {item.arrows.length === 1 ?
       <ReplyForm
          itemID={itemID}
          rep={rep}
          email={email}
       />
      :
        <CommentReply
          arrows={item.arrows}
          rep={rep}
          itemID={itemID}
          email={email}
        />
      }
      {kind === 'comment' && !showReplyForm && item.arrows.length < 1 &&
        <button onClick={() => setShowReplyForm(true)}>Reply</button>
      }
      {showReplyForm &&
        <div className={styles.replyForm}>
          <>
              <EditorDraftingContainer
                rep={rep}
                content={commentDraft}
                setValue={setCommentDraft}
                type={'comment'}
              />
            </>
          <div className={styles.actionContainer}>
            <div onClick={() => setShowReplyForm(false)}>Cancel</div>
            <div
              className={styles.submitButton}
              onClick={() => submitComment()}
            >Submit</div>
          </div>
        </div>
      }
      <div className={styles.arrowFloaterFooter}>
        <div>3 notes</div>
        <div>3d ago</div>
        <div>cindywu</div>
      </div> */}
    </div>
  )
}

function CommentReply({arrows, rep, itemID, email}:any) {
  const arrowIDs = arrows.map((a: any) => a.arrowID)
  const fullArrows = useArrowsByIDs(rep, arrowIDs)
  return (
    <>
      {fullArrows &&
      <OtherThing
        fullArrows={fullArrows}
        rep={rep}
        itemID={itemID}
        email={email}
      />}
    </>
  )
}

function OtherThing({fullArrows, rep, itemID, email}:any){
  const comments = fullArrows.filter((a: any) => a.kind === 'comment'
  && a.backItemID === itemID && a.parentItemID === itemID) || []

  return (
    <>
    {comments.map((fullCommentArrow: any) => {
      return (
        <CommentArrows
          key={`comment-arrow-${fullCommentArrow.frontItemID}`}
          itemID={fullCommentArrow.frontItemID}
          rep={rep}
          email={email}
        />
      )
    })}
    </>
  )
}

function CommentArrows({itemID, rep, email} : any){
  const item = useItemByID(rep, itemID)

  return(
    item &&
      <div>
      <div>
        {item.createdBy}: {htmlToText(item.content)}
      </div>
      {item.arrows.length < 2 ?
        <ReplyForm
          itemID={itemID}
          rep={rep}
          email={email}
        />
        :
        <CommentReply
          arrows={item.arrows}
          rep={rep}
          itemID={itemID}
          email={email}
        />
      }
    </div>
  )
}

function ReplyForm({ itemID, rep, email} : any){
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [commentDraft, setCommentDraft] = useState<string>('<p></p>')

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
    // console.log('new arrow: { id: newArrow.id, arrow: arrow }', { id: newArrow.id, arrow: arrow })
    rep.mutate.createArrow({ id: newArrow.id, arrow: arrow })

    // save new item using rep
    // console.log('new item: {id: newItem.id, item: updatedItem}', {id: newItem.id, item: updatedItem})
    rep.mutate.createItem({id: newItem.id, item: updatedItem})

    // update existing itme with rep
    // console.log('{ id: itemID, arrow: miniArrow }', { id: itemID, arrow: miniArrow })
    rep.mutate.updateItemAddSingleArrow({ id: itemID, arrow: miniArrow })
  }
  return (
    <>
    {!showReplyForm && <div onClick={() => setShowReplyForm(true)}>you can reply</div> }
    {showReplyForm &&
      <div className={styles.replyForm}>
        <>
            <EditorDraftingContainer
              rep={rep}
              content={commentDraft}
              setValue={setCommentDraft}
              type={'comment'}
            />
          </>
        <div className={styles.actionContainer}>
          <div onClick={() => setShowReplyForm(false)}>Cancel</div>
          <div
            className={styles.submitButton}
            onClick={() => submitComment()}
          >Submit</div>
        </div>
      </div>
    }
    </>

  )
}
function FrontItemStuff({rep, itemID }:{rep: any, itemID: string}) {
  const item = useItemByID(rep, itemID)

  return (
    item &&
    <>
      <div className={styles.title}>
        <EditorContainer
          doc={item.title}
          type={'arrowTitle'}
          rep={rep}
          itemID={itemID}
          commentArrows={[]}
          showHighlights={false}
        />
      </div>
      <div className={styles.content}>
        <EditorContainer
          doc={item.content}
          type={'arrowContent'}
          rep={rep}
          itemID={itemID}
          commentArrows={[]}
          showHighlights={false}
        />
      </div>
      <div className={styles.arrowMetadata}>
        <div>3 notes</div>
        <div>3d ago</div>
        <div>cindywu</div>
      </div>
    </>
  )
}