import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './PingPongControl.module.scss'
import { CTX } from '../../../context/Store'
import RangeInput from '../../RangeInput/RangeInput'

const PingPongControl = () => {
  const [{ pingPong }, updateState] = useContext(CTX)

  const handleChange = ({ id, value }) => {
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } })
  }

  const inputs = [
    { name: 'wet', label: 'mix', step: 0.01, max: 1 },
    { name: 'delayTime', label: 'time', step: 0.02, max: 2 },
    { name: 'feedback', label: 'feedback', step: 0.01, max: 1 }
  ]

  return (
    <div className={cn(styles.pingPongControl, 'controller')}>
      {inputs.map(({ name, label, step, max }) => (
        <div className='inst' key={name}>
          <RangeInput
            id={name}
            step={step}
            max={max}
            value={pingPong[name]}
            onChange={handleChange}
          />
          <h2 className='name'>{label}</h2>
        </div>
      ))}
    </div>
  )
}

export default PingPongControl
