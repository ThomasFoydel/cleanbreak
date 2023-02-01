import React, { useContext } from 'react'
import styles from '../TempoAndSwing.module.scss'
import { CTX } from '../../../context/Store'

const Tempo = () => {
  const [{ bpm }, updateState] = useContext(CTX)

  const handleChange = (e) => {
    updateState({ type: 'CHANGE_TEMPO', payload: e.target.value })
  }

  return (
    <div>
      <div className={styles.name}>tempo</div>
      <input
        type='range'
        min={65}
        max={200}
        value={bpm}
        onChange={handleChange}
      />
    </div>
  )
}

export default Tempo
