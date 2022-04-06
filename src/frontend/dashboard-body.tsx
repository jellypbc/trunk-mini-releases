import React, { useState } from 'react'
import styles from './dashboard-body.module.css'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { htmlToText } from '../util/htmlToText'

type Props = {
  rep: Replicache<M>
  items: any[]
}

export default function DashboardBody({ rep, items } : Props) {
  const [showIndex, setShowIndex] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <div className={styles.view}>
        {!showIndex ?
          <ActivityView
            setShowIndex={setShowIndex}
            items={items}
            rep={rep}
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


function ActivityView({ setShowIndex, rep, items } : any) {
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
                  item={item}
                  rep={rep}
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


import EditorViewingContainer from './editor-viewing-container'

function ActivityItem({item, rep}: any) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}></div>
      </div>
      <div className={styles.item}>
        {item.highlight &&
          <>
            <HighlightParent
              rep={rep}
              itemID={item.id}
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
            <EditorViewingContainer
              type={'title'}
              rep={rep}
              content={item.title}
              clientInfo={null}
              setValue={()=>{ return null}}
            />
          </div>
        </div>

        <div className={styles.content}>
          {/* fix this to be ItemEditorContainer */}
          <EditorViewingContainer
            type={'content'}
            rep={rep}
            content={item.content}
            clientInfo={null}
            setValue={()=>{ return null}}
          />
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

import { useArrowByID, useItemByID } from '../datamodel/subscriptions'

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

