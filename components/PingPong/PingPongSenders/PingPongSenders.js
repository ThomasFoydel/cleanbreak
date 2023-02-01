import React, { useContext } from 'react'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './PingPongSenders.module.scss'
import { CTX } from '../../../context/Store'
import cn from 'classnames'

const PingPongSenders = () => {
  const [{ pingPongSends }, updateState] = useContext(CTX)

  const handleChange = ({ value, name }) => {
    updateState({
      type: 'CHANGE_PINGPONG_SENDS',
      payload: { name, value }
    })
  }

  return (
    <div className={cn(styles.pingPongSenders, 'controller')}>
      {Object.keys(pingPongSends)
        .sort()
        .map((inst) => (
          <div className='inst' key={inst}>
            <RangeInput
              min={-50}
              max={30}
              name={inst}
              value={pingPongSends[inst]}
              onChange={handleChange}
            />
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default PingPongSenders
