import React from 'react'
import styles from './room-selector.module.css'

type Props = {
  handleSelectRoom: () => void
  room: string,
  setRoom: (room: string) => void,
}

export default function RoomSelector({ handleSelectRoom, room, setRoom } : Props) {
  function handleChange(room: string) {
    setRoom(room)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>
          Choose your trunk
        </div>
        <button
          className={styles.btnEscape}
        >&times;</button>
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
          className={`${styles.button} btn btn-primary`}
        >
          Enter {room ? room : `____`} Trunk
        </button>


      </div>



    </div>
  )
}
