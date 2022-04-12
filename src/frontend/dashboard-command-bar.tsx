import React, { useState, useEffect } from 'react'
import styles from './dashboard-command-bar.module.css'
import Fuse from 'fuse.js'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems } from '../datamodel/subscriptions'
import { htmlToText } from '../util/htmlToText'

type Props = {
  rep: Replicache<M>
  handleSetSelectedItemID: (itemID: string) => void
  handleSetCommandBar: (state: boolean) => void
}

export default function DashboardCommandBar({ rep, handleSetSelectedItemID, handleSetCommandBar } : Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const list = getSortedItems(rep)
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

  const fuse = new Fuse(list, options)
  useEffect(() => {
    if (list) {
     const results = fuse.search(searchTerm)
     setSearchResults(results)
    }
  }, [searchTerm])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.closeModal}
        onClick={() => handleSetCommandBar(false)}
      >&times;</div>
      <div className={styles.header}>Looking for something?</div>
      {list &&
        <>
          <input
            className={styles.input}
            onChange={e => handleSearch(e)}
            placeholder="Search"
          />
          <div className={styles.searchResults}>
            {searchResults.map(result => {
              return (
                <SearchResult
                  key={`sr-${result.item.id}`}
                  result={result.item}
                  handleSetSelectedItemID={handleSetSelectedItemID}
                  handleSetCommandBar={handleSetCommandBar}
                />
              )
            })}
          </div>
        </>
      }
    </div>
  )
}

type SearchResultProps = {
  result: any,
  handleSetSelectedItemID: (itemID: string) => void
  handleSetCommandBar: (state: boolean) => void
}

function SearchResult({ result, handleSetSelectedItemID, handleSetCommandBar } : SearchResultProps) {

  function handleRouteToItem(){
    handleSetSelectedItemID(result.id)
    handleSetCommandBar(false)
  }

  return(
    <div
      className={styles.searchResult}
      onClick={handleRouteToItem}
    >
      {result.title && htmlToText(result.title)}
    </div>
  )
}
