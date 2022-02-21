import React from 'react';
import styles from './item-draft-list.module.css'
import ItemDraft from './item-draft'

type Props = {
  drafts: any[];
}

export default function ItemDraftList({ drafts }: Props) {
  const d = drafts.sort((a, b) => b.created_at - a.created_at)
  return (
    <div className={styles.container}>
      <div className={styles.warning}>
        Only you can view these items. Warning: Draft items are stored locally. Bad things can happen.
      </div>
      {
        d.length > 0
        ? d.map((item: any) => {
          return (
            <ItemDraft
              key={`item-${item.id}`}
              item={item}
            />
          )
        })
        :
        <div className={styles.emptyDrafts}>No drafts found.</div>
      }
    </div>
  )
}

