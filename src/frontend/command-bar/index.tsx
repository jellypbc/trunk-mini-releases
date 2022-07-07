import React, { useState, useEffect, useRef } from 'react'
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
  commandBar: boolean
}

export default function CommandBar({ reflect, handleSetSelectedItemID, handleSetCommandBar, roomID, commandBar } : Props) {
  console.log('commandBar', commandBar)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const inputRef = useRef<any>(null)

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

  useEffect(() => {
    inputRef && inputRef.current && inputRef.current.focus()
  },[])

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
    <>
      <div
        className="z-40
          fixed w-96 max-h-full
          right-0 left-0 top-[8%] my-3 mx-auto
          rounded-md py-1 px-3
          flex flex-col
          bg-white
          shadow-xl border border-gray-100"
      >
        <div
          className="font-bold text-right cursor-pointer
            hover:text-black"
          onClick={() => handleSetCommandBar(false)}
        >
          &times;
        </div>

        {list &&
          <>
            <input
              className="border-2 border-gray-100
                py-2 px-3 rounded-md mt-2 outline-0 outline-slate-200
                bg-white caret-green-300
                focus:bg-white focus:outline-none"
              onChange={e => handleSearch(e)}
              placeholder="Search your trunks"
              ref={inputRef}
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
      <div className="
        opacity-10 bg-slate-900 w-full h-full absolute
        top-0 z-[31]"
        onClick={() => handleSetCommandBar(false)}
      >
      </div>
    </>
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
