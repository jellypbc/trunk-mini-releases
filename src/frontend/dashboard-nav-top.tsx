import React, { useState, useEffect } from 'react'
import styles from './dashboard-nav-top.module.css'
import { supabase } from '../lib/supabase-client'
import { useRouter } from 'next/router'
import { useClientEmail, useClientUsername } from '../datamodel/subscriptions'

type Props = {
  itemCount: number
  arrowCount: number
  handleSetCommandBar: (commandBar: boolean) => void
  roomID: string
  rep: any
  session: any
}

export default function DashboardNavTop({ itemCount, arrowCount, handleSetCommandBar, roomID, rep, session } : Props ) {
  const [clientID, setClientID] = useState<string>()

  const email = useClientEmail(rep)
  const username = useClientUsername(rep)
  // const trunkIDs = useClientTrunkIDs(rep)

  const [showProfile, setShowProfile] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    (async()  => {
      const clientID = await rep.clientID
      setClientID(clientID)
    })()
  }, [])

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    error ?
      console.log('Error logging out:', error.message)
      :
      router.push('/')
  }

  function routeToSettings() {
    router.push(`${roomID}/settings`)
  }

  return (
    <div className={styles.container}>
      {showProfile && clientID &&
        <ProfileEdit
          handleSetShowProfile={setShowProfile}
          session={session}
          clientID={clientID}
          rep={rep}
        />
      }
      <input
        onClick={() => handleSetCommandBar(true)}
        className={styles.search}
        placeholder={'Search or type ⌘ + K'}
      />
      <div className={styles.email}>
        <span className={styles.itemCount} onClick={() => setShowProfile(true)}>Profile</span>
        <span className={styles.itemCount}
          onClick={() => routeToSettings()}
        >Settings</span>
        <span className={styles.itemCount}>{itemCount} items</span>
        <span className={styles.itemCount}>{arrowCount} arrows</span>
        <span className={styles.itemCount}>{username && username || 'no username'}</span>
        <span className={styles.itemCount} onClick={() => logOut()}>{email && email || 'no email'}</span>
      </div>
    </div>
  )
}

function ProfileEdit({handleSetShowProfile, session, clientID, rep}: any){
  return(
    <div className={styles.profileEdit}>
      <div className={styles.actions}>
        <div> </div>
        <div onClick={() => handleSetShowProfile(false)}>&times;</div>
      </div>

      <div className={styles.header}>Edit your profile</div>
      <Account
        session={session}
        clientID={clientID}
        rep={rep}
      />
    </div>
  )
}

function Account({session, clientID, rep}: any){
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [trunkIDs, setTrunkIDs] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, trunk_ids`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setTrunkIDs(data.trunk_ids)
      }
    } catch (error:any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url, trunkIDs } :any) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user?.id,
        username,
        avatar_url,
        trunk_ids: trunkIDs,
        updated_at: new Date(),
      }
      console.log('updates', updates)

      updates && rep.mutate.setUsername({ id: clientID, username: updates.username})
      updates && rep.mutate.setTrunkIDs({ id: clientID, trunkIDs: updates.trunk_ids})

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      console.log('clientID', clientID)
      setLoading(false)

    }
  }
  return (
    <div className={styles.formWidget}>
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url :any) => {
          setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
        rep={rep}
        clientID={clientID}
      />
      <div className={styles.userField}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className={styles.userField}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.userField}>
        <label htmlFor="username">TrunkIDs</label>
        <input
          id="trunkIDs"
          type="text"
          value={trunkIDs || ''}
          onChange={(e: any) => setTrunkIDs(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button button-primary"
          onClick={() => updateProfile({ username, avatar_url, trunkIDs })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>


      {/* <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div> */}
    </div>
  )
}

function Avatar({ url, size, onUpload, rep, clientID} :any) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null)
  const [uploading, setUploading] = useState<any>(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path :any) {
    try {
      const { data, error } : any = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
      rep.mutate.setAvatarURL({ id: clientID, avatarURL: url})
    } catch (error :any) {
      console.log('Error downloading image: ', error.message)
    }
  }


  async function uploadAvatar(event :any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error :any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={styles.avatarThing}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div className={styles.uploadAvatar} >
        <label className="button button-primary" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}