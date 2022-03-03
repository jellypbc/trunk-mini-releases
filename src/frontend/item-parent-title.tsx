import React from 'react'
import EditorViewingContainer from './editor-viewing-container'
import { useItemByID } from '../datamodel/subscriptions'

export default function ItemParentTitle({rep, parentItemID}: {rep: any, parentItemID: string}) {

  const item = useItemByID(rep, parentItemID)
  return (
    <>
    {
      item &&
      <EditorViewingContainer
      type={'arrow'}
      rep={rep}
      content={item && item.title}
      clientInfo={null}
      setValue={()=>{ return null}}
    />
    }

    </>
  )
}
