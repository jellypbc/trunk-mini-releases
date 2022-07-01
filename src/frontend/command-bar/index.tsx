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
    <div
      className="z-40 bg-gray-100
        fixed w-96 max-h-full
        right-0 left-0 top-[8%] my-3 mx-auto
        rounded-md py-2 px-3
        flex flex-col
        shadow-xl border border-slate-600"
    >
      <div
        className="font-bold text-right cursor-pointer
          hover:text-black"
        onClick={() => handleSetCommandBar(false)}
      >
        &times;
      </div>
      <div
        className="p-3 text-center"
      >
        Looking for something?
      </div>

      {list &&
        <>
          <input
            className="outline-0 py-2 px-3 rounded-md"
            onChange={e => handleSearch(e)}
            placeholder="Search"
          />

          <div
            className="cursor-pointer my-2
              max-h-[40vh] min-h-40 overflow-auto"
          >
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
      className="rounded-sm px-1 my-0.5
        text-gray-600
        transition duration-150 hover:duration-150
        ease-in-out hover:bg-gray-200 hover:text-gray-900"
      onClick={handleRouteToItem}
    >
      {result.title && htmlToText(result.title)}
    </div>
  )
}
