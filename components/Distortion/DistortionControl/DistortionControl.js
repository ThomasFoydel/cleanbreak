import React, { useContext } from 'react'
import styles from './DistortionControl.module.scss'
import { CTX } from '../../../context/Store'
import cn from 'classnames'
import RangeInput from '../../RangeInput/RangeInput'

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
      <div className='inst'>
        <RangeInput
          id='wet'
          step={10}
          value={appState.distortion.wet * 100}
          onChange={handleMix}
        />
        <h2 className='name'>mix</h2>
      </div>
      <div className='inst'>
        <RangeInput
          className='range-input'
          id='distortion'
          step={10}
          value={appState.distortion.distortion * 100}
          onChange={handleDrive}
        />
        <h2 className='name'>drive</h2>
      </div>
    </div>
  )
}

export default DistortionControl
