import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './ReverbSenders.module.scss'
import { CTX } from '../../../context/Store'
import RangeInput from '../../RangeInput/RangeInput'

const ReverbSenders = () => {
  const [{ reverbSends }, updateState] = useContext(CTX)

  const handleChange = ({ value, name }) => {
    updateState({
      type: 'CHANGE_REVERB_SENDS',
      payload: { name, value }
    })
  }

  return (
    <div className={cn(styles.reverbSenders, 'controller')}>
      {Object.keys(reverbSends)
        .sort()
        .map((inst) => (
          <div className='inst' key={inst}>
            <RangeInput
              min={-50}
              max={30}
              name={inst}
              value={reverbSends[inst]}
              onChange={handleChange}
            />
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default ReverbSenders
