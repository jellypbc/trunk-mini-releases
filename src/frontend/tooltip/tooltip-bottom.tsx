import React from 'react'
import styles from './tooltip-bottom.module.css'

type TooltipBottomProps = {
  text: string
  fullText: string
}


export default function TooltipBottom({ text, fullText}: TooltipBottomProps) {
  return (
    <div className={styles.container}>
      <span className={styles.tooltip}data-tooltip={fullText}>{text}</span>
    </div>
  )
}
