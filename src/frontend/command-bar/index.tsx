import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Fuse from 'fuse.js'
import type { Reflect } from '@rocicorp/reflect'
import type { M } from '../../datamodel/mutators'
import { useSortedItems } from '../../datamodel/subscriptions'
import { htmlToText } from '../../util/htmlToText'
import { useRouter } from 'next/router'

type Props = {
  reflect: Reflect<M>
  handleSetSelectedItemID: (itemID: string) => void
  handleSetCommandBar: (state: boolean) => void
  roomID: string
}

export default function CommandBar({ reflect, handleSetSelectedItemID, handleSetCommandBar, roomID } : Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const list = useSortedItems(reflect)
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
                  roomID={roomID}
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
  roomID: string
}

function SearchResult({ result, handleSetSelectedItemID, handleSetCommandBar, roomID } : SearchResultProps) {
  const router = useRouter()
  const modifiedRoomID = roomID.replace(` `, `-`).replace(`@`, `-`).replace(`.com`, ``)


  function handleRouteToItem(){
    handleSetSelectedItemID(result.id)
    handleSetCommandBar(false)
    router.push(`/workspace/${modifiedRoomID}/${result.id}`)
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
