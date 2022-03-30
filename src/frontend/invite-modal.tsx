import React from 'react'
import styles from './invite-modal.module.css'

type Props = {
  handleSelectRoom: () => void
  room: string,
  setRoom: (room: string) => void,
  setShowRoomSelector: (bool: boolean) => void,
}

export default function InviteModal({
  handleSelectRoom,
  room,
  setRoom,
  setShowRoomSelector
} : Props) {
  function handleChange(room: string) {
    setRoom(room)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div></div>
        <button
            className={styles.btnEscape}
            onClick={ () => setShowRoomSelector(false) }
        >
          &times;
        </button>
      </div>
      <div className={styles.header}>
        <div className={styles.title}>
          Have an invite code?
        </div>
        <div className={styles.description}>
          Invite codes should look like sdDjd3
        </div>
      </div>
      <input
        className={styles.roomInput}
        onChange={e => handleChange(e.target.value)}
        placeholder={"Name of Trunk"}
        value={room}
      />
      <div className={styles.actionContainer}>
        <div
          className={styles.lucky}
          onClick={handleSelectRoom}
        >
          {!room && `I'm feeling lucky`}
        </div>
        <button
          onClick={handleSelectRoom}
          className={'button button-primary'}
        >
         Join {room ? room : `____`} Trunk
        </button>
      </div>
    </div>
  )
}
