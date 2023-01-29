import React from 'react'
import PingPongControl from './PingPongControl/PingPongControl'
import PingPongSenders from './PingPongSenders/PingPongSenders'
import styles from './PingPong.module.scss'

const PingPong = () => {
  return (
    <div className={styles.pingPong}>
      <h1 className={styles.effectName}>ping pong</h1>
      <div className='flex'>
        <PingPongControl />
        <PingPongSenders />
      </div>
    </div>
  )
}

export default PingPong
