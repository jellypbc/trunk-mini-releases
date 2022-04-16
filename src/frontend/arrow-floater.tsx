import React, { useState, useEffect } from 'react'
import styles from './arrow-floater.module.css'
import { htmlToText } from '../util/htmlToText'
import { getSortedItems } from '../datamodel/subscriptions'
import EditorDraftingContainer from './editor-drafting-container'
import Fuse from 'fuse.js'

export default function ArrowFloater({ serializedSelection, rep, userInfo, handleReferenceAdd, handleCommentAdd, handleFootnoteAdd, handleArrowAdd }:any) {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [commentDraft, setCommentDraft] = useState<string>('<p></p>')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const allItems = getSortedItems(rep)

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
    if (commentDraft) {
      const searchTerm = htmlToText(commentDraft)
      if (allItems) {
        const results = fuse.search(searchTerm)
        setSearchResults(results)
      }
    } else {
      setSearchResults([])
    }
  }, [commentDraft])

  function dosomething(){
    setShowReplyForm(true)
  }

  return (
    <div className={styles.container}>
      { showOptions &&
        <div className={styles.optionsContainer}>
          <div
            className={styles.option}
            // dataTooltip={`Add Reaction · A`}
          >
            🙂
          </div>
          <div
            className={styles.option}
            // dataTooltip={`Reply · R`}
            onClick={() => dosomething()}
          >
            💬
          </div>
          <div
            className={styles.option}
            // dataTooltip={`Delete · D`}
          >
            ...
          </div>
        </div>
      }
      <div
        className={styles.selectedText}
        onMouseOver={() => setShowOptions(true)}
      >
        {htmlToText(serializedSelection)}
      </div>
      {showReplyForm && allItems &&
        <>
          <EditorDraftingContainer
            rep={rep}
            content={commentDraft}
            clientInfo={userInfo}
            setValue={setCommentDraft}
            type={''}
          />
          <div className={styles.buttonsContainer}>
            <button
              className={'btn btn-secondary'}
              onClick={() => handleReferenceAdd(commentDraft)}
            >Reference</button>
            <button
              className={'btn btn-secondary'}
              onClick={() => handleCommentAdd(commentDraft)}
            >Comment</button>
            <button
              className={'btn btn-secondary'}
              onClick={() => handleFootnoteAdd(commentDraft)}
            >Footnote</button>
          </div>
          <div className={styles.searchResults}>
            {searchResults && searchResults.map((result: any) => {
              return (
                <SearchResult
                  key={`srl-${result.item.id}`}
                  result={result.item}
                  handleArrowAdd={handleArrowAdd}
                />
              )
            })}
          </div>
        </>
      }
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

