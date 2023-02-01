import cn from 'classnames'
import React, { useContext } from 'react'
import TempoAndSwing from '../TempoAndSwing/TempoAndSwing'
import styles from './StartStop.module.scss'
import { CTX } from '../../context/Store'

const StartStop = () => {
  const [{ playing }, updateState] = useContext(CTX)

  const handleStart = () => updateState({ type: 'START' })

  const handleStop = () => updateState({ type: 'STOP' })

  return (
    <div className={styles.startStop}>
      <TempoAndSwing />
      <div className={styles.buttonsContainer}>
        <div className={styles.triangleContainer} onClick={handleStart}>
          <div className={cn(styles.playTriangle, playing && styles.playing)} />
        </div>
        <div className={styles.pauseContainer} onClick={handleStop}>
          <div
            className={cn(
              styles.pauseButton,
              playing ? styles.pausedTrue : styles.pausedFalse
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default StartStop
