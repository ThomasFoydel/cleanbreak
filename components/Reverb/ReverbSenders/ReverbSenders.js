import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './ReverbSenders.module.scss'
import { CTX } from '../../../context/Store'
import RangeInput from '../../RangeInput/RangeInput'

const ReverbSenders = () => {
  const [appState, updateState] = useContext(CTX)

  const handleChange = ({ value, name }) => {
    updateState({
      type: 'CHANGE_REVERB_SENDS',
      payload: { name, value }
    })
  }

  return (
    <div className={cn(styles.reverbSenders, 'controller')}>
      {Object.keys(appState.reverbSends)
        .sort()
        .map((inst, i) => (
          <div className='inst' key={i}>
            <RangeInput
              min={-50}
              max={0}
              name={inst}
              value={appState.reverbSends[inst]}
              onChange={handleChange}
            />
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default ReverbSenders
