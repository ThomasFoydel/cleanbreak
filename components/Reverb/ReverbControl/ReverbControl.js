import cn from 'classnames'
import React, { useContext } from 'react'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './ReverbControl.module.scss'
import { CTX } from '../../../context/Store'

const ReverbControl = () => {
  const [appState, updateState] = useContext(CTX)

  const handleDecay = (e) => {
    let { value, id } = e.target
    value = +value
    value /= 20
    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } })
  }

  const handlePreDelay = (e) => {
    let { value, id } = e.target
    value = +value
    value /= 100
    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } })
  }

  const handleMix = (e) => {
    let { value, id } = e.target
    value = +value
    value /= 100
    updateState({ type: 'CHANGE_REVERB', payload: { type: id, value } })
  }

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
      {params.map(({ name, label, onChange, value, step }) => (
        <div className='inst' key={name}>
          <RangeInput id={name} step={step} value={value} onChange={onChange} />
          <h2 className='name'>{label}</h2>
        </div>
      ))}
    </div>
  )
}

export default ReverbControl
