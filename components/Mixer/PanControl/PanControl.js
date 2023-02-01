import React, { useContext } from 'react'
import CircleRange from '../../CircleRange/CircleRange'
import { CTX } from '../../../context/Store'
import styles from './PanControl.module.scss'

const PanControl = ({ name }) => {
  const [{ panVolPans }, updateState] = useContext(CTX)

  const handlePan = (e, tag) => {
    updateState({ type: 'CHANGE_PAN', payload: { type: name, value: e } })
  }

  return (
    <div className={styles.panControl}>
      <CircleRange
        size='20'
        min={-1}
        max={1}
        step={0.5}
        type='range'
        onChange={handlePan}
        value={panVolPans[name] * 100}
      />
    </div>
  )
}

export default PanControl
