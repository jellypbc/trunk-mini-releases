import React, { useState } from 'react'
import styles from './dashboard-body.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { htmlToText } from '../util/htmlToText'
import { useArrowByID, useItemByID } from '../datamodel/subscriptions'
import TestEditor from './test-editor'

type Props = {
  rep: Replicache<M>
  items: any[]
  handleSetSelectedItemID: (itemID: string) => void
}

export default function DashboardBody({ rep, items, handleSetSelectedItemID } : Props) {
  const [showIndex, setShowIndex] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <div className={styles.view}>
        {!showIndex ?
          <ActivityView
            setShowIndex={setShowIndex}
            items={items}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        :
          <IndexView
            setShowIndex={setShowIndex}
            items={items}
          />
        }
      </div>
    </div>
  )
}

function IndexView({ setShowIndex, items } : any) {
  return (
    <div className={styles.indexContainer}>
      <div className={styles.indexNav}>
        <div
          className={styles.activityView}
          onClick={() => setShowIndex(false)}
        >
          Back
        </div>
        <div className={styles.indexTitle}>
          All items
        </div>
        <div className={styles.indexSort}>
          <div>Sort results by:</div>
          <div>Title</div>
          <div>Most recent</div>
        </div>
      </div>
      <div className={styles.itemList}>
        {items.map((item : any) => {
          return (
            <div className={styles.indexItem}>
              <div className={styles.indexItemTitle}>
                {item.title && htmlToText(item.title)}
              </div>
              <div className={styles.indexItemAuthor}>
                Author
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


function ActivityView({ setShowIndex, rep, items, handleSetSelectedItemID } : any) {
  const [itemsShown, setItemsShown] = useState<number>(10)

  function addTenItems(){
    setItemsShown(itemsShown + 10)
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedOptions}>
        <div className={styles.emptyOptions}>
        </div>
        <div className={styles.optionActions}>
          <div>
            <button className={'button button-secondary'}>
              Add new item
            </button>
          </div>
          <div
            className={styles.viewAll}
            onClick={() => setShowIndex(true)}
          >
            View all items
          </div>
        </div>
      </div>
        <div className={styles.feed}>
          { items.slice(0, itemsShown).map((item: any) => {
            return (
              <div key={item.id}>
                <ActivityItem
                  itemID={item.id}
                  rep={rep}
                  handleSetSelectedItemID={handleSetSelectedItemID}
                />
              </div>
            )
          })}
        </div>
      <div className={styles.buttonContainer}>
        <button
          className={'button button-primary'}
          onClick={addTenItems}
        >
            Show more items
          </button>
      </div>
    </div>
  )
}

function ActivityItem({itemID, rep, handleSetSelectedItemID}: any) {
  const item = useItemByID(rep, itemID)
  const [showTitleEditor, setShowTitleEditor] = useState<boolean>(false)
  const [showContentEditor, setShowContentEditor] = useState<boolean>(false)

  return (
    item &&
    <div className={styles.itemContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>
      </div>
      <div className={styles.item}>
        <div className={styles.expandItem} onClick={() => handleSetSelectedItemID(itemID)}>Expand</div>
        { item.highlight &&
          <>
            <HighlightParent
              rep={rep}
              itemID={itemID}
              arrows={item.arrows}
            />
            <div className={styles.highlight}>
              {htmlToText(item.highlight)}
            </div>
          </>
        }
        <div className={styles.titleContainer}>
          <div className={styles.bullet}>
            <div className={styles.bulletBorder}>
              <div className={styles.bulletCenter}>
              </div>
            </div>
          </div>
          <div className={styles.title}>
            {!showTitleEditor
            ?
              <span onClick={() => setShowTitleEditor(true)}>{htmlToText(item.title)}</span>
            :
            <TestEditor
              doc={item.title}
              type={'title'}
              rep={rep}
              itemID={itemID}
            />
            }
          </div>
        </div>
        <div className={styles.content}>
          {!showContentEditor
          ?
            <span onClick={() => setShowContentEditor(true)}>{htmlToText(item.content)}</span>
          :
            <TestEditor
              doc={item.content}
              type={'content'}
              rep={rep}
              itemID={itemID}
            />
          }
        </div>
      </div>
    </div>
  )
}

function HighlightParent({itemID, arrows, rep}: any) {
  let a
  arrows && arrows.map((arrow : any) => {
    if (
      arrow.kind === 'comment'
      &&
      arrow.backItemID !== itemID
    ) {
      a = arrow
    }
  })

  if (!a) return null

  const { arrowID } = a

  return (
    arrowID &&
    <ParentTitle
      rep={rep}
      arrowID={arrowID}
    />
  )
}

function ParentTitle({rep, arrowID}: any) {
  const fullArrow = useArrowByID(rep, arrowID)
  return (
    fullArrow &&
    <Title
      rep={rep}
      itemID={fullArrow.backItemID}
    />
  )
}

function Title({rep, itemID}: any) {
  const item = useItemByID(rep, itemID)
  return (
    item &&
    <div className={styles.highlightParentTitle}>
      <span className={styles.highlightParentArrow}>⮑</span>
      {item.title && htmlToText(item.title)}
    </div>
  )
}

