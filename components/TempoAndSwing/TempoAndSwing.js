import React from 'react'
import Swing from './Swing/Swing'
import Tempo from './Tempo/Tempo'
import styles from './TempoAndSwing.module.scss'

const TempoAndSwing = () => {
  return (
    <div className={styles.tempoAndSwing}>
      <Tempo />
      <Swing />
    </div>
  )
}

export default TempoAndSwing
