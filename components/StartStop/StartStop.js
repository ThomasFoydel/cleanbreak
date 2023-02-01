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
        <div
          className={cn(styles.triangleContainer, playing && styles.pushedIn)}
          onClick={handleStart}>
          <div className={cn(styles.playTriangle, playing && styles.playing)} />
        </div>
        <div
          className={cn(styles.pauseContainer, !playing && styles.pushedIn)}
          onClick={handleStop}>
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
