import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function reindex() {
  const [reindexFinished, setReindexFinished] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const dbs = await window.indexedDB.databases()
      dbs.forEach((db: any) => { window.indexedDB.deleteDatabase(db.name) })
      setReindexFinished(true)
    })()
  }, [])


  return (
    <div style={{
      textAlign: "center",
    }}>
      {reindexFinished ?
      <div>
        <div>indexedDB data successfully cleared</div>
      </div>
      :
      <div>deleting indexedDB data...</div>
      }
      <button
        onClick={() => router.push('/workspace')}
      >
      go to workspace to reindex
      </button>
    </div>
  )
}
