import React from 'react'
import DistortionSenders from '../DistortionSenders/DistortionSenders'
import DistortionControl from '../DistortionControl/DistortionControl'
import styles from './Distortion.module.scss'

const Distortion = () => {
  return (
    <div className={styles.distortion}>
      <DistortionControl />
      <DistortionSenders />
      <div className={styles.effectName}>distortion</div>
    </div>
  )
}

export default Distortion
