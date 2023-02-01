import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/Store'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './DistortionSenders.module.scss'

const DistortionSenders = () => {
  const [{ distortionSends }, updateState] = useContext(CTX)

  const handleChange = ({ value, name }) => {
    updateState({ type: 'CHANGE_DISTORTION_SENDS', payload: { name, value } })
  }

  return (
    <div className={cn(styles.distortionSenders, 'controller')}>
      {Object.keys(distortionSends)
        .sort()
        .map((inst) => (
          <div className='inst' key={inst}>
            <RangeInput
              min={0}
              max={50}
              name={inst}
              value={distortionSends[inst]}
              onChange={handleChange}
            />
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default DistortionSenders
