import React, { useContext } from 'react'
import RangeInput from '../../RangeInput/RangeInput'
import styles from './PingPongSenders.module.scss'
import { CTX } from '../../../context/Store'
import cn from 'classnames'

const PingPongSenders = () => {
  const [appState, updateState] = useContext(CTX)

  const handleChange = (e) => {
    const { value, name } = e.target
    updateState({
      type: 'CHANGE_PINGPONG_SENDS',
      payload: { name, value }
    })
  }

  return (
    <div className={cn(styles.pingPongSenders, 'controller')}>
      {Object.keys(appState.pingPongSends)
        .sort()
        .map((inst, i) => (
          <div className='inst' key={i}>
            <RangeInput
              min={-50}
              max={0}
              name={inst}
              value={appState.pingPongSends[inst]}
              onChange={handleChange}
            />
            <h2 className='name'>{inst}</h2>
          </div>
        ))}
    </div>
  )
}

export default PingPongSenders
