import { useEffect, useState } from "react";
import type { Replicache } from "replicache";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./nav.module.css";
import { randomShape } from "../../datamodel/shape";
import { randomItem } from "../../datamodel/item";
import { useUserInfo, useItemCount } from "../../datamodel/subscriptions";
import type { M } from "../../datamodel/mutators";
import { supabase } from "src/lib/supabase-client";
import { useRouter } from 'next/router'

// import type TauriWindow from '../typings/window'
// declare const window: TauriWindow;

import dynamic from 'next/dynamic'

export function Nav({ rep }: { rep: Replicache<M>}) {

  if (window && '__TAURI__' in window) {
    // @ts-ignore
    const TauriUploader = dynamic(
      import('../tauri-uploader'),
      { ssr: false }
    )
  }

  const [filePath, setPath] = useState<string>("")
  const [fileFormVisible, showFileForm] = useState(false);
  const [isTauri, setTauri] = useState(false)
  const userInfo = useUserInfo(rep);
  const router = useRouter()
  const itemCount = useItemCount(rep) || 0

  useEffect(() => {
    // if (window && window.__TAURI__ !== undefined) { setTauri(true) }
    if (window && '__TAURI__' in window) { setTauri(true) }

    // (async () => {
      // if ('__TAURI__' in window) {
        // const {path} = await import('@tauri-apps/api')

        // const TauriUploader = await import('./tauri-uploader') as any

        // const TauriUploader = dynamic(
        //   import('./tauri-uploader'),
        //   { ssr: false }
        // )

      // }
    // })()

  }, [])

  const onRectangle = () => {
    rep.mutate.createShape(randomShape());
  };

  function handleSubmit() {
    rep.mutate.createItem(randomItem())
    showFileForm(false)
  };

  async function handleFileChange() {
    // e.preventDefault()
    // const path = await openDialog({ multiple: false, directory: false })
    // if (typeof path === 'string') {
    //   setPath(path)
    //   const url = "http://jsonplaceholder.typicode.com"
    //   if (typeof window !== 'undefined') {
    //     // upload(url, filePath, (progress, t) => {
    //     //   console.log(progress)
    //     // }).then( console.log("end")).catch(e => {
    //     //   console.error(e)
    //     // })
    //   }
    // }
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      alert('You have been signed out')
  }

  return (
    <>
      <div className={styles.nav} style={{}}>
        <div
          onClick={() => onRectangle()}
          className={styles.button}
          title="Square"
        >
          🩳 Mini Trunk
        </div>
        <div className={styles.button}>{itemCount} items</div>
        <div className={styles.button} onClick={() => showFileForm(true)}>
          Add File
        </div>

        <div className={styles.button}>
          tauri: {isTauri.toString()}
        </div>
        <div
          className={styles.button}
          onClick={() => router.push('/') }
        >
          Switch Trunk
        </div>

        <div className={styles.spacer}></div>
        {userInfo && (
          <div
            className={styles.user}
            style={{
              backgroundColor: userInfo.color,
            }}
            onClick={logOut}
          >
            {userInfo.avatar} {userInfo.name}
          </div>
        )}
        </div>


      <Modal
        show={fileFormVisible}
        onHide={() => {
          setPath("")
          showFileForm(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a file</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {isTauri &&
            <>
              <p>Tauri:</p>
              {
                // eek!
                // @ts-ignore
                <TauriUploader
                  handleClick={handleFileChange}
                  setPath={setPath}
                />
              }
            </>

          }

          {!isTauri  &&
            <>
              <p>web:</p>
              <input
                type="file"
                id="single"
                accept="image/*, application/pdf, application/JSON"
              />
            </>
          }
          <p>
            {filePath}
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
