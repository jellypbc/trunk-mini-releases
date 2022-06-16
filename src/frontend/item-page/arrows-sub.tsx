import React, { useState, useEffect } from 'react'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'
import EditorDraftingContainer from './editor-drafting-container'
import { useSortedItems, useItemByID, useClientEmail } from '../../datamodel/subscriptions'
import Fuse from 'fuse.js'
import { randomArrow } from '../../datamodel/arrow'
import { randomItem } from '../../datamodel/item'

type Props = {
  reflect: Reflect<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function ArrowsSub({ reflect, itemID, fullArrows, handleSetSelectedItemID} : Props) {
  const email = useClientEmail(reflect)
  const allItems = useSortedItems(reflect)

  const [showAddSubItem, setShowAddSubItem] = useState<boolean>(false)
  const subItemArrows= fullArrows.filter((a: any) => a.kind === 'sub' && a.backItemID === itemID ) || []
  const subItemItemIDs = subItemArrows.map((a: any) => a.frontItemID)
  const uniqueSubItemItemIDs = [...new Set(subItemItemIDs)]
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>Sub-items</span>
        <span className={styles.count}>{uniqueSubItemItemIDs.length}</span>
        <span
          onClick={() => setShowAddSubItem(true)}
        >
          Add sub-item
        </span>
      </div>
      {showAddSubItem && allItems && email &&
        <AddSubItemContainer
          reflect={reflect}
          allItems={allItems}
          itemID={itemID}
          handleSetShowAddSubItem={setShowAddSubItem}
          email={email}
        />
      }
      {uniqueSubItemItemIDs.map((itemID: any) => {
        return (
          <SubItemArrowItem
            key={`subItemArrow-${itemID}`}
            itemID={itemID}
            reflect={reflect}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </div>
  )
}

type FrontArrowItemProps = {
  reflect: Reflect<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}


function SubItemArrowItem({ reflect, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(reflect, itemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}


function AddSubItemContainer({ reflect, allItems, itemID, handleSetShowAddSubItem, email} : any) {
  const [subItemDraft, setSubItemDraft] = useState<string>('<p></p>')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      'id',
      'content',
      'highlight',
      'title',
      'createdBy'
    ]
  }
  const fuse = new Fuse(allItems, options)

  // useEffect(() => {
  //   if (subItemDraft) {
  //     const searchTerm = htmlToText(subItemDraft)
  //     if (allItems) {
  //       const results = fuse.search(searchTerm)
  //       setSearchResults(results)
  //     }
  //   } else {
  //     setSearchResults([])
  //   }
  // }, [subItemDraft])

  useEffect(() => {
    if (subItemDraft) {
      if (subItemDraft.length < 30) {
        const searchTerm = htmlToText(subItemDraft)
        if (allItems) {
          const results = fuse.search(searchTerm)
          processSearchResultChange(results)
        }
      } else {
        setSearchResults([])
      }
    } else {
      setSearchResults([])
    }
  }, [subItemDraft])


  const debounce = (func : any, timeout = 300) => {
    let timer : any
    return (...args : any) => {
      clearTimeout(timer)
      // @ts-ignore
      timer = setTimeout(() => {func.apply(this, args)}, timeout)
    }
  }

  const processSearchResultChange = debounce((thing: any) => setSearchResults(thing))


  function createArrow(type: string, frontItemID: string, commentDraft : string) {
    let commentArrow : any = randomArrow()
    const arrowChanges = {
      createdBy: email && email,
      frontItemID: frontItemID,
      backItemID: itemID,
      kind: type,
      content: commentDraft, // we don't need this
      parentItemID: itemID,
      // content: '',
      // highlight: '',
      // to: '',
      // from: '',
    }
    commentArrow.arrow = {...commentArrow.arrow, ...arrowChanges}
    return commentArrow
  }

  // create arrow to existing author
  function handleArrowAdd(id: string) {
    //create arrow
    const referenceArrow = createArrow('sub', id, '')
    //make newA

    const newA = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    // save arrow!
    reflect.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })


    // save arrow to the item of id passed in
    reflect.mutate.updateItemAddSingleArrow({ id: id, arrow: newA})

    // add arrow to existing item
    reflect.mutate.updateItemAddSingleArrow({ id: itemID, arrow: newA })
    setSubItemDraft('<p></p>')
    handleSetShowAddSubItem(false)
  }

  function createAuthorItem(authorDraft:string){
    let referenceItem = randomItem()
    const referenceItemChanges = {
      title: authorDraft,
      createdBy: email && email
    }

    referenceItem.item = {...referenceItem.item, ...referenceItemChanges}

    return referenceItem
  }

  function handleReferenceAdd(){
    // create referenceItem
    const referenceItem = createAuthorItem(subItemDraft)

    // create arrow
    const referenceArrow = createArrow('sub', referenceItem.id, subItemDraft)

    // set newA
    const newA = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    // push newA to referenceItem.arrows
    const arrows = []
    arrows.push(newA)
    referenceItem.item.arrows = JSON.stringify(arrows)

    // save author arrow
    reflect.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })

    // save new item, with author arrow
    reflect.mutate.createItem({ id: referenceItem.id, item: referenceItem.item })

    // add author arrow to existing item
    reflect.mutate.updateItemAddSingleArrow({ id: itemID, arrow: newA })

    setSubItemDraft('<p></p>')
    handleSetShowAddSubItem(false)
  }

  return (
    <div className={styles.addArrow}>
      <div className={styles.authorInput}>
        <EditorDraftingContainer
          reflect={reflect}
          content={subItemDraft}
          setValue={setSubItemDraft}
          type={''}
        />
      </div>
      <div className={styles.authorActions}>
        <button onClick={handleReferenceAdd}>Add</button>
        <div
          className={styles.addArrowExit}
          onClick={() => handleSetShowAddSubItem(false)}
        >&times;</div>
      </div>
      <div className={styles.searchResults}>
        {searchResults.map((result: any) => {
          return (
            <SearchResult
              key={`searchResult-${result.item.id}`}
              result={result.item}
              handleArrowAdd={handleArrowAdd}
            />
          )
        })}
      </div>
    </div>
  )
}

function SearchResult({ result, handleArrowAdd } : any) {
  return(
    <div
      className={styles.searchResult}
      onClick={() => handleArrowAdd(result.id)}
    >
      {result.title && htmlToText(result.title)}
    </div>
  )
}


