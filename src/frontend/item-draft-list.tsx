import React from 'react';
import styles from './item-draft-list.module.css'
import ItemDraft from './item-draft'

type Props = {
  drafts: any[];
}

export default function ItemDraftList({ drafts }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.warning}>
        Warning: Drafts are stored in localStorage. Bad things can happen.
      </div>
      {
        drafts.length > 0
        ? drafts.map((item: any) => {
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

