import React, { useState, useEffect } from 'react'
import { htmlToText } from 'src/util/htmlToText'
import styles from './test-editor-container.module.css'
import type { M } from '../datamodel/mutators'
import type { Replicache } from 'replicache'
import EditorDraftingContainer from './editor-drafting-container'
import { getSortedItems, useItemByID } from '../datamodel/subscriptions'
import Fuse from 'fuse.js'
import { randomArrow } from '../datamodel/arrow'

type Props = {
  rep: Replicache<M>
  itemID: string
  fullArrows: any[]
  handleSetSelectedItemID: (item: string) => void
}

export default function TestEditorAuthors({ rep, itemID, fullArrows, handleSetSelectedItemID} : Props) {

  const allItems = getSortedItems(rep)

  const [showAddAuthor, setShowAddAuthor] = useState<boolean>(false)
  const authorArrows= fullArrows.filter((a: any) => a.kind === 'author' && a.backItemID === itemID ) || []
  const authorItemIDs = authorArrows.map((a: any) => a.frontItemID)
  const uniqueAuthorItemIDs = [...new Set(authorItemIDs)]
  console.log('uniqueAuthorItemIDs', uniqueAuthorItemIDs)
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>Authors</span>
        <span className={styles.count}>{uniqueAuthorItemIDs.length}</span>
        <span
          onClick={() => setShowAddAuthor(true)}
        >
          Add author
        </span>
      </div>
      {showAddAuthor && allItems && (
        <AddAuthorThing
          rep={rep}
          userInfo={null}
          allItems={allItems}
          itemID={itemID}
          handleSetShowAddAuthor={setShowAddAuthor}
        />
      )}
      {uniqueAuthorItemIDs.map((itemID: any) => {
        return (
          <AuthorArrowItem
            key={`frontArrow-${itemID}`}
            itemID={itemID}
            rep={rep}
            handleSetSelectedItemID={handleSetSelectedItemID}
          />
        )
      })}
    </div>
  )
}

type FrontArrowItemProps = {
  rep: Replicache<M>
  itemID: string
  handleSetSelectedItemID: (itemID: string) => void
}


function AuthorArrowItem({ rep, itemID, handleSetSelectedItemID }: FrontArrowItemProps){
  const item = useItemByID(rep, itemID)
  return (
    <div
      className={styles.item}
      onClick={() => handleSetSelectedItemID(itemID)}
    >
      {item && htmlToText(item.title) || 'nothing here'}
    </div>
  )
}


function AddAuthorThing({ rep, userInfo, allItems, itemID, handleSetShowAddAuthor} : any) {
  const [authorDraft, setAuthorDraft] = useState<string>('<p>hi</p>')
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

  useEffect(() => {
    if (authorDraft) {
      const searchTerm = htmlToText(authorDraft)
      if (allItems) {
        const results = fuse.search(searchTerm)
        setSearchResults(results)
      }
    } else {
      setSearchResults([])
    }
  }, [authorDraft])

  // function handleArrowAdd(){
  //   console.log(
  //     'add something', commentDraft
  //   )
  // }

  function createArrow(type: string, frontItemID: string, commentDraft : string) {
    let commentArrow : any = randomArrow()
    const arrowChanges = {
      createdBy: '😸',
      frontItemID: frontItemID,
      backItemID: itemID,
      kind: type,
      content: commentDraft, // we don't need this
      // content: '',
      // highlight: '',
      // to: '',
      // from: '',
      // parentItemID: '',
    }
    commentArrow.arrow = {...commentArrow.arrow, ...arrowChanges}
    return commentArrow
  }

  // create arrow to existing author
  function handleArrowAdd(id: string) {
    //create arrow
    const referenceArrow = createArrow('author', id, '')
    //make newA

    const newA = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    // save arrow!
    rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })


    // save arrow to the item of id passed in
    rep.mutate.updateItemAddSingleArrow({ id: id, arrow: newA})

    // add arrow to existing item
    rep.mutate.updateItemAddSingleArrow({ id: itemID, arrow: newA })
    setAuthorDraft('<p></p>')
    handleSetShowAddAuthor(false)
  }

  return (
    <div className={styles.addArrow}>
      <div className={styles.authorInput}>
        <EditorDraftingContainer
          rep={rep}
          content={authorDraft}
          clientInfo={userInfo}
          setValue={setAuthorDraft}
        />
      </div>
      <div className={styles.authorActions}>
        <button>Add</button>
        <div
          className={styles.addArrowExit}
          onClick={() => handleSetShowAddAuthor(false)}
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


