import React, { useState } from 'react'
import { useCommentArrows } from '../../datamodel/subscriptions'
import { htmlToText } from '../../util/htmlToText'
import styles from './flashcards.module.css'
import type { M } from '../../datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect'

type FlashcardsProps = {
  reflect: Reflect<M>
}

export default function Flashcards({reflect} : FlashcardsProps) {
  const commentArrows = useCommentArrows(reflect)
  const [index, setIndex] = useState<number>(0)

  function handleNext(){
    setIndex(index+1)
  }

  function handleBack(){
    setIndex(index-1)
  }

  return (
    <div className={styles.container}>
      {commentArrows &&
        <Card
          arrow={commentArrows[index]}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      }
    </div>
  )
}

function Card({arrow, handleNext, handleBack}: any) {
  return(
    <>
    {arrow &&
    <div className={styles.card}>
      <div
        className={styles.back}
        onClick={() => handleBack()}
      >&lsaquo;</div>
      <div className={styles.contentContainer}>
      <div className={styles.highlight}>{htmlToText(arrow.highlight)}</div>
      </div>
      <div
        className={styles.next}
        onClick={() => handleNext()}
      >&rsaquo;</div>

    </div>}
    </>
  )
}