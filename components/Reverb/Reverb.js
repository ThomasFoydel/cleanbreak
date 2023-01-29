import React from 'react'
import ReverbControl from './ReverbControl/ReverbControl'
import ReverbSenders from './ReverbSenders/ReverbSenders'
import styles from './Reverb.module.scss'

const Reverb = () => {
  return (
    <div className={styles.reverb}>
      <div className={styles.effectName}>reverb</div>
      <div className='flex'>
        <ReverbControl />
        <ReverbSenders />
      </div>
    </div>
  )
}

export default Reverb
