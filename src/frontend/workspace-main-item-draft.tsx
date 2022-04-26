import React from 'react'
import styles from './workspace-main-item-draft.module.css'

export default function MainItemDraft() {

  let dropArea = document.getElementById('drop-area');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea && dropArea.addEventListener(eventName, preventDefaults, false)
  });

  dropArea && dropArea.addEventListener('drop', handleDrop, false)

  function handleDrop(e:any) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
  }

function handleFiles(files :any) {
  ([...files]).forEach(uploadFile)
}

function uploadFile(file :any) {
  console.log('file', file)
  // let formData = new FormData()

  // formData.append('file', file)

  // fetch(url, {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(() => { /* Done. Inform the user */ })
  // .catch(() => { /* Error. Inform the user */ })
}




  function preventDefaults (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

return (
  <div className={styles.container}>
    <div id="drop-area" className={styles.dropArea}>
      Drop a file

    </div>
  </div>
  )
}
