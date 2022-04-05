import React, { useState, useEffect } from 'react'
import styles from './command-bar.module.css'
import Fuse from 'fuse.js'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems } from '../datamodel/subscriptions'
import { useRouter } from 'next/router'

type Props = {
  rep: Replicache<M>
}

export default function CommandBar({ rep } : Props) {
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

  function handleSearch(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      Looking for something?
      {list &&
        <>
          <textarea onChange={e => handleSearch(e)}/>
          <div className={styles.searchResults}>
            {searchResults.map(result => {
              return (
                <SearchResult
                  key={`sr-${result.item.id}`}
                  result={result.item}
                />
              )
            })}
          </div>

        </>
      }
    </div>
  )
}

function SearchResult({ result } : any) {
  const router = useRouter()
  const [, , roomID,] = location.pathname.split("/");

  function handleRouteToItem(){
    router.push({
      pathname: `/d/[roomid]/[itemid]`,
      query: { roomid: roomID, itemid: result.id }
    })
  }
  return(
    <div
      className={styles.searchResult}
      onClick={handleRouteToItem}
    >
      {result.title && result.title.replace(/<\/?[^>]+(>|$)/g, "")}
    </div>
  )
}
