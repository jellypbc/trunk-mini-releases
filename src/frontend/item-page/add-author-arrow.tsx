import React, { useState, useEffect } from 'react'
import { htmlToText } from 'src/util/htmlToText'
import styles from './index.module.css'
import type { M } from '../../datamodel/mutators'
import type { Replicache } from 'replicache'
import EditorDraftingContainer from '../editor-drafting-container'
import { useSortedItems, useClientEmail } from '../../datamodel/subscriptions'
import Fuse from 'fuse.js'
import { randomArrow } from '../../datamodel/arrow'
import { randomItem } from '../../datamodel/item'

type Props = {
  rep: Replicache<M>
  itemID: string
  handleSetShowAddAuthor: (state: boolean) => void
}

export default function AddAuthorArrow({ rep, itemID, handleSetShowAddAuthor} : Props) {
  const email = useClientEmail(rep)
  const allItems = useSortedItems(rep)

  return (
    <>
      {allItems && email &&(
        <AddAuthorThing
          rep={rep}
          userInfo={null}
          allItems={allItems}
          itemID={itemID}
          handleSetShowAddAuthor={handleSetShowAddAuthor}
          email={email}
        />
      )}
    </>
  )
}

function AddAuthorThing({ rep, userInfo, allItems, itemID, handleSetShowAddAuthor, email} : any) {
  const [authorDraft, setAuthorDraft] = useState<string>('<p></p>')
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
      'title'
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


  function createArrow(type: string, frontItemID: string, commentDraft : string) {
    let commentArrow : any = randomArrow()
    const arrowChanges = {
      createdBy: email,
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


  function handleArrowAdd(authorItemID: string) {
    const referenceArrow = createArrow('author', authorItemID, '')

    const newItemArrow = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    const frontItemID = authorItemID
    const backItemID = itemID

    rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })
    rep.mutate.updateItemAddSingleArrow({ id: frontItemID, arrow: newItemArrow})
    rep.mutate.updateItemAddSingleArrow({ id: backItemID, arrow: newItemArrow })
    setAuthorDraft('<p></p>')
    handleSetShowAddAuthor(false)
  }

  function createAuthorItem(authorDraft:string){
    let referenceItem = randomItem()
    const referenceItemChanges = {
      title: authorDraft,
      createdBy: email
    }

    referenceItem.item = {...referenceItem.item, ...referenceItemChanges}

    return referenceItem
  }

  function handleReferenceAdd(){
    const referenceItem = createAuthorItem(authorDraft)
    const referenceArrow = createArrow('author', referenceItem.id, authorDraft)

    const newItemArrow = {
      arrowID: referenceArrow.id,
      to: referenceArrow.arrow.to,
      from: referenceArrow.arrow.from,
      kind: referenceArrow.arrow.kind,
      backItemID: referenceArrow.arrow.backItemID
    }

    const arrows = []
    arrows.push(newItemArrow)
    referenceItem.item.arrows = JSON.stringify(arrows)

    const frontItemID = referenceItem.id
    const backItemID = itemID
    rep.mutate.createArrow({ id: referenceArrow.id, arrow: referenceArrow.arrow })
    rep.mutate.createItem({ id: frontItemID, item: referenceItem.item })
    rep.mutate.updateItemAddSingleArrow({ id: backItemID, arrow: newItemArrow })

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
          type={''}
        />
      </div>
      <div className={styles.authorActions}>
        <button
          className={`btn btn-1`}
          onClick={handleReferenceAdd}>Add</button>
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


