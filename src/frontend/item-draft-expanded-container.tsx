import React from 'react'
import styles from './item-draft-expanded-container.module.css'
import ItemDraftExpanded from './item-draft-expanded'

type Props = {
  selectedDraftID: string
  drafts: any[]
  handleSetDrafts: (drafts: any[]) => void
  setSelectedDraftID: (ID: string) => void
}

export default function ItemExpanded({ selectedDraftID, drafts, handleSetDrafts, setSelectedDraftID}: Props) {
  const i = drafts.find((draft: any) => draft.id === selectedDraftID)
  return (
    <div className={styles.container}>
      <ItemDraftExpanded
        key={`item-${i.id}`}
        item={i}
        drafts={drafts}
        handleSetDrafts={handleSetDrafts}
        setSelectedDraftID={setSelectedDraftID}
      />
    </div>
  )
}
