import type { ChangeEventHandler } from 'react'
import styles from './item-file-upload-button.module.css'

type Props = {
  onUpload: ChangeEventHandler
  loading: boolean
  sourceUrl: string
  itemID: string
}

export default function ItemFileUploadButton(props: Props) {
  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={props.itemID}
      >
        {props.loading ? 'Uploading ...' :
          props.sourceUrl ? '⌘+R to Replace' : '⌘+U to Upload File'
        }
      </label>
      <input
        className={styles.input}
        id={props.itemID}
        type="file"
        accept="image/*, application/pdf, application/JSON"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}
