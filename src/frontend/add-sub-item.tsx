import React, { useState, useEffect } from 'react'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'
import { getSortedItems } from '../datamodel/subscriptions'
import Fuse from 'fuse.js'
import { randomItem } from '../datamodel/item'
import { randomArrow } from '../datamodel/arrow'
import styles from './add-sub-item.module.css'


type Props = {
  rep: Replicache<M>
  backItemID: string
  backItem: any
  handleSubItemAdd: (state: boolean) => void
}

export default function AddSubItem({rep, backItemID, backItem, handleSubItemAdd}:Props) {
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

  type frontItem = {
    id: string
    item: itemAlone
  }

  type itemAlone ={
    type: any
    createdAt: string
    createdBy: string
    title: string
    content: string
    arrows: any[]
    highlight: string
    sourceURL: string
  }

  type arrowForItemArray = {
    arrowID: string,
    to: number,
    from: number,
    kind: string,
    backItemID: string,
  }

  // type: z.literal(`item`),
  // createdAt: z.string(),
  // createdBy: z.string(),
  // title: z.string(),
  // content: z.string(),
  // arrows: z.string(),
  // highlight: z.string(),
  // sourceURL: z.string()

  function handleSubItemCreate(type: string){
    let frontItem : frontItem = returnNewSubItem()

    // // make new arrow
    const arrow = returnNewArrow(type, frontItem.id)

    // make new arrow for item array

    const newA = {
      arrowID: arrow.id,
      to: arrow.arrow.to,
      from: arrow.arrow.from,
      kind: arrow.arrow.kind,
      backItemID: arrow.arrow.backItemID,
    }

    // // append arrow to frontItem
    const newArrows = returnItemWithChangedArrows(frontItem.item, newA)
    frontItem.item.arrows = newArrows

    // // append arrow to existing item
    const newArrows2 = returnItemWithChangedArrows(backItem, newA)
    const newBackItem = {...backItem, arrows: newArrows2}
    console.log('newBackItem', newBackItem)

    // // save arrow
    rep.mutate.createArrow(arrow)

    // // save new item
    const stringifiedItem = {...frontItem.item, arrows: JSON.stringify(frontItem.item.arrows)}
    console.log('stringifiedItem', stringifiedItem)
    rep.mutate.createItem({id: frontItem.id, item: stringifiedItem})

    // // save existing item
    rep.mutate.updateItemArrows({ id: backItemID, arrows: newArrows2})
    setSearchTerm('')
    setSearchResults([])
  }

  function returnItemWithChangedArrows(item: itemAlone, arrow: arrowForItemArray) {
    console.log('item', item)
    console.log('arrow', arrow)
    let newArrows : arrowForItemArray[] = []
    item.arrows.length > 0 && item.arrows.map((arrow: arrowForItemArray) => {
      newArrows.push(arrow)
    })
    newArrows.push(arrow)
    console.log('newArrows', newArrows)
    return newArrows
  }

  function returnNewArrow(type: string, frontItemID: any){
    let arrow = randomArrow()
    if (type === 'sub') {
      const arrowChanges = {
        createdBy: '🐙',
        frontItemID: frontItemID,
        backItemID: backItemID,
        parentItemID: backItemID,
        kind: type
      }
      arrow.arrow = {...arrow.arrow, ...arrowChanges}
    }
    return arrow
  }

  function returnNewSubItem(){
    let item = randomItem()
    let changedItem
    const itemChanges = {
      createdBy: '🐙',
      title: searchTerm,
      arrows: JSON.parse(item.item.arrows) as any[]
    }
    changedItem = {...item.item, ...itemChanges}

    return {id: item.id, item: changedItem}
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <input onChange={e => handleSearch(e)}/>
        </div>
        <div>
          <button className={'btn btn-primary'} onClick={() => handleSubItemCreate("sub")}>save</button>
        </div>
        <div>
          <button className={'btn'} onClick={() => handleSubItemAdd(false)}>&times;</button>
        </div>
      </div>
      <div className={styles.bottom}>
        {searchResults.map(result => {
          return (
            <SearchResult
              key={`sr-${result.item.id}`}
              result={result.item}
            />
          )
        })}
      </div>


    </div>

  )
}


function SearchResult({ result } : any) {
  function handleSubItemConnect(){

  }

  return(
    <div onClick={() => handleSubItemConnect}
    >
      {result.title && result.title.replace(/<\/?[^>]+(>|$)/g, "")}
    </div>
  )
}
