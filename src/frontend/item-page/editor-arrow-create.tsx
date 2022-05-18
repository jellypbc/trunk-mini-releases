import React, { useState, useEffect } from 'react'
import styles from './editor-arrow-create.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useSortedItems, useClientEmail } from '../../datamodel/subscriptions'
import EditorDraftingContainer from './editor-drafting-container'
import Fuse from 'fuse.js'

export default function EditorArrowCreate({ serializedSelection, rep, handleReferenceAdd, handleCommentAdd, handleFootnoteAdd, handleArrowAdd, showEmptyCommentError, handleSetShowEmptyCommentError }:any) {
  // const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [commentDraft, setCommentDraft] = useState<string>('<p></p>')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const clientEmail = useClientEmail(rep)

  const allItems = useSortedItems(rep)

  useEffect(() => {

  }, [])

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
      // 'highlight',
      'title',
      // 'createdBy'
    ]
  }
  const fuse = new Fuse(allItems, options)

  useEffect(() => {
    if (commentDraft) {
      if (commentDraft.length < 30) {
        const searchTerm = htmlToText(commentDraft)
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
  }, [commentDraft])


  const debounce = (func : any, timeout = 300) => {
    let timer : any
    return (...args : any) => {
      clearTimeout(timer)
      // @ts-ignore
      timer = setTimeout(() => {func.apply(this, args)}, timeout)
    }
  }

  const processSearchResultChange = debounce((thing: any) => setSearchResults(thing))

  function dosomething(){
    setShowReplyForm(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}></div>
      <div className={styles.main}></div>
      <div className={styles.gutter}>
        {/* { showOptions &&
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
        } */}
        {/* {clientEmail === 'guest' ? 'Anonymous Aardvark' : clientEmail} */}
        {showEmptyCommentError &&
          <>
            <div
              className={styles.error}
              onClick={() => handleSetShowEmptyCommentError(false)}
            >
              <div className={styles.message}>Say something before submitting...</div>
            </div>
          </>
        }
        <div className={styles.arrowCreatorLabel}>Create a linked block</div>
        <div className={styles.arrowActions}>
          <span
            className={styles.left}
            onClick={() => handleCommentAdd(commentDraft)}
          >Comment</span>
          <span
            className={styles.middle}
            onClick={() => handleReferenceAdd(commentDraft)}
          >Reference</span>
          <span
            className={styles.right}
            onClick={() => handleFootnoteAdd(commentDraft)}
          >Footnote</span>
        </div>
        <div
          className={styles.selectedText}
          // onMouseOver={() => setShowOptions(true)}
        >
          {htmlToText(serializedSelection)}
        </div>
        {!showReplyForm &&
          <>
            <div
              className={styles.draftingContainerFake}
              onClick={() => dosomething()}
            >
              Say something or search...
            </div>
          </>
        }
        {showReplyForm && allItems &&
          <div className={styles.replyForm}>
            <div className={styles.draftingContainer}>
              <EditorDraftingContainer
                rep={rep}
                content={commentDraft}
                setValue={setCommentDraft}
                type={'arrowDraft'}
              />
            </div>
            {clientEmail === 'guest' ?
            <div className={styles.buttonsContainer}>
              <button
              className={'btn btn-secondary'}
              onClick={() => handleCommentAdd(commentDraft)}
            >Comment</button>
            </div>
          :
          <>
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
        }
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

