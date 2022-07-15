import React, { useState, useEffect } from 'react'
import styles from './editor-arrow-create.module.css'
import { htmlToText } from '../../util/htmlToText'
import { useSortedItems, useClientEmail } from '../../datamodel/subscriptions'
import EditorDraftingContainer from './editor-drafting-container'
import Fuse from 'fuse.js'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'

type EditorArrowCreateProps = {
  serializedSelection: any
  reflect: Reflect<M>
  handleReferenceAdd: (reference: any) => void
  handleCommentAdd: (comment: any) => void
  handleFootnoteAdd: (footnote: any) => void
  handleArrowAdd: (arrow: any) => void
  showEmptyCommentError: boolean
  handleSetShowEmptyCommentError: (showEmptyCommentError: boolean) => void
}

type ErrorMessageProps = {
  showEmptyCommentError: boolean
  handleSetShowEmptyCommentError: (state: boolean) => void
}

type SearchResultProps = {
  result: any
  handleArrowAdd: (arrow: any) => void
}

export default function EditorArrowCreate({ serializedSelection, reflect, handleReferenceAdd, handleCommentAdd, handleFootnoteAdd, handleArrowAdd, showEmptyCommentError, handleSetShowEmptyCommentError }: EditorArrowCreateProps) {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false)
  const [commentDraft, setCommentDraft] = useState<string>('<p></p>')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const clientEmail = useClientEmail(reflect)

  const allItems = useSortedItems(reflect)

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
    <div className="max-w-screen-lg inset-x-0 mx-auto absolute pointer-events-none">
      <div className="my-0 mx-auto max-w-screen-lg h-full grid grid-rows-[auto_auto] gap-4">
        <div className="grid md:grid-cols-[150px_550px_250px] gap-4">
          <div className="p-4 hidden md:table-cell max-h-fit">
          </div>
          <div className="p-4">
          </div>
          <div className="p-4 hidden md:table-cell pointer-events-auto">
            <ErrorMessage
                showEmptyCommentError={showEmptyCommentError}
                handleSetShowEmptyCommentError={handleSetShowEmptyCommentError}
              />
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
                      reflect={reflect}
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
        </div>
    </div>


    // <div className="p-4 bg-blue-50 absolute max-w-screen-lg inset-x-0 mx-auto">
    //   <div className="bg-amber-500 float-right max-w-xs">
    //

    //   </div>
    // </div>
    // <div className="max-w-screen-lg mx-auto overflow-auto absolute inset-x-0 flex bg-amber-400">
    //     {/* <div className="grid md:grid-cols-[150px_550px_auto] gap-4">
    //       <div className="px-4 hidden md:table-cell max-h-fit min-width-150"></div>
    //       <div className="px-4"></div> */}
    //       <div className="ml-4 p-4 right-0 max-w-xs relative float-right hidden md:table-cell ">
    //         <ErrorMessage
    //           showEmptyCommentError={showEmptyCommentError}
    //           handleSetShowEmptyCommentError={handleSetShowEmptyCommentError}
    //         />
    //         <div className={styles.arrowCreatorLabel}>Create a linked block</div>
    //         <div className={styles.arrowActions}>
    //           <span
    //             className={styles.left}
    //             onClick={() => handleCommentAdd(commentDraft)}
    //           >Comment</span>
    //           <span
    //             className={styles.middle}
    //             onClick={() => handleReferenceAdd(commentDraft)}
    //           >Reference</span>
    //           <span
    //             className={styles.right}
    //             onClick={() => handleFootnoteAdd(commentDraft)}
    //           >Footnote</span>
    //         </div>
    //         <div
    //           className={styles.selectedText}
    //         >
    //           {htmlToText(serializedSelection)}
    //         </div>
    //         {!showReplyForm &&
    //           <>
    //             <div
    //               className={styles.draftingContainerFake}
    //               onClick={() => dosomething()}
    //             >
    //               Say something or search...
    //             </div>
    //           </>
    //         }
    //         {showReplyForm && allItems &&
    //           <div className={styles.replyForm}>
    //             <div className={styles.draftingContainer}>
    //               <EditorDraftingContainer
    //                 reflect={reflect}
    //                 content={commentDraft}
    //                 setValue={setCommentDraft}
    //                 type={'arrowDraft'}
    //               />
    //             </div>
    //             {clientEmail === 'guest' ?
    //             <div className={styles.buttonsContainer}>
    //               <button
    //               className={'btn btn-secondary'}
    //               onClick={() => handleCommentAdd(commentDraft)}
    //             >Comment</button>
    //             </div>
    //           :
    //           <>
    //             <div className={styles.searchResults}>
    //               {searchResults && searchResults.map((result: any) => {
    //                 return (
    //                   <SearchResult
    //                     key={`srl-${result.item.id}`}
    //                     result={result.item}
    //                     handleArrowAdd={handleArrowAdd}
    //                   />
    //                 )
    //               })}
    //             </div>
    //           </>
    //         }
    //           </div>
    //         }
    //       </div>
    //     {/* </div> */}
    // </div>
  )
}

function ErrorMessage({showEmptyCommentError, handleSetShowEmptyCommentError} : ErrorMessageProps) {
  return (
    <>
      {showEmptyCommentError &&
        <div
          className={styles.error}
          onClick={() => handleSetShowEmptyCommentError(false)}
        >
          <div className={styles.message}>Say something before submitting...</div>
        </div>
      }
    </>
  )
}

function SearchResult({ result, handleArrowAdd } : SearchResultProps) {
  return(
    <div
      className={styles.searchResult}
      onClick={() => handleArrowAdd(result.id)}
    >
      {result.title && htmlToText(result.title)}
    </div>
  )
}

