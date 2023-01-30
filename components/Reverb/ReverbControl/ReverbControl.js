import cn from 'classnames'
import React, { useContext } from 'react'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './ReverbControl.module.scss'
import { CTX } from '../../../context/Store'

const ReverbControl = () => {
  const [appState, updateState] = useContext(CTX)

  const updateReverb = (type, value) => {
    updateState({
      type: 'CHANGE_REVERB',
      payload: { type, value }
    })
  }

  const handleDecay = (e) => updateReverb(e.target.id, +e.target.value / 20)

  const handlePreDelay = (e) => updateReverb(e.target.id, +e.target.value / 100)

  const handleMix = (e) => updateReverb(e.target.id, +e.target.value / 100)

  const params = [
    {
      name: 'wet',
      label: 'mix',
      onChange: handleMix,
      value: appState.reverb.wet * 100,
      step: 5
    },
    {
      name: 'decay',
      label: 'decay',
      onChange: handleDecay,
      value: appState.reverb.decay * 20,
      min: 0.1,
      step: 10
    },
    {
      name: 'preDelay',
      label: 'pre-delay',
      onChange: handlePreDelay,
      value: appState.reverb.preDelay * 100,
      step: 5
    }
  ]

  return (
    <div className={cn(styles.reverbControl, 'controller')}>
      {params.map(({ min, name, label, onChange, value, step }) => (
        <div className='inst' key={name}>
          <RangeInput
            min={min}
            id={name}
            step={step}
            value={value}
            onChange={onChange}
          />
          <h2 className='name'>{label}</h2>
        </div>
      ))}
    </div>
  )
}

export default ReverbControl
