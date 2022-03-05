import type { ChangeEventHandler } from 'react'
import styles from './file-upload-button.module.css'

type Props = {
  onUpload: ChangeEventHandler
  loading: boolean
  sourceUrl: string
}

export default function FileUploadButton(props : Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="single">
        {props.loading ? 'Uploading ...' :
          props.sourceUrl ? '+ Replace source file' : '+ Add source file'
        }
      </label>
      <input
        className={styles.input}
        type="file"
        id="single"
        accept="image/*, application/pdf, application/JSON"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}
