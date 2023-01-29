import React, { useContext } from 'react'
import styles from './DistortionControl.module.scss'
import { CTX } from 'context/Store'
import cn from 'classnames'

const DistortionControl = () => {
  const [appState, updateState] = useContext(CTX)

  const handleMix = (e) => {
    let { value, id } = e.target
    value /= 100
    updateState({ type: 'CHANGE_DISTORTION', payload: { type: id, value } })
  }

  const handleDrive = (e) => {
    let { value, id } = e.target
    value /= 100
    updateState({ type: 'CHANGE_DISTORTION', payload: { type: id, value } })
  }
  return (
    <div className={cn(styles.distortionControl, 'controller')}>
      <div className={styles.inst}>
        <h2 className={styles.name}>mix</h2>
        <input
          type='range'
          className={styles.rangeInput}
          id='wet'
          step={10}
          value={appState.distortion.wet * 100}
          onChange={handleMix}
        />
      </div>
      <div className={styles.inst}>
        <h2 className={styles.name}>drive</h2>
        <input
          type='range'
          className={styles.rangeInput}
          id='distortion'
          step={10}
          value={appState.distortion.distortion * 100}
          onChange={handleDrive}
        />
      </div>
    </div>
  )
}

export default DistortionControl
