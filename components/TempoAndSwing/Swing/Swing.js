import React, { useContext } from 'react'
import styles from '../TempoAndSwing.module.scss'
import { CTX } from '../../../context/Store'

const Swing = () => {
  const [{ swing }, updateState] = useContext(CTX)

  const handleChange = ({ target }) => {
    updateState({ type: 'CHANGE_SWING', payload: target.value })
  }

  return (
    <div>
      <div className={styles.name}>swing</div>
      <input
        type='range'
        max={1}
        step={0.01}
        value={swing}
        onChange={handleChange}
      />
    </div>
  )
}

export default Swing
