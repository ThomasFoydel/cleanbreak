import React, { useContext } from 'react'
import styles from './DistortionControl.module.scss'
import { CTX } from '../../../context/Store'
import cn from 'classnames'
import RangeInput from '../../RangeInput/RangeInput'

const DistortionControl = () => {
  const [appState, updateState] = useContext(CTX)

  const updateDistortion = (type, value) =>
    updateState({ type: 'CHANGE_DISTORTION', payload: { type, value } })

  const handleMix = (e) => {
    const { value, id } = e.target
    updateDistortion(id, value < 0.1 ? 0 : value)
  }

  const handleDrive = (e) => updateDistortion(e.target.id, e.target.value)

  return (
    <div className={cn(styles.distortionControl, 'controller')}>
      <div className='inst'>
        <RangeInput
          id='wet'
          step={0.01}
          min={0}
          max={1}
          value={appState.distortion.wet}
          onChange={handleMix}
        />
        <h2 className='name'>mix</h2>
      </div>
      <div className='inst'>
        <RangeInput
          className='range-input'
          id='distortion'
          step={0.01}
          max={1}
          value={appState.distortion.distortion}
          onChange={handleDrive}
        />
        <h2 className='name'>drive</h2>
      </div>
    </div>
  )
}

export default DistortionControl
