import cn from 'classnames'
import React, { useContext } from 'react'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './ReverbControl.module.scss'
import { CTX } from '../../../context/Store'

const ReverbControl = () => {
  const [{ reverb }, updateState] = useContext(CTX)

  const updateReverb = (type, value) => {
    updateState({
      type: 'CHANGE_REVERB',
      payload: { type, value }
    })
  }

  const handleChange = ({ id, value }) => updateReverb(id, value)

  const params = [
    {
      name: 'wet',
      label: 'mix',
      value: reverb.wet,
      max: 1,
      step: 0.01
    },
    {
      name: 'decay',
      label: 'decay',
      value: reverb.decay,
      min: 0.1,
      max: 5,
      step: 0.1
    },
    {
      name: 'preDelay',
      label: 'pre-delay',
      value: reverb.preDelay,
      max: 0.5,
      step: 0.01
    }
  ]

  return (
    <div className={cn(styles.reverbControl, 'controller')}>
      {params.map(({ min, max, name, label, value, step }) => (
        <div className='inst' key={name}>
          <RangeInput
            min={min}
            max={max}
            id={name}
            step={step}
            value={value}
            onChange={handleChange}
          />
          <h2 className='name'>{label}</h2>
        </div>
      ))}
    </div>
  )
}

export default ReverbControl
