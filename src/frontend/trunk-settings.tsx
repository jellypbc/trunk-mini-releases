import React, { useState, useEffect } from 'react'
import styles from './trunk-settings.module.css'
import { useRouter } from 'next/router'

export default function TrunkSettings() {
  const router = useRouter()
  const [roomID, setRoomID] = useState<string>('')

  useEffect(() => {
    const [ , , roomID] = location.pathname.split("/")
    setRoomID(roomID)
  })

  return (
    <div className={styles.container}>
      <div className={styles.settingsModalContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>
            Settings
          </div>
          <div
            className={styles.exit}
            onClick={() => router.push(`/t/${roomID}`)}
          >
            &times;
          </div>
        </div>
        <div className={styles.subHeading}>
          Members
        </div>
        <div className={styles.members}>
          <div className={styles.usernameContainer}>
            <Member
              username={`cindywu`}
              admin={true}
            />
            <Member
              username={`dluan`}
              admin={false}
            />
          </div>
        </div>
        <div className={styles.subHeading}>
          Invite someone using this link
        </div>
        <div className={styles.inviteLink}>
          <input
            className={styles.input}
            value="localhost:3000/invite/hemingway"
          />
        </div>
        <div className={styles.subHeading}>
          Appearance
        </div>
        <div className={styles.appearance}>
          <div className={styles.appearanceContainer}>
            <div className={styles.appearanceDescription}>
              Upload an image for the trunk. Image must be 512 x 512 pixels.
            </div>
            <div className={styles.appearanceUploadImageContainer}>
              <div className={styles.appearanceAvatarContainer}>
                <div className={styles.appearanceAvatar}>

                </div>
              </div>
              <div className={styles.uploadImageButtonContainer}>
                <button className={styles.uploadImageButton}>
                  Upload image
                </button>
              </div>
            </div>
            <div className={styles.appearanceChooseImage}>
              <div className={styles.appearanceDescription}>
                Or choose an image.
              </div>
              <div className={styles.appearanceImageOptions}>
                <Image/>
                <Image/>
                <Image/>
                <Image/>
                <Image/>
                <Image/>
                <Image/>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subHeading}>
          Delete this trunk
        </div>
        <div className={styles.deleteTrunkContainer}>
          <div className={styles.deleteTrunkDescription}>
            You'll be asked to confirm this action.
          </div>
          <div className={styles.deleteTrunkButtonContainer}>
            <button className={styles.deleteTrunkButton}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Image(){
  return (
    <div className={styles.imageContainer}>
      <div className={styles.image}>
      </div>
    </div>
  )
}

type MemberProps = {
  username: string
  admin: boolean
}

function Member({ username, admin }: MemberProps){
  const [showActions, setShowActions] = useState<boolean>(false)

  return (
    <div
      className={styles.memberContainer}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={styles.user}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
          </div>
        </div>
        <div className={styles.username}>
          <span>{username}</span>
          {admin &&
            <span className={styles.admin}>
              (admin)
            </span>}
        </div>
      </div>
      {showActions &&
        <div className={styles.memberActions}>
          <div className={styles.actionButtons}>
            <button className={styles.button}>
              remove
            </button>
            <button className={styles.button}>
              make admin
            </button>
          </div>
        </div>
      }
    </div>
  )
}
