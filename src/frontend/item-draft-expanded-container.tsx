import React from 'react'
import styles from './item-draft-expanded-container.module.css'
import ItemDraftExpanded from './item-draft-expanded'
import type { Replicache } from 'replicache'
import type { M } from '../datamodel/mutators'

type Props = {
  selectedDraftID: string
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
  rep: Replicache<M>
}

export default function ItemDraftExpandedContainer({ selectedDraftID, drafts, handleSetDrafts, setSelectedDraftID, rep}: Props) {
  const i = drafts.find((draft: any) => draft.id === selectedDraftID)

  if (!i) return null

  return (
    <div className={styles.container}>
      <ItemDraftExpanded
        key={`item-${i.id}`}
        item={i}
        drafts={drafts}
        handleSetDrafts={handleSetDrafts}
        setSelectedDraftID={setSelectedDraftID}
        rep={rep}
      />
    </div>
  )
}
