import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './PingPongControl.module.scss'
import { CTX } from '../../../context/Store'
import RangeInput from '../../RangeInput/RangeInput'

const PingPongControl = () => {
  const [appState, updateState] = useContext(CTX)

  const handleMix = (e) => {
    let { value, id } = e.target
    value /= 100
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } })
  }

  const handleDelayTime = (e) => {
    let { value, id } = e.target
    value /= 50
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } })
  }

  const handleFeedback = (e) => {
    let { value, id } = e.target
    value /= 100
    updateState({ type: 'CHANGE_PINGPONG', payload: { type: id, value } })
  }

  return (
    <div className={cn(styles.pingPongControl, 'controller')}>
      <div className='inst'>
        <RangeInput
          id='wet'
          step={10}
          value={appState.pingPong.wet * 100}
          onChange={handleMix}
        />
        <h2 className='name'>mix</h2>
      </div>
      <div className='inst'>
        <RangeInput
          id='delayTime'
          step={10}
          value={appState.pingPong.delayTime * 50}
          onChange={handleDelayTime}
        />

        <h2 className='name'>time</h2>
      </div>
      <div className='inst'>
        <RangeInput
          id='feedback'
          step={10}
          value={appState.pingPong.feedback * 100}
          onChange={handleFeedback}
        />
        <h2 className='name'>feedback</h2>
      </div>
    </div>
  )
}

export default PingPongControl
