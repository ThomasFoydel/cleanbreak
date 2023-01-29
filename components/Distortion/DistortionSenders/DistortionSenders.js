import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Store'
import styles from './DistortionSenders.module.scss'

const DistortionSenders = () => {
  const [appState, updateState] = useContext(CTX)

  const handleChange = (e) => {
    let { value, name } = e.target
    value *= -1
    updateState({ type: 'CHANGE_DISTORTION_SENDS', payload: { name, value } })
  }

  return (
    <div className={cn(styles.distortionSenders, 'controller')}>
      {Object.keys(appState.distortionSends)
        .sort()
        .map((inst, i) => (
          <div className='inst' key={i}>
            <div className='input-container'>
              <input
                className='range-input'
                type='range'
                min={0}
                max={50}
                name={inst}
                value={appState.distortionSends[inst] * -1}
                onChange={handleChange}
              />
            </div>
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default DistortionSenders
